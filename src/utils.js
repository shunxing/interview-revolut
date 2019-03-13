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
    return currencyAmount * sourceCurrencyContext.rates[targetCurrency];
  }
  return 0;
};
