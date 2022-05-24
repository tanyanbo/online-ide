import React, { useEffect, useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { connect, ConnectedProps } from "react-redux";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/mode/python/python";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "./Editor.css";
import { change, changeIsRunning } from "../actions";
import KEYS from "../actions/keys";
import { RootState } from "../index";

const mapStateToProps = (state: RootState) => {
  return {
    checked: state.checkbox.checked,
    isRunning: state.isRunning.isRunning,
  };
};

const connector = connect(mapStateToProps, { change, changeIsRunning });

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  language: readonly string[];
  checked: boolean;
  isRunning: boolean;
  hasBar?: boolean;
  handleMouseDown?: () => void;
  pos: string;
};

const Editor = React.forwardRef((props: Props, ref) => {
  const {
    language,
    change,
    checked,
    isRunning,
    changeIsRunning,
    hasBar,
    handleMouseDown,
    pos,
  } = props;
  const [code, setCode] = useState<string>("");

  const onChangeCode = (editor: any, data: any, value: string) => {
    setCode(value);
  };

  const clearCode = () => {
    setCode("");
    change("", KEYS[`CHANGE_${pos}`]);
  };

  useEffect(() => {
    if (checked) {
      const timer = setTimeout(() => {
        change(code, KEYS[`CHANGE_${pos}`]);
      }, 250);
      return () => clearTimeout(timer);
    }
    if (isRunning) {
      change(code, KEYS[`CHANGE_${pos}`]);
      changeIsRunning(false);
    }
  }, [code, language, pos, checked, change, isRunning, changeIsRunning]);

  return (
    <div className={hasBar ? "editor-with-bar" : "editor"} ref={ref}>
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
        value={code}
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
});

export default connector(Editor);
