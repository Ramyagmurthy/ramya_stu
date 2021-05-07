import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Active from "./Active";
import Won from "./Won";
import Archived from "./Archived";

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
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
  body: {
    maxWidth: "1350px",
    marginRight: "auto",
    marginLeft: "auto",
  },
  appbar: {
    backgroundColor: "#ffff",
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          //   centered
          aria-label="full width tabs example"
        >
          <Tab label="Active" {...a11yProps(0)} />
          <Tab label="Won" {...a11yProps(1)} />
          <Tab label="Archived" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
        className={classes.body}
      >
        <TabPanel
          value={value}
          index={0}
          dir={theme.direction}
          style={{ backgroundColor: "#f1f2f5" }}
        >
          <Active />
        </TabPanel>
        <TabPanel
          value={value}
          index={1}
          dir={theme.direction}
          style={{ backgroundColor: "#f1f2f5" }}
        >
          <Won />
        </TabPanel>
        <TabPanel
          value={value}
          index={2}
          dir={theme.direction}
          style={{
            backgroundColor: "#f1f2f5",
            // display: "flex",
            // justifyContent: "space-around",
          }}
        >
          <Archived />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
