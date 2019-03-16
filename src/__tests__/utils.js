import {
  twoDigitsLimitDecimals,
  calculateContextCurrencyAmount
} from "../utils";

describe("twoDigitsLimitDecimals", () => {
  it("should convert string integer to string float fixed with two digits of decimal", () => {
    expect(twoDigitsLimitDecimals("1")).toEqual("1.00");
  });

  it("should convert integer to string float fixed with two digits of decimal", () => {
    expect(twoDigitsLimitDecimals(1)).toEqual("1.00");
  });

  it("should trucate long float and round to lower hundredth when thousandth less than or equal to 5", () => {
    expect(twoDigitsLimitDecimals("1.115")).toEqual("1.11");
  });

  it("should trucate long float and round to higher hundredth when thousandth greater than 5", () => {
    expect(twoDigitsLimitDecimals("1.116")).toEqual("1.12");
  });

  it("should trucate long float and round to higher hundredth for further than thousandth", () => {
    expect(twoDigitsLimitDecimals("1.1156")).toEqual("1.12");
  });

  it("should return undefined when not a number in parameter", () => {
    expect(twoDigitsLimitDecimals("test")).toEqual(undefined);
  });
});

describe("calculateContextCurrencyAmount", () => {
  let currencyAmount, sourceCurrency, targetCurrency;
  beforeEach(() => {
    currencyAmount = 100;
    sourceCurrency = "EUR";
    targetCurrency = "USD";
  });

  it("should return 0 when no currencies rates found", () => {
    expect(
      calculateContextCurrencyAmount(
        currencyAmount,
        sourceCurrency,
        targetCurrency,
        []
      )
    ).toEqual(0);
  });

  it("should return 0 when no rates property in source currency", () => {
    expect(
      calculateContextCurrencyAmount(
        currencyAmount,
        sourceCurrency,
        targetCurrency,
        [{ base: "EUR" }]
      )
    ).toEqual(0);
  });

  it("should return target amount found given the source amount and the currencies of the source and target", () => {
    expect(
      calculateContextCurrencyAmount(
        currencyAmount,
        sourceCurrency,
        targetCurrency,
        [{ base: "EUR", rates: { USD: 1.5 } }]
      )
    ).toEqual("150.00");
  });

  it("should truncate and round down target amount found given the source amount and the currencies of the source and target", () => {
    expect(
      calculateContextCurrencyAmount(
        currencyAmount,
        sourceCurrency,
        targetCurrency,
        [{ base: "EUR", rates: { USD: 1.55554 } }]
      )
    ).toEqual("155.55");
  });

  it("should truncate and round up target amount found given the source amount and the currencies of the source and target", () => {
    expect(
      calculateContextCurrencyAmount(
        currencyAmount,
        sourceCurrency,
        targetCurrency,
        [{ base: "EUR", rates: { USD: 1.55555 } }]
      )
    ).toEqual("155.56");
  });
});
