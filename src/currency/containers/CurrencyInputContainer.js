import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCurrencyAmount } from "../redux/currencyActionCreators";
import TextField from "@material-ui/core/TextField";
import { CurrencyContextConsumer } from "../../CurrencyContext";
import { CURRENCY_TYPE } from "../../constants";
import { InputAdornment } from "@material-ui/core";

export class CurrencyInputComponent extends Component {
  render() {
    return (
      <CurrencyContextConsumer>
        {({ currencies }) => (
          <TextField
            value={this.props.currencyAmount}
            options={this.props.availableCurrencies}
            onChange={this.props.onUpdateCurrencyAmount(currencies)}
            placeholder="0"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {(this.props.currencyFieldType === CURRENCY_TYPE.SOURCE &&
                    "-") ||
                    (this.props.currencyFieldType === CURRENCY_TYPE.TARGET &&
                      "+")}
                </InputAdornment>
              )
            }}
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
  onUpdateCurrencyAmount: currencyRates => event => {
    const currencyAmount = event.target.value;
    const match =
      currencyAmount.match(/^\d+(,\d{3})*(\.\d{1,2})?$/) ||
      currencyAmount.match(/^\d+(,)*(\.)?$/);
    if (match) {
      dispatch(
        updateCurrencyAmount({
          currencyAmount: match[0],
          currencyFieldType: ownProps.currencyFieldType,
          currencyRates: currencyRates
        })
      );
    } else if (currencyAmount === "") {
      dispatch(
        updateCurrencyAmount({
          currencyAmount: currencyAmount,
          currencyFieldType: ownProps.currencyFieldType,
          currencyRates: currencyRates
        })
      );
    }
  }
});

export const CurrencyInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyInputComponent);
