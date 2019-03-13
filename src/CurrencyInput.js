import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCurrencyAmount } from "./actionCreators";
import TextField from "@material-ui/core/TextField";
import { CurrencyContextConsumer } from "./CurrencyContext";

class CurrencyInput extends Component {
  render() {
    return (
      <CurrencyContextConsumer>
        {({ currencies }) => (
          <TextField
            value={this.props.currencyAmount}
            options={this.props.availableCurrencies}
            onChange={this.props.onUpdateCurrencyAmount(currencies)}
            placeholder="0"
            type="number"
          />
        )}
      </CurrencyContextConsumer>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currencyAmount: state.currency[ownProps.currencyFieldType].currencyAmount
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onUpdateCurrencyAmount: currenciesRates => event => {
    dispatch(
      updateCurrencyAmount(
        event.target.value,
        ownProps.currencyFieldType,
        currenciesRates
      )
    );
  }
});

export const CurrencyInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyInput);
