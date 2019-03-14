import React, { Component } from "react";
import "App.scss";
import {
  CurrencyContextProvider,
  initialCurrencyContext
} from "CurrencyContext";
import { FX_API_URL, POCKETS_CURRENCY } from "./constants";
import axios from "axios";
import { ExchangeMenuContainer } from "./exchange/ExchangeMenuContainer";

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
      this.setState({ currencyContext: currencies });
    });
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
export default App;
