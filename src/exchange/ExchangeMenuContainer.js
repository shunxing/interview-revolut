import React from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { ExchangeInput } from "exchange/ExchangeInput";
import { CurrencyBarContainer } from "currency/containers/CurrencyBarContainer";
import { convertMoneyPockets } from "pockets/pocketsActionCreators";
import { CURRENCY_TYPE } from "../constants";
import { CurrencyContextConsumer } from "CurrencyContext";
export const ExchangeMenuComponent = ({
  currencyRates,
  sourceAmount,
  sourceCurrency,
  targetCurrency,
  convertMoney
}) => (
  <CurrencyContextConsumer>
    {({ currencies }) => (
      <>
        <ExchangeInput currencyFieldType={CURRENCY_TYPE.SOURCE} />
        <CurrencyBarContainer />

        <ExchangeInput currencyFieldType={CURRENCY_TYPE.TARGET} />

        <Button
          variant="contained"
          color="primary"
          onClick={convertMoney({
            currencyRates: currencies,
            sourceAmount,
            sourceCurrency,
            targetCurrency
          })}
        >
          Confirm
        </Button>
      </>
    )}
  </CurrencyContextConsumer>
);

const mapStateToProps = (state, ownProps) => ({
  sourceAmount: state.currency[CURRENCY_TYPE.SOURCE].currencyAmount,
  sourceCurrency: state.currency[CURRENCY_TYPE.SOURCE].currency,
  targetCurrency: state.currency[CURRENCY_TYPE.TARGET].currency
});

const mapDispatchToProps = dispatch => ({
  convertMoney: payload => event => dispatch(convertMoneyPockets(payload))
});

export const ExchangeMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExchangeMenuComponent);
