import React, { useEffect, useState, useContext } from "react";
import Nav from "../components/Nav";
import Home from "./Home";
import Profile from "../components/students/Profile/Profile";
import Application from "../components/students/Application";
import {
  Switch,
  Route,
  useParams,
  BrowserRouter as Router,
  Redirect,
  useHistory,
} from "react-router-dom";
import image from "../assets/img/bg6.jpg";
import Footer from "../components/students/Footer";
import axios from "axios";
import { MasterContext } from "../Context/MasterContext";
import { LoginContext } from "../Context/LoginContext";
import Discover from "../components/students/Discover";
import BenefactorNav from ".././components/BenefactorNav";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Faq from "../components/students/FAQ_student";
import ApplyScholarship from "../components/students/Discover/ApplyScholarship";
import ProfileBenefactor from "../components/benefactors/ProfileBenefactor";
import ProfileInfo from "../components/benefactors/ProfileinfoB";
import FAQ_studost from "../components/benefactors/FAQ_studost";
import Funds from "../components/benefactors/funds/Funds";
import ProfileRoute from "../components/students/Profile/core/profilecore";
import ScholarshipsApplicant from "../components/benefactors/funds/ScholarshipsApplicant/ScholarshipsApplicant";
import Welcome from "../components/Welcome";
import ApplicationView from "../components/students/ApplicationView";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "../keycloak";
import { ProtectedRoute } from "../ProtectedRoute";
import qs from "qs";

function HomeControl() {
  const logindetails = useContext(LoginContext);
  const classes = useStyles();
  let { scholorId } = useParams();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // alert(window.sessionStorage.getItem("roleId"));
    // history.push("/homecontrol/home");
    // if (logindetails) {
    //   window.sessionStorage.setItem("logindetails", logindetails);
    // }
  }, []);

  const history = useHistory();

  window.addEventListener("popstate", () => {
    history.go(1);
  });

  const eventLogger = (event, error) => {
    //console.log("onKeycloakEvent", event, logindetails);
  };

  // refresh token function
  const refreshToken = (KC) => {
    /// refresh token code
    const body = qs.stringify({
      client_id: "studost",
      grant_type: "refresh_token",
      refresh_token: KC.refresh_token,
    });

    let config = {
      method: "post",
      url: process.env.REACT_APP_KC_URL,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: body,
    };

    axios(config)
      .then(function (response) {
        //console.log("response", response.data.access_token);
        logindetails.setKcTokken(response.data.access_token);
      })
      .catch((err) => {
        // console.log("error from api", err);
      });
  };

  // intercepting outgoing request
  axios.interceptors.request.use(
    (config) => {
      config.headers = Object.assign({}, config.headers, {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + logindetails.kcToken,
      });
      return config;
    },
    (err) => {
      console.log(err);
      if (err.response.status === 401) {
      }
    }
  );

  // intercepting incoming  response
  axios.interceptors.response.use(
    (response) => {
      // Do something with response data
      return response;
      // // alert(response);
      // console.log("response", response);
    },
    (error) => {
      // Do something with response error
      if (error.response.status === 401) {
        // kc.redirectUri = process.env.REDIRECT_URI;
        // kc.logout();
      }
      return error;
    }
  );

  return (
    // <ReactKeycloakProvider
    //   authClient={keycloak}
    //   onEvent={eventLogger}
    //   onTokens={tokenLogger}
    //   onInitError={(...args) => console.log("oon init error", args)}
    //   onAuthError={(...args) => console.log("oon auth error", args)}
    //   initOptions={{ onLoad: "login-required" }}
    //   onAuthSuccess={(...args) => console.log(args)}
    // >
    <Router>
      {logindetails.userData ? (
        <div className={classes.root}>
          <BenefactorNav value={value} handleChange={handleChange} />
          <div className={classes.body}>
            <Switch>
              <ProtectedRoute
                exact
                path="/homecontrol/discover/:scholarshipId"
                component={ApplyScholarship}
              />
              <ProtectedRoute
                exact
                path="/homecontrol/launchfund/:scholarshipId"
                component={ScholarshipsApplicant}
              />
              <ProtectedRoute exact path="/homecontrol/profile">
                <ProfileRoute handleChange={handleChange} />
              </ProtectedRoute>
              <ProtectedRoute exact path="/homecontrol/application">
                <ApplicationView handleChange={handleChange} />
              </ProtectedRoute>
              <ProtectedRoute
                exact
                path="/homecontrol/application/manage"
                component={Application}
              />
              <ProtectedRoute exact path="/homecontrol/discover">
                <Discover handleChange={handleChange} />
              </ProtectedRoute>
              <ProtectedRoute exact path="/homecontrol/faq">
                <Faq handleChange={handleChange} />
              </ProtectedRoute>
              <ProtectedRoute exact path="/homecontrol/profilestudost">
                <ProfileInfo handleChange={handleChange} />
              </ProtectedRoute>
              <ProtectedRoute exact path="/homecontrol/faqstudost">
                <FAQ_studost handleChange1={handleChange} />
              </ProtectedRoute>
              <ProtectedRoute exact path="/homecontrol/launchfund">
                <Funds handleChange={handleChange} />
              </ProtectedRoute>
              <ProtectedRoute exact path="/homecontrol/home">
                <Welcome handleChange={handleChange} />
              </ProtectedRoute>
              {/* <ProtectedRoute exact path="/">
                <Redirect to="/homecontrol/home" />
              </ProtectedRoute> */}
            </Switch>
          </div>
          <Footer />
        </div>
      ) : null}
    </Router>
    // </ReactKeycloakProvider>
  );
}

export default HomeControl;

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundImage: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
    backgroundPosition: "top center",
    backgroundSize: "cover",
    backgroundColor: "#f1f2f5",
  },
  body: {
    margin: 0,
    padding: 0,
    // paddingTop: "10px",
    maxWidth: "1350px",
    marginRight: "auto",
    marginLeft: "auto",
    // opacity: "0.5",
    minHeight: "100vh",
  },
}));
