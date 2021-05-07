import React from "react";
import { AppBar, Typography, Button } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import image from "./../../assets/img/aboutUsSecondImage.png";
import telescope from "../../assets/img/telescope.png";
import rocket from "../../assets/img/rocket.png";
import building from "../../assets/img/background_bldg.png";

const UseStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "#f4f9fc",
    // marginTop: "-1.5%",
    height: "120vh",
    marginBottom: "13%",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0px",
    },
  },
  aboutContainer: {
    display: "flex",
    flexDirection: "row",
  },
  aboutBox1: {
    // width: "50%",
    marginTop: theme.spacing(5),
    fontSize: "24px",
    fontFamily: "Poppins",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.5",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#23252a",
    padding: theme.spacing(2),
  },

  animationPage: {
    height: "100vh",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
    },
  },
  building__image: {
    height: "100%",
    width: "100%",
    backgroundImage: `url(${building})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    // position: "relative",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  image__divs: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "-40%",
    padding: theme.spacing(0, 20, 0, 20),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      padding: "0",
      maxWidth: "100%",
      marginTop: "0",
    },
  },
  imageBox1: {
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  imageBox2: {
    width: "45%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  title: {
    fontSize: "42px",
    lineHeight: "63px",
    display: "flex",
    justifyContent: "center",
    paddingBottom: theme.spacing(10),
  },
  rocketImage: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },
}));
export default function aboutUsSecondPage() {
  const classes = UseStyles();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.animationPage}>
          <div className={classes.building__image} />
          <div className={classes.image__divs}>
            <div className={classes.imageBox1}>
              <Typography variant="h4" className={classes.title}>
                Vision
              </Typography>
              <img src={telescope} className={classes.rocketImage} />
              <Typography className={classes.aboutBox1}>
                Ensure students in India have the opportunity to gain a
                high-quality education and achieve their full potential.
              </Typography>
            </div>
            <div className={classes.imageBox2}>
              <Typography variant="h4" className={classes.title}>
                Mission
              </Typography>
              <img src={rocket} className={classes.rocketImage} />
              <Typography className={classes.aboutBox1}>
                Our mission is to empower students to discover opportunities and
                improve access to gain an excellent higher education by
                connecting them with those who have had the privilege of
                benefitting from it.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
