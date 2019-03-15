import React from "react";
import { connect } from "react-redux";
import { ExchangeInput } from "exchange/ExchangeInput";
import { CurrencyBarContainer } from "currency/containers/CurrencyBarContainer";
import { convertMoneyPockets } from "pockets/pocketsActionCreators";
import { CURRENCY_TYPE } from "../constants";
import { CurrencyContextConsumer } from "CurrencyContext";
import Fab from "@material-ui/core/Fab";

export const ExchangeMenuComponent = ({
  currencyRates,
  sourceAmount,
  sourceCurrency,
  targetCurrency,
  convertMoney,
  sourcePocketAmount
}) => (
  <CurrencyContextConsumer>
    {({ currencies }) => (
      <>
        <ExchangeInput currencyFieldType={CURRENCY_TYPE.SOURCE} />
        <CurrencyBarContainer />

        <ExchangeInput currencyFieldType={CURRENCY_TYPE.TARGET} />

        <Fab
          variant="extended"
          color="secondary"
          onClick={convertMoney({
            currencyRates: currencies,
            sourceAmount,
            sourceCurrency,
            targetCurrency
          })}
          disabled={sourceAmount === "" || sourceAmount > sourcePocketAmount}
        >
          Confirm exchange
        </Fab>
      </>
    )}
  </CurrencyContextConsumer>
);

const mapStateToProps = (state, ownProps) => ({
  sourceAmount: state.currency[CURRENCY_TYPE.SOURCE].currencyAmount,
  sourcePocketAmount:
    state.pockets[state.currency[CURRENCY_TYPE.SOURCE].currency].amount,
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
