import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
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
import { ProtectedRoute } from "../../../ProtectedRoute";
import axios from "axios";
import { Hidden } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";
import PeopleIcon from "@material-ui/icons/People";
import AppsIcon from "@material-ui/icons/Apps";

const AntTabs = withStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "55px",
    backgroundColor: "#f3f3f",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      paddingLeft: "10px",
      paddingTop: "10px",
      justifyContent: "center",
    },
  },
  indicator: {
    backgroundColor: "transparent",
  },
}))(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    minWidth: 72,
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: "500",
    height: "32px",
    minHeight: "1px",
    borderRadius: "5px",
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
      textDecoration: "none",
    },
    "&$selected": {
      backgroundColor: "#3586ff",
      color: "white",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

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
    width: "auto",
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("md")]: {
      margin: "0px",
    },
  },
  label: {
    minWidth: "150px",
    display: "flex",
    justifyContent: "space-around",
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
    <Router>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <AntTabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="full width tabs example"
          >
            <AntTab
              label={
                <div className={classes.label}>
                  <PeopleIcon />
                  PUBLIC FORM
                </div>
              }
              {...a11yProps(0)}
              component={Link}
              to="/homecontrol/profile/"
            />

            <AntTab
              label={
                <div className={classes.label}>
                  <AppsIcon />
                  Main Application
                </div>
              }
              {...a11yProps(1)}
              component={Link}
              to="/homecontrol/profile/profilecore/bio"
            />
          </AntTabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <ProfileBase />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <ProfileCore />
          </TabPanel>
        </SwipeableViews>
      </div>
    </Router>
  );
}
