import React, { useState } from "react";
import image from "./../../assets/img/phone.jpeg";
import { createMuiTheme } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MouseOutlinedIcon from "@material-ui/icons/MouseOutlined";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link } from "react-router-dom";
import SimpleDailog from "./../DailogBox/DailogBox";
import {
  AppBar,
  Typography,
  Button,
  Hidden,
  IconButton,
  Divider,
} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";

export default function LandingView() {
  const classes = useStyles();
  const handleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const [openDrawer, setOpenDrawer] = useState(false);

  const [anchorEl, setAnchorEl] = useState(false);

  const handleClickPopOver = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePop = () => {
    setAnchorEl(null);
  };
  const popOpen = anchorEl;
  const id = popOpen ? "simple-popover" : undefined;

  // const [open, setOpen] = useState(false);
  const handleClickHowTo = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseHowTo = () => {
    setAnchorEl(null);
  };

  const [anchorElLogin, setAnchorElLogin] = React.useState(null);

  const handleClickLogin = (event) => {
    setAnchorElLogin(event.currentTarget);
  };

  const handleCloseLogin = () => {
    setAnchorElLogin(null);
  };

  const handleCloseLogin2 = (event) => {
    setAnchorElLogin(null);
    setAnchorElStuOrDost(event.currentTarget);
  };

  const [anchorElStuOrDost, setAnchorElStuOrDost] = React.useState(null);

  const handleClickStuOrDost = (event) => {
    setAnchorElStuOrDost(event.currentTarget);
  };

  const handleCloseStuOrDost = () => {
    setAnchorElStuOrDost(null);
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
      {/* <div className={classes.hero__image} /> */}
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
          <Hidden mdDown>
            <div className={classes.app__tools}>
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                <Typography className={classes.banner__links}>HOME</Typography>
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
                style={{ textDecoration: "none", color: "white" }}
                to="/contactus"
              >
                <Typography
                  className={classes.banner__links}
                  style={{ borderBottom: "2px solid white" }}
                >
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
              {/* <Menu
              id="stuordoast"
              anchorEl={anchorElStuOrDost}
              keepMounted
              open={Boolean(anchorElStuOrDost)}
              onClose={handleCloseStuOrDost}
              style={{ zIndex: "200" }}
            >
              <MenuItem onClick={handleCloseStuOrDost} variant="selectedMenu">
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/signup"
                >
                  Student ?
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseStuOrDost}>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/signup"
                >
                  Studost ?
                </Link>
              </MenuItem>
            </Menu> */}
            </div>
          </Hidden>
        </div>
        <div className={classes.Hero__lettering__about}>
          <Typography className={classes.Hero__lettering__first__about}>
            Contact US
          </Typography>
        </div>
      </div>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0px",
    height: "90vh",
  },
  h2: {
    fontWeight: 10,
  },
  hero__image: {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${image})`,
    objectFit: "contain",
    backgroundSize: "100%",
    zIndex: "-2",
    position: "absolute",
    backgroundRepeat: "no-repeat",
  },
  hero__image__gradient: {
    width: "100%",
    height: "100vh",
    backgroundSize: "100%",
    zIndex: "-1",
    position: "absolute",
    opacity: "0.6",
    backdropFilter: "blur(6.5px)",
    backgroundImage: " linear-gradient(304deg, #228da3 10%, #28a70a)",
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
  Hero__lettering__about: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  Hero__lettering__first__about: {
    fontSize: "54px",
    fontFamily: "Poppins",
    fontWeight: "200",
    color: "#ffffff",
    lineHeight: "154px",
    // letterSpacing: "10px",
    width: "100%",
    marginTop: "-50px",
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
  },
  link__class: {
    textDecoration: "none",
    color: "white",
  },
}));