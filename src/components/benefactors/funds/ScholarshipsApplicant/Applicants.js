import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import {
  Button,
  Grid,
  Badge,
  IconButton,
  Tooltip,
  Avatar,
  Checkbox,
} from "@material-ui/core";

const Applicants = (applicant) => {
  const classes = useStyles();
  // console.log("where is --", applicant);
  // {applicant && applicant.map((student,index)=>{console.log("index",index,student)})}
  // console.log(applicant.applicant.dateOfSubmission);
  return (
    <div className={classes.main_root}>
      {/* <Tablink /> */}

      <Card className={classes.root}>
        <CardMedia className={classes.cover}>
          <Avatar
            variant="square"
            style={{ width: "100%", height: "100%" }}
            // src={}
          ></Avatar>
        </CardMedia>
        <div className={classes.details} style={{ marginLeft: "80px" }}>
          <CardContent className={classes.content}>
            <Typography color="textSecondary" className={classes.heading2}>
              {/* {values.scholarshipAim} */}
            </Typography>
            <Typography
              variant="subtitle1"
              className={classes.heading__smaller}
              color="textSecondary"
            >
              <b>Name</b>
              {/* <b>Duration :</b> {values.durationInYears} years
                  {values.durationInMonths} months */}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className={classes.heading__smaller}
            >
              <b>Date of Submission :</b>
              {applicant.applicant.dateOfSubmission}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className={classes.heading__smaller}
            >
              {/* <b>Studost :</b> {values.benefactorName} */}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className={classes.amount}
            >
              {/* <b>Fund Amount : Rs {values.amount}</b> */}
            </Typography>
          </CardContent>
        </div>
        <Checkbox
          color="primary"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
      </Card>
    </div>
  );
};

export default Applicants;

const useStyles = makeStyles((theme) => ({
  main_root: {
    display: "flex",
    justifyContent: "center",
  },
  root: {
    display: "flex",
    margin: theme.spacing(2, 1, 2, 8),
    borderRadius: theme.spacing(2),
    minWidth: "50%",
    minWidth: "70%",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  content: {
    width: "100%",
  },
  cover: {
    width: 300,
  },

  amount: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    // fontSize: theme.typography.pxToRem(12),
    // fontWeight: theme.typography.fontWeightRegular,
  },
  heading__smaller: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  heading__card: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
  heading2: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
