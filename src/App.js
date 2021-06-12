import "./App.css";
import Home from "./views/Home";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import Profile from "./components/students/Profile/Profile";
import FAQ_student from "./components/students/FAQ_student";
import theme from "./components/mui_themes/index";
import { ThemeProvider } from "@material-ui/core/styles";
import LoginPage from "./components/students/LoginPage";
import SignUp from "./components/students/SignUp";
import HomeControl from "./views/HomeControl";
import Application from "./components/students/Application";
import { useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "./Context/LoginContext";
import Discover from "./components/students/Discover";
import ProfileBenefactor from "./components/benefactors/ProfileBenefactor";
import FAQ_studost from "./components/benefactors/FAQ_studost";
import ApplyScholarship from "./components/students/Discover/ApplyScholarship";
import { ProtectedRoute } from "./ProtectedRoute";
import ScholarshipsApplicant from "./components/benefactors/funds/ScholarshipsApplicant/ScholarshipsApplicant";
import { SnackbarProvider } from "notistack";
import Homepage from "./views/Homepage";
import LandingView from "./views/LandingView";
import About from "./views/AboutView";
import ContactUsView from "./views/ContactUsView";
import HowStudent from "./views/HowStudent";
import HowStudost from "./views/HowStudost";
import ForgotPassword from "./components/students/ForgotPassword";
import Team from "./StaticPageComponents/Team/Team";
import BenifactoreSignUp from "./components/benefactors/BenifactoreSignUp";
import qs from "qs";
import Explore from "./views/ExploreStudosts";
import ExploreStudent from "./views/ExploreStudents";
import Footer from "./StaticPageComponents/LandingPageComponents/Footer";

function App() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState(0);
  const [login, setLogin] = useState(false);
  const [loginData, setLoginData] = useState("");
  const [userData, setUserData] = useState([]);
  const [masterData, setMasterData] = useState();
  const [roleId, setRoleId] = useState();
  const [avatarImage, setAvatarImage] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [profileName, setProfileName] = useState();
  const [invalidUser, setInvalidUser] = useState();
  const [kcToken, setKcTokken] = useState();
  const history = useHistory();
  const myStorage = window.sessionStorage;

  useEffect(() => {
    getMasterData();
    // alert(window.sessionStorage.getItem("roleId"));
    // if (window.sessionStorage.getItem("login")) {
    //   getUserInfo(
    //     window.sessionStorage.getItem("userId"),
    //     window.sessionStorage.getItem("roleId"),
    //     window.sessionStorage.getItem("KC")
    //   );
    //   setUser(window.sessionStorage.getItem("userId"));
    //   setLogin(true);
    // }
  }, []);
  const handlesubmit = (e) => {
    // e.preventDefault();
    loginAPi(email, password);
  };

  const baseUrl = process.env.REACT_APP_URL;
  const client = process.env.REACT_APP_KC_CLIENT;

  const loginAPi = (username, password) => {
    const body = qs.stringify({
      client_id: client,
      grant_type: "password",
      username: username,
      password: password,
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
        // console.log("response", response.data.access_token);
        setKcTokken(response.data.access_token);
        logIn(response.data);
      })
      .catch((err) => {
        setInvalidUser(true);
        // console.log("error from api", err);
      });
  };

  const logIn = (kc) => {
    const userEmail = JSON.parse(atob(kc.access_token.split(".")[1])).email;
    const kcrole = JSON.parse(atob(kc.access_token.split(".")[1])).realm_access
      .roles[2];
    let config = {
      method: "get",
      url: baseUrl + `/user/login?userName=${userEmail}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + kc.access_token,
      },
      // data: body,
    };

    axios(config)
      .then((response) => {
        if (!response.data.body) {
          setInvalidUser(true);
        }
        if (response.data.body.loginMessage == "Incorrect UserName") {
          setInvalidUser(true);
        }
        if (response.data.body.userId) {
          setLogin(true);
          setUser(response.data.body.userId);
          loginSucess(response.data.body.loginMessage);
          setLoginData(response.data.body);
          setRoleId(response.data.body.roleDto.roleId);
          getUserInfo(
            response.data.body.userId,
            response.data.body.roleDto.roleId,
            kc
          );
          myStorage.setItem("userId", response.data.body.userId);
          myStorage.setItem("login", response.data.body.flag);
          myStorage.setItem("roleId", response.data.body.roleDto.roleId);
          myStorage.setItem("KC", kc);
        } else {
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getUserInfo = (id, role, kc) => {
    if (role == 1) {
      let config = {
        method: "get",
        url: baseUrl + `/student/load-student-profile-data?userId=${id}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + kc.access_token,
        },
      };
      axios(config)
        .then((res) => {
          history.push("/homecontrol/home");
          setProfileName(
            res.data.body.studentBasicProfileDto.firstName +
              " " +
              res.data.body.studentBasicProfileDto.lastName
          );
          setFirstName(res.data.body.studentBasicProfileDto.firstName);
          setLastName(res.data.body.studentBasicProfileDto.lastName);

          // if (res.data.body.studentId != 0) {
          setUserData(res.data.body);
          setAvatarImage(res.data.body.objectUrl);
          // } else if (res.data.body.studentId == 0) {
          //   createStudentID(res.data.body.studentBasicProfileDto, kc);
          // }
        })
        .catch((err) => console.log(err, "from student get", id));
    } else if (role == 2) {
      let config = {
        method: "get",
        url: baseUrl + `/benefactor/load-benefactor-profile-data?userId=${id}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + kc.access_token,
        },
      };

      axios(config)
        .then((res) => {
          setProfileName(
            res.data.body.benefactorBasicProfileDto.firstName +
              " " +
              res.data.body.benefactorBasicProfileDto.lastName
          );
          setUserData(res.data.body);
          setAvatarImage(res.data.body.objectUrl);
          history.push("/homecontrol/home");
        })
        .catch((err) => console.log(err));
    }
  };
  // const createStudentID = (data, kc) => {
  //   const bodyCreate = {
  //     firstName: data.firstName,
  //     lastName: data.lastName,
  //     phoneNumber: 9000000000,
  //     socialMediaDtoList: [
  //       {
  //         name: "Linkedin",
  //         socialMediaId: 1,
  //         url: "add linkedin url",
  //       },
  //       {
  //         name: "Facebook",
  //         socialMediaId: 2,
  //         url: "add facebook url",
  //       },
  //       {
  //         name: "Twitter",
  //         socialMediaId: 3,
  //         url: "add twitter url",
  //       },
  //     ],

  //     studentId: 0,
  //     summary: "write something",
  //     userId: data.userId,
  //   };
  //   const config = {
  //     method: "post",
  //     url: `${baseUrl}/student/create-basic-profile`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + kc.access_token,
  //     },
  //     data: bodyCreate,
  //   };
  //   axios(config)
  //     .then((res) => {
  //       console.log("new data available", res.data.body);
  //       console.log("from that thing", data.userId);
  //       getUserInfo(data.userId, 1);
  //     })
  //     .catch((err) => console.log("something went wrong"));
  // };
  const logindetails = {
    firstName,
    lastName,
    email,
    setEmail,
    password,
    setPassword,
    user,
    setUser,
    handlesubmit,
    userData,
    masterData,
    roleId,
    getUserInfo,
    login,
    setLogin,
    setUserData,
    avatarImage,
    setAvatarImage,
    setRoleId,
    profileName,
    invalidUser,
    logIn,
    kcToken,
    loginAPi,
    setKcTokken,
  };
  const loginSucess = (msg) => {
    msg == "Correct Credentials" ? loginSucessFunc() : loginfailed(msg);
  };
  const loginSucessFunc = () => {
    setLogin(true);
    // history.push("/homecontrol");
  };
  const loginfailed = (msg) => {
    setLogin(false);
    // console.log(msg);
    // alert("login failed");
  };

  const getMasterData = () => {
    axios
      .get(`${baseUrl}/master/get-master-data`)
      .then((res) => {
        setMasterData(res.data.body);
        // console.log(res.data.body);
      })
      .catch((err) => console.log(`${baseUrl}/master/get-master-data`));
  };

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <LoginContext.Provider value={logindetails}>
          <Switch>
            <Route path="/findscholar/signup" component={BenifactoreSignUp} />
            <Route path="/student/signup" component={BenifactoreSignUp} />
            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route path="/ourteam" component={Team} />
            <Route exact path="/contactus" component={ContactUsView} />
            <Route exact path="/findscholar" component={HowStudost} />
            <Route exact path="/student" component={HowStudent} />
            <Route exact path="/about" component={About} />
            <ProtectedRoute path="/homecontrol" component={HomeControl} />
            <Route exact path="/" component={LandingView} />

            <Route
              exact
              path="/explore-scholars"
              render={(props) => (
                <ExploreStudent {...props} masterData={masterData} />
              )}
            />

            <Route
              exact
              path="/explore-funds"
              render={(props) => <Explore {...props} masterData={masterData} />}
            />
          </Switch>
          <Footer />
        </LoginContext.Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
export default App;
