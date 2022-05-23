import KEYS from "../actions/keys";
import { combineReducers } from "redux";

const checkbox = (state = { checked: false }, action) => {
  switch (action.type) {
    case KEYS.CHANGE_RUN_WHILE_TYPING:
      return { ...state, checked: action.payload };
    default:
      return state;
  }
};

const isRunning = (state = { isRunning: false }, action) => {
  switch (action.type) {
    case KEYS.CHANGE_RUN:
      return { ...state, isRunning: action.payload };
    default:
      return state;
  }
};

const srcDoc = (state = { html: "", js: "" }, action) => {
  switch (action.type) {
    case KEYS.CHANGE_1:
      return { ...state, html: action.payload };
    case KEYS.CHANGE_2:
      return { ...state, css: action.payload };
    case KEYS.CHANGE_3:
      return { ...state, js: action.payload };
    default:
      return state;
  }
};

const languages = (state = { languages: "HTML+CSS+JS" }, action) => {
  switch (action.type) {
    case KEYS.CHANGE_LANGUAGES:
      return { ...state, languages: action.payload };
    default:
      return state;
  }
};

export default combineReducers({ srcDoc, checkbox, isRunning, languages });
