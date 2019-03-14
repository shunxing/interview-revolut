import {
  SELECT_CURRENCY,
  UPDATE_CURRENCY_AMOUNT,
  UPDATE_CURRENCY_RATES
} from "./currencyActionTypes";

export const selectCurrency = (selectedCurrency, currencyFieldType) => ({
  type: SELECT_CURRENCY,
  selectedCurrency,
  currencyFieldType
});

export const updateCurrencyAmount = (
  currencyAmount,
  currencyFieldType,
  currenciesRates
) => ({
  type: UPDATE_CURRENCY_AMOUNT,
  currencyAmount,
  currencyFieldType,
  currenciesRates
});

export const updateCurrencyRates = rates => ({
  type: UPDATE_CURRENCY_RATES,
  rates
});
