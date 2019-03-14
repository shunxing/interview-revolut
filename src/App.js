import React, { Component } from "react";
import "App.scss";
import {
  CurrencyContextProvider,
  initialCurrencyContext
} from "CurrencyContext";
import { FX_API_URL, POCKETS_CURRENCY, CURRENCY_TYPE } from "./constants";
import axios from "axios";
import { CurrencyBarContainer } from "currency/components/CurrencyBarContainer";
import { SelectCurrencyContainer } from "currency/components/SelectCurrency";
import { CurrencyInputContainer } from "currency/components/CurrencyInput";
import { connect } from "react-redux";
import { updateCurrencyRates } from "currency/redux/actionCreators";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currencyContext: initialCurrencyContext };
  }

  componentDidMount() {
    Promise.all(
      POCKETS_CURRENCY.map(currentCurrency => {
        // setInterval(() => {
        // TODO REMOVE COMMENT
        return axios
          .get(
            `${FX_API_URL}/latest?symbols=${POCKETS_CURRENCY.filter(
              filteredCurrency => filteredCurrency !== currentCurrency
            ).join(",")}&base=${currentCurrency}`
          )
          .then(res => {
            return res.data;
          })
          .catch(error => {
            console.error("Fetch currency failed");
            console.error(error);
          });
        // }, 10000);
      })
    ).then(currencies => {
      this.props.updateCurrenciesRates(currencies);
      this.setState({ currencyContext: currencies });
    });
  }

  render() {
    return (
      <div className="App">
        <CurrencyContextProvider
          value={{ currencies: this.state.currencyContext }}
        >
          <div className="currency">
            <div className="currency-row__item">
              <div className="currency__select">
                <SelectCurrencyContainer
                  currencyFieldType={CURRENCY_TYPE.SOURCE}
                />
              </div>
            </div>
            <div className="currency-row__item">
              <div className="currency__input-amount">
                <CurrencyInputContainer
                  currencyFieldType={CURRENCY_TYPE.SOURCE}
                />
              </div>
            </div>
          </div>
          <CurrencyBarContainer />

          <div className="currency">
            <div className="currency-row__item">
              <div className="currency__select">
                <SelectCurrencyContainer
                  currencyFieldType={CURRENCY_TYPE.TARGET}
                />
              </div>
            </div>
            <div className="currency-row__item">
              <div className="currency__input-amount">
                <CurrencyInputContainer
                  currencyFieldType={CURRENCY_TYPE.TARGET}
                />
              </div>
            </div>
          </div>
        </CurrencyContextProvider>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCurrenciesRates: rates => dispatch(updateCurrencyRates(rates))
});

export default connect(
  undefined,
  mapDispatchToProps
)(App);
