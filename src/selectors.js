import { createSelector } from "reselect";
import { POCKETS_CURRENCY } from "./constants";
import get from "lodash/get";
export const getSelectedCurrencies = state => state.currency;
export const selectAvailableCurrencies = currencyFieldType =>
  createSelector(
    [getSelectedCurrencies],
    selectedCurrencies => {
      return POCKETS_CURRENCY.filter(
        currency =>
          currency !==
          get(selectedCurrencies, `[${currencyFieldType}].currency`)
      );
    }
  );

export const getSelectedCurrency = currencyFieldType =>
  createSelector(
    [getSelectedCurrencies],
    selectedCurrencies =>
      get(selectedCurrencies, `[${currencyFieldType}].currency`)
  );
