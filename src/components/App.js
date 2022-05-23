import "./App.css";
import React, { useEffect, useState } from "react";
import Output from "./Output";
import Editors from "./Editors";
import { connect } from "react-redux";
import { changeLanguages } from "../actions";

function App(props) {
  const { changeLanguages } = props;
  const [chosenLanguage, setChosenLanguage] = useState("");

  useEffect(() => {
    let localStorageLanguage = localStorage.getItem("language");
    if (!localStorageLanguage) {
      localStorage.setItem("language", "JS");
      localStorageLanguage = "JS";
    }
    changeLanguages(`HTML+CSS+${localStorageLanguage}`);
    setChosenLanguage(localStorageLanguage);
  }, [changeLanguages]);

  const onChangeLanguage = (e) => {
    changeLanguages(`HTML+CSS+${e.target.value}`);
    setChosenLanguage(e.target.value);
    localStorage.setItem("language", e.target.value);
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
          checked={chosenLanguage === "JS"}
        />
        <label htmlFor="js">JS</label>
        <input
          type="radio"
          id="ts"
          name="language"
          value="TS"
          onChange={onChangeLanguage}
          checked={chosenLanguage === "TS"}
        />
        <label htmlFor="ts">TS</label>
      </form>
      <Editors />
      <Output />
    </div>
  );
}

export default connect(null, { changeLanguages })(App);
