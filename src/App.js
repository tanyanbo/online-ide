import "./App.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Editor from "./components/Editor";
import { change } from "./actions";
import { LANGUAGES } from "./Languages";

function App(props) {
  // const [srcDoc, setSrcDoc] = useState("");
  const [js, setJs] = useState("");
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isChecked) {
      const timer = setTimeout(() => {
        props.change(html, "HTML");
        props.change(js, "JS");
        props.change(css, "CSS");
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [js, css, html, isChecked]);

  const changeRunState = (e) => {
    setIsChecked(e.target.checked);
  };

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

  const run = () => {
    props.change(html, "HTML");
    props.change(js, "JS");
    props.change(css, "CSS");
  };

  return (
    <div className="App">
      <div className="editor-container">
        <Editor onChange={setHtml} language={LANGUAGES.HTML} />
        <Editor onChange={setCss} language={LANGUAGES.CSS} />
        <Editor onChange={setJs} language={LANGUAGES.JS} />
      </div>
      <div className="buttons">
        <form className="run-checkbox">
          <input type="checkbox" id="run" onChange={changeRunState} />
          <label htmlFor="run">边写边运行</label>
        </form>
        <button className="run-button" disabled={isChecked} onClick={run}>
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
    </div>
  );
}

const mapStateToProps = (state) => {
  const s = state.changeSrcDoc;
  return { html: s.html, css: s.css, js: s.js };
};

export default connect(mapStateToProps, {
  change,
})(App);
