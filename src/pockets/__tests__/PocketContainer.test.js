import React from "react";
import { PocketComponent, mapStateToProps } from "../PocketContainer";
import { shallow } from "enzyme";
import { CURRENCY_TYPE } from "../../constants";

describe("CurrencyBarComponent", () => {
  it("should not crash when render component", () => {
    const wrapper = shallow(<PocketComponent />);
    expect(wrapper.find(".balance").exists()).toEqual(true);
  });
  it("should correctly display the component given props", () => {
    const wrapper = shallow(
      <PocketComponent currentPocket={{ amount: 100 }} currency="EUR" />
    );

    expect(wrapper.find(".balance").exists()).toEqual(true);
    expect(wrapper.find(".balance").text()).toEqual("Balance: 100 €");
  });
});

/**
 * no testing for connect part because it's not part of unit tests
 * https://hackernoon.com/unit-testing-redux-connected-components-692fa3c4441c
 */

describe("mapStateToProps", () => {
  it("should return the correct object from state", () => {
    expect(
      mapStateToProps(
        {
          pockets: { EUR: { amount: 100 } },
          currency: { [CURRENCY_TYPE.SOURCE]: { currency: "EUR" } }
        },
        { currencyFieldType: CURRENCY_TYPE.SOURCE }
      )
    ).toEqual({ currency: "EUR", currentPocket: { amount: 100 } });
  });
});
