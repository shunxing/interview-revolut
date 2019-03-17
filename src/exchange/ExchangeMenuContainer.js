import React from "react";
import { connect } from "react-redux";
import { ExchangeInput } from "exchange/ExchangeInput";
import { CurrencyBarContainer } from "currency/containers/CurrencyBarContainer";
import { convertMoneyPockets } from "pockets/pocketsActionCreators";
import { CURRENCY_TYPE } from "../constants";
import { CurrencyContextConsumer } from "CurrencyContext";
import Fab from "@material-ui/core/Fab";
import ListIcon from "@material-ui/icons/List";
import AddIcon from "@material-ui/icons/Add";
import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  withStyles,
  FormControl
} from "@material-ui/core";
import { CurrenciesMenuDataContextConsumer } from "../CurrencyContext";
import { selectMenuCurrency } from "../currency/redux/currencyActionCreators";
export class ExchangeMenuComponent extends React.Component {
  constructor(props) {
    super(props);
    this.openSelectCurrenciesMenu = this.openSelectCurrenciesMenu.bind(this);
    this.closeSelectCurrenciesMenu = this.closeSelectCurrenciesMenu.bind(this);
    this.state = { currenciesSelectionOpened: false };
  }

  openSelectCurrenciesMenu() {
    this.setState(() => ({
      currenciesSelectionOpened: true
    }));
  }
  closeSelectCurrenciesMenu() {
    this.setState(() => ({
      currenciesSelectionOpened: false
    }));
  }

  render() {
    const {
      sourceAmount,
      sourceCurrency,
      targetCurrency,
      convertMoney,
      sourcePocketAmount,
      classes,
      selectMenuCurrency
    } = this.props;
    return (
      <CurrencyContextConsumer>
        {({ currencies }) => (
          <CurrenciesMenuDataContextConsumer>
            {({ currenciesMenu }) => (
              <>
                <header className="header">
                  <div>
                    <AddIcon onClick={this.openSelectCurrenciesMenu} />
                    <FormControl className={classes.formControl}>
                      <Select
                        multiple
                        open={this.state.currenciesSelectionOpened}
                        onClose={this.closeSelectCurrenciesMenu}
                        value={currenciesMenu.selected}
                        onChange={event => {
                          currenciesMenu.updateSelected(event);
                          selectMenuCurrency(event);
                        }}
                        renderValue={selected => selected.join(", ")}
                        classes={classes.selectMenu}
                      >
                        {currenciesMenu.available.map(availableCurrency => (
                          <MenuItem
                            key={availableCurrency}
                            value={availableCurrency}
                          >
                            <Checkbox
                              checked={
                                currenciesMenu.selected.indexOf(
                                  availableCurrency
                                ) > -1
                              }
                            />
                            <ListItemText primary={availableCurrency} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="title">Exchange menu</div>
                  <div>
                    <ListIcon />
                  </div>
                </header>
                <ExchangeInput currencyFieldType={CURRENCY_TYPE.SOURCE} />
                <CurrencyBarContainer />
                <ExchangeInput currencyFieldType={CURRENCY_TYPE.TARGET} />
                {typeof convertMoney === "function" && (
                  <Fab
                    variant="extended"
                    color="secondary"
                    onClick={convertMoney({
                      currencyRates: currencies,
                      sourceAmount,
                      sourceCurrency,
                      targetCurrency
                    })}
                    disabled={
                      sourceAmount === "" ||
                      parseFloat(sourceAmount) > parseFloat(sourcePocketAmount)
                    }
                  >
                    Confirm exchange
                  </Fab>
                )}
              </>
            )}
          </CurrenciesMenuDataContextConsumer>
        )}
      </CurrencyContextConsumer>
    );
  }
}

/** to be improved (exporting internal code is not that good but it's one of the way of testing and increase test coverage)
 * https://jsramblings.com/2018/01/15/3-ways-to-test-mapStateToProps-and-mapDispatchToProps.html
 */
export const mapStateToProps = (state, ownProps) => ({
  sourceAmount: state.currency[CURRENCY_TYPE.SOURCE].currencyAmount,
  sourcePocketAmount:
    state.pockets[state.currency[CURRENCY_TYPE.SOURCE].currency].amount,
  sourceCurrency: state.currency[CURRENCY_TYPE.SOURCE].currency,
  targetCurrency: state.currency[CURRENCY_TYPE.TARGET].currency
});

const mapDispatchToProps = dispatch => ({
  convertMoney: payload => event => dispatch(convertMoneyPockets(payload)),
  selectMenuCurrency: event => dispatch(selectMenuCurrency(event.target.value))
});

const styles = theme => ({
  formControl: {
    // visibility: "hidden",
    // width: "0px",
    display: "none"
  }
});

export const ExchangeMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withThemes: true })(ExchangeMenuComponent));
