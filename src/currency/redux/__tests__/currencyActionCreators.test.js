import {
  selectCurrency,
  updateCurrencyAmount,
  switchSourceTargetCurrency
} from "../currencyActionCreators";
import {
  SELECT_CURRENCY,
  UPDATE_CURRENCY_AMOUNT,
  SWITCH_SOURCE_TARGET_CURRENCY
} from "../currencyActionTypes";

describe("selectCurrency", () => {
  it("should return selectCurrency action", () => {
    expect(
      selectCurrency({
        selectedCurrency: "selectCurrencyTest",
        currencyFieldType: "currencyFieldTypeTest",
        currencyRates: "currencyRates"
      })
    ).toEqual({
      type: SELECT_CURRENCY,
      selectedCurrency: "selectCurrencyTest",
      currencyFieldType: "currencyFieldTypeTest",
      currencyRates: "currencyRates"
    });
  });
});

describe("updateCurrencyAmount", () => {
  it("should return updateCurrencyAmount action", () => {
    expect(
      updateCurrencyAmount({
        currencyAmount: "currencyAmountTest",
        currencyFieldType: "currencyFieldTypeTest",
        currencyRates: "currencyRates"
      })
    ).toEqual({
      type: UPDATE_CURRENCY_AMOUNT,
      currencyAmount: "currencyAmountTest",
      currencyFieldType: "currencyFieldTypeTest",
      currencyRates: "currencyRates"
    });
  });
});

describe("switchSourceTargetCurrency", () => {
  it("should return switchSourceTargetCurrency action type", () => {
    expect(switchSourceTargetCurrency()).toEqual({
      type: SWITCH_SOURCE_TARGET_CURRENCY
    });
  });
});
