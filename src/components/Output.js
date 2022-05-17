import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { changeRunWhileTyping, changeIsRunning } from "../actions";

const Output = (props) => {
  const { changeIsRunning, changeRunWhileTyping } = props;
  const srcDoc = `
        <html lang="en-US">
          <head>
            <title>Iframe</title>
            <style>
              ${props.css}
            </style>
          </head>
          <body>
            ${props.html}
            <script>${props.js}</script>
          </body>
        </html>
      `;

  const changeRunState = (e) => {
    changeRunWhileTyping(e.target.checked);
  };

  const run = () => {
    changeIsRunning(true);
  };

  return (
    <>
      <div className="buttons">
        <form className="run-checkbox">
          <input type="checkbox" id="run" onChange={changeRunState} />
          <label htmlFor="run">边写边运行</label>
        </form>
        <button className="run-button" disabled={props.checked} onClick={run}>
          运行
        </button>
      </div>
      <iframe
        srcDoc={srcDoc}
        sandbox="allow-scripts"
        title="output"
        height="500px"
        width="100%"
      />
    </>
  );
};

const mapStateToProps = (state) => {
  const s = state.srcDoc;
  console.log(s);
  return {
    html: s.html,
    css: s.css,
    js: s.js,
    checked: state.checkbox.checked,
  };
};

export default connect(mapStateToProps, {
  changeRunWhileTyping,
  changeIsRunning,
})(Output);
