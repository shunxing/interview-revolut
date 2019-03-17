import React, { Component } from "react";
import { getSelectedCurrency } from "../../selectors";
import { connect } from "react-redux";
import { selectCurrency } from "../redux/currencyActionCreators";
import { CurrencyContextConsumer } from "CurrencyContext";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { CurrenciesMenuDataContextConsumer } from "../../CurrencyContext";

export class SelectCurrencyComponent extends Component {
  render() {
    const { selectedCurrency = "", selectCurrency } = this.props;
    return (
      <CurrencyContextConsumer>
        {({ currencies }) => (
          <CurrenciesMenuDataContextConsumer>
            {({ currenciesMenu }) => {
              return (
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
                  {currenciesMenu &&
                    currenciesMenu.selected &&
                    currenciesMenu.selected.map(currency => (
                      <MenuItem value={currency} key={currency}>
                        {currency}
                      </MenuItem>
                    ))}
                </Select>
              );
            }}
          </CurrenciesMenuDataContextConsumer>
        )}
      </CurrencyContextConsumer>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
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
