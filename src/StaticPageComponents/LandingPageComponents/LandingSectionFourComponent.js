import React, { useState } from "react";
import smallImage from "./../../assets/img/Studost-Banners-1.png";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Card, Typography } from "@material-ui/core";
import image from "../../assets/img/bussinessman.png";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  conatinerDiv: {
    width: "80%",
    marginRight: "auto",
    marginLeft: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  first_div: {
    maxWidth: "35%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Poppins",
    justifyContent: "flex-start",
    color: "#23252A",
  },
  container_one: {
    display: "flex",
    justifyContent: "flex-start",
    fontFamily: "Poppins",
    //marginTop: "20px",
  },
  images__tabview: {
    opacity: "0.7",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },

    justifyContent: "center",
    marginTop: "10%",
  },
  second_div: {
    maxWidth: "800px",
    fontFamily: "Poppins",
    marginLeft: "2%",
    // maxHeight: "100vh",
    paddingTop: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      margin: "0px",
      marginLeft: "0px",
      padding: theme.spacing(2),
    },
  },
  subdiv_one: {
    width: "70%",
    height: "36px",
    fontSize: "32px",
    fontWeight: "bold",
    color: "#23252A",
    [theme.breakpoints.down("sm")]: {
      fontSize: "22px",
      width: "100%",
    },
  },
  subdiv_two: {
    fontSize: "20px",
    textAlign: "left",
    color: "#23252A",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
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
  },
}));
export default function LandingView() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.conatinerDiv}>
        <div className={classes.container_one}>
          <div className={classes.first_div}>
            <img src={image} className={classes.images__tabview} />
          </div>
          <div className={classes.second_div}>
            <div>
              <Typography className={classes.std_pwr_talent}>
                Benefactors
              </Typography>
            </div>
            <br />
            <div>
              <Typography className={classes.about_explain}>
                Support a student's dream by becoming a Studost today! Studosts
                are high net worth individuals, institutions, organisations or
                trusts that have the means to finance a student's higher
                education and act as mentors. Through the fund you create, you
                will be able to help students meet the financial requirements of
                their Undergraduate, Masters or PhD programs. Our team guides
                you through the process of fund creation, applicant selection
                and fund disbursement.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
