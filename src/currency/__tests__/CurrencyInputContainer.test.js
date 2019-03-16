import React from "react";
import { CurrencyInputComponent } from "../containers/CurrencyInputContainer";
import { shallow } from "enzyme";
import { CURRENCY_TYPE } from "../../constants";

describe("CurrencyInputComponent", () => {
  const changeCurrency = jest.fn();
  let outer = shallow(
      <CurrencyInputComponent
        currencyAmount="100"
        availableCurrencies={["USD", "EUR"]}
        onUpdateCurrencyAmount={changeCurrency}
        currencyFieldType={CURRENCY_TYPE.SOURCE}
      />
    ),
    ComponentWithContext = outer.props().children;

  it("should not crash when render component", () => {
    shallow(<CurrencyInputComponent />);
  });

  it("should match snapshot", () => {
    const wrapper = shallow(<ComponentWithContext currencies={[]} />);

    expect(wrapper).toMatchSnapshot();
  });
});
