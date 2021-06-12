import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  Grid,
  paper,
  Paper,
  Button,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import { LoginContext } from "../../../../Context/LoginContext";
import axios from "axios";
import SimpleModal from "../../../../components/atoms/Modal";
import { withSnackbar } from "notistack";
import upload from "../../../../assets/img/upload.png";

function Bio(props) {
  const classes = useStyles();
  const logindetails = useContext(LoginContext);

  const baseUrl = process.env.REACT_APP_URL;

  const url = `${baseUrl}/master/get-master-data`;
  const [questions, setQuestions] = useState(
    logindetails.masterData.behaviouralQuestionsDtoList.filter(
      (e) => e.isMandatory == 1
    )
  );
  const [checkAnswer, setCheckAnswer] = useState();
  const [index, setIndex] = useState();
  const [submitValid, setSubmitValid] = useState(false);

  useEffect(() => {
    getUserInfo(logindetails.userData.userId);
  }, []);

  const getUserInfo = (id) => {
    axios
      .get(baseUrl + `/student/load-student-profile-data?userId=${id}`)
      .then((res) => {
        // console.log("from user---", res.data.body.questionDetailsList);
        if (res.data.body.questionDetailsList[0].answer) {
          setQuestions(res.data.body.questionDetailsList);
        }
      })
      .catch((err) => console.log(err, "from student get", id));
  };

  const [answers, setAnswers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalmsg, setModalmsg] = useState("");
  const [validation, setValidation] = useState([]);
  const [wordCounter, setWordCounter] = useState([]);
  const [charecterCounter, setCharecterCounter] = useState([]);

  const handleSubmit = (e) => {
    // if(fname.length == 0 || !fname ||lname.length == 0 || !lname || address.length == 0 || !address){
    //   setCheckFname(true)
    //   return
    // }
    // else{
    //   setCheckFname(false)
    // }
    setSubmitValid(true);
    for (let i = 0; i < questions.length; i++) {
      let word = questions[i].answer.split(" ");
      //console.log(word.length);
      if (
        word.length < 251 ||
        word.length > 301 ||
        questions[i].answer.length > 5000 ||
        questions[i].answer.length == 0 ||
        !questions[i].answer
      ) {
        setCheckAnswer(i);
        return;
      } else {
        setCheckAnswer();
      }
      const answer = {
        answer: questions[i].answer,
        isMandatory: questions[i].isMandatory,
        operationType: "U",
        questionDescription: questions[i].questionDescription,
        questionId: questions[i].questionId,
      };
      answers.push(answer);
    }

    let body = {
      questionDetails: answers,
      studentId: logindetails.userData.studentId,
      userId: logindetails.user,
    };
    // console.log(body);

    const config = {
      method: "post",
      url: `${baseUrl}/student/save-bio-details`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };
    axios(config)
      .then((res) => {
        // console.log(res.data);
        setAnswers([]);
        setOpenModal(true);
        setModalmsg(res.data.message);
        props.enqueueSnackbar("Successfully Saved", {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        props.enqueueSnackbar("error", {
          variant: "error",
        });
        setAnswers([]);
      });
  };
  const answerschange = (e, index) => {
    setIndex(index);
    const values = [...questions];
    values[index].answer = e.target.value;
    setQuestions(values);
    let valid = [...validation];
    let word = e.target.value.split(" ");
    if (e.target.value.length > 5000 || word.length > 300) {
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
  // console.log("questions",questions)

  var count = 0;
  return (
    <>
      <div className="bio__buttons">
        <div className="cancel__btn" type="button">
          CANCEL
        </div>
        <div className="save__btn " type="button" onClick={handleSubmit}>
          SUBMIT
        </div>
      </div>

      <SimpleModal
        //openModal={openModal}
        setOpenModal={setOpenModal}
        modalmsg={modalmsg}
      />
      <div className="bio__container">
        {/* <div className={classes.headerTile}>
          <Typography variant="h4">Bio</Typography>
          <FingerprintIcon />
        </div> 
         <div style={{ textAlign: "center" }}>
          (You can enter minimum of 250 - 300 words and maximum 5000 characters)
        </div> */}
        {questions
          ? questions.map((question, index) => {
              if (question.isMandatory == 1) {
                count++;
              }
              return (
                <>
                  <div className="container bg_blue p-5 mt-5 mb-5 small__nopadding">
                    <div className="bio__questions">
                      {index + 1}. {question.questionDescription}
                    </div>
                    <div className="mt-3">
                      {/* <div className="row justify-content-center mt-3">
                          <div className="upload__video mt-2">Upload Video</div>
                        </div>
                        <p className="text_light mx-auto d-block">
                          Click On The Video Upload Button to Upload Video
                          Answer
                        </p> */}
                      {/* <div className="upload-btn-wrapper mx-auto d-block mt-3 mb-5">
                          <label htmlFor={question.questionDescription}>
                            <div className="upload__button" type="button">
                              <img src={upload} className="upload__icon" />{" "}
                              UPLOAD VIDEO
                            </div>
                          </label>
                          <input
                            type="file"
                            name="myfile"
                            id={question.questionDescription}
                            style={{ display: "none" }}
                          />
                        </div> */}
                      <textarea
                        type="text"
                        rows="20"
                        value={question.answer}
                        onChange={(e) => answerschange(e, index)}
                        placeholder="Please write your answer here"
                        className="bio__answer no_border form-control"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "12px",
                        margin: "8px 5px 0px 5px",
                      }}
                    >
                      <div
                        style={
                          charecterCounter[index] &&
                          charecterCounter[index] > 5000
                            ? { color: "red" }
                            : { color: "#818181" }
                        }
                      >
                        {charecterCounter[index]
                          ? `${charecterCounter[index]} / 5000`
                          : "max Characters: 5000"}
                      </div>
                      <div
                        style={
                          wordCounter[index] && wordCounter[index] < 250
                            ? { color: "red" }
                            : { color: "#818181" }
                        }
                      >
                        {wordCounter[index]
                          ? `${wordCounter[index]} / 250`
                          : "min Words: 250"}
                      </div>
                    </div>

                    {submitValid &&
                      (question.answer ? (
                        question.answer.length === 0 && (
                          <Typography style={{ color: "red" }}>
                            Enter the answer
                          </Typography>
                        )
                      ) : (
                        <Typography style={{ color: "red" }}>
                          Enter the answer
                        </Typography>
                      ))}
                    {validation[index] && !(wordCounter[index] < 251) && (
                      <>
                        <Typography style={{ color: "red" }}>
                          *
                          {/* Exceeding 5000 character and word from 250 to 300 */}
                        </Typography>
                        {/* <Typography style={{ color: "black" }}>
                            Word Count : {wordCounter[index]}, Charecter Count :{" "}
                            {charecterCounter[index]}
                          </Typography> */}
                      </>
                    )}
                    {/* {submitValid && wordCounter[index] < 251 && (
                        <Typography style={{ color: "red" }}>
                          word is less than 250
                        </Typography>
                      )} */}
                  </div>
                </>
              );
            })
          : ""}
        {/* <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          className={classes.submit}
          style={{ marginTop: "60px" }}
          disabled={count > 0 ? false : true}
        >
          save Answers
        </Button> */}
      </div>
    </>
  );
}

export default withSnackbar(Bio);

const useStyles = makeStyles((theme) => ({
  root: {},
  main: {
    width: theme.spacing(100),
    padding: theme.spacing(5),
    marginRight: "auto",
    marginLeft: "auto",
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  headerTile: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "50px",
  },
  submit: {
    borderRadius: theme.spacing(2),
  },
  red: {
    color: "red",
  },
}));
