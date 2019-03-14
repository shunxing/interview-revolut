export const calculateContextCurrencyAmount = (
  currencyAmount,
  sourceCurrency,
  targetCurrency,
  currencies
) => {
  const sourceCurrencyContext = currencies.find(
    currency => currency.base === sourceCurrency
  );
  if (sourceCurrencyContext && sourceCurrencyContext.rates[targetCurrency]) {
    return parseFloat(
      twoDigitsLimitDecimals(
        currencyAmount * sourceCurrencyContext.rates[targetCurrency]
      )
    );
  }
  return 0;
};

export const twoDigitsLimitDecimals = number => parseFloat(number).toFixed(2);
