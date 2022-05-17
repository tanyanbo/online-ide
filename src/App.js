import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import Editor from "./components/Editor";

function App() {
  const [srcDoc, setSrcDoc] = useState("");
  const [js, setJs] = useState("");
  const [html, setHtml] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  // const [python, setPython] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSrcDoc(`
        <html lang="en-US">
          <body>
            ${html}
            <script>
                ${js}
            </script>
          </body>
        </html>
      `);
    }, 250);
    return () => clearTimeout(timer);
  }, [js, html]);

  const changeRunState = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="App">
      <form>
        <input type="checkbox" id="run" onChange={changeRunState} />
        <label htmlFor="run">边写边运行</label>
      </form>
      <div className="editor-container">
        <Editor onChange={setJs} language="javascript" />
        <Editor onChange={setHtml} language="xml" />
        {/*<Editor language="python" onChange={setPython} />*/}
      </div>
      <button className="run-button" disabled={!isChecked}>
        运行
      </button>
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
