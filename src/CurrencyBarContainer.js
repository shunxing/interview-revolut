import React from "react";
import { CurrencyContextConsumer } from "./CurrencyContext";
import { CURRENCY_SYMBOL } from "./constants";
import { connect } from "react-redux";

const CurrencyBarComponent = ({
  selectedTargetCurrency,
  selectedSourceCurrency
}) => (
  <CurrencyContextConsumer>
    {context => {
      const selectedSourceCurrencyContext = context.currencies.find(
        currency => currency.base === selectedSourceCurrency
      );
      return (
        selectedSourceCurrencyContext &&
        selectedSourceCurrencyContext.rates[selectedTargetCurrency] && (
          <div>
            1{CURRENCY_SYMBOL[selectedSourceCurrencyContext.base]} :
            {selectedSourceCurrencyContext.rates[selectedTargetCurrency]}
            {CURRENCY_SYMBOL[selectedTargetCurrency]}
          </div>
        )
      );
    }}
  </CurrencyContextConsumer>
);

const mapStateToProps = state => ({
  selectedTargetCurrency: state.app.selectedTargetCurrency,
  selectedSourceCurrency: state.app.selectedSourceCurrency
});

export const CurrencyBarContainer = connect(mapStateToProps)(
  CurrencyBarComponent
);
