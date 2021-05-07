import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ProfileinfoB from "./ProfileinfoB";
import { Toolbar, IconButton, Avatar, Tooltip } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import Funds from "./funds/Funds";
import FundsNavbar from "../BenefactorNav";
import FAQ_studost from "./FAQ_studost";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { LoginContext } from "../../Context/LoginContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SimpleTabs({ linkvalue }) {
  const classes = useStyles();
  const [value, setValue] = useState(linkvalue);
  const [myFunds, setMyfunds] = useState(false);

  useEffect(() => {
    if (logindetails.userData.benefactorId == 0) {
      setMyfunds(true);
    } else {
      setMyfunds(false);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const logindetails = useContext(LoginContext);
  const [benefactorId, setBenfactorId] = useState(
    logindetails.userData.benefactorId
  );

  let history = useHistory();

  const logout = () => {
    logindetails.setLogin(false);
    logindetails.setRoleId();
    history.push("/");
  };
  return (
    <div className={classes.root}>
      <div className={classes.offset} />
      <AppBar>
        <Toolbar className={classes.appLength}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
              display: "flex",
            }}
          >
            {/* <MenuIcon fontSize="large" /> */}
            <Typography variant="h4" noWrap>
              Studost
            </Typography>
          </Link>

          <div style={{ marginBottom: "-18px" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              centered
            >
              <Tab label="Profile" {...a11yProps(0)} />
              <Tab label="My Funds" {...a11yProps(1)} disabled={myFunds} />
              <Tab label="FAQ" {...a11yProps(2)} />
              {/* <Tab label="Support" {...a11yProps(3)} /> */}
            </Tabs>
          </div>
          <div className={classes.grow}>
            <Typography>{logindetails.profileName}</Typography>
            <Link to="/homecontrol/profile">
              <IconButton>
                <Avatar
                  src={logindetails.avatarImage ? logindetails.avatarImage : ""}
                />
              </IconButton>
            </Link>
            <Tooltip title="logout">
              <IconButton onClick={logout}>
                <PowerSettingsNewIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>

      <TabPanel value={value} index={0}>
        <ProfileinfoB />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Funds />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FAQ_studost/>
      </TabPanel>
      {/* <TabPanel value={value} index={3}>
        Support
      </TabPanel> */}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
    minHeight: "100vh",
  },
  offset: theme.mixins.toolbar,
  appLength: {
    width: "1350px",
    marginRight: "auto",
    marginLeft: "auto",
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-between",
  },
  grow: {
    display: "flex",
    //flexGrow: "2",
    justifyContent: "flex-end",
    alignItems: "center",
  },
}));
