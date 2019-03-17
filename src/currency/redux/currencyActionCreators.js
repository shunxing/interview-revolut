import {
  SELECT_CURRENCY,
  UPDATE_CURRENCY_AMOUNT,
  SWITCH_SOURCE_TARGET_CURRENCY,
  SELECT_MENU_CURRENCY
} from "./currencyActionTypes";

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

export const switchSourceTargetCurrency = () => ({
  type: SWITCH_SOURCE_TARGET_CURRENCY
});

export const selectMenuCurrency = selectedCurrencies => ({
  type: SELECT_MENU_CURRENCY,
  selectedCurrencies
});
