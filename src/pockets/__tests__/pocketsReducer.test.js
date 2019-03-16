import { pocketsReducer } from "../pocketsReducer";
import { CONVERT_MONEY_POCKETS } from "../pocketsActionTypes";

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
