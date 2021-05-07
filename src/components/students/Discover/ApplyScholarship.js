import React, { useContext, useState } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Nav from "../../Nav";
import Footer from "../../comps/Footer";
import { LoginContext } from "../../../Context/LoginContext";
import {
  Typography,
  Paper,
  Grid,
  Avatar,
  Checkbox,
  FormControlLabel,
  Button,
  CardActions,
  CardContent,
  Card,
  Box,
} from "@material-ui/core";
import SchoolIcon from "@material-ui/icons/School";
import DomainIcon from "@material-ui/icons/Domain";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import SimpleModal from "./../../atoms/Modal";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withSnackbar } from "notistack";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import FingerprintIcon from "@material-ui/icons/Fingerprint";

const theme = createMuiTheme();

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  body: {
    border: "4px solid grey",
    margin: theme.spacing(2, 0, 2, 0),
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  element: {
    maxWidth: theme.spacing(100),
    padding: theme.spacing(2),
  },
  top__body: {
    display: "flex",
    // justifyContent: "space-between",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  top___body__header: {
    width: "100%",
    float: "right",
  },
  details__accordian: {
    display: "flex",
    marginTop: "10px",
    backgroundColor: "#E8E8E8",
    paddingBottom: "5px",
    paddingTop: "5px",
    paddingLeft: "5px",
    borderRadius: "8px",
    marginLeft: "10px",
    marginRight: "10px",
  },
  details__title: {
    minWidth: "150px",
  },
  avatar: {
    height: theme.spacing(15),
    width: theme.spacing(15),
    borderRadius: "50%",
  },
  button_container: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    marginBottom: theme.spacing(10, 0, 20, 0),
  },
  apply__button: {
    margin: theme.spacing(2),
    borderRadius: theme.spacing(2),
  },
  backArrow: {
    margin: theme.spacing(2, 0, 0, 10),
    width: "2%",
    cursor: "pointer",
  },
});
function ApplyScholarship(props) {
  const classes = useStyles();
  const logindetails = useContext(LoginContext);
  // console.log("logindetails123",logindetails)
  // userData.videoProfileObjectUri 
  const [userinfo, setUserinfo] = useState(logindetails.userData);
  const [openModal, setOpenModal] = useState(false);
  const [modalmsg, setModalmsg] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [modalvariation, setModalvariation] = useState("success");
  const [index, setIndex] = useState();
  const [questions, setQuestions] = useState(props.location.state.scholarshipQuestionsSet);
  const [answers, setAnswers] = useState([]);
  const [checkAnswer, setCheckAnswer] = useState();

  const handleSubmit = (e) => {
    //console.log(e);
    for (let i = 0; i < questions.length; i++) {
      if(questions[i].answer.length == 0 || !questions[i].answer ){
        setCheckAnswer(i);
        return;
      } else {
        setCheckAnswer();  
      } 
      const answer = {
        answer: questions[i].answer,
        isMandatory:questions[i].isMandatory,
        operationType: "U",
        questionDescription: questions[i].questionDescription,
        questionId: questions[i].questionId,
        
      };
      answers.push(answer);
    }  
    setConfirm(true)
  }

  let history = useHistory();
  const avatar = userinfo.objectUrl;
  const {
    amount,
    benefactorId,
    benefactorName,
    cityDtoSet,
    countryDtoSet,
    durationInMonths,
    durationInYears,
    genderDtoSet,
    institutionDtoSet,
    lastDateToApply,
    numberOfScholarshipsAvailable,
    scholarshipAim,
    scholarshipCreationDate,
    scholarshipId,
    scholarshipIdealCandidateDescription,
    scholarshipImagePath,
    scholarshipName,
    scholarshipStatusDto,
    scholarshipTypeDto,
    selectionProcessRoundSet,
    studyFieldDtoSet,
    totalNumberOfScholarships,
    userId,
    scholarshipQuestionsSet
  } = props.location.state;
  const baseUrl = process.env.REACT_APP_URL;

  const applyScholarship = () => {  
    const body = {
      scholarshipId: scholarshipId,
      studentId: logindetails.userData.studentId,
      userId: logindetails.userData.userId,
      scholarshipQuestionsMappinpList:answers,
      studentBasicProfileDto: {
        firstName: logindetails.userData.studentBasicProfileDto.firstName,
        lastName: logindetails.userData.studentBasicProfileDto.firstName, 
        phoneNumber: logindetails.userData.studentBasicProfileDto.phoneNumber,
        socialMediaDtoList: logindetails.userData.studentBasicProfileDto.socialMediaDtoList,
        studentId: logindetails.userData.studentBasicProfileDto.studentId,
        summary: logindetails.userData.studentBasicProfileDto.summary,
        userId: 0,
        userName: logindetails.userData.studentBasicProfileDto.userName,
      },
      studentPersonalDetailsDto: {
        address: logindetails.userData.studentPersonalDetailsDto.address,
        dateOfBirth: logindetails.userData.studentPersonalDetailsDto.dateOfBirth,
        genderDto: logindetails.userData.studentPersonalDetailsDto.genderDto,
        preferredPronounDto: logindetails.userData.studentPersonalDetailsDtopreferredPronounDto,
        studentId: logindetails.userData.studentPersonalDetailsDto.studentId,
        userId: logindetails.userData.studentPersonalDetailsDto.userId,
      },
      videoProfilePath:logindetails.userData.videoProfileObjectUri,
      studentUserId:0,
      showMarkButton: true,
      showRejectButton: true,
      showUnMarkButton: true,
      showViewButton: true,
    };
    const config = {
      method: "post",
      url: `${baseUrl}/application/apply-for-scholarship`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };
    axios(config)
      .then((res) => {
        // console.log(res.data.body);
        setAnswers([]);
        setOpenModal(true);
        setModalmsg(res.data.message);
        setConfirm(false);
        props.enqueueSnackbar(res.data.message, {
          variant: res.data.status == 204 ? "warning" : "success",
        });
      })
      .catch((err) => {
        console.log(err);
        props.enqueueSnackbar("Something Went Wrong", {
          variant: "error",
        });
      });
  };

  const handleClose = () => {
    setConfirm(false);
  };

  const back = () => {
    history.push("./");
  };

  const answerschange = (e, index) => {
    setIndex(index);
    const values = [...questions];
    values[index].answer = e.target.value;
    setQuestions(values);
    // console.log(values[index]);
  };

  var count = 0;
// console.log("props.location.state",props.location.state)
  return (
    <div>
      {/* <Nav /> */}
      <div className={classes.backArrow} onClick={back}>
        <ArrowBackIcon fontSize="large" />
      </div>
      <SimpleModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalmsg={modalmsg}
        modalvariation={modalvariation}
        setModalvariation={setModalvariation}
      />
      <div className={classes.root}>
        <div className={classes.body}>
          <Card className={classes.element}>
            <Dialog
              open={confirm}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Do you want to confirm the application ?"}
              </DialogTitle>
              <DialogContent>
                {/* <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText> */}
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  variant="contained"
                  color="primary"
                >
                  No
                </Button>
                <Button
                  onClick={applyScholarship}
                  variant="contained"
                  color="primary"
                  autoFocus
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
            <CardContent>
              <Typography variant="h5"> Scholarship Details </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                m={1}
                p={1}
                bgcolor="background.paper"
              >
                <Box p={1}>
                  <Avatar
                    className={classes.avatar}
                    variant="circular"
                    src={scholarshipImagePath}
                  />
                </Box>
                <Box p={1}>
                  <Typography variant="h5">{scholarshipName}</Typography>
                </Box>
                <Box p={1}>
                  <Typography>
                    {scholarshipIdealCandidateDescription}
                  </Typography>
                </Box>
                <Box p={1}>
                  <Typography>Amount : ₹ {amount}</Typography>
                </Box>
              </Box>
              <hr></hr>
              <div>
                <div className={classes.details__accordian}>
                  <Typography className={classes.details__title}>
                    Status
                  </Typography>

                  <Typography
                    style={{ marginRight: "10px", marginLeft: "10px" }}
                  >
                    : {scholarshipStatusDto.name}
                  </Typography>
                </div>
                <div className={classes.details__accordian}>
                  <Typography className={classes.details__title}>
                    Studost
                  </Typography>

                  <Typography
                    style={{ marginRight: "10px", marginLeft: "10px" }}
                  >
                    : {benefactorName}
                  </Typography>
                </div>
                <div className={classes.details__accordian}>
                  <Typography className={classes.details__title}>
                    Scholarships
                  </Typography>

                  <Typography
                    style={{ marginRight: "10px", marginLeft: "10px" }}
                  >
                    : {numberOfScholarshipsAvailable}
                  </Typography>
                </div>
                <div className={classes.details__accordian}>
                  <Typography className={classes.details__title}>
                    For
                  </Typography>
                  {genderDtoSet ? (
                    genderDtoSet.map((opt, i) => (
                      <Typography style={{ marginLeft: "10px" }} key={i}>
                        {i === 0 ? ": " : ""} {opt.name}
                        {i !== genderDtoSet.length - 1 ? "," : "."}
                      </Typography>
                    ))
                  ) : (
                    <Typography>All</Typography>
                  )}
                </div>
                <div className={classes.details__accordian}>
                  <Typography className={classes.details__title}>
                    Cities
                  </Typography>
                  {cityDtoSet
                    ? cityDtoSet.map((opt, i) => (
                        <Typography style={{ marginLeft: "10px" }} key={i}>
                          {i === 0 ? ": " : ""} {opt.name}
                          {i !== cityDtoSet.length - 1 ? "," : "."}
                        </Typography>
                      ))
                    : null}
                </div>
                <div className={classes.details__accordian}>
                  <Typography className={classes.details__title}>
                    Countries
                  </Typography>
                  {countryDtoSet
                    ? countryDtoSet.map((opt, i) => (
                        <Typography style={{ marginLeft: "10px" }} key={i}>
                          {i === 0 ? ": " : ""} {opt.name}
                          {i !== countryDtoSet.length - 1 ? "," : "."}
                        </Typography>
                      ))
                    : null}
                </div>

                <div className={classes.details__accordian}>
                  <Typography className={classes.details__title}>
                    Institutes
                  </Typography>
                  {institutionDtoSet
                    ? institutionDtoSet.map((opt, i) => (
                        <Typography style={{ marginLeft: "10px" }} key={i}>
                          {i === 0 ? ": " : ""} {opt.name}
                          {i !== institutionDtoSet.length - 1 ? "," : "."}
                        </Typography>
                      ))
                    : null}
                </div>
                <div className={classes.details__accordian}>
                  <Typography className={classes.details__title}>
                    Rounds
                  </Typography>
                  {selectionProcessRoundSet ? (
                    selectionProcessRoundSet.map((opt, i) => (
                      <Typography style={{ marginLeft: "10px" }} key={i}>
                        {i === 0 ? ": " : ""} {opt.name}
                        {i !== selectionProcessRoundSet.length - 1 ? "," : "."}
                      </Typography>
                    ))
                  ) : (
                    <Typography>Any</Typography>
                  )}
                </div>
                <div className={classes.details__accordian}>
                  <Typography className={classes.details__title}>
                    Study Field
                  </Typography>
                  {studyFieldDtoSet ? (
                    studyFieldDtoSet.map((opt, i) => (
                      <Typography style={{ marginLeft: "10px" }} key={i}>
                        {i === 0 ? ": " : ""} {opt.name}
                        {i !== studyFieldDtoSet.length - 1 ? "," : "."}
                      </Typography>
                    ))
                  ) : (
                    <Typography>Any</Typography>
                  )}
                </div>
                <div className={classes.details__accordian}>
                  <Typography className={classes.details__title}>
                    Ideal Candidate
                  </Typography>

                  <Typography
                    style={{ marginRight: "10px", marginLeft: "10px" }}
                  >
                    : {scholarshipIdealCandidateDescription}
                  </Typography>
                </div>
                <div className={classes.details__accordian}>
                  <Typography className={classes.details__title}>
                    Creation Date
                  </Typography>

                  <Typography
                    style={{ marginRight: "10px", marginLeft: "10px" }}
                  >
                    : {scholarshipCreationDate}
                  </Typography>
                </div>
                <div className={classes.details__accordian}>
                  <Typography className={classes.details__title}>
                    Last Date
                  </Typography>

                  <Typography
                    style={{ marginRight: "10px", marginLeft: "10px" }}
                  >
                    : {lastDateToApply}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className={classes.element}>
            <CardContent>
              <Typography variant="h5"> Personal Details </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                m={1}
                p={1}
                bgcolor="background.paper"
              >
                <Box p={1}>
                  <Avatar
                    className={classes.avatar}
                    variant="circular"
                    src={avatar}
                  />
                </Box>
                <Box p={1}>
                  <Typography variant="h5">
                    {userinfo.studentBasicProfileDto.firstName +
                      " " +
                      userinfo.studentBasicProfileDto.lastName}
                  </Typography>
                </Box>
                <Box p={1}>
                  <Typography>
                    {userinfo.studentBasicProfileDto.phoneNumber}
                  </Typography>
                </Box>
                <Box p={1}>
                  <Typography>{userinfo.userName}</Typography>
                </Box>
              </Box>
              <hr></hr>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "10px",
                }}
              >
                <div style={{ margin: "20px" }}>
                  <Typography variant="h6" component="h4">
                    Education
                  </Typography>
                  {userinfo.educationList &&
                    userinfo.educationList.map((edu, i) => {
                      return (
                        <div className={classes.education__field} key={i}>
                          <div style={{ display: "flex" }}>
                            <SchoolIcon style={{ marginRight: "20px" }} />
                            <Typography>
                              {edu.educationTypeDto.educationTypeName}
                            </Typography>
                          </div>
                          <Typography
                            className={classes.education__field__smallfonts}
                          >
                            <b>Certificate: </b>
                            {edu.degreeDto.name}
                          </Typography>
                          <Typography
                            className={classes.education__field__smallfonts}
                          >
                            <b>School/College: </b>
                            {edu.collegeDto.name}
                          </Typography>
                          <Typography
                            className={classes.education__field__smallfonts}
                          >
                            <b>Year of Completion : </b>
                            {edu.completionYear}
                          </Typography>
                        </div>
                      );
                    })}
                </div>
                <div style={{ margin: "20px" }}>
                  <Typography variant="h6" component="h4">
                    Professional Experience
                  </Typography>
                  {userinfo.professionalExperienceList &&
                    userinfo.professionalExperienceList.map((exp, i) => {
                      return (
                        <div className={classes.education__field} key={i}>
                          <div style={{ display: "flex" }}>
                            <DomainIcon style={{ marginRight: "20px" }} />
                            <Typography>
                              <b> {exp.organizationName} </b>
                            </Typography>
                          </div>
                          <Typography
                            className={classes.education__field__smallfonts}
                          >
                            <b>Designation: </b>
                            {exp.designation}
                          </Typography>
                          <Typography
                            className={classes.education__field__smallfonts}
                          >
                            <b>Role Description: </b>
                            {exp.roleDescription}
                          </Typography>
                          <Typography
                            className={classes.education__field__smallfonts}
                          >
                            <b>From </b>
                            {exp.startDate}
                            <b> To </b>
                            {exp.endDate}
                          </Typography>
                        </div>
                      );
                    })}
                </div>
                <div
                  style={{
                    marginRight: "-50px",
                    marginLeft: "50px",
                    margin: "10px",
                  }}
                >
                  <Typography variant="h6" component="h4">
                    Awards
                  </Typography>
                  {userinfo.awardsList &&
                    userinfo.awardsList.map((award, index) => {
                      return (
                        <div className={classes.education__field} key={index}>
                          <div style={{ display: "flex" }}>
                            <EmojiPeopleIcon style={{ marginRight: "20px" }} />
                            <Typography>
                              <b>{award.name}</b>
                            </Typography>
                          </div>
                          <Typography
                            className={classes.education__field__smallfonts}
                          >
                            {award.description}
                          </Typography>
                        </div>
                      );
                    })}
                </div>
              </div>
            </CardContent>
                  
            
          </Card>
          <Card className={classes.element}>
            <CardContent>
            <Typography variant="h5"> Behavioural Questions</Typography>
                {scholarshipQuestionsSet
                  ? scholarshipQuestionsSet.map((question, index) => {
                      // if(question.isMandatory == 1){
                      //   count++;
                      // }
                      return (
                        <>
                        
                        <div key={index} >
                          <div >
                            <Typography
                              fullWidth
                              // variant="h5"
                              style={{
                                // width: "100%",
                                paddingTop: "16px",
                                color: "grey",
                              }}
                            >
                             {index + 1} : {question.questionDescription} {question.isMandatory==1 && <sup style={{ color: "red", marginLeft: "3px" }}>*</sup>}
                            </Typography>
                          </div>
                          <div>
                            <TextField
                              required
                              fullWidth
                              multiline
                              value={question.answer}
                              // name={question.questionTypeDto.questionTypeName}
                              onChange={(e) => answerschange(e, index)}
                              placeholder="Please write your answer here"
                              style={{
                                // width: "100%",
                                padding: "16px 0 16px 0",
                                color: "grey",
                              }}
                            />
                            {checkAnswer == index && question.answer.length == 0 &&(
                              <Typography style={{ color: "red" }}>
                                This fields are mandatory
                              </Typography>
                            )}
                          </div>
                        </div>
                        </>
                      );
                    })
                  : ""}
            </CardContent>
            <div className={classes.button_container}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className={classes.apply__button}
                onClick={handleSubmit}
              >
                Submit
              </Button>
              
            </div>
          </Card>
          {/* <Paper elevattion={3} className={classes.main}>
              <SimpleModal
                //openModal={openModal}
                setOpenModal={setOpenModal}
                modalmsg={modalmsg}
              />
              <div className={classes.headerTile}>
                <Typography variant="h4">Bio</Typography>
                <FingerprintIcon />
              </div>
              
                </Paper> */}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default withSnackbar(ApplyScholarship);
