import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import logger from "redux-logger";

const app = (state = { selectedTargetCurrency: "USD" }, action) => {
  return state;
};

const reducers = combineReducers({ app });

export const storeRedux = createStore(reducers, applyMiddleware(logger));
