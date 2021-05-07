import React, { useState, useContext } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import PersonIcon from "@material-ui/icons/Person";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";
import LiveHelpOutlinedIcon from "@material-ui/icons/LiveHelpOutlined";
// import ProfileBase from "./ProfileBase";
// import ProfileCore from "../ProfileDrawer";
import { Link, useHistory } from "react-router-dom";
// import ProfileBase from "./students/Profile/ProfileBase";
// import ProfileCore from "./students/Profile/core/profilecore";
// import ToggleButton from "@material-ui/lab/ToggleButton";
// import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
// import PersonAddIcon from "@material-ui/icons/PersonAdd";
// import Application from "../Application";
import { Hidden } from "@material-ui/core";
import { LoginContext } from "./../Context/LoginContext";
import { Avatar, Tooltip } from "@material-ui/core";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  offset: theme.mixins.toolbar,
  uppertoggle: {
    marginTop: theme.spacing(1),
  },
  maxwidth: {
    width: "100%",
    maxWidth: "1300px",
    marginRight: "auto",
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
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
    width: theme.spacing(5) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    marginRight: "auto",
    marginLeft: "auto",
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
}));

export default function MiniDrawer({ email }) {
  const logindetails = useContext(LoginContext);

  let history = useHistory();

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    logindetails.setLogin(false);
    history.push("/");
    logindetails.setRoleId();
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.maxwidth}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography variant="h4" noWrap style={{ color: "white" }}>
                Studost
              </Typography>
            </Link>

            <div className={classes.grow}>
              <Typography>{logindetails.profileName}</Typography>
              <Link to="/homecontrol/profile">
                <IconButton>
                  <Avatar
                    src={
                      logindetails.avatarImage ? logindetails.avatarImage : ""
                    }
                  />
                </IconButton>
              </Link>
              <Tooltip title="logout">
                <IconButton onClick={logout}>
                  <PowerSettingsNewIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      <Hidden mdDown>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <Listitems />
          <Divider />
        </Drawer>
      </Hidden>
      <Hidden mdUp>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          // classes={{
          //   paper: classes.drawerPaper,
          // }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <Listitems />
          <Divider />
        </Drawer>
      </Hidden>
      <div className={classes.offset} />
    </div>
  );
}

const Listitems = () => {
  return (
    <List>
      <Link to="/homecontrol/profile" style={{ textDecoration: "none" }}>
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="PROFILE" style={{ color: "black" }} />
        </ListItem>
      </Link>
      <Link to="/homecontrol/application" style={{ textDecoration: "none" }}>
        <ListItem button>
          <ListItemIcon>
            <DeveloperBoardIcon />
          </ListItemIcon>
          <ListItemText primary="APPLICATION" style={{ color: "black" }} />
        </ListItem>
      </Link>
      <Link to="/homecontrol/discover" style={{ textDecoration: "none" }}>
        <ListItem button>
          <ListItemIcon>
            <PublicOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="DISCOVER" style={{ color: "black" }} />
        </ListItem>
      </Link>
      <Link to="/homecontrol/faq" style={{ textDecoration: "none" }}>
        <ListItem button>
          <ListItemIcon>
            <LiveHelpOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="FAQ" style={{ color: "black" }}/>
        </ListItem>
      </Link>
      {/* <Link to="/homecontrol/discover" style={{ textDecoration: "none" }}>
      <ListItem button>
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText primary="INBOX" />
      </ListItem>
      </Link> */}
    </List>
  );
};
