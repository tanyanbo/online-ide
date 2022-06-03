import React, { useEffect, useState } from "react";
import "./styles/Error.css";
import { RootState } from "../Root";
import { connect, ConnectedProps } from "react-redux";

const mapStateToProps = (state: RootState) => {
  return {
    code: state.srcDoc.js,
  };
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const ErrorAlert = (props: PropsFromRedux) => {
  const { code } = props;
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    try {
      eval(code);
      setErrorMessage("");
    } catch (e) {
      setErrorMessage(e.message);
    }
  }, [code]);

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
