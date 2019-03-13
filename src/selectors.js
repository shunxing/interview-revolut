import { createSelector } from "reselect";
import { POCKETS_CURRENCY } from "./constants";

const getSelectedCurrencies = state => state.currency;
export const selectAvailableCurrencies = currencyFieldType =>
  createSelector(
    [getSelectedCurrencies],
    selectedCurrencies => {
      return POCKETS_CURRENCY.filter(
        currency => currency !== selectedCurrencies[currencyFieldType].value
      ).map(availableCurrency => ({
        label: availableCurrency,
        value: availableCurrency
      }));
    }
  );

export const getSelectedCurrency = currencyFieldType =>
  createSelector(
    [getSelectedCurrencies],
    selectedCurrencies => selectedCurrencies[currencyFieldType]
  );
