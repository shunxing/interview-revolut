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
        <div className="title">Exchange menu</div>
        <ExchangeInput currencyFieldType={CURRENCY_TYPE.SOURCE} />
        <CurrencyBarContainer />
        <ExchangeInput currencyFieldType={CURRENCY_TYPE.TARGET} />
        {typeof convertMoney === "function" && (
          <Fab
            variant="extended"
            color="secondary"
            onClick={convertMoney({
              currencyRates: currencies,
              sourceAmount,
              sourceCurrency,
              targetCurrency
            })}
            disabled={
              sourceAmount === "" ||
              parseFloat(sourceAmount) > parseFloat(sourcePocketAmount)
            }
          >
            Confirm exchange
          </Fab>
        )}
      </>
    )}
  </CurrencyContextConsumer>
);

/** to be improved (exporting internal code is not that good but it's one of the way of testing and increase test coverage)
 * https://jsramblings.com/2018/01/15/3-ways-to-test-mapStateToProps-and-mapDispatchToProps.html
 */
export const mapStateToProps = (state, ownProps) => ({
  sourceAmount: state.currency[CURRENCY_TYPE.SOURCE].currencyAmount,
  sourcePocketAmount:
    state.pockets[state.currency[CURRENCY_TYPE.SOURCE].currency].amount,
  sourceCurrency: state.currency[CURRENCY_TYPE.SOURCE].currency,
  targetCurrency: state.currency[CURRENCY_TYPE.TARGET].currency
});

const mapDispatchToProps = dispatch => ({
  convertMoney: payload => event => convertMoneyPockets(payload)
});

export const ExchangeMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExchangeMenuComponent);
