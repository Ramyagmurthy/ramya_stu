import React, { useState, useEffect, useContext } from "react";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ApplicationCard from "../../atoms/ApplicationCard";
import axios from "axios";
import { LoginContext } from "../../../Context/LoginContext";

function Won() {
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
        `${baseUrl}/application/user-applied-scholarship-won?student_id=${id}`
      )
      .then((res) => {
        setAppliedScholarships([...res.data.body]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.root}>
      {appliedScholarships.map((active, i) => {
        return (
          <div key={i}>
            <ApplicationCard values={active} />
          </div>
        );
      })}
    </div>
  );
}

export default Won;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.spacing(140),
  },
}));
