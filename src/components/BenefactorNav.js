import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Logo from "../assets/img/LogoWhite.svg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import ProfileBase from "./students/Profile/ProfileBase";
import ProfileCore from "./students/Profile/core/profilecore";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
// import Application from "../Application";
import { LoginContext } from "./../Context/LoginContext";
import {
  Avatar,
  Button,
  Drawer,
  Hidden,
  MenuItem,
  Tooltip,
} from "@material-ui/core";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 240;

export default function MiniDrawer({ value, handleChange }) {
  // const [alignment, setAlignment] = useState("left");
  // const [smallscreen, setSmallscreen] = useState(false);
  const myStorage = window.sessionStorage;

  let history = useHistory();

  const logindetails = useContext(LoginContext);

  // const handleAlignment = (event, newAlignment) => {
  //   setAlignment(newAlignment);
  // };

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  // console.log("login details", logindetails);

  const logout = () => {
    logindetails.setLogin(false);
    logindetails.setRoleId();
    myStorage.removeItem("userId");
    myStorage.removeItem("login");
    myStorage.removeItem("roleId");
    myStorage.removeItem("KC");
    history.push("/");
  };

  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawer(open);
  };

  const List = ({ orientation }) => {
    return (
      <>
        {logindetails.roleId == 1 ? (
          <AntTabs
            value={value}
            onChange={handleChange}
            aria-label="tabs for headers"
            orientation={orientation}
          >
            <AntTab
              label={<Typography variant="h6">Home </Typography>}
              component={Link}
              to="/homecontrol/Home"
              className={classes.Tabcheck}
            />
            <AntTab
              label={<Typography variant="h6">Profile</Typography>}
              component={Link}
              to="/homecontrol/profile"
              className={classes.Tabcheck}
            />

            <AntTab
              label={<Typography variant="h6">App</Typography>}
              component={Link}
              to="/homecontrol/application"
              className={classes.Tabcheck}
            />
            <AntTab
              label={<Typography variant="h6">Discovery</Typography>}
              component={Link}
              to="/homecontrol/discover"
              className={classes.Tabcheck}
            />
            <AntTab
              label={<Typography variant="h6">Help</Typography>}
              component={Link}
              to="/homecontrol/faq"
              className={classes.Tabcheck}
            />
          </AntTabs>
        ) : (
          <AntTabs
            value={value}
            onChange={handleChange}
            aria-label="tabs for headers"
            orientation={orientation}
          >
            <AntTab
              label={<Typography variant="h6">Home</Typography>}
              component={Link}
              to="/homecontrol/Home"
              className={classes.Tabcheck}
            />
            <AntTab
              label={<Typography variant="h6">Profile</Typography>}
              component={Link}
              to="/homecontrol/profilestudost"
              className={classes.Tabcheck}
            />

            <AntTab
              label={<Typography variant="h6">Funds</Typography>}
              component={Link}
              to="/homecontrol/launchfund"
              className={classes.Tabcheck}
            />

            <AntTab
              label={<Typography variant="h6">Help</Typography>}
              component={Link}
              to="/homecontrol/faqstudost"
              className={classes.Tabcheck}
            />
          </AntTabs>
        )}
      </>
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar>
        <div className={classes.maxwidth}>
          <Toolbar>
            <Hidden mdUp>
              <IconButton
                style={{ color: "#ffff" }}
                onClick={toggleDrawer("anchor", true)}
              >
                <MenuIcon style={{ fontSize: "35px" }} />
              </IconButton>
              <Drawer
                anchor="left"
                open={drawer}
                onClose={toggleDrawer("anchor", false)}
                className={classes.drawer}
              >
                <div
                  className={classes.nav__links__small}
                  onClick={toggleDrawer("anchor", false)}
                  onKeyDown={toggleDrawer("anchor", false)}
                >
                  <List orientation="vertical" />
                </div>
              </Drawer>
            </Hidden>
            <Link to="/homecontrol/home" style={{ textDecoration: "none" }}>
              <Button
                style={{ margin: "0px", padding: "0px", marginTop: "-10px" }}
                onClick={(e) => handleChange(e, 0)}
              >
                <img
                  src={Logo}
                  width="150px"
                  height="150px"
                  style={{
                    height: "60px",
                    objectFit: "cover",
                    overflow: "hidden",
                  }}
                />
              </Button>
            </Link>
            <div className={classes.nav__links}>
              <List orientation="horizontal" />
            </div>
            <div className={classes.grow}>
              <Link
                to={
                  logindetails.roleId == 1
                    ? "/homecontrol/profile"
                    : "/homecontrol/profilestudost"
                }
              >
                <IconButton>
                  <Avatar
                    src={
                      logindetails.avatarImage ? logindetails.avatarImage : ""
                    }
                  />
                </IconButton>
              </Link>
              <div className={classes.nameDisplay}>
                <Typography className={classes.name}>
                  {logindetails.profileName}
                </Typography>
                <Tooltip title="logout">
                  <IconButton onClick={logout} href="/">
                    <PowerSettingsNewIcon style={{ color: "white" }} />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </Toolbar>
        </div>
      </AppBar>

      <div className={classes.offset} />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  maxwidth: {
    width: "100%",
    maxWidth: "1300px",
    marginRight: "auto",
    marginLeft: "auto",
  },
  offset: theme.mixins.toolbar,
  uppertoggle: {
    marginTop: theme.spacing(1),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    marginRight: "auto",
    marginLeft: "auto",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  grow: {
    display: "flex",
    flexGrow: "1",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  nav__links: {
    // border: "2px solid red",
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      width: "100%",
      justifyContent: "flex-end",
    },
  },

  links: {
    textDecoration: "none",
    color: "#ffff",
    border: "2px solid red",
    width: "100%",
    height: "100%",
  },
  drawer: {
    // backgroundColor: theme.palette.primary.main,
    // maxWidth: "40%",
    // marginTop: "65px",
  },
  nav__links__small: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    paddingTop: "50%",
  },
  name: {
    width: "18vh",
    marginTop: "12px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  nameDisplay: {
    display: "flex",
  },
  Tabcheck: {
    "&:hover": {
      textDecoration: "none",
    },
  },
}));

const AntTabs = withStyles({
  root: {
    // borderBottom: "1px solid #e8e8e8",
  },
  indicator: {
    backgroundColor: "#ffff",
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    // fontFamily: [
    //   "-apple-system",
    //   "BlinkMacSystemFont",
    //   '"Segoe UI"',
    //   "Roboto",
    //   '"Helvetica Neue"',
    //   "Arial",
    //   "sans-serif",
    //   '"Apple Color Emoji"',
    //   '"Segoe UI Emoji"',
    //   '"Segoe UI Symbol"',
    // ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&$selected": {
      color: "#ffff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#ffff",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);
