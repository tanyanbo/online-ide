import "./App.css";
import React from "react";
import Output from "./components/Output";
import Editors from "./components/Editors";

function App() {
  return (
    <div className="App">
      <Editors />
      <Output />
    </div>
  );
}

export default App;
