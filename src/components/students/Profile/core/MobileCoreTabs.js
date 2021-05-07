// import React from "react";
// import PropTypes from "prop-types";
// import { makeStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";
// import Box from "@material-ui/core/Box";
// import Typography from "@material-ui/core/Typography/Typography";

// import PermIdentityIcon from "@material-ui/icons/PermIdentity";
// import FingerprintIcon from "@material-ui/icons/Fingerprint";
// import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";
// import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
// import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
// import TranslateOutlinedIcon from "@material-ui/icons/TranslateOutlined";
// import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
// import BallotOutlinedIcon from "@material-ui/icons/BallotOutlined";
// import RecordVoiceOverOutlinedIcon from "@material-ui/icons/RecordVoiceOverOutlined";
// import PublishOutlinedIcon from "@material-ui/icons/PublishOutlined";
// import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
// import Professional from "./Professional";
// import Language from "./Language";

// import CorePersonal from "./CorePersonal";
// import Bio from "./Bio";
// import Education from "./Education";

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`scrollable-force-tabpanel-${index}`}
//       aria-labelledby={`scrollable-force-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `scrollable-force-tab-${index}`,
//     "aria-controls": `scrollable-force-tabpanel-${index}`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     width: "100%",
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

// export default function ScrollableTabsButtonForce() {
//   const classes = useStyles();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <div className={classes.root}>
//       <AppBar position="static" color="default">
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           variant="scrollable"
//           scrollButtons="on"
//           indicatorColor="primary"
//           textColor="primary"
//           aria-label="scrollable force tabs example"
//         >
//           <Tab icon={<PermIdentityIcon />} {...a11yProps(0)} />
//           <Tab icon={<FingerprintIcon />} {...a11yProps(1)} />
//           <Tab icon={<VideocamOutlinedIcon />} {...a11yProps(2)} />
//           <Tab icon={<SchoolOutlinedIcon />} {...a11yProps(3)} />
//           <Tab icon={<WorkOutlineOutlinedIcon />} {...a11yProps(4)} />
//           <Tab icon={<TranslateOutlinedIcon />} {...a11yProps(5)} />
//           <Tab icon={<CheckOutlinedIcon />} {...a11yProps(6)} />
//           <Tab icon={<BallotOutlinedIcon />} {...a11yProps(7)} />
//           <Tab icon={<RecordVoiceOverOutlinedIcon />} {...a11yProps(8)} />
//           <Tab icon={<PublishOutlinedIcon />} {...a11yProps(9)} />
//           <Tab icon={<DescriptionOutlinedIcon />} {...a11yProps(10)} />
//         </Tabs>
//       </AppBar>
//       <TabPanel value={value} index={0}>
//         <CorePersonal />
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         <Bio />
//       </TabPanel>
//       <TabPanel value={value} index={2}>
//         Video pannel coming soon !
//       </TabPanel>
//       <TabPanel value={value} index={3}>
//         <Education />
//       </TabPanel>
//       <TabPanel value={value} index={4}>
//         <Professional />
//       </TabPanel>
//       <TabPanel value={value} index={5}>
//         <Language />
//       </TabPanel>
//       <TabPanel value={value} index={6}>
//         Item Seven
//       </TabPanel>
//       <TabPanel value={value} index={7}>
//         Item Seven
//       </TabPanel>
//       <TabPanel value={value} index={8}>
//         Item Seven
//       </TabPanel>
//       <TabPanel value={value} index={9}>
//         Item 10
//       </TabPanel>
//       <TabPanel value={value} index={10}>
//         Item 11
//       </TabPanel>
//     </div>
//   );
// }
