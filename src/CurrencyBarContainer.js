import React from "react";
import { CurrencyContextConsumer } from "./CurrencyContext";
import { CURRENCY_SYMBOL } from "./constants";
import { connect } from "react-redux";

const CurrencyBarComponent = ({ selectedTargetCurrency }) => (
  <CurrencyContextConsumer>
    {context => {
      return context.currencies.map(
        currency =>
          currency.rates[selectedTargetCurrency] &&
          selectedTargetCurrency !== currency.base && (
            <div key={currency.base}>
              {context.base} 1{CURRENCY_SYMBOL[currency.base]} :
              {currency.rates[selectedTargetCurrency]}
              {CURRENCY_SYMBOL[selectedTargetCurrency]}
            </div>
          )
      );
    }}
  </CurrencyContextConsumer>
);

const mapStateToProps = state => ({
  selectedTargetCurrency: state.app.selectedTargetCurrency
});

export const CurrencyBarContainer = connect(mapStateToProps)(
  CurrencyBarComponent
);
