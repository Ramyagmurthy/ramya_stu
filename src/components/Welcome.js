import React, { useState, useEffect, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { LoginContext } from "../Context/LoginContext";
import { Button, Paper, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import image from "../assets/assets1/images/Screenshot.png";
import image2 from "../assets/assets1/images/how-bg.jpg";
import Faq from "./students/FaqMiniStudent.js";
import globe from "./../assets/img/Union 9.png";
import fund from "./../assets/img/Union 10.png";
import form from "./../assets/img/noun_form_1685056.png";
import formStyle from "./../assets/img/Group 754.png";
import welcome2 from "./../assets/img/welcome2.png";
import welcome3 from "./../assets/img/welcome3.png";
import PermCameraMicIcon from "@material-ui/icons/PermCameraMic";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

import SchoolSharpIcon from "@material-ui/icons/SchoolSharp";
import FormatAlignCenterSharpIcon from "@material-ui/icons/FormatAlignCenterSharp";
import AttachMoneySharpIcon from "@material-ui/icons/AttachMoneySharp";

export default function Welcome({ handleChange }) {
  const logindetails = useContext(LoginContext);
  // console.log(logindetails);
  const history = useHistory();
  const classes = useStyles();
  const [yourStatus, setYourStatus] = useState(true);
  const [startStatus, setStartStatus] = useState(false);
  const [fundStatus, setFundStatus] = useState(false);

  if (logindetails.userData.benefactorBasicProfileDto) {
    var firstName = logindetails.userData.benefactorBasicProfileDto.firstName;
    var secondName = logindetails.userData.benefactorBasicProfileDto.lastName;
  } else if (logindetails.userData.studentBasicProfileDto) {
    var firstName = logindetails.userData.studentBasicProfileDto.firstName;
    var secondName = logindetails.userData.studentBasicProfileDto.lastName;
  }

  useEffect(() => {
    handleChange("a", 0);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div style={{ background: "#ffffff" }}>
      <div
        id="slider"
        className="carousel slide"
        data-ride="carousel"
        data-interval="1000"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100 smallview"
              src={image2}
              alt="First slide"
              style={{ objectFit: "cover" }}
            />

            <div
              className="carousel-caption"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                top: "50px",
              }}
            >
              <p className="title" style={{ margin: "0px", fontSize: "4em" }}>
                Welcome {firstName && firstName.split(" ")[0]}!
              </p>
            </div>
          </div>
        </div>
      </div>

      <Typography
        className={classes.headingHomePage}
        style={{
          width: "100%",
          height: "55vh",
        }}
      >
        Coming Soon!!
      </Typography>

      {/* <Typography className={classes.headingHomePage}>
        Fund Your Dreams
      </Typography>
      <Typography className={classes.detailsHomePage}>
        Tell us your story and get funded in 3 simple steps
      </Typography>
      <div className={classes.line}></div>

      <div className={classes.postLogin}>
        <div className={classes.postLoginInside}>
          <div className={classes.navPostInside}>
            <div
              className={yourStatus ? classes.navBotton : classes.navBotton1}
              onClick={() => {
                setYourStatus(true);
                setStartStatus(false);
                setFundStatus(false);
              }}
            >
              {yourStatus ? (
                <PermCameraMicIcon
                  className={classes.iconSize}
                  style={{ color: "#3586ff" }}
                />
              ) : (
                <PermCameraMicIcon
                  className={classes.iconSize}
                  style={{ color: "black" }}
                />
              )}
            </div>
            <div
              className={startStatus ? classes.navBotton : classes.navBotton1}
              onClick={() => {
                setYourStatus(false);
                setStartStatus(true);
                setFundStatus(false);
              }}
            >
              {startStatus ? (
                <MonetizationOnIcon
                  className={classes.iconSize}
                  style={{ color: "#3586ff" }}
                />
              ) : (
                <MonetizationOnIcon
                  className={classes.iconSize}
                  style={{ color: "black" }}
                />
              )}
            </div>
            <div
              className={fundStatus ? classes.navBotton : classes.navBotton1}
              onClick={() => {
                setYourStatus(false);
                setStartStatus(false);
                setFundStatus(true);
              }}
            >
              {fundStatus ? (
                <FormatAlignCenterSharpIcon
                  className={classes.iconSize}
                  style={{ color: "#3586ff" }}
                />
              ) : (
                <FormatAlignCenterSharpIcon
                  className={classes.iconSize}
                  style={{ color: "black" }}
                />
              )}
            </div>
          </div>
          <div className={classes.testFlex}>
            <div
              className={
                yourStatus ? classes.textHeading : classes.textHeading1
              }
              onClick={() => {
                setYourStatus(true);
                setStartStatus(false);
                setFundStatus(false);
              }}
            >
              Share Your Story
            </div>
            <div
              className={
                startStatus ? classes.textHeading : classes.textHeading1
              }
              onClick={() => {
                setYourStatus(false);
                setStartStatus(true);
                setFundStatus(false);
              }}
            >
              Discover Funds
            </div>
            <div
              className={
                fundStatus ? classes.textHeading : classes.textHeading1
              }
              onClick={() => {
                setYourStatus(false);
                setStartStatus(false);
                setFundStatus(true);
              }}
            >
              Compplete your Application
            </div>
          </div>
          <div className="p2 mt-3">
            {yourStatus && (
              <>
                <div className="small__text">
                  Let your voice be heard. Your public profile on our platform
                  gives you the chance to stand out, share your message on
                  social media, and attract the right StuDosts. Upload a short
                  video about your educational goals and take a big step towards
                  getting noticed.{" "}
                </div>
                <Link
                  to={
                    logindetails.roleId == 1
                      ? "/homecontrol/profile"
                      : "/homecontrol/profilestudost"
                  }
                  style={{ textDecoration: "none" }}
                >
                  <div className={classes.flexHomeButton}>GET STARTED</div>
                </Link>{" "}
              </>
            )}
            {startStatus && (
              <>
                <div className="small__text">
                  Find a StuDost who can help you fulfill your dreams. Discover
                  funds launched by StuDosts. Filter your search by discipline,
                  fund amount and more, and receive recommendations based on
                  your search history.
                </div>
                <Link
                  to={
                    logindetails.roleId == 1 ? "/homecontrol/application" : null
                  }
                  style={{ textDecoration: "none" }}
                >
                  <div className={classes.flexHomeButton}>Find a Fund</div>
                </Link>{" "}
              </>
            )}
            {fundStatus && (
              <>
                <div className="small__text">
                  Say goodbye to long, boring applications! Help StuDosts learn
                  about you in a quick, interesting way. You can submit the same
                  application to multiple funds and will have the option to edit
                  your application before each submission.
                </div>
                <Link
                  to={logindetails.roleId == 1 ? "/homecontrol/discover" : null}
                  style={{ textDecoration: "none" }}
                >
                  <div className={classes.flexHomeButton}>Apply Now</div>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className={classes.postLoginInside}>
          {yourStatus && (
            <img src={formStyle} alt="pic for start" width="100%"></img>
          )}
          {startStatus && (
            <img src={welcome2} alt="pic for application" width="100%"></img>
          )}
          {fundStatus && (
            <img src={welcome3} alt="pic for funding" width="100%"></img>
          )}
        </div>
      </div>
      <div className={classes.faqHeader}>
        <Typography className={classes.faqLine}>
          Frequently Asked Questions
        </Typography>
      </div>
      <div className="container mini__faq">
        <Faq handleChange={() => {}} />
      </div>*/}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "auto",
    marginTop: "45px",
    padding: theme.spacing(2),
  },
  firstbody: {
    width: "100%",
    // height: "20vh",
    padding: theme.spacing(4, 0),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffff",
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(2),
  },
  secondBody: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(4, 0),
    // height: "50vh",
    display: "flex",
    flexDirection: "column",
    borderRadius: theme.spacing(2),
    color: "#ffff",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
  },
  secondBody__header: {
    display: "flex",
    justifyContent: "center",
  },
  points: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: theme.spacing(70),
    marginRight: "auto",
    marginLeft: "auto",
  },
  secondBody__points: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  thirdbody: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: theme.spacing(2),
    color: "#ffff",
    backgroundColor: theme.palette.secondary.main,
  },
  links__class: {
    // textDecoration: "none",
    color: "#ffff",
    "&:hover": {
      textDecoration: "none",
    },
  },
  detailsHomePage: {
    margin: "auto",
    fontSize: "180%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8em",
    },
  },
  line: {
    width: "10%",
    height: "4px",
    marginTop: "1%",
    marginLeft: "45%",
    backgroundColor: "#00d8ad",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      width: "50%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "10px",
    },
  },
  faqHeader: {
    width: "100%",
    height: "100px",
    backgroundColor: "#191d49",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "3%",
    fontWeight: "bold",
  },
  faqLine: {
    fontWeight: "bold",
    fontSize: "230%",
    borderRadius: "10%",
    color: "white",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8em",
    },
  },
  headingHomePage: {
    margin: "auto",
    marginTop: "50px",
    fontSize: "46px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "Bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8em",
    },
  },
  flexHeader: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginLeft: "14%",
  },
  insideFlex: {
    width: "33%",
  },
  insideFlex1: {
    marginLeft: "-3%",
    width: "33%",
  },
  flexHeading1: {
    fontWeight: "bold",
    fontSize: "130%",
  },
  flexHeading2: {
    fontWeight: "bold",
    fontSize: "130%",
    marginLeft: "5%",
  },
  flexHeading3: {
    fontWeight: "bold",
    fontSize: "130%",
    marginLeft: "16%",
  },
  flexdetail1: {
    marginTop: "2%",
    fontSize: "130%",
    marginLeft: "-15%",
    display: "flex",
    flexDirection: "space-between",
    paddingRight: "45%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  flexdetail2: {
    marginTop: "2%",
    fontSize: "130%",
    marginLeft: "-10%",
    display: "flex",
    flexDirection: "space-between",
    paddingRight: "40%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  flexdetail3: {
    marginTop: "2%",
    fontSize: "130%",
    marginLeft: "-5%",
    flexDirection: "space-between",
    paddingRight: "35%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  flexButton: {
    marginTop: "2%",
    marginLeft: "-10%",
    width: "250px",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  flexButton2: {
    marginTop: "2%",
    marginLeft: "-5%",
    width: "250px",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  flexButton3: {
    marginTop: "2%",
    marginLeft: "2%",
    width: "250px",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  postLogin: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    marginLeft: "5%",
    marginTop: "5%",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  postLoginInside: {
    width: "50%",
    margin: "1%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  navPostInside: {
    width: "100%",
    backgroundColor: "#eaf0fc",
    height: "50px",
    borderRadius: "200px",
    borderStyle: "double 3px green",
    display: "flex",
    justifyContent: "space-between",
    border: "2px solid white",
    padding: "1%",
  },
  navBotton: {
    display: "flex",
    width: "30%",
    backgroundColor: "white",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    borderRadius: "100px",
    cursor: "pointer",
  },
  navBotton1: {
    display: "flex",
    width: "30%",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    borderRadius: "100px",
    cursor: "pointer",
  },
  textHeading: {
    display: "flex",
    width: "30%",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    color: "#3586ff",
    cursor: "pointer",
    fontFamily: "Poppins",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.5",
    letterSpacing: "normal",
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
    },
  },
  textHeading1: {
    display: "flex",
    width: "30%",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    cursor: "pointer",
    lineHeight: "1.5",
    textAlign: "left",
    color: "#02112c",
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
    },
  },
  testFlex: {
    width: "100%",
    height: "40px",
    borderRadius: "200px",
    borderStyle: "double 3px green",
    display: "flex",
    justifyContent: "space-between",
    padding: "1%",
  },
  flexDetails: {
    marginTop: "2%",
    fontFamily: "Poppins",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.5",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#02112c",
    fontSize: "14px",
    marginRight: "15%",
    textAlign: "left",
    marginLeft: "5%",
  },
  flexHomeButton: {
    opacity: "0.96",
    borderRadius: "6px",
    boxShadow: "0 3px 12px 0 rgba(0, 0, 0, 0.16)",
    backgroundImage: "linear-gradient(to right, #0086ff 3%, #00d8ad 78%)",
    width: "210px",
    height: "52px",
    fontSize: "24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    marginTop: "20px",
  },
  faqStyle: {
    paddingBottom: theme.spacing(5),
  },
  iconSize: {
    fontSize: "30px",
  },
}));
