import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import "./main.scss";
import store from "./redux/store";
import TimeAgo from "javascript-time-ago";



import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
