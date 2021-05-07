import React from "react";
import { AppBar, Typography, Button } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import image from "../../assets/img/studostPicture.png";
import animeImage from "../../assets/img/anim.png";

export default function SeconddPageComponent() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.secondPageHeading}>
        How it works?
      </Typography>
      <Typography className={classes.secondPageDetails}>
        Studost has simplified the process of getting funded - Express Yourself,
        Get Discovered & Get Funded
      </Typography>
      <div className={classes.secondPageFirstContainer}>
        <div
          className={classes.secondPageContainerElement}
          style={{ marginTop: "2%" }}
        >
          <Typography className={classes.questionNumber}>#1</Typography>
          <Typography className={classes.secondPageWhy}>
            What is a Studost fund?
          </Typography>
          <Typography className={classes.secondPageText}>
            A Studost fund is created by a benefactor - high net worth
            individuals, institutions, or trusts that have the means to support
            a student's educational goals. It aims to help students finance
            their higher education.
          </Typography>
          <div className={classes.secondPageDot}></div>
        </div>
        <div className={classes.secondPageImageContainner}>
          <img src={animeImage} className={classes.imageContainer}></img>
        </div>
      </div>
      <div className={classes.gap}></div>
      <div className={classes.secondPageFirstContainer}>
        <div className={classes.secondPageContainerElement}>
          <div className={classes.secondPageDot2}></div>
          <img src={animeImage} className={classes.imageContainer}></img>
        </div>
        <div className={classes.secondPageImageContainner}>
          <Typography className={classes.questionNumber}>#2</Typography>
          <Typography className={classes.secondPageWhy}>
            What can I use the fund for?{" "}
          </Typography>
          <Typography className={classes.secondPageText}>
            Studost funds can be used to fully or partially fund higher
            education programs in any academic discipline, including
            Undergraduate, Masters and PhD degrees in India and abroad. Some
            funds are tailored to attract students of specific categories, based
            on discipline, gender, country of target university and so on.
          </Typography>
        </div>
      </div>

      <div className={classes.secondPageFirstContainer}>
        <div className={classes.secondPageContainerElement}>
          <div className={classes.secondPageDot3}></div>
          <div className={classes.secondPageDot4}></div>
          <Typography className={classes.questionNumber}>#3</Typography>
          <Typography className={classes.secondPageWhy}>
            How can I apply for a fund?
          </Typography>
          <Typography className={classes.secondPageText}>
            You may start your application here! Tell benefactors your unique
            story, what motivates you, what impact you would like to create in
            the world and increase your chances of receiving a fund towards your
            educational goals!
          </Typography>
        </div>
        <div className={classes.secondPageImageContainner3}>
          <img src={animeImage} className={classes.imageContainer}></img>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "white",
    height: "170vh",
    maxWidth: theme.spacing(150),
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: "10%",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      paddingTop: theme.spacing(2),
    },
  },
  secondPageHeading: {
    paddingTop: "2%",
    fontSize: "230%",
    textAlign: "center",
  },
  secondPageDetails: {
    paddingTop: "1%",
    fontSize: "22px",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "Center",
    fontFamily: "Poppins",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.5",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#23252a",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(5),
    },
  },
  secondPageFirstContainer: {
    width: "90%",
    display: "flex",
    marginLeft: "10%",
    marginRight: "5%",
    [theme.breakpoints.down("sm")]: {
      margin: "0",
      width: "100%",
      padding: theme.spacing(2),
      display: "block",
    },
  },
  secondPageContainerElement: {
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  secondPageWhy: {
    fontSize: "230%",
    fontFamily: "Poppins",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.5",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#23252a",
    [theme.breakpoints.down("sm")]: {
      fontSize: "24px",
    },
  },
  secondPageText: {
    fontSize: "18px",
    fontFamily: "Poppins",
    fontWeight: "300",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.7",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#23252a",
    [theme.breakpoints.down("sm")]: {},
  },
  secondPageImageContainner: {
    paddingTop: "2%",
    paddingLeft: "13%",
    textAlign: "rigth",
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      paddingLeft: "0px",
    },
  },
  secondPageImageContainner3: {
    paddingTop: "10%",
    paddingLeft: "13%",
    textAlign: "rigth",
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      paddingLeft: "0px",
    },
  },
  questionNumber: {
    position: "absolute",
    marginLeft: "-4%",
    marginTop: "0%",
    marginRight: "2%",
    fontSize: "250%",
    fontFamily: "Poppins",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.5",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#5ab856",
    [theme.breakpoints.down("sm")]: {
      margin: "0px",
      padding: theme.spacing(5),
      opacity: "0.3",
      display: "none",
    },
  },
  gap: {
    marginTop: "3%",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0%",
    },
  },
  secondPageDot: {
    position: "relative",
    width: "133%",
    height: "200px",
    borderLeft: " dotted 3px #707070",
    borderBottom: " dotted 3px #707070",
    backgroundColor: "transperate",
    marginTop: "-35%",
    marginLeft: "-8%",
    [theme.breakpoints.down("sm")]: {
      display: " none",
    },
  },
  secondPageDot2: {
    position: "relative",
    width: "133%",
    height: "40px",
    borderRight: " dotted 3px #707070",
    backgroundColor: "transperate",
    marginTop: "-9%",
    marginLeft: "-8%",
    [theme.breakpoints.down("sm")]: {
      display: " none",
    },
  },
  secondPageDot3: {
    position: "relative",
    width: "133%",
    height: "235px",
    borderRight: " dotted 3px #707070",
    borderBottom: " dotted 3px #707070",
    backgroundColor: "transperate",
    marginTop: "-35%",
    marginLeft: "-8%",
    [theme.breakpoints.down("sm")]: {
      display: " none",
    },
  },
  secondPageDot4: {
    position: "relative",
    width: "133%",
    height: "38px",
    borderLeft: " dotted 3px #707070",
    backgroundColor: "transperate",
    marginTop: "-1%",
    marginLeft: "-8%",
    [theme.breakpoints.down("sm")]: {
      display: " none",
    },
  },
  imageContainer: {
    width: "400px",
    height: "250px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));
