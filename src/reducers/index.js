import KEYS from "../actions/keys";

const { combineReducers } = require("redux");

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

const srcDoc = (state = { html: "", optionalScript: false }, action) => {
  switch (action.type) {
    case KEYS.CHANGE_HTML:
      return { ...state, html: action.payload };
    case KEYS.CHANGE_CSS:
      return { ...state, css: action.payload };
    case KEYS.CHANGE_JS:
      return { ...state, js: action.payload };
    case KEYS.INCLUDE_TYPESCRIPT_SCRIPT:
      return { ...state, optionalScript: action.payload };
    default:
      return state;
  }
};

export default combineReducers({ srcDoc, checkbox, isRunning });
