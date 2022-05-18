import React, { useEffect, useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { connect } from "react-redux";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/mode/python/python";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "./Editor.css";
import { change, changeIsRunning } from "../actions";
import KEYS from "../actions/keys";

const Editor = (props) => {
  const {
    language,
    change,
    checked,
    isRunning,
    changeIsRunning,
    myRef,
    hasBar,
    handleMouseDown,
  } = props;
  const [val, setVal] = useState("");

  const onChangeCode = (editor, data, value) => {
    setVal(value);
  };

  const clearCode = () => {
    setVal("");
    change("", KEYS[`CHANGE_${language[0]}`]);
  };

  useEffect(() => {
    if (checked) {
      const timer = setTimeout(() => {
        change(val, KEYS[`CHANGE_${language[0]}`]);
      }, 250);
      return () => clearTimeout(timer);
    }
    if (isRunning) {
      change(val, KEYS[`CHANGE_${language[0]}`]);
      changeIsRunning(false);
    }
  }, [val, language, checked, change, isRunning, changeIsRunning]);

  return (
    <div className={hasBar ? "editor-with-bar" : "editor"} ref={myRef}>
      {hasBar && (
        <div className="resize-bar" onMouseDown={handleMouseDown}></div>
      )}
      <div className="editor-top">
        <h3>{language[0]}</h3>
        <button onClick={clearCode} className="reset-button">
          &#10060;
        </button>
      </div>
      <CodeMirror
        className="code-mirror"
        value={val}
        options={{
          mode: language[1],
          lineNumbers: true,
          lineWrapping: true,
          lint: true,
          theme: "material",
          dragDrop: false,
          matchBrackets: true,
        }}
        onBeforeChange={onChangeCode}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    checked: state.checkbox.checked,
    isRunning: state.isRunning.isRunning,
  };
};

export default connect(mapStateToProps, {
  change,
  changeIsRunning,
})(Editor);
