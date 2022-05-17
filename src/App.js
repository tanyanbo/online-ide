import "./App.css";
import React, { useEffect, useState } from "react";
import Editor from "./components/Editor";

function App() {
  const [srcDoc, setSrcDoc] = useState("");
  const [js, setJs] = useState("");
  const [html, setHtml] = useState("");

  useEffect(() => {
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
  }, [js, html]);

  return (
    <div className="App">
      <div className="editor-container">
        <Editor onChange={setJs} language="javascript" />
        <Editor onChange={setHtml} language="xml" />
      </div>
      <iframe srcDoc={srcDoc} sandbox="allow-scripts" title="output" />
    </div>
  );
}

export default App;
