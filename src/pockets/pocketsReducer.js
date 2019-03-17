import { CONVERT_MONEY_POCKETS } from "./pocketsActionTypes";
import {
  calculateContextCurrencyAmount,
  twoDigitsLimitDecimals
} from "../utils";
import { SELECT_MENU_CURRENCY } from "../currency/redux/currencyActionTypes";

export const pocketsReducer = (
  state = {
    EUR: { amount: 500 },
    USD: { amount: 500 },
    GBP: { amount: 500 }
  },
  action
) => {
  switch (action.type) {
    case CONVERT_MONEY_POCKETS:
      const {
        sourceAmount,
        sourceCurrency,
        targetCurrency,
        currencyRates
      } = action.payload;

      const newBalanceTarget = {
        [targetCurrency]: {
          ...state[targetCurrency],
          amount: twoDigitsLimitDecimals(
            parseFloat(state[targetCurrency].amount) +
              parseFloat(
                calculateContextCurrencyAmount(
                  sourceAmount,
                  sourceCurrency,
                  targetCurrency,
                  currencyRates
                )
              )
          )
        }
      };

      const newBalanceSource = {
        [sourceCurrency]: {
          ...state[sourceCurrency],
          amount: twoDigitsLimitDecimals(
            state[sourceCurrency].amount - sourceAmount
          )
        }
      };

      return { ...state, ...newBalanceTarget, ...newBalanceSource };

    case SELECT_MENU_CURRENCY:
      const selectedCurrenciesObject = action.selectedCurrencies.reduce(
        (acc, selectedCurrency) => ({
          ...acc,
          [selectedCurrency]: { amount: 0 }
        }),
        {}
      );
      return { ...selectedCurrenciesObject, ...state };
    default:
      return state;
  }
};
