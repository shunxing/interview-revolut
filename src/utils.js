import { get } from "lodash";
export const calculateContextCurrencyAmount = (
  currencyAmount,
  sourceCurrency,
  targetCurrency,
  currencies
) => {
  const sourceCurrencyContext =
    currencies && currencies.find(currency => currency.base === sourceCurrency);
  if (get(sourceCurrencyContext, `rates[${targetCurrency}]`)) {
    return twoDigitsLimitDecimals(
      parseFloat(currencyAmount * sourceCurrencyContext.rates[targetCurrency])
    );
  }
  return 0;
};

export const twoDigitsLimitDecimals = number =>
  !isNaN(parseFloat(number)) ? parseFloat(number).toFixed(2) : undefined;
