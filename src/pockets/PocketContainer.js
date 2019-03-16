import React, { Component } from "react";
import { connect } from "react-redux";
import { CURRENCY_SYMBOL } from "../constants";
export class PocketComponent extends Component {
  render() {
    const { currentPocket = {}, currency = "" } = this.props;
    return (
      <div className="balance">
        Balance: {currentPocket.amount} {CURRENCY_SYMBOL[currency] || currency}
      </div>
    );
  }
}

export const mapStateToProps = (state, ownProps) => ({
  currentPocket:
    state.pockets[state.currency[ownProps.currencyFieldType].currency],
  currency: state.currency[ownProps.currencyFieldType].currency
});

export const PocketContainer = connect(mapStateToProps)(PocketComponent);
