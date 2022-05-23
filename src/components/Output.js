import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { changeRunWhileTyping, changeIsRunning } from "../actions";
import OUTPUT_STRING from "../shared/outputString";

const Output = (props) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    iframeRef.current.contentWindow.onerror = function () {
      console.log("my own error from iframe srcdoc");
    };
  }, []);

  const { changeIsRunning, changeRunWhileTyping } = props;
  const srcDoc = OUTPUT_STRING[props.languages](
    props.html,
    props.css,
    props.js
  );
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
        ref={iframeRef}
        srcDoc={srcDoc}
        sandbox="allow-scripts allow-same-origin"
        title="output"
        height="500px"
        width="100%"
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    html: state.srcDoc.html,
    css: state.srcDoc.css,
    js: state.srcDoc.js,
    checked: state.checkbox.checked,
    languages: state.languages.languages,
  };
};

export default connect(mapStateToProps, {
  changeRunWhileTyping,
  changeIsRunning,
})(Output);
