import React from "react";

export const initialCurrencyContext = [
  { base: "USD", rates: {} },
  { base: "EUR", rates: {} },
  { base: "GBP", rates: {} }
];

const CurrencyContext = React.createContext(initialCurrencyContext);

export const CurrencyContextProvider = CurrencyContext.Provider;
export const CurrencyContextConsumer = CurrencyContext.Consumer;
