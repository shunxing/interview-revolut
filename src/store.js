import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import logger from "redux-logger";
import { SELECT_CURRENCY } from "./actionTypes";
import { CURRENCY_TYPE } from "./constants";

const selectedCurrency = (
  state = {
    source: { value: "EUR", label: "EUR" },
    target: { value: "USD", label: "USD" }
  },
  action
) => {
  switch (action.type) {
    case SELECT_CURRENCY:
      const switchCurrencyCondition =
        (action.currencyFieldType === CURRENCY_TYPE.SOURCE &&
          state[CURRENCY_TYPE.TARGET].value ===
            action.selectedCurrency.value) ||
        (action.currencyFieldType === CURRENCY_TYPE.TARGET &&
          state[CURRENCY_TYPE.SOURCE].value === action.selectedCurrency.value);
      if (switchCurrencyCondition) {
        return {
          ...state,
          source: state.target,
          target: state.source
        };
      }
      return {
        ...state,
        ...{ [action.currencyFieldType]: action.selectedCurrency }
      };
    default:
      return state;
  }
};

const reducers = combineReducers({ selectedCurrency });

export const storeRedux = createStore(reducers, applyMiddleware(logger));
