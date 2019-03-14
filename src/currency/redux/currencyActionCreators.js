import { SELECT_CURRENCY, UPDATE_CURRENCY_AMOUNT } from "./currencyActionTypes";

export const selectCurrency = ({
  selectedCurrency,
  currencyFieldType,
  currencyRates
}) => ({
  type: SELECT_CURRENCY,
  selectedCurrency,
  currencyFieldType,
  currencyRates
});

export const updateCurrencyAmount = ({
  currencyAmount,
  currencyFieldType,
  currencyRates
}) => ({
  type: UPDATE_CURRENCY_AMOUNT,
  currencyAmount,
  currencyFieldType,
  currencyRates
});
