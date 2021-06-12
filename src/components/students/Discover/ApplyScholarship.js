import React, { useContext, useEffect, useState } from "react";
import { makeStyles, createMuiTheme, withStyles } from "@material-ui/core/styles";
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
  InputLabel,
  FormControl,
  MenuItem,
  Select,
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
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { CheckOutlined } from "@material-ui/icons";


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
  education__style: {
    margin: theme.spacing(2),
    padding: theme.spacing(2, 4),
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "100%",
     marginLeft: "0px",
    },
  },
  rounding__edge: {
    borderRadius: theme.spacing(2),
  },

 
});


const styles = (theme) => ({
  Muiroot: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});



const DialogTitleName = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.Muiroot} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContentData = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActionsData = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

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
  const [checked, setChecked] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [desc, setDesc] = useState("");
  const [finalAnswer,setFinalAnswer] = useState([]);
  const [validation, setValidation] = useState([]);
  const [wordCounter, setWordCounter] = useState([]);
  const [charecterCounter, setCharecterCounter] = useState([]);
  const [descM, setDescM] = useState(false);
  const [fields, setFields] = useState([]);
  const[checkStart, setCheckStart] = useState(false)
  const[checkEnd, setCheckEnd] = useState(false);
  const [submitValid, setSubmitValid] = useState(false);

  useEffect(()=> {
    let validationLenght = [...props.location.state.scholarshipQuestionsSet]
    let valid = [...validation];
    let wordCounterValid = [...wordCounter];
    let charecterCounterValid = [...charecterCounter];
    for(let i = 0; i < validationLenght.length; i++){
      valid.push(false);
      wordCounterValid.push(0);
      charecterCounterValid.push(0);
    }
    setValidation(valid);
    setWordCounter(wordCounterValid);
    setCharecterCounter(charecterCounterValid);
  }, []);

  const handleSubmit = (e) => {
    //console.log(e);
    setSubmitValid(true);
    for (let i = 0; i < questions.length; i++) {
      if(!questions[i].answer)
      return
      let word = questions[i].answer.split(" ");
      if(questions[i].answer.length == 0 || !questions[i].answer || word.length < 251 || 
        word.length > 300 || 
        questions[i].answer.length > 5000 ){
        setCheckAnswer(i);
        return;
      } else {
        setCheckAnswer();  
      } 
      const answer = {
        answer: questions[i].answer,
        operationType: "U",
        otherQuestionName:questions[i].otherQuestionName,
        questionDescription: questions[i].questionDescription,
        questionId: questions[i].questionId,
        scholarshipQuestionMappingId:questions[i].scholarshipQuestionMappingId
      };
      answers.push(answer);
    }  
    setConfirm(true)
  }

  const addAbroadExperiance = () =>{
    // console.log("endDate",endDate)
    var End = endDate;
    var Start = startDate;

    if(!CheckOutlined){
      setEndDate(new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate())
    }
    if(!checkStart){
      setStartDate(new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate())
    }
    if(desc.length != 0)
    if(desc.length <= 3000){
    let data = [...finalAnswer]
    let value = {
      abroadExperienceDescription: desc,
      abroadExperienceId:0,
      experienceEndDate:endDate,
      experienceStartDate:startDate,
      operationType:"U"
    }
    data.push(value)
    // console.log("data",data)

    setFinalAnswer(data)
    // console.log("finalAnswer",finalAnswer)
    setChecked(false)
    setStartDate("")
    setEndDate("")
    setDesc("")
    setDescM(false);
    } else {
      setDescM(true);
    }
    // console.log("final",finalAnswer)
  }
  // console.log("final 1",finalAnswer)


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
    // for (let i = 0; i < questions.length; i++) {
    //   if (questions[i].answer.length == 0 || !questions[i].answer) {
    //     setCheckAnswer(i);
    //     return;
    //   } else {
    //     setCheckAnswer();
    //   }
    //   const answer = {
    //     answer: questions[i].answer,
    //     isMandatory:questions[i].isMandatory,
    //     operationType: "U",
    //     otherQuestionName:questions[i].otherQuestionName,
    //     questionDescription: questions[i].questionDescription,
    //     questionId: questions[i].questionId,
    //     scholarshipQuestionMappingId:questions[i].scholarshipQuestionMappingId
    //   };
    //   answers.push(answer);
    // }

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
      studentAbroadExperienceDtos:finalAnswer
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
        // setOpenModal(true);
        // setModalmsg(res.data.message);
        setConfirm(false);
        props.enqueueSnackbar(res.data.message, {
          variant: res.data.status == 204 ? "warning" : "success",
        });
        setAnswers([])
      })
      .catch((err) => {
        setAnswers([])

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
    let valid = [...validation];
    let word = e.target.value.split(" ");
    if(e.target.value.length > 5000 || word.length > 300) {
      valid[index] = true;
    } else {
      valid[index] = false;
    }
    setValidation(valid);
    let wordCounter1 = [...wordCounter];
    wordCounter1[index] = word.length;
    let charecterCounter1 = [...charecterCounter];
    charecterCounter1[index] = e.target.value.length;
    setWordCounter(wordCounter1);
    setCharecterCounter(charecterCounter1);
    // console.log(values[index]);
  };


  const handleChangeDate = (index, e, c) => {
   
    // const values = [...noOfOrganization];
    // values[index][c] =
    //   e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate();
    // setNoOfOrganization(values);
    //console.log(e);
    if(e) {
      if(c == "startDate"){
        setStartDate(e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate());
        setCheckStart(true)
      }
      else{
        setEndDate(e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate());
        setCheckEnd(true)
      }
  }
  };

  // const deleteExp = (id) => {
  //   finalAnswer.splice(id,1)
  // }
  // var count = 0;
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
                    Proffesional Experiance
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
                             {index + 1} : {question.questionDescription == "Add custom question" ? question.otherQuestionName : question.questionDescription } {question.isMandatory==1 && <sup style={{ color: "red", marginLeft: "3px" }}>*</sup>}
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
                            { 
                            submitValid && ( question.answer ?
                                   question.answer && question.answer.length == 0 &&(
                              <Typography style={{ color: "red" }}>
                                This fields are mandatory
                              </Typography>
                            ) : <Typography style={{ color: "red" }}>
                            This fields are mandatory
                          </Typography>)
                            }
                            { question.answer &&
                              question.answer.length > 5000 &&
                              <Typography style={{ color: "red" }}>
                                Exceeding 5000 character 
                              </Typography>
                            } 
                            {
                              validation[index] &&
                              <Typography style={{ color: "red" }}>
                                Exceeding 5000 character and word from 250 to 300
                              </Typography>
                            }
                          </div>
                        </div>
                        </>
                      );
                    })
                  : ""}
            </CardContent>
            {!finalAnswer.length == 0 && <div >
              <hr></hr>
              <Typography style={{marginLeft:"2%"}} variant="h5"> Abroad Experiance</Typography>
              </div>}
            {/* <hr></hr>
            {finalAnswer && finalAnswer.length > 0 && finalAnswer.map((e) => {
              <div>qwertyuiopgfhjkl</div>
            })} */}
            {finalAnswer && finalAnswer.map((e,index)=> {return(
              <>
              

              <Card
                className={classes.education__style}
                raised
                key={index}
              >
              <div style={{display:"flex", justifyContent:"space-between", flexDirection:"column"}}>
                <div>
                  <div className={classes.addEditDelete}>
                    <Typography>
                      <strong>
                        Description : {e.abroadExperienceDescription}
                      </strong>
                    </Typography>
                  </div>
                  <div className={classes.addEditDelete}>
                    <Typography>
                      <strong>
                        Start Date : {e.experienceStartDate}
                      </strong>
                    </Typography>
                  </div>
                  <div className={classes.addEditDelete}>
                    <Typography>
                      <strong>
                        End Date : {e.experienceEndDate}
                      </strong>
                    </Typography>
                  </div>
                  {/* <div>
                    <IconButton>
                      <EditIcon/>
                    </IconButton>
                    <IconButton onClick={deleteExp(index)}>
                      <DeleteIcon  />
                    </IconButton>
                  </div> */}
                </div>
                </div>
                
                
                
              </Card>
              </>
            )
            } 
            )}
            <div style={{display: "flex", marginLeft:"2%"}} >
            {/* <Checkbox
              checked={checked}
              onChange={()=>setChecked(true)}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            /> <Typography>Add Abroad Experiance</Typography> */}
              <div>
                <Button
                  variant="contained"
                  className={classes.rounding__edge}
                  color={!checked ? "primary" : "secondary"}
                  onClick={()=>setChecked(true)}
                >
                  {!checked ? <> + Add Abroad Experiance</> : <>Cancel</>}
                </Button>
              </div>
            </div>
            
            <Dialog onClose={()=>{setChecked(false)}} aria-labelledby="customized-dialog-title" open={checked} >
              <DialogTitleName id="customized-dialog-title" onClose={()=>{setChecked(false)}}>
                Add Abroad Experiance
              </DialogTitleName>
              <DialogContentData dividers>
                
                <TextField id="standard-basic" label="Description" style={{width:"700px"}} value={desc} onChange={(e)=> setDesc(e.target.value)}/>
                  {/* <TextField id="standard-basic"  fullWidth style={{width:"700px"}}/> */}
                  {descM && <Typography style={{color:"red"}}> Exceeding 3000 character</Typography>}
                  {desc.length ===  0 && <Typography style={{color:"red"}}> manditory field</Typography>}
                  <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
                      <Grid
                        item
                        xs={12}
                        container
                        style={{ padding: "20px 0px 20px 0px" }}
                        
                      >
                  <Grid item xs={6}>
                          <Grid container justify="space-around" item xs={12}>
                            <KeyboardDatePicker
                              fullWidth
                              disableFuture
                              disableToolbar
                              // id="standard-basic"
                              // maxDate={new Date()}
                              variant="outline"
                              label="Start Date"
                              format="dd-MMM-yyyy"
                              openTo="year"
                              name="startDate"
                              value={startDate}
                              InputLabelProps={{ shrink: true }}
                              onChange={(e) =>
                                handleChangeDate(index, e, "startDate")
                              }
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          </Grid>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          // style={
                          //   organs.presentCompanyFlag
                          //     ? { display: "none" }
                          //     : { display: "block" }
                          // }
                        >
                          <KeyboardDatePicker
                            fullWidth
                            // disableToolbar
                            disableFuture
                            //minDate={organs.startDate}
                            InputLabelProps={{ shrink: true }}
                            variant="outline"
                            label="End Date"
                            format="dd-MMM-yyyy"
                            openTo="year"
                            name="endDate"
                            value={endDate}
                            onChange={(e) =>
                              handleChangeDate(index, e, "endDate")
                            }
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </Grid>
                      {/* </Grid> */}
                      
                      </Grid>
                    </MuiPickersUtilsProvider>
                    <div style={{ display: "flex",justifyContent: "center"}}>
                    <Button 
                      variant="contained"
                      color="primary"
                      onClick={addAbroadExperiance}
                      >Add
                    </Button>
                    </div>
              </DialogContentData>
              {/* <DialogActionsData>
                <Button autoFocus onClick={handleClose} color="primary">
                  Save changes
                </Button>
              </DialogActionsData> */}
            </Dialog>
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
