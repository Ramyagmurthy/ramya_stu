import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleApplicantCard from "../../../../atoms/SingleApplicantCard";
import { CircularProgress, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const AllApplicants = ({ values, scholarshipId, getapplicantscount }) => {
  const baseUrl = process.env.REACT_APP_URL;

  const [applicantdata, setApplicantdata] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const classes = useStyles();

  useEffect(() => {
    console.log("from body part", scholarshipId);
    getapplicants();
  }, []);

  const getapplicants = () => {
    const body = {
      applicationFilterDto: {
        tabName: "Applied",
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
        setApplicantdata(res.data.body.applicationList);
        // console.log(res.data.body.applicationList);
        setName(res.data.body.scholarshipDto.scholarshipName);
        setStatus(res.data.body.scholarshipDto.scholarshipStatusDto.label);
        setIsLoading(true);
        if (res.data.body.applicationList.length == 0) {
          setIsEmpty(true);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.mainRoot}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Typography variant="h5">
          <b>Scholarship Name :</b> {name}
        </Typography>
        <Typography variant="h5" style={{ marginLeft: "5%" }}>
          <b> Scholarship Status : </b>
          {status}
        </Typography>
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
    height: "auto",
    minHeight: "100vh",
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
}));
