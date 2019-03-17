import { pocketsReducer } from "../pocketsReducer";
import { CONVERT_MONEY_POCKETS } from "../pocketsActionTypes";
import { SELECT_MENU_CURRENCY } from "../../currency/redux/currencyActionTypes";

describe("pocketsReducer: should handle default case", () => {
  it("should return current state when no action type given", () => {
    expect(pocketsReducer({ state: "test" }, {})).toEqual({ state: "test" });
  });

  it("should return current state when no action type found", () => {
    expect(
      pocketsReducer({ state: "test" }, { type: "actionTypeTest" })
    ).toEqual({ state: "test" });
  });
});

describe("pocketsReducer: should handle CONVERT_MONEY_POCKETS", () => {
  it("should transfer money from source pocket to target pocket", () => {
    expect(
      pocketsReducer(
        {
          EUR: { amount: 500, otherPocketState: "otherPocketStateEUR" },
          USD: { amount: 500, otherPocketState: "otherPocketStateUSD" },
          otherPocketState: "otherPocketState"
        },
        {
          type: CONVERT_MONEY_POCKETS,
          payload: {
            currencyRates: [{ base: "EUR", rates: { USD: "1.5" } }],
            sourceCurrency: "EUR",
            targetCurrency: "USD",
            sourceAmount: "1"
          }
        }
      )
    ).toEqual({
      otherPocketState: "otherPocketState",

      EUR: { amount: "499.00", otherPocketState: "otherPocketStateEUR" },
      USD: { amount: "501.50", otherPocketState: "otherPocketStateUSD" }
    });
  });
});

describe("pocketsReducer: should handle SELECT_MENU_CURRENCY", () => {
  it("should add missing pocket amount to 0 with its corresponding currency", () => {
    expect(
      pocketsReducer(
        {},
        { type: SELECT_MENU_CURRENCY, selectedCurrencies: ["EUR"] }
      )
    ).toEqual({ EUR: { amount: 0 } });
  });
  it("should keep state if currency already exists", () => {
    expect(
      pocketsReducer(
        { EUR: { amount: "500" } },
        { type: SELECT_MENU_CURRENCY, selectedCurrencies: ["EUR"] }
      )
    ).toEqual({ EUR: { amount: "500" } });
  });

  it("should keep state if currency already exists and add missing currencies", () => {
    expect(
      pocketsReducer(
        { EUR: { amount: "500" } },
        {
          type: SELECT_MENU_CURRENCY,
          selectedCurrencies: ["EUR", "USD", "GBP"]
        }
      )
    ).toEqual({
      EUR: { amount: "500" },
      USD: { amount: 0 },
      GBP: { amount: 0 }
    });
  });
});
