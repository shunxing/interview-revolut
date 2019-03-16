import { convertMoneyPockets } from "../pocketsActionCreators";
import { CONVERT_MONEY_POCKETS } from "../pocketsActionTypes";

describe("pocketsActionCreators", () => {
  it("should return action with payload for convertMoneyPockets", () => {
    expect(convertMoneyPockets({ testPayload: "testPayload" })).toEqual({
      payload: { testPayload: "testPayload" },
      type: CONVERT_MONEY_POCKETS
    });
  });
});
