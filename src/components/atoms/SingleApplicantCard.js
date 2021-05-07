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

export default function SingleApplicantCard({ applicant,getapplicants, getapplicantscount }) {
  const classes = useStyles();
  const baseUrl = process.env.REACT_APP_URL;

  const logindetails = useContext(LoginContext);
  const [openModal, setOpenModal] = useState(false);
  const [modalmsg, setModalmsg] = useState("");
  const [modalvariation, setModalvariation] = useState("success");

  const [shortlisted, setShortlisted] = useState(applicant.markedForNextRound);

  // console.log(applicant);
    

  const rejectApplicant = () => {
    axios
      .post(
        `${baseUrl}/application/reject-application?applicationId=${applicant.applicationId}&loginUserId=${logindetails.user}&scholarshipId=${applicant.scholarshipId}`
      )
      .then((res) => {
        getapplicants()
        getapplicantscount(applicant.scholarshipId)
      })
      .catch((err) => console.log());
  };

  const shortListApplicant = () => {
    axios
      .post(
        `${baseUrl}/application/mark-for-shortlisting?applicationId=${applicant.applicationId}&loginUserId=${logindetails.user}&scholarshipId=${applicant.scholarshipId}`
      )
      .then((res) => {
        setShortlisted(true);
        getapplicants();
        getapplicantscount(applicant.scholarshipId)
        if (res.data.body == 200) {
          setOpenModal(true);
          setModalmsg(res.data.message);
          setModalvariation("success");
        } else if (res.data.body == 204) {
          setOpenModal(true);
          setModalmsg(res.data.message);
          setModalvariation("warning");
        }
      })
      .catch((err) => console.log());
  };

  const Unmark = () => {
    axios
      .post(
        `${baseUrl}/application/unmark-for-shortlisting?applicationId=${applicant.applicationId}&loginUserId=${logindetails.user}&scholarshipId=${applicant.scholarshipId}`
      )
      .then((res) => {
        setShortlisted(false);
        getapplicantscount(applicant.scholarshipId);

        if (res.data.body == 200) {
          setOpenModal(true);
          setModalmsg(res.data.message);
          setModalvariation("success");
        } else if (res.data.body == 204) {
          setOpenModal(true);
          setModalmsg(res.data.message);
          setModalvariation("warning");
        }
        getapplicants();
      })
      .catch((err) => console.log());
  };

  return (
    <Card
      className={classes.root}
      style={shortlisted ? { border: "3px outset #9ACD32" } : null}
    >
      <Alert
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalmsg={modalmsg}
        modalvariation={modalvariation}
        setModalvariation={setModalvariation}
      />
      <CardActionArea>
        <TurnedInNotIcon
          style={
            shortlisted
              ? {
                  fontSize: "40px",
                  color: "#9ACD32",
                  position: "absolute",
                  marginLeft: "90%",
                  opacity: 0.8,
                }
              : { display: "none" }
          }
        />
        <CardMedia
          component="video"
          alt="Applicant's Name"
          // mheight="400"
          // image={applicant.videoProfilePath}
          autoPlay
          controls
          // image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
          src={applicant.videoProfilePath}
          style={{ maxHeight: "500px" }}
        />
        <Avatar
          className={classes.avatar__position}
          src={applicant.imagePath}
        />
        <CardContent style={{ backgroundColor: " #f1f2f5" }}>
          <Typography gutterBottom variant="h5" component="h2">
            {applicant.studentBasicProfileDto.firstName +
              " " +
              applicant.studentBasicProfileDto.lastName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {applicant.studentBasicProfileDto.summary}
          </Typography>
        </CardContent>
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
        <div className={classes.social}>
          {applicant.studentBasicProfileDto.socialMediaDtoList.map((media) => {
            return (
              <IconButton href={media.url} target="_blank">
                {media.name == "Linkedin" ? <LinkedInIcon /> : null}
                {media.name == "Facebook" ? <FacebookIcon /> : null}
                {media.name == "Twitter" ? <TwitterIcon /> : null}
              </IconButton>
            );
          })}
        </div>

        {applicant.showMarkButton && (
          <Button
            variant="outlined"
            color="primary"
            onClick={shortListApplicant}
          >
            <Typography>{applicant.markButtonText ? applicant.markButtonText : "Mark"}</Typography>
          </Button>
        )}
        {applicant.showUnMarkButton && (
          <Button variant="outlined" color="primary" onClick={Unmark}>
            <Typography>{applicant.unmarkButtonText ? applicant.unmarkButtonText : "Un Mark"}</Typography>
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    maxWidth: theme.spacing(60),
  },
  avatar__position: {
    display: "flex",
    float: "right",
    marginTop: theme.spacing(-5),
    marginRight: theme.spacing(2),
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  action__btn: {
    display: "flex",
    justifyContent: "space-between",
    // float: "right",
    // border: "2px solid grey",
  },

  social: {
    width: "auto",
  },
  buttonAction: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(0, 2, 2, 2),
  },
}));
