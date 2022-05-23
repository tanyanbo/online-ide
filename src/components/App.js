import "./App.css";
import React from "react";
import Output from "./Output";
import Editors from "./Editors";
import { connect } from "react-redux";
import { changeLanguages } from "../actions";

function App(props) {
  const { changeLanguages } = props;

  const onChangeLanguage = (e) => {
    changeLanguages(`HTML+CSS+${e.target.value}`);
  };

  return (
    <div className="App">
      <form action="#" className="select-language">
        <input
          type="radio"
          id="js"
          name="language"
          value="JS"
          onChange={onChangeLanguage}
        />
        <label htmlFor="js">JS</label>
        <input
          type="radio"
          id="ts"
          name="language"
          value="TS"
          onChange={onChangeLanguage}
        />
        <label htmlFor="ts">TS</label>
      </form>
      <Editors />
      <Output />
    </div>
  );
}

export default connect(null, { changeLanguages })(App);
