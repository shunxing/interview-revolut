import React from "react";
import { SelectCurrencyComponent } from "../containers/SelectCurrencyContainer";
import { shallow } from "enzyme";
import { Select, MenuItem } from "@material-ui/core";

describe("SelectCurrencyContainer", () => {
  let outer = shallow(
      <SelectCurrencyComponent
        selectedCurrency="EUR"
        selectCurrency={jest.fn()}
      />
    ),
    ComponentWithContext = outer.props().children;

  let outerBis = shallow(<ComponentWithContext />);
  let ComponentWithMenuContext = outerBis.props().children;

  it("should not crash when render component", () => {
    shallow(<SelectCurrencyComponent />);
  });
  it("should not crash when render component", () => {
    shallow(<ComponentWithContext />);
  });
  it("should not crash when render component", () => {
    shallow(<ComponentWithMenuContext />);
  });
  it("should render correctly", () => {
    const wrapper = shallow(
      <ComponentWithMenuContext
        currenciesMenu={{ selected: ["EUR", "USD", "GBP"] }}
      />
    );
    expect(wrapper.find(Select).exists()).toEqual(true);
    expect(wrapper.find(MenuItem).length).toEqual(3);
  });
  it("should match snapshot", () => {
    expect(shallow(<SelectCurrencyComponent />)).toMatchSnapshot();
  });
});
