import React from "react";
import { Hidden, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import img1 from "../../assets/img/img1.png";
import img2 from "../../assets/img/img2.png";
import img3 from "../../assets/img/img3.png";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    maxWidth: theme.spacing(150),
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "-100px",
    // border: "2px solid red",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      // display: "none",
    },
  },
  first__div: {
    width: "45%",
    display: "flex",
    flexDirection: "column",
    // fontFamily: "Poppins",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      display: "block",
      width: "100%",
    },
  },
  container_one: {
    display: "flex",
    justifyContent: "space-between",
    // fontFamily: "Poppins",
    marginTop: "20px",
  },
  sub_div: {
    width: "85%",
    fontSize: "41px",
    fontWeight: "500",
    textAlign: "left",
    color: "#23252A",
    marginTop: "2%",
  },
  dash: {
    width: "10%",
    height: "4px",
    backgroundColor: "#FFC600",
    textAlign: "left",
    marginTop: "5%",
  },
  img1: {
    backgroundImage: `url(${img1})`,
    width: "100%",
    height: "100%",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  img2: {
    backgroundImage: `url(${img2})`,
    width: "100%",
    height: "550px",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  img3: {
    backgroundImage: `url(${img3})`,
    width: "100%",
    height: "550px",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  sub_div2: {
    width: "80%",
    fontSize: "18px",
    textAlign: "left",
    color: "#23252A",
    marginTop: "8%",
  },
  sub_div3: {
    width: "80%",
    fontSize: "18px",
    fontWeight: "300",
    textAlign: "left",
    color: "#23252A",
    marginTop: "6%",
  },
  button: {
    width: "70%",
    height: "65px",
    borderRadius: "6px",
    backgroundColor: "#F9C705",
    marginTop: "8%",
    marginBottom: "12%",
  },
}));
export default function ThirdAboutUsComponent() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* first container */}
      <div className={classes.container_one}>
        <div className={classes.img1}>
          <div
            className={classes.first__div}
            style={{ marginLeft: "61%", marginTop: "1%" }}
          >
            <Typography className={classes.sub_div}>
              One fill multi reuse feature
            </Typography>
            <Typography className={classes.dash}></Typography>
            <Typography className={classes.sub_div2}>
              Say goodbye to cumbersome applications! We allow you to submit the
              same application to 3 funds at a time.
            </Typography>
            <Typography>
              <Button className={classes.button}>Register Now</Button>
            </Typography>
          </div>
        </div>
      </div>
      {/* second container */}
      <div className={classes.container_one}>
        <div className={classes.img2}>
          <div
            className={classes.first__div}
            style={{ marginTop: "2%", marginLeft: "3%" }}
          >
            <Typography className={classes.sub_div} style={{ width: "60%" }}>
              All academic disciplines are welcome
            </Typography>
            <Typography className={classes.dash}></Typography>
            <Typography className={classes.sub_div2}>
              We want to help you tell a story compelling enough to get funded
              in any area of academic interest!
            </Typography>
            <Typography>
              <Button
                className={classes.button}
                style={{ marginBottom: "50px" }}
              >
                Get Funded
              </Button>
            </Typography>
          </div>
        </div>
      </div>
      {/* third container */}
      <div className={classes.container_one}>
        <div className={classes.img3}>
          <div
            className={classes.first__div}
            style={{ marginLeft: "61%", marginTop: "1%" }}
          >
            <Typography className={classes.sub_div}>
              Tell your story in a unique manner
            </Typography>
            <Typography className={classes.dash}></Typography>
            <Typography className={classes.sub_div3}>
              We take the standard application process a step further by
              providing a visual storytelling format. Show benefactors your
              world, describe your ambitions and what you hope to achieve in the
              future. We hope to highlight your voice and help you get the
              funding you need.
            </Typography>
            <Typography>
              <Button className={classes.button} style={{ marginTop: "5%" }}>
                Start Now
              </Button>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
