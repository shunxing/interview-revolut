import React from "react";
import { ExchangeInput } from "../ExchangeInput";
import { shallow } from "enzyme";
import { SelectCurrencyContainer } from "currency/containers/SelectCurrencyContainer";
import { CurrencyInputContainer } from "currency/containers/CurrencyInputContainer";
import { PocketContainer } from "pockets/PocketContainer";
describe("ExchangeInput", () => {
  it("should not crash when render component", () => {
    shallow(<ExchangeInput />);
  });

  it("should correctly render children", () => {
    const wrapper = shallow(<ExchangeInput />);
    expect(wrapper.find(".currency__select").exists()).toEqual(true);
    expect(wrapper.find(".currency__input-amount").exists()).toEqual(true);
    expect(wrapper.find(SelectCurrencyContainer)).toHaveLength(1);
    expect(wrapper.find(PocketContainer)).toHaveLength(1);
    expect(wrapper.find(CurrencyInputContainer)).toHaveLength(1);
  });
});
