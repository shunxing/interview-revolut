import React, { Component } from "react";
import { connect } from "react-redux";
import { CURRENCY_SYMBOL } from "../constants";
class Pocket extends Component {
  render() {
    return (
      <div>
        Balance: {this.props.currentPocket.amount}{" "}
        {CURRENCY_SYMBOL[this.props.currency] || this.props.currency}{" "}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentPocket:
    state.pockets[state.currency[ownProps.currencyFieldType].currency],
  currency: state.currency[ownProps.currencyFieldType].currency
});

export const PocketContainer = connect(mapStateToProps)(Pocket);
