import React, { Component } from "react";
import Select from "react-select";
import {
  selectAvailableCurrencies,
  getSelectedCurrency
} from "../../selectors";
import { connect } from "react-redux";
import { selectCurrency } from "../redux/currencyActionCreators";
class SelectCurrency extends Component {
  render() {
    return (
      <div>
        <Select
          value={this.props.selectedCurrency}
          options={this.props.availableCurrencies}
          onChange={this.props.selectCurrency}
        />
      </div>
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
  selectCurrency: selectedCurrency => {
    dispatch(selectCurrency(selectedCurrency, ownProps.currencyFieldType));
  }
});
export const SelectCurrencyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectCurrency);
