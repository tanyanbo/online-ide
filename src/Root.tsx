import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import reducers from "./reducers";

let store = legacy_createStore(reducers);
export type RootState = ReturnType<typeof store.getState>;

const Root = (props: {
  children?: ReactNode;
  initialState?: RootState | {};
}) => {
  let { children, initialState } = props;
  if (initialState === undefined) initialState = {};
  store = legacy_createStore(reducers, initialState);
  return <Provider store={store}>{children}</Provider>;
};

export type AppDispatch = typeof store.dispatch;

export default Root;
