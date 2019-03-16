import React from "react";
import App from "./App";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import { storeRedux } from "./store";

describe("App", () => {
  it("renders without crashing", () => {
    shallow(
      <Provider store={storeRedux}>
        <App />
      </Provider>
    );
  });
});
