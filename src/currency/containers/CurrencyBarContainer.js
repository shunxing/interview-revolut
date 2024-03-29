import React from "react";
import { CurrencyContextConsumer } from "CurrencyContext";
import { CURRENCY_SYMBOL } from "../../constants";
import { connect } from "react-redux";
import "./CurrencyBar.scss";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import CompareArrows from "@material-ui/icons/CompareArrows";
import Fab from "@material-ui/core/Fab";
import { get } from "lodash";
import { switchSourceTargetCurrency } from "../redux/currencyActionCreators";
export const CurrencyBarComponent = ({
  selectedTargetCurrency,
  selectedSourceCurrency,
  switchSourceTargetCurrency
}) => (
  <CurrencyContextConsumer>
    {context => {
      const selectedSourceCurrencyContext = context.currencies.find(
        currency => currency && currency.base === selectedSourceCurrency
      );
      return (
        <>
          <div className="currency--middle">
            {get(
              selectedSourceCurrencyContext,
              `rates[${selectedTargetCurrency}]`
            ) && (
              <div className="currency__bar">
                <ShowChartIcon />
                <div className="currency__bar__text">
                  {`1${CURRENCY_SYMBOL[selectedSourceCurrencyContext.base] ||
                    selectedSourceCurrencyContext.base} = ${
                    selectedSourceCurrencyContext.rates[selectedTargetCurrency]
                  } ${CURRENCY_SYMBOL[selectedTargetCurrency] ||
                    selectedTargetCurrency}`}
                </div>
              </div>
            )}
            <div className="currency__switch-currency">
              <Fab color="secondary" onClick={switchSourceTargetCurrency}>
                <div style={{ transform: "rotate(90deg)" }}>
                  <CompareArrows />
                </div>
              </Fab>
            </div>
          </div>
        </>
      );
    }}
  </CurrencyContextConsumer>
);

const mapStateToProps = state => ({
  selectedTargetCurrency: state.currency.target.currency,
  selectedSourceCurrency: state.currency.source.currency
});

const mapDispatchToProps = dispatch => ({
  switchSourceTargetCurrency: event => dispatch(switchSourceTargetCurrency())
});

/* not using default export because it's harder to trace bugs */
export const CurrencyBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyBarComponent);
