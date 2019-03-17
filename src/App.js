import React, { Component } from "react";
import "App.scss";
import {
  CurrencyContextProvider,
  initialCurrencyContext
} from "CurrencyContext";
import { FX_API_URL } from "./constants";
import axios from "axios";
import { ExchangeMenuContainer } from "./exchange/ExchangeMenuContainer";
import {
  CurrenciesMenuDataContextProvider,
  initialCurrenciesMenu,
  CurrenciesMenuDataContextConsumer
} from "./CurrencyContext";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyContext: initialCurrencyContext
    };

    this.fetchCurrencies = () => {
      axios
        .get(`${FX_API_URL}/latest`)
        .then(res => {
          this.props.context.currenciesMenu.updateAvailable([
            ...Object.keys(res.data.rates),
            "EUR"
          ]);
          return Promise.all(
            [...Object.keys(res.data.rates), "EUR"].map(currentCurrency => {
              return axios
                .get(`${FX_API_URL}/latest?base=${currentCurrency}`)
                .then(res => {
                  return res.data;
                })
                .catch(error => {
                  console.error("Fetch currency failed");
                  console.error(error);
                });
            })
          ).then(currencies => {
            this.setState({ currencyContext: currencies });
          });
        })
        .catch(error => {
          console.error("Fetch currency failed");
          console.error(error);
        });
    };
  }

  componentDidMount() {
    this.fetchCurrencies();
    setInterval(() => {
      this.fetchCurrencies();
    }, 10000);
  }

  render() {
    return (
      <div className="App">
        <CurrencyContextProvider
          value={{ currencies: this.state.currencyContext }}
        >
          <ExchangeMenuContainer />
        </CurrencyContextProvider>
      </div>
    );
  }
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.updateAvailable = availableCurrencies => {
      this.setState(state => ({
        available: availableCurrencies
      }));
    };

    this.updateSelected = event => {
      this.setState(state => ({
        selected: event.target.value
      }));
    };

    this.state = {
      selected: initialCurrenciesMenu.selected,
      available: initialCurrenciesMenu.available,
      updateAvailable: this.updateAvailable,
      updateSelected: this.updateSelected
    };
  }
  render() {
    return (
      <CurrenciesMenuDataContextProvider value={{ currenciesMenu: this.state }}>
        <CurrenciesMenuDataContextConsumer>
          {context => <App context={context} />}
        </CurrenciesMenuDataContextConsumer>
      </CurrenciesMenuDataContextProvider>
    );
  }
}
