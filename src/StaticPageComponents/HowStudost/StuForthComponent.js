import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import img4 from "../../assets/img/img4.png";
import img5 from "../../assets/img/img5.png";
import girlStudent from "../../assets/img/girlStudent.jpg";
import education from "../../assets/img/education.jpg";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    // display: "flex",
    marginLeft: "5%",
    [theme.breakpoints.up("md")]: {
      display: "block",
      marginLeft: "0",
    },
  },
  first__div: {
    width: "45%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Poppins",
    justifyContent: "space-between",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  container_one: {
    display: "flex",
    justifyContent: "space-between",
    fontFamily: "Poppins",
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
  img4: {
    backgroundImage: `url(${img4})`,
    width: "100%",
    height: "100%",
  },
  img5: {
    backgroundImage: `url(${img5})`,
    width: "100%",
    height: "550px",
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
    marginTop: theme.spacing(1),
    // marginBottom: "12%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  firstBox: {
    height: "65vh",
    margin: theme.spacing(5, 0, 5, 0),
    [theme.breakpoints.down("md")]: {
      height: "auto",
    },
  },
  blueBackBox: {
    maxWidth: "80%",
    height: "100%",
    backgroundColor: "#eff8fd",
    marginLeft: "auto",
    display: "flex",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
  blueBackBox2: {
    maxWidth: "80%",
    height: "100%",
    backgroundColor: "#eff8fd",
    marginRight: "auto",
    display: "flex",
  },
  imageCOntainerDiv: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    maxWidth: "40%",
    [theme.breakpoints.down("md")]: {
      // maxWidth: "100%",
      display: "none",
    },
  },
  bodyTex: {
    padding: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
    },
  },
}));
function LastPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.firstBox}>
        <div className={classes.blueBackBox}>
          <div className={classes.imageCOntainerDiv}>
            <img
              src={girlStudent}
              style={{ height: "80%", objectFit: "cover", marginLeft: "-50%" }}
            />
          </div>
          <div className={classes.bodyTex}>
            <Typography className={classes.sub_div}>
              Give Back in a New Way
            </Typography>
            <Typography className={classes.dash}></Typography>
            <Typography className={classes.sub_div2}>
              No more detached donations! Uplift students with incredible
              stories that move you.
            </Typography>
            <Button className={classes.button}>
              <Typography>REGISTER NOW</Typography>
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.firstBox}>
        <div className={classes.blueBackBox2}>
          <div className={classes.bodyTex}>
            <Typography className={classes.sub_div}>
              Transparency & Support
            </Typography>
            <Typography className={classes.dash}></Typography>
            <Typography className={classes.sub_div2}>
              Our team provides end-to-end guidance to help you launch funds to
              attract the best talent. We recommend fund amounts, application
              requirements and student demographics to target based on our close
              interaction with aspiring students. We are highly transparent
              throughout the fund disbursement process on our platform.
            </Typography>
            <Button className={classes.button}>
              <Typography>FUND A STUDENT</Typography>
            </Button>
          </div>
          <div className={classes.imageCOntainerDiv}>
            <img
              src={education}
              style={{ height: "80%", objectFit: "cover", marginRight: "-50%" }}
            />
          </div>
        </div>
      </div>
      {/* first container
      <div className={classes.container_one}> */}
      {/* <div className={classes.img4}> */}
      {/* <div
          className={classes.first__div}
          style={{ marginLeft: "61%", marginTop: "1%" }}
        ></div> */}
      {/* </div> */}
      {/* </div> */}
      {/* second container */}
      {/* <div className={classes.container_one}>
        <div className={classes.img5}>
          <div
            className={classes.first__div}
            style={{ marginTop: "2%", marginLeft: "3%" }}
          >
            <Typography
              className={classes.sub_div}
              style={{ width: "60%" }}
            ></Typography>
            <Typography className={classes.dash}></Typography>
            <Typography className={classes.sub_div2}>
              Our team provides end-to-end guidance to help you launch funds to
              attract the best talent. We recommend fund amounts, application
              requirements and student demographics to target based on our close
              interaction with aspiring students. We are highly transparent
              throughout the fund disbursement process on our platform.
            </Typography>
            <Typography>
              <Button
                className={classes.button}
                style={{ marginBottom: "50px" }}
              >
                FUND A STUDENT
              </Button>
            </Typography>
          </div>
        </div>
      </div> */}
    </div>
  );
}
export default LastPage;
