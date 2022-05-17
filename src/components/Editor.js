import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { connect } from "react-redux";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/mode/python/python";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "./Editor.css";
import { change } from "../actions";

const Editor = (props) => {
  const { language, onChange } = props;
  const [val, setVal] = useState("");

  const onChangeCode = (editor, data, value) => {
    setVal(value);
    onChange(value);
  };

  const resetCode = () => {
    setVal("");
    onChange("");
    props.change("", language[0]);
  };

  return (
    <div className="editor">
      <div className="editor-top">
        <h3>{language[0]}</h3>
        <button onClick={resetCode} className="reset-button">
          &#10060;
        </button>
      </div>
      <CodeMirror
        value={val}
        options={{
          mode: language[1],
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

const mapStateToProps = (state) => {
  const s = state.changeSrcDoc;
  return { html: s.html, css: s.css, js: s.js };
};

export default connect(mapStateToProps, {
  change,
})(Editor);
