import { SELECT_CURRENCY } from "./actionTypes";

export const selectCurrency = (selectedCurrency, currencyFieldType) => ({
  type: SELECT_CURRENCY,
  selectedCurrency,
  currencyFieldType
});
