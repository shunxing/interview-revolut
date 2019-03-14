import {
  SELECT_CURRENCY,
  UPDATE_CURRENCY_AMOUNT,
  UPDATE_CURRENCY_RATES
} from "./actionTypes";
import { CURRENCY_TYPE } from "../../constants";
import { calculateContextCurrencyAmount } from "../../utils";

const initialState = {
  [CURRENCY_TYPE.SOURCE]: { value: "EUR", label: "EUR", currencyAmount: "" },
  [CURRENCY_TYPE.TARGET]: { value: "USD", label: "USD", currencyAmount: "" },
  currencyRates: []
};

export const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENCY_RATES:
      return { ...state, currencyRates: action.rates };
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
      const updateCurrencyAmount =
        action.currencyFieldType === CURRENCY_TYPE.SOURCE
          ? {
              [CURRENCY_TYPE.TARGET]: {
                ...state[CURRENCY_TYPE.TARGET],
                currencyAmount:
                  calculateContextCurrencyAmount(
                    state[CURRENCY_TYPE.SOURCE].currencyAmount,
                    action.selectedCurrency.value,
                    state[CURRENCY_TYPE.TARGET].value,
                    state.currencyRates
                  ) || ""
              }
            }
          : {
              [CURRENCY_TYPE.SOURCE]: {
                ...state[CURRENCY_TYPE.SOURCE],
                currencyAmount:
                  calculateContextCurrencyAmount(
                    state[CURRENCY_TYPE.TARGET].currencyAmount,
                    action.selectedCurrency.value,
                    state[CURRENCY_TYPE.SOURCE].value,
                    state.currencyRates
                  ) || ""
              }
            };

      return {
        ...state,
        ...{
          [action.currencyFieldType]: {
            ...state[action.currencyFieldType],
            ...action.selectedCurrency
          },
          ...updateCurrencyAmount
        }
      };

    case UPDATE_CURRENCY_AMOUNT:
      if (action.currencyFieldType === CURRENCY_TYPE.SOURCE) {
        return {
          ...state,
          ...{
            [CURRENCY_TYPE.SOURCE]: {
              ...state[CURRENCY_TYPE.SOURCE],
              currencyAmount: action.currencyAmount
            },
            [CURRENCY_TYPE.TARGET]: {
              ...state[CURRENCY_TYPE.TARGET],
              currencyAmount:
                calculateContextCurrencyAmount(
                  action.currencyAmount,
                  state[CURRENCY_TYPE.SOURCE].value,
                  state[CURRENCY_TYPE.TARGET].value,
                  state.currencyRates
                ) || ""
            }
          }
        };
      }
      return {
        ...state,
        ...{
          [CURRENCY_TYPE.TARGET]: {
            ...state[CURRENCY_TYPE.TARGET],
            currencyAmount: action.currencyAmount
          },
          [CURRENCY_TYPE.SOURCE]: {
            ...state[CURRENCY_TYPE.SOURCE],
            currencyAmount:
              calculateContextCurrencyAmount(
                action.currencyAmount,
                state[CURRENCY_TYPE.TARGET].value,
                state[CURRENCY_TYPE.SOURCE].value,
                state.currencyRates
              ) || ""
          }
        }
      };
    default:
      return state;
  }
};
