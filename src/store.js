import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import logger from "redux-logger";
import { currencyReducer } from "currency/redux/currencyReducer";
import { pocketsReducer } from "pockets/pocketsReducer";

const reducers = combineReducers({
  currency: currencyReducer,
  pockets: pocketsReducer
});

export const storeRedux = createStore(reducers, applyMiddleware(logger));
