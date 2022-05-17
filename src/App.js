import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import Editor from "./components/Editor";
import formatOutputString from "./outputString";

function App() {
  const [srcDoc, setSrcDoc] = useState("");
  const [js, setJs] = useState("");
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  // const [python, setPython] = useState("");

  useEffect(() => {
    if (isChecked) {
      const timer = setTimeout(() => {
        setSrcDoc(formatOutputString(html, css, js));
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [js, css, html, isChecked]);

  const changeRunState = (e) => {
    setIsChecked(e.target.checked);
  };

  const run = () => {
    setSrcDoc(formatOutputString(html, css, js));
  };

  return (
    <div className="App">
      <div className="editor-container">
        <Editor onChange={setJs} language="javascript" />
        <Editor onChange={setCss} language="css" />
        <Editor onChange={setHtml} language="xml" setSrcDoc={setSrcDoc} />
        {/*<Editor language="python" onChange={setPython} />*/}
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

export default App;
