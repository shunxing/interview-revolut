import React, { Component } from "react";
import {
  selectAvailableCurrencies,
  getSelectedCurrency
} from "../../selectors";
import { connect } from "react-redux";
import { selectCurrency } from "../redux/currencyActionCreators";
import { CurrencyContextConsumer } from "CurrencyContext";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

class SelectCurrency extends Component {
  render() {
    return (
      <CurrencyContextConsumer>
        {({ currencies }) => (
          <Select
            value={this.props.selectedCurrency}
            renderValue={() => this.props.selectedCurrency}
            onChange={this.props.selectCurrency(currencies)}
          >
            {this.props.availableCurrencies.map(currency => (
              <MenuItem value={currency} key={currency}>
                {currency}
              </MenuItem>
            ))}
          </Select>
        )}
      </CurrencyContextConsumer>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  availableCurrencies: selectAvailableCurrencies(ownProps.currencyFieldType)(
    state
  ),
  selectedCurrency: getSelectedCurrency(ownProps.currencyFieldType)(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  selectCurrency: currencyRates => event => {
    dispatch(
      selectCurrency({
        selectedCurrency: event.target.value,
        currencyFieldType: ownProps.currencyFieldType,
        currencyRates
      })
    );
  }
});
export const SelectCurrencyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectCurrency);
