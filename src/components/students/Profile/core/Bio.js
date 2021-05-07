import React, { useContext, useEffect, useState } from "react";
import { Typography, Grid, paper, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import { LoginContext } from "../../../../Context/LoginContext";
import axios from "axios";
import SimpleModal from "../../../../components/atoms/Modal";
import { withSnackbar } from "notistack";

function Bio(props) {
  const classes = useStyles();
  const logindetails = useContext(LoginContext);

  const baseUrl = process.env.REACT_APP_URL;

  const url = `${baseUrl}/master/get-master-data`;
  const [questions, setQuestions] = useState(
    logindetails.masterData.behaviouralQuestionsDtoList.filter((e)=>e.isMandatory == 1)
  );
  const [checkAnswer, setCheckAnswer] = useState();
  const [index, setIndex] = useState();

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
  const [length, setLength] = useState(false);

  const handleSubmit = (e) => {
    // if(fname.length == 0 || !fname ||lname.length == 0 || !lname || address.length == 0 || !address){
    //   setCheckFname(true)
    //   return
    // }
    // else{
    //   setCheckFname(false)
    // }

    for (let i = 0; i < questions.length; i++) {
      let word = questions[i].answer.split(" ");
     //console.log(word.length);
      if (word.length < 251 || 
          word.length > 301 || 
          questions[i].answer.length > 5000 || 
          !questions[i].answer) {
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
    // console.log(e);
    setIndex(index);
    const values = [...questions];
    values[index].answer = e.target.value;
    console.log(values[index].answer.length);
    setQuestions(values);

  };
  // console.log("questions",questions)

  var count = 0
  return (
    <Paper elevattion={3} className={classes.main}>
      <SimpleModal
        //openModal={openModal}
        setOpenModal={setOpenModal}
        modalmsg={modalmsg}
      />
      <div className={classes.headerTile}>
        <Typography variant="h4">Bio</Typography>
        <FingerprintIcon />
      </div>
      <div style={{textAlign: "center"}}>(You can enter minimum of 250 - 300 words and maximum 5000 characters)</div>
      <Grid xs={12} container>
        {questions
          ? questions.map((question, index) => {
              if(question.isMandatory == 1){
                count++;
              }
              return (
                <>
                
                <Grid Container key={index} style={{ width: "100%" }}>
                  <Grid item xs={12} sm={12}>
                    <Typography
                      fullWidth
                      variant="h5"
                      style={{
                        width: "100%",
                        paddingTop: "16px",
                        color: "grey",
                      }}
                    >
                      {question.questionDescription}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      fullWidth
                      multiline
                      value={question.answer}
                      // name={question.questionTypeDto.questionTypeName}
                      onChange={((e) => answerschange(e, index))}
                      placeholder="Please write your answer here"
                      style={{
                        width: "100%",
                        padding: "16px 0 16px 0",
                        color: "grey",
                      }}
                    />
                    {checkAnswer == index && (
                      <Typography style={{ color: "red" }}>
                        Enter 250-300 words and maximum 5000 characters
                      </Typography>
                    )}
                    
                  </Grid>
                </Grid>
                </>
              );
            })
          : ""}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        className={classes.submit}
        style={{ marginTop: "60px" }}
        disabled={count > 0 ? false:true}
      >
        save Answers
      </Button>
    </Paper>
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
