import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
// import Secured from "./Secured";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";
import axios from "axios";

const eventLogger = (event, error) => {
  //console.log("onKeycloakEvent", event, error);
};

const tokenLogger = (kc) => {
  axios.interceptors.request.use((config) => {
    config.headers = Object.assign({}, config.headers, {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + kc.token,
    });
    return config;
  });
  axios.interceptors.response.use(
    (response) => {
      // Do something with response data
      // return response;
      //console.log("response", response);
    },
    (error) => {
      // Do something with response error
      if (error.response.status === 401) {
        kc.redirectUri = process.env.REDIRECT_URI;
        kc.logout();
      }
      return error;
    }
  );
};

ReactDOM.render(
  <React.StrictMode>
    {/* <ReactKeycloakProvider
      authClient={keycloak}
      onEvent={eventLogger}
      onTokens={tokenLogger}
      onInitError={(...args) => console.log("oon init error", args)}
      onAuthError={(...args) => console.log("oon auth error", args)}
      initOptions={{ onLoad: "login-required" }}
      onAuthSuccess={(...args) => console.log(args)}
    > */}
    <Router>
      <App />
    </Router>
    {/* </ReactKeycloakProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
