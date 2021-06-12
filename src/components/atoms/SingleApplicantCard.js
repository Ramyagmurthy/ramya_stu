import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { IconButton, Tooltip } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { LoginContext } from "../../Context/LoginContext";
import DoneIcon from "@material-ui/icons/Done";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import axios from "axios";
import Alert from "./Modal";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function SingleApplicantCard({
  applicant,
  getapplicants,
  getapplicantscount,
}) {
  const classes = useStyles();
  const baseUrl = process.env.REACT_APP_URL;

  const logindetails = useContext(LoginContext);
  const [openModal, setOpenModal] = useState(false);
  const [modalmsg, setModalmsg] = useState("");
  const [modalvariation, setModalvariation] = useState("success");
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(null);

  const [shortlisted, setShortlisted] = useState(
    applicant.applicationStatusName
  );
  console.log("applicant.markedForNextRound", applicant);

  console.log(
    "applicant.applicationStatusName",
    applicant.applicationStatusName
  );

  const rejectApplicant = () => {
    const body = {
      loginUserId: logindetails.user,
      scholarshipId: applicant.scholarshipId,
      applicationId: applicant.applicationId,
    };

    const config = {
      method: "post",
      url: `${baseUrl}/application/reject-application`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };

    axios(config)
      .then((res) => {
        getapplicants();
        getapplicantscount(applicant.scholarshipId);
        if (res.data.status == 200) {
          setOpenModal(true);
          setModalmsg(res.data.message);
          setModalvariation("success");
        } else if (res.data.status == 204) {
          setOpenModal(true);
          setModalmsg(res.data.message);
          setModalvariation("warning");
        }
      })
      .catch((err) => console.log());
  };

  const shortListApplicant = () => {
    const body = {
      loginUserId: logindetails.user,
      scholarshipId: applicant.scholarshipId,
      applicationId: applicant.applicationId,
    };

    const config = {
      method: "post",
      url: `${baseUrl}/application/mark-for-shortlisting`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };

    axios(config)
      .then((res) => {
        setShortlisted(true);
        getapplicants();
        getapplicantscount(applicant.scholarshipId);
        if (res.data.status == 200) {
          setOpenModal(true);
          setModalmsg(res.data.message);
          setModalvariation("success");
        } else if (res.data.status == 204) {
          setOpenModal(true);
          setModalmsg(res.data.message);
          setModalvariation("warning");
        }
      })
      .catch((err) => console.log());
  };

  useEffect(()=> {
    getApplicationData()
  }, [])

  const Unmark = () => {
    const body = {
      loginUserId: logindetails.user,
      scholarshipId: applicant.scholarshipId,
      applicationId: applicant.applicationId,
    };
    const config = {
      method: "post",
      url: `${baseUrl}/application/unmark-for-shortlisting`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };

    axios(config)
      .then((res) => {
        setShortlisted(false);
        getapplicantscount(applicant.scholarshipId);
        if (res.data.status == 200) {
          setOpenModal(true);
          setModalmsg(res.data.message);
          setModalvariation("success");
        } else if (res.data.status == 204) {
          setOpenModal(true);
          setModalmsg(res.data.message);
          setModalvariation("warning");
        }
        getapplicants();
      })
      .catch((err) => console.log());
  };

  const getApplicationData = () => {
    axios
      .get(
        `${baseUrl}/application/get-application-data?applicationId=${applicant.applicationId}`
      )
      .then((res) => {
        console.log(res);
        setDetails(res.data.body);
        console.log(res.data.body);
      })
      .catch((err) => console.log());
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          {" "}
          <Button onClick={getApplicationData}>Applicants data</Button>
        </DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ marginRight: "8%" }}>
              <Typography style={{ marginTop: "2%" }}>
                First Name : {applicant.studentBasicProfileDto.firstName}{" "}
                {applicant.studentBasicProfileDto.lastName}
              </Typography>
              <Typography style={{ marginTop: "5%" }}>
                Mobile : {applicant.studentBasicProfileDto.phoneNumber}
              </Typography>
              <Typography style={{ marginTop: "5%" }}>
                Date Of Birth :{" "}
                {applicant.studentPersonalDetailsDto.dateOfBirth}
              </Typography>
              <Typography style={{ marginTop: "5%" }}>
                Gender : {applicant.studentPersonalDetailsDto.genderDto.name}
              </Typography>
              <Typography style={{ marginTop: "5%" }}>
                City : {applicant.studentPersonalDetailsDto.cityDto.name}
              </Typography>
              <Typography style={{ marginTop: "5%" }}>
                Address : {applicant.studentPersonalDetailsDto.address}
              </Typography>
              <Typography style={{ marginTop: "5%" }}>
                Amount Required :{" "}
                {applicant.studentBasicProfileDto.fundAmountRequired}
              </Typography>
            </div>
            <img src={applicant.imagePath} width="40%" height="25%" style={{marginLeft:"10%"}} />
          </div>
          {details && <>
          
              <Typography style={{ marginTop: "2%" }}>
              Date Of Submission : {details.dateOfSubmission}
                  </Typography>
                  <Typography style={{ marginTop: "2%" }}>
              Scholarship : {details.scholarshipDto.scholarshipName}
                  </Typography>
                  <DialogTitle>Bio</DialogTitle>
                  {details.scholarshipQuestionsMappinpList.map((bio, index)=> 
                    <>
                    <Typography style={{ marginTop: "2%" }}>{index+1} : {bio.questionDescription} </Typography>
                    <Typography>   {bio.answer}</Typography>
                    </>
                  )}
                  <DialogTitle>Awards</DialogTitle>
                  {details.studentDetailsDto.awardsList.map((adwads, index)=> 
                    <>
                    <Typography style={{marginTop:"2%"}}>Name: {adwads.name} </Typography>
                    <Typography>Description:   {adwads.description}</Typography>
                    </>
                  )}
                  <DialogTitle>Education</DialogTitle>
                  {details.studentDetailsDto.educationList.map((Education, index)=> 
                    <>
                    <Typography style={{marginTop:"2%"}}>Collage Name:   {Education.collegeDto.name}</Typography>
                    <Typography>Degree Name:   {Education.degreeDto.name}</Typography>
                    <Typography>Education Name:   {Education.educationTypeDto.educationTypeName}</Typography>
                    <Typography>Study Field:   {Education.studyFieldDto.name}</Typography>
                    <Typography>Start Date:   {Education.startDate}</Typography>
                    </>
                  )}
              </>
              }
          {/* <Typography style={{ marginTop: "5%" }}>
            {" "}
            {applicant.studentBasicProfileDto.summary}
          </Typography> */}
        </DialogContent>
      </Dialog>
      <Card
        className={classes.root}
        style={
          applicant.applicationStatusName == "TEMPORARY_WON" ||
          applicant.applicationStatusName == "TEMPORARY_PANEL_ROUND" ||
          applicant.applicationStatusName == "TEMPORARY_TELEPHONIC_ROUND"
            ? { border: "3px outset #FFD700" }
            : applicant.applicationStatusName == "FINAL_TELEPHONIC_ROUND" ||
              applicant.applicationStatusName == "FINAL_PANEL_ROUND" ||
              applicant.applicationStatusName == "WON"
            ? { border: "3px outset #228B22" }
            : null
        }
        onClick={() => {
          handleOpen();
        }}
      >
        <Alert
          openModal={openModal}
          setOpenModal={setOpenModal}
          modalmsg={modalmsg}
          modalvariation={modalvariation}
          setModalvariation={setModalvariation}
        />
        <CardActionArea>
          {(applicant.applicationStatusName == "TEMPORARY_WON" ||
            applicant.applicationStatusName == "TEMPORARY_PANEL_ROUND" ||
            applicant.applicationStatusName ==
              "TEMPORARY_TELEPHONIC_ROUND") && (
            <TurnedInNotIcon
              style={{
                fontSize: "40px",
                color: "#FFD700",
                position: "absolute",
                marginLeft: "92%",
                opacity: 0.8,
                zIndex: "10",
              }}
            />
          )}
          {(applicant.applicationStatusName == "FINAL_TELEPHONIC_ROUND" ||
            applicant.applicationStatusName == "FINAL_PANEL_ROUND" ||
            applicant.applicationStatusName == "WON") && (
            <TurnedInNotIcon
              style={{
                fontSize: "40px",
                color: "#228B22",
                position: "absolute",
                marginLeft: "92%",
                opacity: 0.8,
                zIndex: "10",
              }}
            />
          )}
          <CardMedia
            component="video"
            alt="Applicant's Name"
            // mheight="400"
            // image={applicant.videoProfilePath}
            autoPlay={false}
            controls
            // image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
            src={applicant.videoProfilePath}
            style={{ maxHeight: "500px" }}
          />

          <CardContent style={{ backgroundColor: " #f1f2f5" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography gutterBottom variant="h5" component="h2">
                {applicant.studentBasicProfileDto.firstName +
                  " " +
                  applicant.studentBasicProfileDto.lastName}
              </Typography>

              <Avatar
                src={applicant.imagePath}
                className={classes.avatar__position}
              />
            </div>
            <Typography variant="body2" color="textSecondary" component="p">
              {applicant.studentBasicProfileDto.summary}
            </Typography>
          </CardContent>
          <div className={classes.social}>
            {applicant.studentBasicProfileDto.socialMediaDtoList.map(
              (media) => {
                return (
                  <IconButton href={media.url} target="_blank">
                    {media.name == "Linkedin" ? <LinkedInIcon /> : null}
                    {media.name == "Facebook" ? <FacebookIcon /> : null}
                    {media.name == "  Twitter" ? <TwitterIcon /> : null}
                  </IconButton>
                );
              }
            )}
          </div>
        </CardActionArea>
        <CardActions className={classes.action__btn}>
          {applicant.showRejectButton && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={rejectApplicant}
            >
              Reject
            </Button>
          )}

          {applicant.showMarkButton && (
            <Button
              variant="outlined"
              color="primary"
              onClick={shortListApplicant}
            >
              <Typography>
                {applicant.markButtonText ? applicant.markButtonText : "Mark"}
              </Typography>
            </Button>
          )}
          {applicant.showUnMarkButton && (
            <Button variant="outlined" color="primary" onClick={Unmark}>
              <Typography>
                {applicant.unmarkButtonText
                  ? applicant.unmarkButtonText
                  : "Un Mark"}
              </Typography>
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    maxWidth: theme.spacing(60),
  },
  avatar__position: {
    width: "50px",
    height: "50px",
  },
  action__btn: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(0, 3, 2, 3),
  },

  social: {
    width: "auto",
    display: "flex",
    justifyContent: "flex-end",
  },
  buttonAction: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(0, 2, 2, 2),
  },
}));
