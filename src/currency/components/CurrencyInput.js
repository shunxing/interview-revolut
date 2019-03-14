import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCurrencyAmount } from "../redux/actionCreators";
import TextField from "@material-ui/core/TextField";
import { CurrencyContextConsumer } from "../../CurrencyContext";

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
    console.log(
      event,
      typeof event.target.value,
      event.target.value,
      event.target.value.match(/^\d+(,\d{3})*(\.\d{1,2})?$/)
    );
    const match =
      event.target.value.match(/^\d+(,\d{3})*(\.\d{1,2})?$/) ||
      event.target.value.match(/^\d+(,)*(\.)?$/);
    if (
      event.target.value.match(/^\d+(,\d{3})*(\.\d{1,2})?$/) ||
      event.target.value.match(/^\d+(,)*(\.)?$/)
    ) {
      dispatch(
        updateCurrencyAmount(
          match[0],
          ownProps.currencyFieldType,
          currenciesRates
        )
      );
    } else if (event.target.value === "") {
      dispatch(
        updateCurrencyAmount(
          event.target.value,
          ownProps.currencyFieldType,
          currenciesRates
        )
      );
    }
  }
});

export const CurrencyInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyInput);
