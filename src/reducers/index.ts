import KEYS from "../actions/keys";
import { combineReducers } from "redux";

export const checkbox = (
  state: { checked: boolean } = { checked: false },
  action: { type: number; payload: boolean }
) => {
  switch (action.type) {
    case KEYS.CHANGE_RUN_WHILE_TYPING:
      return { ...state, checked: action.payload };
    default:
      return state;
  }
};

export const isRunning = (
  state = { isRunning: false },
  action: { type: number; payload: boolean }
) => {
  switch (action.type) {
    case KEYS.CHANGE_RUN:
      return { ...state, isRunning: action.payload };
    default:
      return state;
  }
};

export const srcDoc = (
  state: { html: string; css?: string; js: string } = {
    html: "",
    js: "",
  },
  action: { type: number; payload: string }
) => {
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

export const languages = (
  state: { languages: string } = { languages: "HTML+CSS+JS" },
  action: { type: number; payload: string }
) => {
  switch (action.type) {
    case KEYS.CHANGE_LANGUAGES:
      return { ...state, languages: action.payload };
    default:
      return state;
  }
};

export default combineReducers({ srcDoc, checkbox, isRunning, languages });
