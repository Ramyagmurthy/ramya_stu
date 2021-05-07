import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Avatar,
  TextField,
  Paper,
  Button,
  IconButton,
  Input,
  Container,
  InputLabel,
  Tooltip,
  Badge,
  Popover,
} from "@material-ui/core";
import { Autorenew } from "@material-ui/icons";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import EditIcon from "@material-ui/icons/Edit";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import People from "@material-ui/icons/People";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import CheckIcon from "@material-ui/icons/Check";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import image from "../../../assets/img/marc.jpg";
import { LoginContext } from "../../../Context/LoginContext";
import axios from "axios";
import SimpleModal from "../../atoms/Modal";

function ProfileBase() {
  useEffect(() => {
    for (let i = 0; i < baseInfo.socialMediaDtoList.length; i++) {
      if (baseInfo.socialMediaDtoList[i].socialMediaId == 1) {
        setLinkedinId(baseInfo.socialMediaDtoList[i].url);
      } else if (baseInfo.socialMediaDtoList[i].socialMediaId == 2) {
        setFacebookId(baseInfo.socialMediaDtoList[i].url);
      } else if (baseInfo.socialMediaDtoList[i].socialMediaId == 3) {
        setTwitterId(baseInfo.socialMediaDtoList[i].url);
      }
    }
  }, []);

  const logindetails = useContext(LoginContext);
  const [openModal, setOpenModal] = useState(false);
  const [modalmsg, setModalmsg] = useState("");

  const baseInfo = logindetails.userData.studentBasicProfileDto;

  const [edit, setEdit] = useState(false);
  const [addClass, setAddClass] = useState(true);
  const [saveButton, setSaveButton] = useState("none");
  const [avatar, setAvatar] = useState(
    logindetails.userData.objectUrl ? logindetails.userData.objectUrl : "none"
  );
  const [fname, setFname] = useState(baseInfo.firstName);
  const [lname, setLname] = useState(baseInfo.lastName);

  // const [fullName, setFullName] = useState(
  //   baseInfo.firstName + " " + baseInfo.lastName
  // );
  const [phoneNumber, setPhoneNumber] = useState(
    baseInfo.phoneNumber ? baseInfo.phoneNumber : ""
  );
  const [emailAddress, setEmailAddress] = useState(
    logindetails.userData.userName
  );
  const [summary, setSummary] = useState(baseInfo.summary);
  const [addPic, setaddPic] = useState(true);

  const [facebookId, setFacebookId] = useState("add  url");
  const [linkedinId, setLinkedinId] = useState("add  url");
  const [twitterId, setTwitterId] = useState("add  url");

  const classes = useStyles();
  const baseUrl = process.env.REACT_APP_URL;
  // const baseUrl = "http://studost.devkraft.in/studost/api"

  const url =
    logindetails.userData.studentId == 0
      ? `${baseUrl}/student/create-basic-profile`
      : `${baseUrl}/student/update-basic-profile`;

  const body = {
    firstName: fname,
    lastName: lname,
    phoneNumber: phoneNumber,
    socialMediaDtoList: [
      {
        name: "Linkedin",
        socialMediaId: 1,
        url: linkedinId,
      },
      {
        name: "Facebook",
        socialMediaId: 2,
        url: facebookId,
      },
      {
        name: "Twitter",
        socialMediaId: 3,
        url: twitterId,
      },
    ],
    studentId: logindetails.userData.studentId,
    summary: summary,
    userId: logindetails.userData.userId,
  };

  const config = {
    method: "post",
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
  };

  const editNow = () => {
    setAddClass(false);
    setSaveButton("");
    setaddPic(false);
    setEdit(true);
  };

  const saveChanges = () => {
    setAddClass(true);
    setaddPic(true);
    setSaveButton("none");
    setEdit(false);
    axios(config)
      .then((response) => {
        // console.log(response.data);
        setOpenModal(true);
        setModalmsg(response.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addPhoto = (e) => {
    let formdata = new FormData();
    formdata.append("file", e);
    // formdata.append("fileName", logindetails.userData.userId);
    formdata.append("userId", logindetails.userData.userId);
    formdata.append("operationType", "U");

    let config = {
      method: "post",
      url: `${baseUrl}/student/upload-user-profile-image`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formdata,
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data.body.objectUri);
        setAvatar(response.data.body.objectUri);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={classes.root}>
      <SimpleModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalmsg={modalmsg}
      />
      <Paper elevation={3} className={classes.paper}>
        <Grid
          item
          container
          xs={12}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className={classes.avatarContainer}>
            <Badge
              // invisible={addPic}
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={
                <IconButton>
                  <label htmlFor="file-input">
                    <AddAPhotoIcon />
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => addPhoto(e.target.files[0])}
                  />
                </IconButton>
              }
            >
              <Avatar
                className={classes.avatar}
                variant="square"
                src={avatar}
              />
            </Badge>
          </div>
          <div>
            <Tooltip title="save">
              <IconButton
                style={{ display: saveButton }}
                onClick={() => saveChanges()}
              >
                <CheckIcon button color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="edit">
              <IconButton onClick={() => editNow()}>
                <EditIcon button color="primary" />
              </IconButton>
            </Tooltip>
          </div>
        </Grid>
        <Container className={classes.inputfield}>
          <Grid container item xs={12}>
            <Grid item xs={12} container>
              <Grid item xs={12} container className={classes.first}>
                <InputLabel gutterBottom>Full name</InputLabel>
                <div style={{ display: "flex", width: "100%" }}>
                  <Input
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    id="standard-multiline-static"
                    style={{ width: "50%" }}
                    readOnly={addClass}
                  />
                  <Input
                    style={{ width: "50%" }}
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <People style={{ color: "grey" }} />
                      </InputAdornment>
                    }
                  />
                </div>
              </Grid>
              <Grid item xs={12} container className={classes.first}>
                <InputLabel>Phone Number</InputLabel>
                <Input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  fullWidth
                  readOnly={addClass}
                  endAdornment={
                    <InputAdornment position="end">
                      <PhoneIcon style={{ color: "grey" }} />
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid item xs={12} container className={classes.first}>
                <InputLabel>Email</InputLabel>
                <Input
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  fullWidth
                  readOnly={addClass}
                  endAdornment={
                    <InputAdornment position="end">
                      <EmailIcon style={{ color: "grey" }} />
                    </InputAdornment>
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12} className={classes.summary}>
              <TextField
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                variant="outlined"
                label="Summary"
                multiline
                fullWidth
                rows={4}
                InputProps={{
                  readOnly: addClass,
                }}
              />
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            container
            style={{
              justifyContent: "space-between",
              paddingTop: "20px",
            }}
          >
            <Tooltip title={linkedinId}>
              <div>
                <IconButton href={linkedinId} target="_blank">
                  <LinkedInIcon
                    style={{ color: "#0e76a8", fontSize: "50px" }}
                  />
                </IconButton>
                <TextField
                  style={!edit ? { display: "none" } : null}
                  value={linkedinId}
                  onChange={(e) => setLinkedinId(e.target.value)}
                />
              </div>
            </Tooltip>

            <Tooltip title={facebookId}>
              <div>
                <IconButton href={facebookId} target="_blank">
                  <FacebookIcon
                    style={{ color: "#3b5998", fontSize: "50px" }}
                  />
                </IconButton>
                <TextField
                  style={!edit ? { display: "none" } : null}
                  onChange={(e) => setFacebookId(e.target.value)}
                  value={facebookId}
                />
              </div>
            </Tooltip>
            <Tooltip title={twitterId}>
              <div>
                <IconButton href={twitterId} target="_blank" target="_blank">
                  <TwitterIcon style={{ color: "#1DA1F2", fontSize: "50px" }} />
                </IconButton>
                <TextField
                  style={!edit ? { display: "none" } : null}
                  onChange={(e) => setTwitterId(e.target.value)}
                  value={twitterId}
                />
              </div>
            </Tooltip>
          </Grid>
        </Container>
      </Paper>
    </div>
  );
}

export default ProfileBase;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: "1",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(5, 10, 10, 10),
    maxWidth: theme.spacing(90),
    marginTop: theme.spacing(10),
    marginRight: "auto",
    marginLeft: "auto",
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(5, 0, 10, 0),
    },
  },
  avatar: {
    display: "flex",
    flex: 1,
    width: theme.spacing(20),
    height: theme.spacing(22),
    // color: "#2e81f4",
    [theme.breakpoints.down("md")]: {
      width: theme.spacing(10),
      height: theme.spacing(12),
    },
  },
  avatarContainer: {
    marginTop: theme.spacing(-15),
    // paddingLeft: theme.spacing(12),
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(-5),
      paddingBottom: theme.spacing(2),
    },
  },
  inputfield: {
    // marginLeft: theme.spacing(10),
  },
  first: {
    paddingBottom: theme.spacing(2),
  },
  summary: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
  sociallinks: {
    marginBottom: theme.spacing(4),
    alignSelf: "flex-end",
  },
}));
