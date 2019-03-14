import React, { Component } from "react";
import { connect } from "react-redux";
class Pocket extends Component {
  render() {
    return <div> {this.props.currentPocket.amount} </div>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentPocket: state.pockets[state.currency[ownProps.currencyFieldType].value]
});

export const PocketContainer = connect(mapStateToProps)(Pocket);
