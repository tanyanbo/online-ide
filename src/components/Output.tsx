import React, { useRef } from "react";
import { connect, ConnectedProps } from "react-redux";
import { changeRunWhileTyping, changeIsRunning } from "../actions";
import OUTPUT_STRING from "../shared/outputString";
import { RootState } from "../Root";

const mapStateToProps = (state: RootState) => {
  return {
    html: state.srcDoc.html,
    css: state.srcDoc.css,
    js: state.srcDoc.js,
    checked: state.checkbox.checked,
    languages: state.languages.languages,
  };
};

const connector = connect(mapStateToProps, {
  changeRunWhileTyping,
  changeIsRunning,
});

type Props = ConnectedProps<typeof connector>;

const Output = (props: Props) => {
  const iframeRef = useRef(null);
  const { changeIsRunning, changeRunWhileTyping, languages, html, css, js } =
    props;

  const srcDoc = OUTPUT_STRING[languages](html, css, js);

  // useEffect(() => {
  //   console.log("changed");
  //   iframeRef.current.contentWindow.onerror = function () {
  //     console.log("my own error from iframe srcdoc");
  //   };
  //   console.log(iframeRef.current.contentWindow.onerror);
  // }, [srcDoc]);

  const changeRunState = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        sandbox="allow-scripts allow-same-origin allow-modals"
        title="output-iframe"
        height="500px"
        width="100%"
      />
    </>
  );
};

export default connector(Output);
