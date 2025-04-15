import React from "react";
import ReactDOM from "react-dom/client";
import store from "./reduxs/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";

import * as process from 'process';

import App from "./App";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

(window).global = window;
(window).process = process;
(window).Buffer = [];


root.render(
  <BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
