import React, { useEffect, useState } from "react";
import axios from "axios";
import Applicants from "./Applicants";
import BenefactorNav from "../../../BenefactorNav";
import { CircularProgress, IconButton, Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SingleApplicantCard from "../../../atoms/SingleApplicantCard";
import ApplicantTab from "./ApplicantsTab";

const ScholarshipsApplicant = (props) => {
  const baseUrl = process.env.REACT_APP_URL;

  const [applicantdata, setApplicantdata] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [telephonic, settelephonic] = useState(false);
  const [panel, setPanel] = useState(false);

  useEffect(() => {
    getapplicants(props.location.state.values.scholarshipId);
    // props.location.state.values.foreach((element) => {
    //   console.log(element.name);
    // });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const rounds = [...props.location.state.values.selectionProcessRoundSet];
    rounds.forEach((round) => {
      if (round.selectionProcessRoundId == 2) {
        settelephonic(true);
      } else if (round.selectionProcessRoundId == 3) {
        setPanel(true);
      }
    });
  }, []);

  let history = useHistory();

  const getapplicants = (id) => {
    const body = {
      scholarshipId: id,
    };
    const config = {
      method: "post",
      url: `${baseUrl}/application/categorize-application-count`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };

    axios(config)
      .then((res) => {
        setApplicantdata(res.data.body);
        setIsLoading(true);
        if (
          res.data.body.applicationList &&
          res.data.body.applicationList.length == 0
        ) {
          setIsEmpty(true);
        }
      })
      .catch((err) => console.log(err));
  };

  let classes = useStyles();

  const back = () => {
    history.push("./");
  };
  return (
    <div className={classes.mainRoot}>
      <BenefactorNav />
      <div className={classes.backArrow} onClick={back}>
        <IconButton>
          <ArrowBackIcon fontSize="large" />
        </IconButton>
      </div>
      <div style={{ marginTop: "-60px" }}>
        <ApplicantTab
          values={props.location.state.values}
          scholarshipId={props.location.state.values.scholarshipId}
          totalApplicants={applicantdata}
          getapplicantscount={getapplicants}
          data={props.location.state}
          telephonic={telephonic}
          panel={panel}
        />
      </div>
    </div>
  );
};

export default ScholarshipsApplicant;

const useStyles = makeStyles((theme) => ({
  loading: {
    margin: theme.spacing(0, 30, 20, 83),
  },
  mainRoot: {
    maxWidth: "1350px",
    marginRight: "auto",
    marginLeft: "auto",
  },
  applicants__card: {
    display: "flex",
    margin: theme.spacing(3, 0, 3, 0),
    justifyContent: "space-evenly",
  },
  noData: {
    margin: theme.spacing(0, 30, 20, 80),
  },
  backArrow: {
    position: "absolute",
    width: "250px",
    zIndex: "2",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2, 0, 0, 0),
    },
  },
}));
