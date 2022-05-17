const { combineReducers } = require("redux");

const changeSrcDoc = (state = { html: "" }, action) => {
  switch (action.type) {
    case "CHANGE_HTML":
      return { ...state, html: action.payload };
    case "CHANGE_CSS":
      return { ...state, css: action.payload };
    case "CHANGE_JS":
      return { ...state, js: action.payload };
    default:
      return state;
  }
};

export default combineReducers({ changeSrcDoc });
