import React from "react";
import {
  ExchangeMenuComponent,
  mapStateToProps
} from "../ExchangeMenuContainer";
import { shallow } from "enzyme";
import { ExchangeInput } from "exchange/ExchangeInput";
import { CurrencyBarContainer } from "currency/containers/CurrencyBarContainer";
import Fab from "@material-ui/core/Fab";
import { CURRENCY_TYPE } from "../../constants";

describe("ExchangeMenuComponent", () => {
  it("should not crash when render component", () => {
    shallow(<ExchangeMenuComponent />);
  });

  it("should correctly render children", () => {
    const outer = shallow(<ExchangeMenuComponent />),
      ComponentWithContext = outer.props().children;
    const wrapper = shallow(<ComponentWithContext />);

    expect(wrapper.find(ExchangeInput)).toHaveLength(2);
    expect(wrapper.find(CurrencyBarContainer)).toHaveLength(1);
    expect(wrapper.find(Fab)).toHaveLength(0);
  });
  it("should correctly render children with conversion button", () => {
    const converMoney = jest.fn();
    const outer = shallow(<ExchangeMenuComponent convertMoney={converMoney} />),
      ComponentWithContext = outer.props().children;
    const wrapper = shallow(<ComponentWithContext />);

    expect(wrapper.find(ExchangeInput)).toHaveLength(2);
    expect(wrapper.find(CurrencyBarContainer)).toHaveLength(1);
    expect(wrapper.find(Fab)).toHaveLength(1);
  });
});

describe("mapStateToProps", () => {
  it("should return the correct object from state", () => {
    expect(
      mapStateToProps({
        currency: {
          [CURRENCY_TYPE.SOURCE]: { currency: "EUR", currencyAmount: 100 },
          [CURRENCY_TYPE.TARGET]: { currency: "USD" }
        },
        pockets: { EUR: { amount: 100 } }
      })
    ).toEqual({
      sourceAmount: 100,
      sourceCurrency: "EUR",
      sourcePocketAmount: 100,
      targetCurrency: "USD"
    });
  });
});
