import React, { useState, useContext, useEffect } from "react";
import {
  Paper,
  TextField,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  Grid,
  Typography,
  Button,
  InputLabel,
  Select,
  MenuItem,
  Card,
  IconButton,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TranslateIcon from "@material-ui/icons/Translate";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Slider from "@material-ui/core/Slider";
import axios from "axios";
import { LoginContext } from "../../../../Context/LoginContext";
import EditIcon from "@material-ui/icons/Edit";
import SimpleModal from "../../../atoms/Modal";
import { withSnackbar } from "notistack";
import FormGroup from "@material-ui/core/FormGroup";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Checkbox from "@material-ui/core/Checkbox";

function valuetext(value) {
  return `${value}°C`;
}

function Language(props) {
  const logindetails = useContext(LoginContext);

  //console.log("login details", logindetails);
  const [openModal, setOpenModal] = useState(false);
  const [modalmsg, setModalmsg] = useState("");
  const [modalvariation, setModalvariation] = useState("success");
  const [value, setValue] = useState();
  const [testValue, setTestValue] = useState();
  const [languages, setLanguages] = useState(
    logindetails.masterData.languageDtoList
  );
  //console.log(logindetails.masterData.languageDtoList);
  const [languageCheckList, setLanguageCheckList] = useState(
    logindetails.masterData.languageDtoList
  );

  const [examlist, setExamlist] = useState([
    ...logindetails.masterData.examDtoList,
  ]);
  const [examCheckList, setExamCheckList] = useState([
    ...logindetails.masterData.examDtoList,
  ]);

  const [examCheck, setExamCheck] = useState([]);

  const baseUrl = process.env.REACT_APP_URL;

  const body = JSON.stringify({
    studentExamDetails: examlist,
    studentId: logindetails.userData.studentId,
    studentLanguageDetails: languages,
    userId: logindetails.userData.userId,
  });

  const config = {
    method: "post",
    url: `${baseUrl}/student/save-language-exam-details`,
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
  };

  const handleEditExam = (e, value, index) => {
    if (e === true) {
      let examCheck1 = [...examCheck];
      examCheck1[index].check = true;
      setExamCheck(examCheck1);
      let examlist1 = [...examlist];
      let examCheckList1 = [...examCheckList];
      examCheckList1[index].operationType = "U";
      let isAlready = false;
      for (let i = 0; i < examlist1.length; i++) {
        if (value.examId === examlist1[i].examId) isAlready = true;
      }
      if (!isAlready) setExamlist([...examlist1, examCheckList1[index]]);
    } else {
      let examCheck1 = [...examCheck];
      examCheck1[index].check = false;
      setExamCheck(examCheck1);
      let examlist1 = [...examlist];
      for (let i = 0; i < examlist1.length; i++) {
        if (examlist1[i].examId === examCheck1[index].examId) {
          examlist1[i].operationType = "D";
        }
      }
      setExamlist([...examlist1]);
    }
  };

  const handleEdit = (e, value, index) => {
    if (e === true) {
      value.proficiencyLevel = 1;
      value.operationType = "U";
      let isAlready = false;
      for (let i = 0; i < languages.length; i++) {
        if (value.languageId === languages[i].languageId) isAlready = true;
      }
      if (!isAlready) setLanguages([...languages, value]);
      let newList = [...languageCheckList];
      for (let i = 0; i < newList.length; i++) {
        if (newList[i].languageId === value.languageId) {
          newList[i].proficiencyLevel = 1;
          newList[i].operationType = "U";
        }
      }
      setLanguageCheckList(newList);
    } else {
      let newList = [...languageCheckList];
      let newLanguagesList = [...languages];
      newList[index].proficiencyLevel = 0;
      for (let i = 0; i < newLanguagesList.length; i++) {
        if (newList[index].languageId === newLanguagesList[i].languageId)
          newLanguagesList[i].operationType = "D";
      }
      setLanguages(newLanguagesList);
      setLanguageCheckList(newList);
    }
  };

  const SaveLanguage = () => {
    // for(var i = 0;i<examlist.length;i++){
    //   if(examlist[i].score == null){
    //     return
    //   }
    // }
    axios(config)
      .then((response) => {
        setOpenModal(true);
        setModalmsg(response.data.message);
        props.enqueueSnackbar("Successfully Saved", {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        props.enqueueSnackbar("Something went wrong", {
          variant: "error",
        });
      });
  };
  const sliderValueChange = (e, value, index) => {
    const values = [...languages];
    values[index].proficiencyLevel = value;
    values[index].operationType = "U";
    setLanguages(values);
  };

  const examChange = (e, val, index) => {
    if (val >= 0) {
      const valz = [...examlist];
      valz[index].operationType = "U";
      valz[index].score = val ? val : null;
      setExamlist(valz);
      // checkValidaton(false)
    } else {
      setTestValue(index);
      // checkValidaton(true);
      return;
    }
  };

  useEffect(() => {
    getUserInfo(logindetails.userData.userId);
  }, []);

  const getUserInfo = (id) => {
    axios
      .get(baseUrl + `/student/load-student-profile-data?userId=${id}`)
      .then((res) => {
        //console.log("res", res);
        if (res.data.body.studentLanguageDetailsList[0]) {
          setLanguages(res.data.body.studentLanguageDetailsList);
          let lag = res.data.body.studentLanguageDetailsList;
          let lag2 = languageCheckList;
          for (let i = 0; i < lag2.length; i++) {
            lag2[i].proficiencyLevel = 0;
            for (let j = 0; j < lag.length; j++) {
              if (lag[j].languageId == lag2[i].languageId)
                if (lag[j].proficiencyLevel > 0) lag2[i] = lag[j];
            }
          }
          setLanguageCheckList(lag2);
        } else {
          setLanguages([]);
        }
        if (res.data.body.studentExamDetailsList[0]) {
          setExamlist(res.data.body.studentExamDetailsList);
          let exam1 = res.data.body.studentExamDetailsList;
          let exam2 = examCheckList;
          let examCheck = [];
          for (let i = 0; i < exam2.length; i++) {
            examCheck.push({
              examName: exam2[i].name,
              examId: exam2[i].examId,
              check: false,
            });
            for (let j = 0; j < exam1.length; j++) {
              if (exam1[j].examId == examCheck[i].examId)
                examCheck[i].check = true;
              //console.log("hi");
            }
          }
          setExamCheck(examCheck);
          //console.log(examCheck);

          //console.log(res.data.body.studentExamDetailsList);
        } else {
          setExamlist([]);
          let exam1 = res.data.body.studentExamDetailsList;
          let exam2 = examCheckList;
          let examCheck = [];
          for (let i = 0; i < exam2.length; i++) {
            examCheck.push({
              examName: exam2[i].name,
              examId: exam2[i].examId,
              check: false,
            });
            for (let j = 0; j < exam1.length; j++) {
              if (exam1[j].examId == examCheck[i].examId)
                examCheck[i].check = true;
              //console.log("hi");
            }
          }
          setExamCheck(examCheck);
        }
      })
      .catch((err) => console.log(err));
  };

  const classes = useStyles();
  return (
    <div >
      <SimpleModal
        //openModal={openModal}
        setOpenModal={setOpenModal}
        modalmsg={modalmsg}
        modalvariation={modalvariation}
        setModalvariation={setModalvariation}
      />
      <div className="bio__buttons">
        <div className="cancel__btn" type="button">
          CANCEL
        </div>
        <div className="save__btn " type="button" onClick={SaveLanguage}>
          SAVE DETAILS
        </div>
      </div>
      {/* <Paper elevation={3} className={classes.paperarea}> */}
      <div className="bio__container bg_blue p-3 mt-2 br_5">
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
          <div class="educatoin__title">Language and Test Scores :</div>
          <TranslateIcon
            style={{
              fontSize: "50px",
              marginLeft: "20px",
            }}
          />
          {/* <Tooltip title="Edit">
            <IconButton>
              <EditIcon />
            </IconButton>
          </Tooltip> */}
        </Grid>
        <Grid container className={classes.form}>
          {languages.map((language, index) => {
            if (language.operationType != "D")
              return (
                <Grid container xs={12} key={index * 1000}>
                  <Typography id="discrete-slider" gutterBottom style={{fontSize:"16px"}}>
                    {language.name}
                  </Typography>
                  <div className={classes.slider}>
                    <Slider
                      // defaultValue={0}
                      getAriaValueText={valuetext}
                      aria-labelledby="discrete-slider"
                      valueLabelDisplay="auto"
                      name={language.name}
                      step={1}
                      marks
                      min={1}
                      max={5}
                      value={language.proficiencyLevel}
                      fullWidth
                      onChange={(e, value) =>
                        sliderValueChange(e, value, index)
                      }
                      // onChange={}
                    />
                  </div>
                </Grid>
              );
          })}
          <Accordion style={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <FormLabel component="legend">Add Languages </FormLabel>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup
                style={{ height: "200px", width: "100%", overflowX: "scroll" }}
              >
                {languageCheckList.map((languageCheck, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      // onChange={(e, v) => console.log(v)}
                      onChange={(e, v) => handleEdit(v, languageCheck, index)}
                      control={
                        <Checkbox
                          checked={
                            languageCheck.proficiencyLevel > 0 ? true : false
                          }
                        />
                      }
                      label={languageCheck.name}
                    />
                  );
                })}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
          <Container style={{ paddingTop: "60px" }}>
            {examlist.map((exam, index) => {
              if (exam.operationType != "D")
                return (
                  <Grid
                    container
                    xs={12}
                    style={{
                      padding: "10px 0px 10px 0px",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    key={index}
                  >
                    <Grid item xs={2}>
                      <Typography
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize:"16px"
                        }}
                      >
                        {exam.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        type="number"
                        variant="outlined"
                        value={exam.score}
                        onChange={(e, val) =>
                          examChange(e, e.target.value, index)
                        }
                      />
                    </Grid>
                  </Grid>
                );
            })}
          </Container>
          <Accordion style={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <FormLabel component="legend">Select the Examinations</FormLabel>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup
                style={{ height: "200px", width: "100%", overflowX: "scroll" }}
              >
                {examCheck.map((examValue, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      // onChange={(e, v) => console.log(v)}
                      onChange={(e, v) => handleEditExam(v, examValue, index)}
                      control={<Checkbox checked={examValue.check} />}
                      label={examValue.examName}
                    />
                  );
                })}
              </FormGroup>
            </AccordionDetails>
          </Accordion>

          {/* <Grid
            xs={12}
            style={{
              marginTop: "50px",
              display: "flex",
              justiifyContent: "space-around",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={SaveLanguage}
              fullWidth
              className={classes.submit}
            >
              Save
            </Button>
          </Grid> */}
        </Grid>
      </div>
      {/* </Paper> */}
    </div>
  );
}

export default withSnackbar(Language);

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(80),
    marginRight: "auto",
    marginLeft: "auto",
    paddingTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "100%",
      padding: theme.spacing(5, 0, 0, 0),
    },
  },
  paperarea: {
    padding: theme.spacing(10),
    paddingTop: theme.spacing(5),
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "100%",
      padding: theme.spacing(2, 2, 5, 2),
    },
  },
  formItem: {
    paddingBottom: theme.spacing(5),
    paddingTop: theme.spacing(5),
  },
  formcontrol: {
    maxWidth: "100px",
  },
  submit: {
    borderRadius: theme.spacing(2),
  },
  slider: {
    border: "2px solid white",
    padding: theme.spacing(0, 2),
    borderRadius: theme.spacing(2),
    backgroundColor: "#f1f2f5",
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  red: {
    color: "red",
  },
  form:{
    padding:"0 20px 0 20px"
  }
}));
