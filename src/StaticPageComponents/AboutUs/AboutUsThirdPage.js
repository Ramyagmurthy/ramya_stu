import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import theoryOfChange from "../../assets/img/secondPhoto.png";
import ourApproach from "../../assets/img/firstphoto.png";
import maxwell from "../../assets/img/maxwell.png";
import aboutHand from "../../assets/img/aboutHand.png";
import abount2 from "../../assets/img/abount2.png";
import aboutSheild from "../../assets/img/aboutSheild.png";

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
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      marginTop: "100vh",
    },
  },
  first_div: {
    maxWidth: "35%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Poppins",
    justifyContent: "flex-start",
    color: "#23252A",
  },
  second_div: {
    maxWidth: "800px",
    fontFamily: "Poppins",
    marginLeft: "2%",
    maxHeight: "100vh",
    paddingTop: theme.spacing(4),
  },
  container_one: {
    display: "flex",
    justifyContent: "flex-start",
    fontFamily: "Poppins",
    //marginTop: "20px",
  },
  subdiv_one: {
    width: "50%",
    height: "36px",
    fontSize: "32px",
    fontWeight: "bold",
    color: "#23252A",
    [theme.breakpoints.down("sm")]: {
      fontSize: "22px",
      width: "100%",
    },
  },
  subdiv_two: {
    fontSize: "20px",
    textAlign: "left",
    color: "#23252A",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
  subdiv_three: {
    fontSize: "20px",
    textAlign: "left",
    color: "#23252A",
  },
  sub_heading: {
    fontSize: "22px",
    fontWeight: "500",
    color: "#09294D",
    alignItem: "center",
  },
  sub_img: {
    marginTop: "2%",
    display: "flex",
    flexDirection: "row",
  },
  appbar_about: {
    paddingLeft: "100px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0",
    },
  },
  images__tabview: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));
export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color="default"
        className={classes.appbar_about}
      >
        <StyledTabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <StyledTab label="Theory Of Change" {...a11yProps(0)} />
          <StyledTab label="Our Approach" {...a11yProps(1)} />
          <StyledTab label="Our Values" {...a11yProps(2)} />
          {/* <Tab label="Our Teams" {...a11yProps(3)} /> */}
        </StyledTabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div className={classes.container_one}>
            <div className={classes.first_div}>
              <img src={theoryOfChange} className={classes.images__tabview} />
            </div>
            <div className={classes.second_div}>
              <div className={classes.subdiv_one}>Theory Of Change</div>
              <br />
              <br />
              <div className={classes.subdiv_two}>
                In our society, students are often constrained by various
                factors that limit their access to higher education, which can
                help them succeed and achieve their full potential.
                <br />
                <br />
                Despite that, each student has a unique story to tell. They are
                not just a sum of their credentials but also their motivations,
                experiences, and aspirations.
                <br />
                <br />
                We aim to enable students to share their stories and discover
                guides and mentors who can support their dreams. By becoming
                their “studost”, these mentors select and enable bright and
                driven students to achieve their goals and secure a high-quality
                education by eliminating the financial constraints they face. In
                empowering these students, they also increase the overall pool
                of affordable and reliable funding opportunities available in
                India.
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div className={classes.container_one}>
            <div className={classes.first_div}>
              <img src={ourApproach} className={classes.images__tabview}></img>
            </div>
            <div className={classes.second_div}>
              <div className={classes.subdiv_one}>Our Approach</div>
              <br />
              <br />
              <div className={classes.subdiv_two}>
                The lack of funds has become a serious impediment to educational
                progress. Our aim is to find the best possible funding options
                for prospective students. Through our platform, undergraduate
                and postgraduate students gain access to better funding
                opportunities and eventually, seek the right mentors in any
                academic discipline. Additionally, we make it easier for
                sponsors to reach out to these students and offer knowledge and
                guidance.
                <br />
                <br />
                Our benefactors comprise of highly skilled leaders, HNIs,
                academic achievers, industry experts, non-governmental
                organizations etc. Benefactors have the opportunity to create a
                positive impact and support a cause they believe in. By
                connecting students to their respective benefactor, we make it
                easier and beneficial for both parties to form a strategic
                alliance.
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <div className={classes.container_one}>
            <div className={classes.first_div}>
              <img src={maxwell} className={classes.images__tabview}></img>
            </div>
            <div className={classes.second_div}>
              <div className={classes.subdiv_one}>Our Values</div>
              <div className={classes.sub_heading}>
                <div className={classes.sub_img}>
                  <img src={aboutHand}></img>
                  <div style={{ marginTop: "2%", marginLeft: "1%" }}>
                    Integrity
                  </div>
                </div>
              </div>
              <div className={classes.subdiv_two} style={{ marginTop: "2%" }} s>
                We will remain committed to being authentic, transparent, and
                impartial in our service.
              </div>
              <div className={classes.sub_heading}>
                <div className={classes.sub_img}>
                  <img src={abount2}></img>
                  <div style={{ marginTop: "2%" }}>Innovation</div>
                </div>
              </div>
              <div className={classes.subdiv_two}>
                We want to reimagine traditional scholarship mechanisms and
                introduce smarter ways to support and fund students in lieu of
                the changing times. We will provide a smart, efficient and
                technologically advanced process for discovery of funds,
                application, and selection.
              </div>
              <div className={classes.sub_heading}>
                <div className={classes.sub_img}>
                  <img src={aboutSheild}></img>
                  <div style={{ marginTop: "2%" }}>Impact Driven</div>
                </div>
              </div>
              <div className={classes.subdiv_two}>
                We will put our best effort to serve our communities and drive
                positive and meaningful impact in the lives of students and
                studosts.
              </div>
            </div>
          </div>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    // color: "#fff",
    // fontWeight: theme.typography.fontWeightRegular,
    // fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(2),
    color: "#23252a",
    fontSize: "16px",
    width: "100%",
    "&$selected": {
      color: "#228da3",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#228da3",
      opacity: 1,
    },
    "&:hover": {
      color: "#228da3",
      opacity: 1,
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: "0",
      fontSize: "14px",
      maxWidth: "33%",
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 150,
      width: "100%",
      backgroundColor: "#228da3",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);
