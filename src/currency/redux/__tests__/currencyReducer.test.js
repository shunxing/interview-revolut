import { currencyReducer } from "../currencyReducer";
import { CURRENCY_TYPE } from "../../../constants";
import {
  SELECT_CURRENCY,
  UPDATE_CURRENCY_AMOUNT,
  SWITCH_SOURCE_TARGET_CURRENCY
} from "../currencyActionTypes";

describe("currencyReducer : should handle SELECT_CURRENCY", () => {
  it("should switch source and target currency field", () => {
    expect(
      currencyReducer(
        {
          [CURRENCY_TYPE.SOURCE]: { currency: "EUR", currencyAmount: "100" },
          [CURRENCY_TYPE.TARGET]: { currency: "USD", currencyAmount: "200" },
          otherPartState: "test"
        },
        {
          type: SELECT_CURRENCY,
          currencyFieldType: CURRENCY_TYPE.TARGET,
          selectedCurrency: "EUR"
        }
      )
    ).toEqual({
      [CURRENCY_TYPE.TARGET]: { currency: "EUR", currencyAmount: "100" },
      [CURRENCY_TYPE.SOURCE]: { currency: "USD", currencyAmount: "200" },
      otherPartState: "test"
    });
  });

  expect(
    currencyReducer(
      {
        [CURRENCY_TYPE.SOURCE]: { currency: "EUR", currencyAmount: "100" },
        [CURRENCY_TYPE.TARGET]: { currency: "USD", currencyAmount: "200" },
        otherPartState: "test"
      },
      {
        type: SELECT_CURRENCY,
        currencyFieldType: CURRENCY_TYPE.SOURCE,
        selectedCurrency: "USD"
      }
    )
  ).toEqual({
    [CURRENCY_TYPE.TARGET]: { currency: "EUR", currencyAmount: "100" },
    [CURRENCY_TYPE.SOURCE]: { currency: "USD", currencyAmount: "200" },
    otherPartState: "test"
  });

  it("should update target currency amount when selecting new source currency", () => {
    expect(
      currencyReducer(
        {
          [CURRENCY_TYPE.SOURCE]: { currency: "EUR", currencyAmount: "100" },
          [CURRENCY_TYPE.TARGET]: { currency: "USD", currencyAmount: "200" },
          otherPartState: "test"
        },
        {
          type: SELECT_CURRENCY,
          currencyFieldType: CURRENCY_TYPE.SOURCE,
          selectedCurrency: "GBP",
          currencyRates: [{ base: "GBP", rates: { USD: "1.5" } }]
        }
      )
    ).toEqual({
      otherPartState: "test",
      [CURRENCY_TYPE.SOURCE]: { currency: "GBP", currencyAmount: "100" },
      [CURRENCY_TYPE.TARGET]: { currency: "USD", currencyAmount: "150.00" }
    });
  });

  it("should update source currency amount when selecting new target currency", () => {
    expect(
      currencyReducer(
        {
          [CURRENCY_TYPE.SOURCE]: { currency: "EUR", currencyAmount: "100" },
          [CURRENCY_TYPE.TARGET]: { currency: "USD", currencyAmount: "200" },
          otherPartState: "test"
        },
        {
          type: SELECT_CURRENCY,
          currencyFieldType: CURRENCY_TYPE.TARGET,
          selectedCurrency: "GBP",
          currencyRates: [{ base: "GBP", rates: { EUR: "1.5" } }]
        }
      )
    ).toEqual({
      otherPartState: "test",
      [CURRENCY_TYPE.SOURCE]: { currency: "EUR", currencyAmount: "300.00" },
      [CURRENCY_TYPE.TARGET]: { currency: "GBP", currencyAmount: "200" }
    });
  });
});

describe("currencyReducer : should handle UPDATE_CURRENCY_AMOUNT", () => {
  it("should update source currency amount and calculate target currency amount given  currency rates ", () => {
    expect(
      currencyReducer(
        {
          [CURRENCY_TYPE.SOURCE]: { currency: "EUR", currencyAmount: "100" },
          [CURRENCY_TYPE.TARGET]: { currency: "USD", currencyAmount: "200" },
          otherPartState: "test"
        },
        {
          type: UPDATE_CURRENCY_AMOUNT,
          currencyFieldType: CURRENCY_TYPE.SOURCE,
          currencyAmount: "1",
          currencyRates: [{ base: "EUR", rates: { USD: "1.5" } }]
        }
      )
    ).toEqual({
      otherPartState: "test",
      [CURRENCY_TYPE.SOURCE]: { currency: "EUR", currencyAmount: "1" },
      [CURRENCY_TYPE.TARGET]: { currency: "USD", currencyAmount: "1.50" }
    });
  });

  it("should update target currency amount and calculate source currency amount given currency rates ", () => {
    expect(
      currencyReducer(
        {
          [CURRENCY_TYPE.SOURCE]: { currency: "EUR", currencyAmount: "100" },
          [CURRENCY_TYPE.TARGET]: { currency: "USD", currencyAmount: "200" },
          otherPartState: "test"
        },
        {
          type: UPDATE_CURRENCY_AMOUNT,
          currencyFieldType: CURRENCY_TYPE.TARGET,
          currencyAmount: "1",
          currencyRates: [{ base: "USD", rates: { EUR: "1.5" } }]
        }
      )
    ).toEqual({
      otherPartState: "test",
      [CURRENCY_TYPE.SOURCE]: { currency: "EUR", currencyAmount: "1.50" },
      [CURRENCY_TYPE.TARGET]: { currency: "USD", currencyAmount: "1" }
    });
  });
});

describe("currencyReducer: should handle SWITCH_SOURCE_TARGET_CURRENCY", () => {
  it("should invert target and source currency value in state", () => {
    expect(
      currencyReducer(
        {
          [CURRENCY_TYPE.SOURCE]: { sourceTestKey: "sourceTestValue" },
          [CURRENCY_TYPE.TARGET]: { targetTestKey: "targetTestValue" },
          otherPartState: "otherPartState"
        },
        { type: SWITCH_SOURCE_TARGET_CURRENCY }
      )
    ).toEqual({
      [CURRENCY_TYPE.SOURCE]: { targetTestKey: "targetTestValue" },
      [CURRENCY_TYPE.TARGET]: { sourceTestKey: "sourceTestValue" },
      otherPartState: "otherPartState"
    });
  });

  it("should create empty object for target and source currency when missing keys in state", () => {
    expect(
      currencyReducer({}, { type: SWITCH_SOURCE_TARGET_CURRENCY })
    ).toEqual({
      [CURRENCY_TYPE.SOURCE]: {},
      [CURRENCY_TYPE.TARGET]: {}
    });
  });
});

describe("currencyReducer : should handle default switch case", () => {
  it("should return current state when no action type is given", () => {
    expect(currencyReducer({ state: "test" }, {})).toEqual({ state: "test" });
  });
  it("should return current state when no action type is corresponding", () => {
    expect(
      currencyReducer({ state: "test" }, { type: "testactionType" })
    ).toEqual({
      state: "test"
    });
  });
});
