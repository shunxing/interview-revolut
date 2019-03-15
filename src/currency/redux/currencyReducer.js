import { SELECT_CURRENCY, UPDATE_CURRENCY_AMOUNT } from "./currencyActionTypes";
import { CURRENCY_TYPE } from "../../constants";
import { calculateContextCurrencyAmount } from "../../utils";

const initialState = {
  [CURRENCY_TYPE.SOURCE]: { currency: "EUR", currencyAmount: "" },
  [CURRENCY_TYPE.TARGET]: { currency: "USD", currencyAmount: "" }
};

export const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CURRENCY:
      const switchCurrencyCondition =
        (action.currencyFieldType === CURRENCY_TYPE.SOURCE &&
          state[CURRENCY_TYPE.TARGET].currency === action.selectedCurrency) ||
        (action.currencyFieldType === CURRENCY_TYPE.TARGET &&
          state[CURRENCY_TYPE.SOURCE].currency === action.selectedCurrency);

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
                    action.selectedCurrency,
                    state[CURRENCY_TYPE.TARGET].currency,
                    action.currencyRates
                  ) || ""
              }
            }
          : {
              [CURRENCY_TYPE.SOURCE]: {
                ...state[CURRENCY_TYPE.SOURCE],
                currencyAmount:
                  calculateContextCurrencyAmount(
                    state[CURRENCY_TYPE.TARGET].currencyAmount,
                    action.selectedCurrency,
                    state[CURRENCY_TYPE.SOURCE].currency,
                    action.currencyRates
                  ) || ""
              }
            };

      return {
        ...state,
        ...{
          [action.currencyFieldType]: {
            ...state[action.currencyFieldType],
            currency: action.selectedCurrency
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
                  state[CURRENCY_TYPE.SOURCE].currency,
                  state[CURRENCY_TYPE.TARGET].currency,
                  action.currencyRates
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
                state[CURRENCY_TYPE.TARGET].currency,
                state[CURRENCY_TYPE.SOURCE].currency,
                action.currencyRates
              ) || ""
          }
        }
      };
    default:
      return state;
  }
};
