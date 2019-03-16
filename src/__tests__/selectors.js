import {
  getSelectedCurrencies,
  selectAvailableCurrencies,
  getSelectedCurrency
} from "../selectors";
import { CURRENCY_TYPE } from "../constants";

describe("getSelectedCurrencies", () => {
  it("should return currency in state", () => {
    expect(
      getSelectedCurrencies({
        currency: { testCurrencyKey: "testCurrencyValue" }
      })
    ).toEqual({
      testCurrencyKey: "testCurrencyValue"
    });
  });
});

describe("selectAvailableCurrencies", () => {
  it("should return all currencies when missing parameters", () => {
    expect(
      selectAvailableCurrencies()({
        currency: { [CURRENCY_TYPE.SOURCE]: { currency: "EUR" } }
      })
    ).toEqual(["EUR", "USD", "GBP"]);
  });

  it("should return all currencies excepted the selected currency", () => {
    expect(
      selectAvailableCurrencies(CURRENCY_TYPE.SOURCE)({
        currency: { [CURRENCY_TYPE.SOURCE]: { currency: "EUR" } }
      })
    ).toEqual(["USD", "GBP"]);
  });
});

describe("getSelectedCurrency", () => {
  it("should return undefined when missing parameter", () => {
    expect(
      getSelectedCurrency()({
        currency: { [CURRENCY_TYPE.SOURCE]: { currency: "EUR" } }
      })
    ).toEqual(undefined);
  });

  it("should return currency when missing field type in state ", () => {
    expect(
      getSelectedCurrency(CURRENCY_TYPE.SOURCE)({
        currency: {
          [CURRENCY_TYPE.TARGET]: { currency: "USD" }
        }
      })
    ).toEqual(undefined);
  });

  it("should return currency when source field type ", () => {
    expect(
      getSelectedCurrency(CURRENCY_TYPE.SOURCE)({
        currency: {
          [CURRENCY_TYPE.SOURCE]: { currency: "EUR" },
          [CURRENCY_TYPE.TARGET]: { currency: "USD" }
        }
      })
    ).toEqual("EUR");
  });

  it("should return currency when target  field type ", () => {
    expect(
      getSelectedCurrency(CURRENCY_TYPE.TARGET)({
        currency: {
          [CURRENCY_TYPE.SOURCE]: { currency: "EUR" },
          [CURRENCY_TYPE.TARGET]: { currency: "USD" }
        }
      })
    ).toEqual("USD");
  });
});
