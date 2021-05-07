import { Container } from "@material-ui/core";
import React from "react";
import Nav from "../Nav";
import Navbar from "./Navbar";
import Tablinks from "./application/Tablinks";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  application__body: {
    marginLeft: "50px",
    // backgroundColor: "#f1f2f5",
    // maxWidth: "1350px",
    // marginRight: "auto",
    // marginLeft: "auto",
    [theme.breakpoints.down("md")]: {
      marginLeft: "0",
    },
  },
}));

function Application() {
  const classes = useStyles();
  return (
    <>
      {/* <Nav /> */}
      <div className={classes.application__body}>
        <Tablinks />
      </div>
    </>
  );
}

export default Application;
