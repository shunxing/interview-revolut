/**
 *  HACK TO SET CONTEXT
 * https://gist.github.com/danmakenoise/c503854508f80137fe547943218ccc05
 * https://twitter.com/wesbos/status/976164542140043264
 */
import React from "react";
import { CurrencyBarComponent } from "../containers/CurrencyBarContainer";
import { shallow } from "enzyme";

describe("CurrencyBarComponent", () => {
  let outer = shallow(
      <CurrencyBarComponent
        selectedSourceCurrency="EUR"
        selectedTargetCurrency="USD"
      />
    ),
    ComponentWithContext = outer.props().children;

  it("should not crash when render component", () => {
    shallow(<CurrencyBarComponent />);
  });

  it("should not render currency bar when no currencies found", () => {
    const wrapper = shallow(<ComponentWithContext currencies={[]} />);

    expect(wrapper.find(".currency__bar").exists()).toEqual(false);
    // const wrapper = shallow(ComponentWithContext);
  });

  it("should not render currency bar when no currencies rates in currency found", () => {
    const wrapper = shallow(
      <ComponentWithContext currencies={[{ base: "EUR" }]} />
    );

    expect(wrapper.find(".currency__bar").exists()).toEqual(false);
  });

  it("should render currency bar currency rates found", () => {
    const wrapper = shallow(
      <ComponentWithContext
        currencies={[{ base: "EUR", rates: { USD: "0" } }]}
      />
    );

    expect(wrapper.find(".currency__bar").exists()).toEqual(true);
  });

  it("should display the correct currency rate", () => {
    const wrapper = shallow(
      <ComponentWithContext
        currencies={[{ base: "EUR", rates: { USD: "123" } }]}
      />
    );

    expect(wrapper.find(".currency__bar__text").text()).toEqual("1€ = 123 $");
  });

  it("should display the source currency name when missing symbols", () => {
    outer = shallow(
      <CurrencyBarComponent
        selectedSourceCurrency="CNY"
        selectedTargetCurrency="USD"
      />
    );
    ComponentWithContext = outer.props().children;

    const wrapper = shallow(
      <ComponentWithContext
        currencies={[{ base: "CNY", rates: { USD: "123" } }]}
      />
    );

    expect(wrapper.find(".currency__bar__text").text()).toEqual("1CNY = 123 $");
  });

  it("should display the target currency name when missing symbols", () => {
    outer = shallow(
      <CurrencyBarComponent
        selectedSourceCurrency="EUR"
        selectedTargetCurrency="CNY"
      />
    );
    ComponentWithContext = outer.props().children;
    const wrapper = shallow(
      <ComponentWithContext
        currencies={[{ base: "EUR", rates: { CNY: "123" } }]}
      />
    );

    expect(wrapper.find(".currency__bar__text").text()).toEqual("1€ = 123 CNY");
  });

  it("should display the source and target currency name when missing symbols", () => {
    outer = shallow(
      <CurrencyBarComponent
        selectedSourceCurrency="SGD"
        selectedTargetCurrency="CNY"
      />
    );

    ComponentWithContext = outer.props().children;
    const wrapper = shallow(
      <ComponentWithContext
        currencies={[{ base: "SGD", rates: { CNY: "123" } }]}
      />
    );

    expect(wrapper.find(".currency__bar__text").text()).toEqual(
      "1SGD = 123 CNY"
    );
  });

  it("should match snapshot", () => {
    const wrapper = shallow(
      <ComponentWithContext
        currencies={[{ base: "EUR", rates: { USD: "123" } }]}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});

/**
 * no testing for connect part because it's not part of unit tests
 * https://hackernoon.com/unit-testing-redux-connected-components-692fa3c4441c
 */
