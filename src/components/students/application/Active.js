import React, { useState, useEffect, useContext } from "react";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ApplicationCard from "../../atoms/ApplicationCard";
import axios from "axios";
import { LoginContext } from "../../../Context/LoginContext";

function Active() {
  const classes = useStyles();

  const logindetails = useContext(LoginContext);
  const student = logindetails.userData.studentId;
  const baseUrl = process.env.REACT_APP_URL;
  // const baseUrl = "http://studost.devkraft.in/studost/api"

  const [appliedScholarships, setAppliedScholarships] = useState([]);

  useEffect(() => {
    // console.log("from aplication tab ---", student);
    getAppliedScholaships(student);
  }, []);



  const getAppliedScholaships = (id) => {
    axios
      .get(
        `${baseUrl}/application/user-applied-scholarship-active?student_id=${id}`
      )
      .then((res) => {
        // console.log("from application----", res.data);
        setAppliedScholarships([...res.data.body]);
      })
      .catch((err) => console.log(err));
  };

  const getAllScholarships = () =>{
    getAppliedScholaships(student)
  }

  return (
    <div className={classes.root}>
      {appliedScholarships.map((active, i) => {
        return (
          <div key={i}>
            <ApplicationCard values={active} getAppliedScholaships={getAllScholarships}/>
          </div>
        );
      })}
    </div>
  );
}

export default Active;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.spacing(140),
  },
}));
