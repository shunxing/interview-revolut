import { createStore } from "redux";
import { combineReducers } from "redux";

const appReducer = (state = {}, action) => {
  return state;
};

const reducers = combineReducers({ appReducer });

export const storeRedux = createStore(reducers);
