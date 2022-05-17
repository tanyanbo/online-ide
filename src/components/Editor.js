import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "./Editor.css";

const Editor = (props) => {
  const { onChange, language } = props;
  const [val, setVal] = useState("");

  const onChangeCode = (editor, data, value) => {
    setVal(value);
    onChange(value);
  };

  return (
    <div className="editor">
      <h3>{language}</h3>
      <CodeMirror
        value={val}
        options={{
          mode: language,
          lineNumbers: true,
          lineWrapping: true,
          lint: true,
        }}
        onBeforeChange={onChangeCode}
      />
    </div>
  );
};

export default Editor;
