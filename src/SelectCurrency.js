import React, { Component } from "react";
import Select from "react-select";
import { selectAvailableCurrencies, getSelectedCurrency } from "./selectors";
import { connect } from "react-redux";
import { selectCurrency } from "./actionCreators";
class SelectCurrency extends Component {
  constructor(props) {
    super(props);
    this.changeCurrency = this.changeCurrency.bind(this);
  }

  changeCurrency(selectedCurrency) {
    this.props.changeCurrency(this.props.currencyFieldType, selectedCurrency);
  }

  render() {
    return (
      <div>
        <Select
          value={this.props.selectedCurrency}
          options={this.props.availableCurrencies}
          onChange={this.props.onChangeCurrency}
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
  onChangeCurrency: selectedCurrency => {
    dispatch(selectCurrency(selectedCurrency, ownProps.currencyFieldType));
  }
});
export const SelectCurrencyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectCurrency);
