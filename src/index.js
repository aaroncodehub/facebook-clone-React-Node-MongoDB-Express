import React from "react";
import ReactDOM from "react-dom";
import StateProvider from "./contextAPI/StateProvider";
import reducer, { initialState } from "./contextAPI/reducer";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider reducer={reducer} initialState={initialState}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
