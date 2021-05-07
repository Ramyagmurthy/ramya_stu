import React from "react";
import image from "./../../assets/img/Studost-Banners.png";
// import "../App.css";
import { AppBar, Typography, Button } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MouseOutlinedIcon from "@material-ui/icons/MouseOutlined";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Boy from "../../assets/img/student-1.png";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ExploreIcon from "@material-ui/icons/Explore";
import RateReviewIcon from "@material-ui/icons/RateReview";

export default function LandingView() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.fullbody}>
        <div className={classes.first__part}>
          <div>
            <Typography className={classes.aboutTitle} gutterBottom>
              About Studost
            </Typography>
            <div className={classes.bar} />
          </div>
          <div className={classes.words__box}>
            <Typography className={classes.std_pwr_talent}>Studost</Typography>
            <Typography className={classes.std_pwr_talent} gutterBottom>
              Powering Talent
            </Typography>
            <Typography className={classes.about_explain}>
              Studost partners with more than 200 Studost making it gateway to
              affording education and enabling talent to achieve its dream.
              Studost provide unique platform for enabling student to apply for
              scholarships
            </Typography>
          </div>
        </div>
        {/* <div className={classes.events_bg_mg}> */}
        <img src={Boy} className={classes.events_bg_mg} />
        {/* </div> */}
        <div className={classes.card}>
          <div className={classes.cardContent}>
            <div className={classes.subHead}>
              <div style={{ marginTop: "5px" }}>
                <MonetizationOnIcon
                  fontSize="large"
                  style={{ color: "#50a05c" }}
                />
              </div>
              <Typography className={classes.cardPoints}>
                Scholarship/Funding for Education
              </Typography>
            </div>
            <div className={classes.subHead}>
              <div style={{ marginTop: "5px" }}>
                <ExploreIcon fontSize="large" style={{ color: "#50a05c" }} />
              </div>
              <Typography className={classes.cardPoints}>
                Mentorship & Guidance
              </Typography>
            </div>
            <div className={classes.subHead}>
              <div style={{ marginTop: "5px" }}>
                <RateReviewIcon fontSize="large" style={{ color: "#50a05c" }} />
              </div>
              <Typography className={classes.cardPoints}>
                Personalized Recommendation
              </Typography>
            </div>
            <Button className={classes.button}>
              <Typography className={classes.submitTitle}>
                HEAR FROM OUR COMMUNITY
              </Typography>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "white",
  },
  fullbody: {
    width: "90%",
    maxWidth: theme.spacing(180),
    marginRight: "auto",
    marginLeft: "auto",
    paddingTop: theme.spacing(10),
    backgroundColor: "white",
    display: "flex",
    // width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      display: "block",
    },
  },
  first__part: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "35%",
    justifyContent: "space-between",
    padding: theme.spacing(10, 0, 10, 10),
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      padding: theme.spacing(2),
      marginTop: "-50px",
    },
  },
  words__box: {
    height: theme.spacing(43),
    width: "100%",
  },
  appbar: {
    background: "none",
  },
  bar: {
    width: "57px",
    height: "4px",
    backgroundColor: "#ffc600",
  },
  aboutTitle: {
    width: "143px",
    height: "28px",
    fontSize: "20px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.5",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#07294d",
  },
  std_pwr_talent: {
    fontSize: "42px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: " 1.5",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#23252a",
  },
  about_explain: {
    fontSize: "18px",
    fontWeight: "300",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.5",
    letterSpacing: "normal",
    textAlign: "left",
    // color: "#23252a",
  },
  events_bg_mg: {
    width: "100%",
    maxHeight: "80vh",
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
      marginTop: "-50px",
    },
  },
  subHead: {
    display: "flex",
    width: "100%",
  },
  card: {
    background: "#fff",
    borderRadius: "2px",
    width: "35%",
    opacity: "0.96",
    paddingTop: "11%",
    [theme.breakpoints.down("sm")]: {
      width: "450px",
      padding: theme.spacing(2),
    },
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    left: "-100px",
    backgroundColor: "rgba(255,255,255,0.8)",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
    width: "auto",
    height: theme.spacing(43),
    padding: theme.spacing(3),
    zIndex: 2,
    [theme.breakpoints.down("sm")]: {
      left: "0px",
      height: "auto",
      top: "-150px",
      padding: theme.spacing(2),
      width: "100%",
    },
  },

  cardPoints: {
    width: "359px",
    height: "28px",
    margin: "2.4px 0 39px 11.7px",
    fontSize: "20px",
    fontWeight: "300",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.5",
    letterSpacing: "normal",
    textAlign: "left",
    color: " #23252a",

    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  },
  button: {
    // width: "390px",
    width: "90%",
    height: "65px",
    margin: "6px 2px 0",
    // padding: "17px 0px 17px 0px",
    opacity: "0.96",
    borderRadius: theme.spacing(1),
    boxShadow: "0 3px 12px 0 rgba(0, 0, 0, 0.16)",
    backgroundColor: "#f9c705",
    display: "flex",
    justifyContent: "center",
  },
  submitTitle: {
    width: "390px",
    height: " 31px",
    // fontFamily: "Poppins",
    fontSize: "22px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.5",
    letterSpacing: "normal",
    // textAlign: "left",
    color: "#575757",
    // margin: "0 10px",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
      width: "100%",
    },
  },
  testimony: {
    width: "100%",
    height: "768px",
    margin: "50px 1px 5px 0",
    padding: "77px 250px 148px 251px",
    backgroundColor: "#f8fcff",
  },
  testTitle: {
    width: "545px",
    height: "59px",
    margin: "0px 160px 59px 220px",
    fontFamily: "Poppins",
    fontSize: "42px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.5",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#23252a",
  },
  svg: {
    height: "30px",
    cursor: "pointer",
  },
  // slider: {
  //   textAlign: "center",
  //   padding: "100px",
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginTop: "-100px",
  // },

  // yellowButton: {
  //   width: "859px",
  //   height: "65px",
  //   margin: "-100px 90px 10px -5px",
  //   padding: "17px 362px 17px 363px",
  //   opacity: "0.96",
  //   borderRadius: "6px",
  //   boxShadow: "0 3px 12px 0 rgba(0, 0, 0, 0.16)",
  //   backgroundColor: "#f9c705",
  // },
  // learnMore: {
  //   width: "150px",
  //   height: "31px",
  //   fontFamily: "Poppins",
  //   fontSize: "22px",
  //   fontWeight: "500",
  //   fontStretch: "normal",
  //   fontStyle: "normal",
  //   lineHeight: "1.5",
  //   letterSpacing: "normal",
  //   textAlign: "left",
  //   color: "#575757",
  // },
}));
