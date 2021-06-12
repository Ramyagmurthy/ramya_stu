import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../../../Context/LoginContext";
import axios from "axios";
import {
  Typography,
  Paper,
  Grid,
  Avatar,
  Checkbox,
  FormControlLabel,
  Button,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SimpleModal from "../../../../components/atoms/Modal";
import SendIcon from "@material-ui/icons/Send";
import SchoolIcon from "@material-ui/icons/School";
import DomainIcon from "@material-ui/icons/Domain";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import { CheckBox, Send } from "@material-ui/icons";
import { withSnackbar } from "notistack";

const Submission = (props) => {
  const logindetails = useContext(LoginContext);
  const baseUrl = process.env.REACT_APP_URL;

  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [modalmsg, setModalmsg] = useState("");
  const [modalvariation, setModalvariation] = useState("success");

  const [checked, setChecked] = useState(false);
  const [agree, checkAgree] = useState(false);

  const [userinfo, setUserinfo] = useState(logindetails.userData);

  useEffect(() => {
    getuserInfo(logindetails.user);
  }, []);

  const getuserInfo = (id) => {
    axios
      .get(baseUrl + `/student/load-student-profile-data?userId=${id}`)
      .then((res) => {
        // console.log(res.data.body);
        setUserinfo(res.data.body);
      })
      .catch((err) => console.log(err));
  };

  const avatar = userinfo.objectUrl;

  const handleSubmit = () => {
    if (checked) {
      props.enqueueSnackbar("Profile Submitted successfully", {
        variant: "Success",
      });
    } else {
      checkAgree(true);
    }
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paperarea}>
        <SimpleModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          modalmsg={modalmsg}
          modalvariation={modalvariation}
          setModalvariation={setModalvariation}
        />
        <Grid
          container
          xs={12}
          style={{
            display: "flex",
            alignItems: "center",
            paddingBottom: "50px",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5"> Submission </Typography>
          <SendIcon
            style={{
              fontSize: "50px",
              marginLeft: "20px",
            }}
          />
        </Grid>

        <div className={classes.top__body}>
          <Avatar className={classes.avatar} variant="circular" src={avatar} />
          <div className={classes.top___body__header}>
            <Typography variant="h5">
              {userinfo.studentBasicProfileDto.firstName +
                " " +
                userinfo.studentBasicProfileDto.lastName}
            </Typography>
            <Typography>
              {userinfo.studentBasicProfileDto.phoneNumber}
            </Typography>
            <Typography>{userinfo.userName}</Typography>
          </div>
        </div>
      </Paper>
      {userinfo.educationList ? (
        <Paper elevation={3} className={classes.paperarea}>
          {userinfo.educationList.map((edu, i) => {
            return (
              <div className={classes.education__field} key={i}>
                <div style={{ display: "flex" }}>
                  <SchoolIcon style={{ marginRight: "20px" }} />
                  <Typography>
                    {edu.educationTypeDto.educationTypeName}
                  </Typography>
                </div>
                <Typography className={classes.education__field__smallfonts}>
                  <b>Certificate: </b>
                  {edu.degreeDto.name}
                </Typography>
                <Typography className={classes.education__field__smallfonts}>
                  <b>School/College: </b>
                  {edu.collegeDto.name}
                </Typography>
                <Typography className={classes.education__field__smallfonts}>
                  <b>Year of Completion : </b>
                  {edu.completionYear}
                </Typography>
              </div>
            );
          })}
        </Paper>
      ) : null}

      {userinfo.professionalExperienceList ? (
        <Paper elevation={3} className={classes.paperarea}>
          {userinfo.professionalExperienceList.map((exp, i) => {
            return (
              <div className={classes.education__field} key={i}>
                <div style={{ display: "flex" }}>
                  <DomainIcon style={{ marginRight: "20px" }} />
                  <Typography>
                    <b> {exp.organizationName} </b>
                  </Typography>
                </div>
                <Typography className={classes.education__field__smallfonts}>
                  <b>Designation: </b>
                  {exp.designation}
                </Typography>
                <Typography className={classes.education__field__smallfonts}>
                  <b>Role Description: </b>
                  {exp.roleDescription}
                </Typography>
                <Typography className={classes.education__field__smallfonts}>
                  <b>From </b>
                  {exp.startDate}
                  <b> To </b>
                  {exp.endDate}
                </Typography>
              </div>
            );
          })}
        </Paper>
      ) : null}

      {userinfo.awardsList ? (
        <Paper elevation={3} className={classes.paperarea}>
          {userinfo.awardsList.map((award, index) => {
            return (
              <div className={classes.education__field} key={index}>
                <div style={{ display: "flex" }}>
                  <EmojiPeopleIcon style={{ marginRight: "20px" }} />
                  <Typography>
                    <b>{award.name}</b>
                  </Typography>
                </div>
                <Typography className={classes.education__field__smallfonts}>
                  {award.description}
                </Typography>
              </div>
            );
          })}
        </Paper>
      ) : null}

      {/* <Paper elevation={3} className={classes.paperarea}>
        <div className={classes.acknowlege}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
                name="checkedA"
                style={{ marginRight: "20px" }}
              />
            }
          />
          <Typography variant="body2">
            I acknowledge that all the information provided by me is completely
            true to the best of my knowledge.
          </Typography>
        </div>
        {agree && !checked && (
          <Typography className={classes.red}>Accept The Agreement</Typography>
        )}
        <div>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit__button}
            onClick={handleSubmit}
          >
            Submit Profile <Send style={{ marginLeft: "40px" }} />
          </Button>
        </div>
      </Paper> */}
    </div>
  );
};

export default withSnackbar(Submission);

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(100),
    marginRight: "auto",
    marginLeft: "auto",
    paddingTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "100%",
      padding: theme.spacing(1),
      paddingTop: theme.spacing(5),
    },
  },
  paperarea: {
    padding: theme.spacing(5, 10),
    [theme.breakpoints.down("md")]: {
      width: "100%",
      padding: theme.spacing(2, 2, 5, 2),
    },
    backgroundImage: "linear-gradient(120deg,  #c2e9fb 100%, #a1c4fd 0%)",
    borderRadius: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  avatar: {
    height: "150px",
    width: "150px",
  },
  top__body: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  top___body__header: {
    width: "30%",
  },
  education__field: {
    margin: theme.spacing(2),
  },
  education__field__smallfonts: {
    fontSize: "14px",
  },
  acknowlege: {
    display: "flex",
    alignItems: "flex-start",
  },
  submit__button: {
    borderRadius: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
  red: {
    color: "red",
  },
}));
