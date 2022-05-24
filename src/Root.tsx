import React from "react";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import reducers from "./reducers";

let store = legacy_createStore(reducers);

const Root = ({ children, initialState = {} }) => {
  store = legacy_createStore(reducers, initialState);
  return <Provider store={store}>{children}</Provider>;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default Root;
