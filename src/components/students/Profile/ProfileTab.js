import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ProfileBase from "./ProfileBase";
import ProfileCore from "./core/profilecore";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MiniDrawer from "../../Nav";
import { LoginContext } from "../../../Context/LoginContext";
import axios from "axios";
import { Hidden } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    // backgroundImage: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",

    width: "auto",
    margin: "0px 0px 0px 50px",
    ...theme.mixins.toolbar,

    [theme.breakpoints.down("md")]: {
      width: "md",
      margin: "0px",
    },

    body: {
      //   width: matchMedia,
      [theme.breakpoints.down("md")]: {
        margin: 0,
      },
    },
    disabled__class: {
      // color: "red",
    },
  },
}));

export default function ProfileTab() {
  const [data, setData] = useState("");

  const logindetails = useContext(LoginContext);
  // console.log(logindetails);

  useEffect(() => {
    checkingNewUSer();
  }, []);

  const checkingNewUSer = () => {
    if (logindetails.userData.studentId) {
      setDisabled(false);
    }
    // console.log("user info", typeof logindetails.userData);
  };

  const matches = useMediaQuery("(min-width:500px)");
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [disabled, setDisabled] = useState(true);
  let history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root} style={{ width: matches }}>
      <AppBar
        position="static"
        color="default"
        style={{ width: "330px", borderRadius: "10px" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          // variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Base" {...a11yProps(0)} />

          <Tab
            label="Core"
            {...a11yProps(1)}
            disabled={disabled}
            className={disabled ? classes.disabled__class : null}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ProfileBase masterData={data.studentBasicProfileDto} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ProfileCore masterData={data} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
