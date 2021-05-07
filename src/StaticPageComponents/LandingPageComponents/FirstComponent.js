import image from "./../../assets/img/Studost-Banners.png";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import React, { useState } from "react";
import smallImage from "./../../assets/img/coverSmall.jpg";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Logo from "../../assets/img/Logo.svg";

import {
  AppBar,
  Typography,
  Button,
  Hidden,
  IconButton,
  Divider,
  Select,
  Paper,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MouseOutlinedIcon from "@material-ui/icons/MouseOutlined";
import { useHistory, Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import Popover from "@material-ui/core/Popover";
import SimpleDailog from "./../DailogBox/DailogBox";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CloseIcon from "@material-ui/icons/Close";
import Popper from "@material-ui/core/Popper";

export default function LandingView() {
  const classes = useStyles();

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleClose2 = () => {
    setOpen2(false);
  };

  // const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickHowTo = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseHowTo = () => {
    setAnchorEl(null);
  };

  // drop down
  const [open, setOpen] = React.useState(false);
  const [logOpen, setLogOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const anchorRef2 = React.useRef(null);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleLoginToggle = () => {
    setLogOpen((prevOpen) => !prevOpen);
  };

  const handleLoginClose = (event) => {
    if (anchorRef2.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setLogOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
      anchorRef2.current.focus();
      anchorRef3.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const [openAbout, setOpenAbout] = React.useState(false);

  const anchorRef3 = React.useRef(null);

  const handleToggleAbout = () => {
    setOpenAbout(!openAbout);
  };

  const handleCloseAbout = (event) => {
    if (anchorRef3.current && anchorRef3.current.contains(event.target)) {
      return;
    }

    setOpenAbout(false);
  };

  const [openNewUser, setOpenNewUser] = React.useState(false);

  const handleToggleNewUser = () => {
    setLogOpen(false);
    setOpenNewUser(!openNewUser);
  };

  const handleCloseNewUser = (event) => {
    if (anchorRef2.current && anchorRef2.current.contains(event.target)) {
      return;
    }

    setOpenNewUser(false);
  };

  return (
    <>
      {/* {open && <SimpleDailog open3={open} setOpen3={setOpen} />} */}
      {/* <Dialog
        className={classes.topDialogue}
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <List>
          <Link to="/signin" style={{ textDecoration: "none", color: "grey" }}>
            <ListItem autoFocus button>
              <ListItemText
                style={{ textAlign: "center" }}
                primary={"Existing User ?"}
              />
            </ListItem>
          </Link>
          <ListItem
            autoFocus
            button
            onClick={() => {
              setOpen2(true);
              setOpen(false);
            }}
          >
            <ListItemText
              style={{ color: "grey", textAlign: "center" }}
              primary={"New User?"}
            />
          </ListItem>
        </List>
      </Dialog>

      <Dialog
        className={classes.topDialogue}
        onClose={handleClose2}
        aria-labelledby="simple-dialog-title"
        open={open2}
      >
        <DialogTitle id="simple-dialog-title">Sign Up as a?</DialogTitle>
        <List>
          <Link to="/signup/student" style={{ textDecoration: "none" }}>
            <ListItem autoFocus button>
              <ListItemText style={{ textAlign: "center" }} primary="Student" />
            </ListItem>
          </Link>
          <Link to="/signup/studost" style={{ textDecoration: "none" }}>
            <ListItem autoFocus button>
              <ListItemText style={{ textAlign: "center" }} primary="Studost" />
            </ListItem>
          </Link>
        </List>
      </Dialog> */}
      <div className={classes.hero__image} />
      <div className={classes.hero__image__gradient} />
      <div className={classes.main__body}>
        <div className={classes.nav__bar}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Typography className={classes.logo__header}>StuDost</Typography>
          </Link>
          <Hidden smUp>
            <IconButton style={{ color: "white" }} onClick={handleDrawer}>
              <MenuIcon className={classes.logo__header} />
            </IconButton>
            <Drawer anchor="right" open={openDrawer} onClose={handleDrawer}>
              <List
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "60vh",
                  minWidth: "150px",
                  justifyContent: "space-evenly",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <IconButton onClick={handleDrawer}>
                    <CloseIcon className={classes.logo__header} />
                  </IconButton>
                </div>
                <ListItem button>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/"
                  >
                    Home
                  </Link>
                </ListItem>
                <Divider />
                <ListItem button>
                  <Link
                    to="/about"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    About
                  </Link>
                </ListItem>
                <Divider />
                <Link
                  to="/student"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListItem button>Find a Scholarship</ListItem>
                </Link>
                <Divider />
                <Link
                  to="/studost"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListItem button>Fund a Student</ListItem>
                </Link>
                <Divider />
                <Link
                  to="/contactus"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListItem>Contact Us</ListItem>
                </Link>
                <Divider />
                <ListItem
                  button
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Sign in
                </ListItem>
                <Divider />
              </List>
            </Drawer>
          </Hidden>
          <div className={classes.app__tools}>
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              <Typography
                className={classes.banner__links}
                style={{ borderBottom: "2px solid white" }}
              >
                HOME
              </Typography>
            </Link>

            <Typography
              className={classes.banner__links}
              style={{ cursor: "pointer" }}
              ref={anchorRef3}
              aria-controls={openAbout ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggleAbout}
            >
              ABOUT
            </Typography>
            <Popper
              open={openAbout}
              anchorEl={anchorRef3.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleCloseAbout}>
                      <MenuList
                        autoFocusItem={openAbout}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleCloseAbout}>
                          <Link
                            to="/about"
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            Over View
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={handleCloseAbout}>
                          <Link
                            to="/about"
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            Our Team
                          </Link>
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
            {/* <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="menu-list-grow"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem onClick={handleClose}>Profile</MenuItem>
                          <MenuItem onClick={handleClose}>My account</MenuItem>
                          <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper> */}

            <Typography
              className={classes.banner__links}
              style={{ cursor: "pointer" }}
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              HOW IT WORKS
            </Typography>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleClose}>
                          <Link
                            to="/student"
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            Find a Scholarship
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <Link
                            to="/studost"
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            Fund a Student
                          </Link>
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
            <Link
              to="/contactus"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Typography className={classes.banner__links}>
                CONTACT US
              </Typography>
            </Link>
            <Button
              variant="contained"
              // onClick={() => {
              //   setLogOpen(true);
              // }}
              className={classes.login__button}
              style={{ cursor: "pointer" }}
              ref={anchorRef2}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleLoginToggle}
            >
              LOGIN
            </Button>
            <Popper
              open={logOpen}
              anchorEl={anchorRef2.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleLoginClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleLoginClose}>
                          <Link
                            to="/signin"
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            Existing User ?
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={handleToggleNewUser}>
                          
                          
                            New User ?
                          
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
            <Popper
              open={openNewUser}
              anchorEl={anchorRef2.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleCloseNewUser}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleCloseNewUser}>
                          <Link
                            to="/student/signup"
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            Student ?
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNewUser}>
                          <Link
                            to="/studost/signup"
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            Studost ?
                          </Link>
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </div>
        <div className={classes.Hero__lettering}>
          <Typography
            className={classes.Hero__lettering__first}
            style={{ marginTop: "50px" }}
          >
            <i>
              Discover unique funding and exceptional mentorship opportunities
              to unlock the next stage of your educational journey.
            </i>
          </Typography>
          {/* <div className={classes.hero__second__conatiner}>
            <Typography className={classes.Hero__lettering__second}>
              Connecting Potential Student With Studost to Empower Professional
              Growth
            </Typography>
          </div> */}

          <div className={classes.mouseBox}>
            <MouseOutlinedIcon
              style={{ fontSize: "50px", marginTop: "10px" }}
            />
            <ArrowBackIosIcon
              style={{
                fontSize: "30px",
                marginTop: "-10px",
                transform: "rotate(270deg)",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0px",
  },
  hero__image: {
    width: "100%",
    height: "100VH",
    backgroundImage: `url(https://d3nn873nee648n.cloudfront.net/900x600/18718/220-SM855328.jpg)`,
    backgroundSize: "100%",
    zIndex: "-2",
    position: "absolute",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down("sm")]: {
      backgroundImage: `url(${smallImage})`,
      backgroundSize: "cover",
    },
  },
  hero__image__gradient: {
    width: "100%",
    height: "100VH",
    backgroundSize: "100%",
    zIndex: "-1",
    position: "absolute",
    opacity: "0.76",
    backdropFilter: "blur(6.5px)",
    backgroundImage: " linear-gradient(304deg, #228da3 15%, #28a70a)",
    backgroundRepeat: "no-repeat",
  },
  main__body: {
    paddingTop: theme.spacing(2),
    width: "90%",
    maxWidth: theme.spacing(180),
    marginRight: "auto",
    marginLeft: "auto",
    height: "100vh",
    color: "white",
  },
  nav__bar: {
    width: "100%",
    height: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  login__button: {
    backgroundColor: "#f9c90f",
    color: "#575757",
    fontSize: theme.spacing(1.75),
    padding: theme.spacing(0.5, 4),
    borderRadius: "20px",
  },
  app__tools: {
    width: "60%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  logo__header: {
    fontSize: theme.spacing(4),
  },
  banner__links: {
    fontSize: theme.spacing(2.25),
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.5",
    letterSpacing: "normal",
    textAlign: "left",
  },
  Hero__lettering: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  Hero__lettering__first: {
    fontSize: "49px",
    fontWeight: "400",
    lineHeight: "1.37",
    fontStretch: "normal",
    [theme.breakpoints.down("sm")]: {
      fontSize: "29px",
    },
  },
  Hero__lettering__second: {
    fontSize: "29px",
    fontWeight: "normal",
    lineHeight: "1.48",
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
    },
  },
  hero__second__conatiner: {
    maxWidth: "100%",
    paddingRight: "20%",
    paddingLeft: "20%",
    paddingTop: theme.spacing(2),
  },
  mouseBox: {
    borderRadius: "50% 50% 0px 0px",
    height: "94px",
    width: "74px",
    zIndex: "3",
    position: "absolute",
    bottom: "0",
    right: "50%",
    left: "50%",
    // border: "2px solid red",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.5)",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  topDialogue: {
    marginLeft: "80%",
    marginBottom: "30%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
      marginBottom: "0px",
    },
  },
}));