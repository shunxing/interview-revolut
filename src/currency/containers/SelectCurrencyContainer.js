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

export class SelectCurrencyComponent extends Component {
  render() {
    const {
      selectedCurrency = "",
      availableCurrencies = [],
      selectCurrency
    } = this.props;
    return (
      <CurrencyContextConsumer>
        {({ currencies }) => (
          <Select
            value={selectedCurrency}
            renderValue={() => selectedCurrency}
            onChange={selectCurrency(currencies)}
            MenuProps={{
              getContentAnchorEl: null,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left"
              }
            }}
          >
            {availableCurrencies.map(currency => (
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
)(SelectCurrencyComponent);
