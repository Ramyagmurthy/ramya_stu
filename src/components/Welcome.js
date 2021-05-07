import React, { useState, useEffect, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { LoginContext } from "../Context/LoginContext";
import { Button, Paper, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function Welcome({ handleChange }) {
  const logindetails = useContext(LoginContext);
  //   console.log(logindetails);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    handleChange("a", 0);
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.firstbody} elevation={3}>
          <Typography variant="h3">
            Welcome
            {"  " + (logindetails.profileName ? logindetails.profileName : "")}
          </Typography>
        </Paper>
        <Paper className={classes.secondBody}>
          <div className={classes.secondBody__header}>
            <Typography variant="h4">Start Your Studost Journey</Typography>
          </div>
          <div>
            <div className={classes.points}>
              <div
                className={classes.secondBody__points}
                style={{ justifyContent: "flex-start" }}
              >
                <Link
                  className={classes.links__class}
                  to={
                    logindetails.roleId == 1
                      ? "/homecontrol/profile"
                      : "/homecontrol/profilestudost"
                  }
                >
                  <Typography variant="h6">
                    1. Tell Us About Yourself
                  </Typography>
                </Link>
              </div>
              <div
                className={classes.secondBody__points}
                style={{ justifyContent: "flex-end" }}
              >
                <Link
                  className={classes.links__class}
                  to={{
                    pathname:
                      logindetails.roleId == 1
                        ? "/homecontrol/discover"
                        : "/homecontrol/launchfund",
                    state: { hi: 1 },
                  }}
                >
                  {logindetails.roleId == 1 ? (
                    <Typography variant="h6">2. Discover Funds</Typography>
                  ) : (
                    <Typography variant="h6">2. Yours Funds</Typography>
                  )}
                </Link>
                {/* <Typography variant="h6"> 2</Typography> */}
              </div>
              <div
                className={classes.secondBody__points}
                style={{ justifyContent: "flex-start" }}
              >
                {/* <Typography variant="h6"> 3</Typography> */}
                <Link
                  className={classes.links__class}
                  to={
                    logindetails.roleId == 1
                      ? "/homecontrol/application"
                      : "/homecontrol/launchfund1"
                  }
                >
                  {logindetails.roleId == 1 ? (
                    <Typography variant="h6">
                      3. Start Yours Application
                    </Typography>
                  ) : (
                    <Typography variant="h6">3. Launch Funds</Typography>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </Paper>
        <Paper className={classes.thirdbody} elevation={3}>
          <Typography variant="h4">Have a Question?</Typography>
          <Link
            className={classes.links__class}
            to={
              logindetails.roleId == 1
                ? "/homecontrol/faq"
                : "/homecontrol/faqstudost"
            }
          >
            <Typography variant="h6">Refer to FAQ's</Typography>
          </Link>
        </Paper>
      </div>
    </>
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
}));
