import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AllApplicants from "./scholarshipStatus/AllApplicants";
import Rejected from "./scholarshipStatus/Rejected";
import Shortlisted from "./scholarshipStatus/Shortlisted";
import Won from "./scholarshipStatus/Won";
import Panel from "./scholarshipStatus/Panel";
import Telephone from "./scholarshipStatus/Telephone";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: "red",
    display: "flex",
    // height: "100vh",
    width: "100%",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    paddingTop: "10%",
    width: "250px",
    position: "absolute",
    height: "100vh",
    backgroundColor: "white",
  },
  Tab__body: {
    height: "auto",
    width: "100%",
    marginLeft: "250px",
    minHeight: "80vh",
    // backgroundColor: "#f1f2f5",
  },
  number: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(0.5, 1),
    borderRadius: "50%",
  },
  labelBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(0, 2),
  },
}));

export default function VerticalTabs({ scholarshipId, totalApplicants,getapplicantscount }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  // console.log("from application tab", totalApplicants);

  let total = 0;
  if (totalApplicants) {
    total = totalApplicants.length;
    // console.log(total);
  }

  const [noOfApplicants, setNoOfApplicants] = useState(total);
  const [noOfPanel, setNoOfPanel] = useState(0);
  const [noOfTelephonic, setNoOfTelephoni] = useState(0);
  const [noOfWon, setNoOfWon] = useState(0);
  const [noOfRejected, setNoOfRejected] = useState(0);

  // useEffect(() => {
  // }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    getapplicantscount(scholarshipId)

  };
// console.log("totalApplicants",totalApplicants)
  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs for applicants"
        className={classes.tabs}
      >
        <AntTab
          className={classes.tab__box}
          label={
            <div className={classes.labelBox}>
              <Typography> Applicants</Typography>
              <Typography className={classes.number}>
                {totalApplicants
                  ? totalApplicants.countOfAppliedTabApplications
                  : 0}
              </Typography>
            </div>
          }
          {...a11yProps(0)}
        />
        <AntTab
          className={classes.tab__box}
          label={
            <div className={classes.labelBox}>
              <Typography> Telephonic</Typography>
              <Typography className={classes.number}>
                {totalApplicants
                  ? totalApplicants.countOfTelephonicTabApplications
                  : 0}
              </Typography>
            </div>
          }
          {...a11yProps(1)}
        />
        <AntTab
          className={classes.tab__box}
          label={
            <div className={classes.labelBox}>
              <Typography> Panell</Typography>
              <Typography className={classes.number}>
                {totalApplicants
                  ? totalApplicants.countOfPanelTabApplications
                  : 0}
              </Typography>
            </div>
          }
          {...a11yProps(2)}
        />
        <AntTab
          className={classes.tab__box}
          label={
            <div className={classes.labelBox}>
              <Typography> Won</Typography>
              <Typography className={classes.number}>
                {totalApplicants
                  ? totalApplicants.countOfWonTabApplications
                  : 0}
              </Typography>
            </div>
          }
          {...a11yProps(3)}
        />
        <AntTab
          className={classes.tab__box}
          label={
            <div className={classes.labelBox}>
              <Typography> Rejected</Typography>
              <Typography className={classes.number}>
                {totalApplicants
                  ? totalApplicants.countOfRejectedTabApplications
                  : 0}
              </Typography>
            </div>
          }
          {...a11yProps(4)}
        />
      </Tabs>
      <div className={classes.Tab__body}>
        <TabPanel value={value} index={0}>
          <AllApplicants
            scholarshipId={scholarshipId}
            setNoOfApplicants={setNoOfApplicants}
            getapplicantscount={getapplicantscount}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Telephone
            scholarshipId={scholarshipId}
            setNoOfTelephoni={setNoOfTelephoni}
            getapplicantscount={getapplicantscount}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Panel scholarshipId={scholarshipId} setNoOfPanel={setNoOfPanel} getapplicantscount={getapplicantscount} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Won scholarshipId={scholarshipId} setNoOfWon={setNoOfWon} getapplicantscount={getapplicantscount}/>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Rejected
            scholarshipId={scholarshipId}
            setNoOfRejected={setNoOfRejected}
            getapplicantscount={getapplicantscount}
          />
        </TabPanel>
      </div>
    </div>
  );
}

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
      // position:"fixed"
    },
    "&$selected": {
      color: "white",
      backgroundColor: theme.palette.primary.main,
    },
    // "&:focus": {
    //   color: "#40a9ff",
    // },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);
