import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import logger from "redux-logger";
import { currencyReducer } from "currency/redux/currencyReducer";
const reducers = combineReducers({ currency: currencyReducer });

export const storeRedux = createStore(reducers, applyMiddleware(logger));
