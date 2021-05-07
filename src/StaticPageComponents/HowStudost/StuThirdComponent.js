import React from "react";
import { AppBar, Typography, Button, Hidden } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import image from "../../assets/img/studostPicture.png";
import animeImage from "../../assets/img/anim.png";

export default function SeconddPageComponent() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Hidden mdDown>
        {" "}
        <Typography className={classes.secondPageHeading}>
          How it works?
        </Typography>
        <Typography className={classes.secondPageDetails}>
          Studost has simplified the process of getting funded - Express
          Yourself, Get Discovered & Get Funded
        </Typography>
        <div className={classes.secondPageFirstContainer}>
          <div className={classes.secondPageContainerElement}>
            <Typography className={classes.questionNumber}>#1</Typography>
            <Typography className={classes.secondPageWhy}>
              What is a Studost fund?
            </Typography>
            <Typography className={classes.secondPageText}>
              A Studost fund is created by a benefactor - high net worth
              individuals, institutions or trusts that have the means to support
              a student’s educational goals. It aims to help students finance
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
              What will my fund be used for?
            </Typography>
            <Typography className={classes.secondPageText}>
              Studost funds can be used to fully or partially fund a student’s
              higher education programs in any academic discipline, including
              Undergraduate, Masters and PhD degrees in India and abroad. Your
              fund can be tailored to cater to different categories of students
              based on discipline, gender, country of target university and so
              on.
            </Typography>
          </div>
        </div>
        <div className={classes.secondPageFirstContainer}>
          <div className={classes.secondPageContainerElement}>
            <div className={classes.secondPageDot3}></div>
            <div className={classes.secondPageDot4}></div>
            <Typography className={classes.questionNumber}>#3</Typography>
            <Typography className={classes.secondPageWhy}>
              How can I create a fund?{" "}
            </Typography>
            <Typography className={classes.secondPageText}>
              You may start creating your fund here! Personalise your fund
              application requirements, including telephonic or panel interviews
              to make sure you are able to select the best talent.
            </Typography>
          </div>
          <div className={classes.secondPageImageContainner3}>
            <img src={animeImage} className={classes.imageContainer}></img>
          </div>
        </div>
      </Hidden>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "white",
    maxWidth: theme.spacing(150),
    marginRight: "auto",
    marginLeft: "auto",
    // marginBottom: "20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
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
    color: "#23252a",
    maxWidth: "750px",
    paddingBottom: theme.spacing(10),
  },
  secondPageFirstContainer: {
    width: "90%",
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
  },
  secondPageContainerElement: {
    width: "40%",
  },
  secondPageWhy: {
    fontSize: "32px",
    fontFamily: "Poppins",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.5",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#23252a",
  },
  secondPageText: {
    fontSize: "18px",
    fontFamily: "Poppins",
    fontWeight: "300",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "2",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#23252a",
    paddingTop: theme.spacing(2),
  },
  secondPageImageContainner: {
    paddingTop: "2%",
    paddingLeft: "13%",
    textAlign: "rigth",
    width: "50%",
  },
  secondPageImageContainner3: {
    paddingTop: "10%",
    paddingLeft: "13%",
    textAlign: "rigth",
    width: "50%",
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
  },
  gap: {
    marginTop: "3%",
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
  },
  secondPageDot2: {
    position: "relative",
    width: "133%",
    height: "40px",
    borderRight: " dotted 3px #707070",
    backgroundColor: "transperate",
    marginTop: "-9%",
    marginLeft: "-8%",
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
  },
  secondPageDot4: {
    position: "relative",
    width: "133%",
    height: "38px",
    borderLeft: " dotted 3px #707070",
    backgroundColor: "transperate",
    marginTop: "-1%",
    marginLeft: "-8%",
  },
  imageContainer: {
    width: "400px",
    height: "250px",
  },
}));
