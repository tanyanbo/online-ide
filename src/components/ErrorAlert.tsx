import React, { useEffect, useState } from "react";
import "./styles/Error.css";
import { RootState } from "../Root";
import { connect, ConnectedProps } from "react-redux";
import * as ts from "typescript";

const mapStateToProps = (state: RootState) => {
  return {
    code: state.srcDoc.js,
  };
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  lang: string;
};

const ErrorAlert = (props: Props) => {
  const { code, lang } = props;
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    try {
      if (lang === "TS") {
        let result: string = ts.transpile(code);
        // eslint-disable-next-line no-eval
        eval(result);
      } else {
        // eslint-disable-next-line no-eval
        eval(code);
      }
      setErrorMessage("");
    } catch (e) {
      setErrorMessage(e.message);
    }
  }, [code, lang]);

  const handleErrorClick = () => {
    alert(errorMessage);
  };

  return (
    <>
      {errorMessage.length !== 0 && (
        <div className="error-wrap" onClick={handleErrorClick}>
          !
        </div>
      )}
    </>
  );
};

export default connector(ErrorAlert);
