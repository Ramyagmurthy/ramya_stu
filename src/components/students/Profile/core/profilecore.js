import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Paper from "@material-ui/core/Paper";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import CorePersonal from "./CorePersonal";
import Bio from "./Bio";
import Education from "./Education";
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
import { ToggleButtonGroup } from "@material-ui/lab";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { Grid, Hidden, IconButton, Tab, Tabs } from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import Professional from "./Professional";
import Language from "./Language";
import MobileCoreTabs from "./MobileCoreTabs";
import ExperienceAbroad from "./Experience";
import Awards from "./Awards";
import Recommendation from "./Recomandation";
import Documents from "./Documents";
import Video from "./Video";
import Submission from "./Submission";
// import { Route } from "./../../../../Route";
import { useHistory } from "react-router-dom";
import ProfileBase from "../ProfileBase";
import { DriveEtaSharp } from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      margin: "-24px",
      padding: "0px",
    },
  },

  drawer: {
    marginTop: theme.spacing(5),
    maxWidth: theme.spacing(25),
    // maxHeight: theme.spacing(70),
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      margin: "0px",
      maxWidth: "100%",
      // position: "fixed",
      // top: "0",
    },
  },
  drawerPaper: {
    width: theme.spacing(20),
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    width: "100%",
    // padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      padding: "0",
      margin: "0",
    },

    // display: "flex",
  },
  Link: {
    textDecoration: "none",
  },
}));

export default function ProfileCore({ handleChange }) {
  useEffect(() => {
    // handleChange("a", 1);
  }, []);

  let history = useHistory();
  const classes = useStyles();
  const [view, setView] = useState("list");
  const [moDrawer, setMoDrawer] = useState(false);
  const openCore = () => {
    setMoDrawer(!moDrawer);
  };

  const handleChangeToggle = (event, nextView) => {
    setView(nextView);
  };

  const Lists = () => {
    return (
      <List>
        {/* <Link to="/homecontrol/profile/" style={{ textDecoration: "none" }}>
          <ListItem button style={{ color: "grey" }} active>
            <ListItemText primary="Base" />
            <PermIdentityIcon />
          </ListItem>
        </Link>
        <Divider /> */}
        <Link to="/homecontrol/profile/" style={{ textDecoration: "none" }}>
          <ListItem button style={{ color: "grey" }} active>
            <ListItemText primary="Personal" />
            <PermIdentityIcon />
          </ListItem>
        </Link>
        <Divider />
        <Link
          to="/homecontrol/profile/profilecore/bio"
          style={{ textDecoration: "none" }}
        >
          <ListItem button style={{ color: "grey" }}>
            <ListItemText primary="Bio" />
            <FingerprintIcon />
          </ListItem>
        </Link>
        <Divider />
        <Link
          to="/homecontrol/profile/profilecore/video"
          style={{ textDecoration: "none" }}
        >
          <ListItem button style={{ color: "grey" }}>
            <ListItemText primary="Video" />
            <VideocamOutlinedIcon />
          </ListItem>
        </Link>
        <Divider />
        <Link
          to="/homecontrol/profile/profilecore/education"
          style={{ textDecoration: "none" }}
        >
          <ListItem button style={{ color: "grey" }}>
            <ListItemText primary="Education" />
            <SchoolOutlinedIcon />
          </ListItem>
        </Link>
        <Divider />
        <Link
          to="/homecontrol/profile/profilecore/professional"
          style={{ textDecoration: "none" }}
        >
          <ListItem button style={{ color: "grey" }}>
            <ListItemText primary="Pro Experience" />
            <WorkOutlineOutlinedIcon />
          </ListItem>
        </Link>

        <Divider />
        <Link
          to="/homecontrol/profile/profilecore/language"
          style={{ textDecoration: "none" }}
        >
          <ListItem button style={{ color: "grey" }}>
            <ListItemText primary="Language" />
            <TranslateOutlinedIcon />
          </ListItem>
        </Link>
        <Divider />

        <Link
          to="/homecontrol/profile/profilecore/awards"
          style={{ textDecoration: "none" }}
        >
          <ListItem button style={{ color: "grey" }}>
            <ListItemText primary="Awards" />
            <CheckOutlinedIcon />
          </ListItem>
        </Link>
        <Divider />

        <Link
          to="/homecontrol/profile/profilecore/recommendation"
          style={{ textDecoration: "none" }}
        >
          <ListItem button style={{ color: "grey" }}>
            <ListItemText primary=" Recommendations" />
            <RecordVoiceOverOutlinedIcon />
          </ListItem>
        </Link>
        <Divider />
        <Link
          to="/homecontrol/profile/profilecore/documents"
          style={{ textDecoration: "none" }}
        >
          <ListItem button style={{ color: "grey" }}>
            <ListItemText primary="Documents" />
            <DescriptionOutlinedIcon />
          </ListItem>
        </Link>
        <Divider />
        <Link
          to="/homecontrol/profile/profilecore/submission"
          style={{ textDecoration: "none" }}
        >
          <ListItem button style={{ color: "grey" }}>
            <ListItemText primary="Submission" />
            <PublishOutlinedIcon />
          </ListItem>
        </Link>
      </List>
    );
  };

  return (
    <Router>
      {/* <Hidden mdUp> 
      <MobileCoreTabs />
       </Hidden> */}
      <div className={classes.root}>
        <div className={classes.drawer}>
          {/* <Hidden mdDown>
            <div className={classes.drawerContainer}>
              <Lists />
            </div>
          </Hidden> */}
          <MobileCoreTabs />
        </div>

        <main className={classes.content}>
          <Switch>
            {/* <Route exact path="/homecontrol/profile/" component={ProfileBase} /> */}
            <Route exact path="/homecontrol/profile/">
              <Redirect to="/homecontrol/profile/profilecore/bio" />
            </Route>
            <Route
              path="/homecontrol/profile/profilecore/bio"
              component={Bio}
            />
            <Route
              path="/homecontrol/profile/profilecore/video"
              component={Video}
            />
            <Route
              path="/homecontrol/profile/profilecore/education"
              component={Education}
            />
            <Route
              path="/homecontrol/profile/profilecore/professional"
              component={Professional}
            />
            <Route
              path="/homecontrol/profile/profilecore/language"
              component={Language}
            />
            <Route
              path="/homecontrol/profile/profilecore/experience"
              component={ExperienceAbroad}
            />
            <Route
              path="/homecontrol/profile/profilecore/awards"
              component={Awards}
            />
            <Route
              path="/homecontrol/profile/profilecore/recommendation"
              component={Recommendation}
            />
            <Route
              path="/homecontrol/profile/profilecore/documents"
              component={Documents}
            />
            <Route
              exact
              path="/homecontrol/profile/profilecore/submission"
              component={Submission}
            />
          </Switch>
        </main>
      </div>
    </Router>
  );
}
