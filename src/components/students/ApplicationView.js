import { Button, Container } from "@material-ui/core";
import React, { useEffect } from "react";
import Nav from "../Nav";
import Navbar from "./Navbar";
import Tablinks from "./application/Tablinks";
import { makeStyles } from "@material-ui/core/styles";
import ProfileCard from "../atoms/ProfileCard";
import { Link } from "react-router-dom";
import SettingsIcon from "@material-ui/icons/Settings";
import CreateIcon from "@material-ui/icons/Create";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0",
    margin: "0",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "80vh",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      marginRight: "auto",
      marginLeft: "auto",
      justifyContent: "space-between",
    },
  },
}));

function Application({ handleChange }) {
  useEffect(() => {
    handleChange("a", 2);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Link style={{ textDecoration: "none" }} to="/homecontrol/discover">
        <ProfileCard heading={"New Application"} avatar={CreateIcon} />
      </Link>
      <Link
        style={{ textDecoration: "none" }}
        to="/homecontrol/application/manage"
      >
        <ProfileCard heading={"Manage Application"} avatar={SettingsIcon} />
      </Link>
    </div>
  );
}

export default Application;
