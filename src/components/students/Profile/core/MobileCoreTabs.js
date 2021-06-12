import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography/Typography";

import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import TranslateOutlinedIcon from "@material-ui/icons/TranslateOutlined";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import BallotOutlinedIcon from "@material-ui/icons/BallotOutlined";
import RecordVoiceOverOutlinedIcon from "@material-ui/icons/RecordVoiceOverOutlined";
import PublishOutlinedIcon from "@material-ui/icons/PublishOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import bio from "../../../../assets/img/bio.png";
import awards from "../../../../assets/img/awards.png";
import education from "../../../../assets/img/education.png";
import recom from "../../../../assets/img/recom.png";
import pro from "../../../../assets/img/pro.png";
import language from "../../../../assets/img/language.png";
import upload from "../../../../assets/img/upload.png";

import { Link, useHistory } from "react-router-dom";
import Bio from "./Bio";

const AntTabs = withStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#3586ff",
    color: "#ffff",
    width: "200px",
    borderRadius: "6px",
    minHeight: "100vh",
    padding: "0px , 20px , 0px, 20px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "0px",
      minHeight: "auto",
    },
  },
  indicator: {
    backgroundColor: "transparent",
  },
}))(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    minWidth: 72,
    color: "#ffff",
    fontFamily: "Poppins",
    fontSize: "13px",
    fontWeight: "500",
    height: "32px",
    minHeight: "1px",
    textDecoration: "none",
    borderRadius: "6px",
    marginBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0px",
      height: "auto",
    },
    "&:hover": {
      color: "#ffffff",
      textDecoration: "none",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    "&$selected": {
      backgroundColor: "rgba(255,255,255,0.3)",
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
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
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

const useStyles = makeStyles((theme) => ({
  tabs: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  img: {
    height: "18px",
  },
  imgdiv: {
    width: "50px",
  },
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [orientation, setOrientation] = useState("vertical");

  const x = window.matchMedia("(max-width: 999px)");
  useEffect(() => {
    if (x.matches == true) {
      setOrientation("horizontal");
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static" color="default">
      <AntTabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="on"
        indicatorColor="primary"
        textColor="primary"
        aria-label="scrollable force tabs example"
        orientation={orientation}
      >
        <AntTab
          label={
            <div className={classes.tabs}>
              <div className={classes.imgdiv}>
                <img className={classes.img} src={bio} />
              </div>
              Bio
            </div>
          }
          component={Link}
          to="/homecontrol/profile/profilecore/bio"
        />
        <AntTab
          label={
            <div className={classes.tabs}>
              <div className={classes.imgdiv}>
                <img className={classes.img} src={pro} />
              </div>
              Professional
            </div>
          }
          component={Link}
          to="/homecontrol/profile/profilecore/professional"
        />
        <AntTab
          label={
            <div className={classes.tabs}>
              <div className={classes.imgdiv}>
                <img className={classes.img} src={education} />
              </div>
              Education
            </div>
          }
          component={Link}
          to="/homecontrol/profile/profilecore/education"
        />

        <AntTab
          label={
            <div className={classes.tabs}>
              <div className={classes.imgdiv}>
                <img className={classes.img} src={language} />
              </div>
              Language
            </div>
          }
          component={Link}
          to="/homecontrol/profile/profilecore/language"
        />

        <AntTab
          label={
            <div className={classes.tabs}>
              <div className={classes.imgdiv}>
                <img className={classes.img} src={awards} />
              </div>
              Awards
            </div>
          }
          component={Link}
          to="/homecontrol/profile/profilecore/awards"
        />
        <AntTab
          label={
            <div className={classes.tabs}>
              <div className={classes.imgdiv}>
                <img className={classes.img} src={recom} />
              </div>
              Recommendation
            </div>
          }
          component={Link}
          to="/homecontrol/profile/profilecore/recommendation"
        />
        <AntTab
          label={
            <div className={classes.tabs}>
              <div className={classes.imgdiv}>
                <img className={classes.img} src={upload} />
              </div>
              Documents
            </div>
          }
          component={Link}
          to="/homecontrol/profile/profilecore/documents"
        />
      </AntTabs>
    </AppBar>
  );
}
