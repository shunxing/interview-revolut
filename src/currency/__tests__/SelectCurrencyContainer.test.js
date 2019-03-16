import React from "react";
import { SelectCurrencyComponent } from "../containers/SelectCurrencyContainer";
import { shallow } from "enzyme";
import { CURRENCY_TYPE } from "../../constants";

describe("SelectCurrencyContainer", () => {
  it("should not crash when render component", () => {
    shallow(<SelectCurrencyComponent />);
  });
  it("should match snapshot", () => {
    expect(shallow(<SelectCurrencyComponent />)).toMatchSnapshot();
  });
});
