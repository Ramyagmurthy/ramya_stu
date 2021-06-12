import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import SingleApplicantCard from "../../../../atoms/SingleApplicantCard";
import { CircularProgress, Typography, Button } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { LoginContext } from "../../../../../Context/LoginContext";
import SimpleModal from "../../../../atoms/Modal";

const AllApplicants = ({ values, scholarshipId, getapplicantscount }) => {
  const baseUrl = process.env.REACT_APP_URL;
  // const baseUrl = "http://studost.devkraft.in/studost/api"

  const [applicantdata, setApplicantdata] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [showSubmitForNextRoundButton, setShowSubmitForNextRoundButton] =
    useState(false);
  const [showGoToPreviousStageButton, setShowGoToPreviousStageButton] =
    useState(false);
  const [showGoToNextStageButton, setShowGoToNextStageButton] = useState(false);
  const [submitButtonText, setSubmitButtonText] = useState(false);
  const [nextButton, setNextButton] = useState("");
  const [previousButton, setPreviousButton] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [modalmsg, setModalmsg] = useState("");
  const [modalvariation, setModalvariation] = useState("success");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const logindetails = useContext(LoginContext);

  const classes = useStyles();

  useEffect(() => {
    getapplicants();
  }, []);

  const getapplicants = () => {
    const body = {
      applicationFilterDto: {
        tabName: "Won",
      },
      pageNumber: 1,
      scholarshipId: scholarshipId,
      totalRecordPerPage: 100,
    };
    const config = {
      method: "post",
      url: `${baseUrl}/benefactor/get-scholarship-application-data`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };

    axios(config)
      .then((res) => {
        setName(res.data.body.scholarshipDto.scholarshipName);
        setStatus(res.data.body.scholarshipDto.scholarshipStatusDto.label);
        setShowGoToNextStageButton(res.data.body.showGoToNextStageButton);
        setSubmitButtonText(res.data.body.submitButtonText);
        setNextButton(res.data.body.nextStageButtonText);
        setPreviousButton(res.data.body.previousStageButtonText);
        setApplicantdata(res.data.body.applicationList);
        setIsLoading(true);
        setShowSubmitForNextRoundButton(
          res.data.body.showSubmitForNextRoundButton
        );
        setShowGoToPreviousStageButton(
          res.data.body.showGoToPreviousStageButton
        );
        if (res.data.body.applicationList.length == 0) {
          setIsEmpty(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const submitForNextRoundButton = () => {
    // console.log("caught")
    const body = {
      loginUserId: logindetails.userData.userId,
      scholarshipId: scholarshipId,
    };
    const config = {
      method: "post",
      url: `${baseUrl}/application/submit-shortlisted-applications`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };

    axios(config)
      .then((res) => {
        if (res.data.status == 200) {
          setOpenModal(true);
          setModalmsg(res.data.message);
          setModalvariation("success");
        } else if (res.data.status == 204 || res.data.status == 500) {
          setOpenModal(true);
          setModalmsg(res.data.message);
          setModalvariation("warning");
        }
        getapplicantscount(scholarshipId);
        getapplicants();
        // console.log("qwertyu",res.data.body)
      })
      .catch((err) => console.log(err));
  };

  const submitForPreviousStageButton = () => {
    const body = {
      loginUserId: logindetails.userData.userId,
      scholarshipId: scholarshipId,
    };
    const config = {
      method: "post",
      url: `${baseUrl}/scholarship/go-to-previous-stage`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };

    axios(config)
      .then((res) => {
        if (res.data.status == 200) {
          setOpenModal(true);
          setModalmsg(res.data.message);
          setModalvariation("success");
        } else if (res.data.status == 204 || res.data.status == 500) {
          setOpenModal(true);
          setModalmsg(res.data.message);
          setModalvariation("warning");
        }
        getapplicantscount(scholarshipId);
        getapplicants();
        // console.log("qwertyu",res.data.body)
      })
      .catch((err) => console.log(err));
  };

  const submitForNextStageButton = () => {
    const body = {
      loginUserId: logindetails.userData.userId,
      scholarshipId: scholarshipId,
    };
    const config = {
      method: "post",
      url: `${baseUrl}/scholarship/proceed-to-next-scholarship-stage`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };

    axios(config)
      .then((res) => {
        if (res.data.status == 200) {
          setOpenModal(true);
          setModalmsg(res.data.message);
          setModalvariation("success");
        } else if (res.data.status == 204 || res.data.status == 500) {
          setOpenModal(true);
          setModalmsg(res.data.message);
          setModalvariation("warning");
        }
        getapplicantscount(scholarshipId);
        getapplicants();
        // console.log("qwertyu",res.data.body)
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <SimpleModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalmsg={modalmsg}
        modalvariation={modalvariation}
        setModalvariation={setModalvariation}
      />
      <div className={classes.buttons}>
        {showGoToPreviousStageButton && (
          <Button variant="contained">Previous Stage</Button>
        )}
        {showSubmitForNextRoundButton && (
          <Button variant="contained" color="primary">
            {submitButtonText}
          </Button>
        )}
        {showGoToNextStageButton && (
          <Button variant="contained" color="secondary">
            Next Stage
          </Button>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Typography variant="h5">
          <b>Scholarship Name :</b> {name}
        </Typography>
        <Typography variant="h5" style={{ marginLeft: "5%" }}>
          <b> Scholarship Status : </b>
          {status}
        </Typography>{" "}
      </div>
      {isLoading ? (
        applicantdata &&
        applicantdata.length != 0 &&
        applicantdata.map((applicant) => {
          return (
            <div className={classes.applicants__card}>
              <SingleApplicantCard
                applicant={applicant}
                getapplicants={getapplicants}
                getapplicantscount={getapplicantscount}
              />
            </div>
          );
        })
      ) : (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      )}
      {isEmpty && (
        <div className={classes.noData}>
          <Typography variant="h4">No Applicants</Typography>
        </div>
      )}
    </div>
  );
};

export default AllApplicants;

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
    margin: theme.spacing(30, 0, 20, 30),
    width: "50%",
  },
  buttons: {
    // border: "2px solid red",
    display: "flex",
    justifyContent: "space-around",
    // padding: theme.spacing(0, 10, 0, ),
  },
  singleButton: {
    textTransform: "none",
    minWidth: "250px",
    marginBottom: "50px",
    fontSize: "16px",
    borderRadius: theme.spacing(2),
  },
}));
