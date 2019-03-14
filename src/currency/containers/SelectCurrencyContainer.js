import React, { Component } from "react";
import Select from "react-select";
import {
  selectAvailableCurrencies,
  getSelectedCurrency
} from "../../selectors";
import { connect } from "react-redux";
import { selectCurrency } from "../redux/currencyActionCreators";
import { CurrencyContextConsumer } from "CurrencyContext";
class SelectCurrency extends Component {
  render() {
    return (
      <CurrencyContextConsumer>
        {({ currencies }) => (
          <Select
            value={this.props.selectedCurrency}
            options={this.props.availableCurrencies}
            onChange={this.props.selectCurrency(currencies)}
          />
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
  selectCurrency: currencyRates => selectedCurrency => {
    dispatch(
      selectCurrency({
        selectedCurrency,
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
