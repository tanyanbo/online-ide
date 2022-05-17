import "./App.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Editor from "./components/Editor";
import { change } from "./actions";
import { LANGUAGES } from "./Languages";
import Editors from "./components/Output";

function App(props) {
  return (
    <div className="App">
      <div className="editor-container">
        <Editor language={LANGUAGES.HTML} />
        <div className="resize-bar"></div>
        <Editor language={LANGUAGES.CSS} />
        <div className="resize-bar"></div>
        <Editor language={LANGUAGES.JS} />
      </div>
      <Editors />
    </div>
  );
}

const mapStateToProps = (state) => {
  const s = state.srcDoc;
  return { html: s.html, css: s.css, js: s.js };
};

export default connect(mapStateToProps, {
  change,
})(App);
