import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/mode/python/python";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "./Editor.css";
import mapping from "../mapping";

const Editor = (props) => {
  const { onChange, language, setSrcDoc } = props;
  const [val, setVal] = useState("");

  const onChangeCode = (editor, data, value) => {
    setVal(value);
    onChange(value);
  };

  const resetCode = () => {
    setVal("");
    onChange("");
    setSrcDoc("", "", "");
  };

  return (
    <div className="editor">
      <div className="editor-top">
        <h3>{mapping[language]}</h3>
        <button onClick={resetCode} className="reset-button">
          Reset
        </button>
      </div>
      <CodeMirror
        value={val}
        options={{
          mode: language,
          lineNumbers: true,
          lineWrapping: true,
          lint: true,
          theme: "material",
        }}
        onBeforeChange={onChangeCode}
      />
    </div>
  );
};

export default Editor;
