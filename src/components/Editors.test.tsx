import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import combineReducers from "../reducers";
import { legacy_createStore } from "redux";
import Editors from "./Editors";

test("renders all the editors specified in languages", () => {
  const store = legacy_createStore(combineReducers);
  render(
    <Provider store={store}>
      <Editors />
    </Provider>
  );
  const editorNames = store.getState().languages.languages.split("+");
  editorNames.forEach((editorName) => {
    expect(screen.getByText(editorName)).toBeInTheDocument();
  });
});
