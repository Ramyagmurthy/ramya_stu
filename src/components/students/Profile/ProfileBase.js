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
  Select,
  MenuItem,
  Hidden,
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
import RedditIcon from "@material-ui/icons/Reddit";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { LoginContext } from "../../../Context/LoginContext";
import axios from "axios";
import SimpleModal from "../../atoms/Modal";
import ShareIcon from "@material-ui/icons/Share";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
  WhatsappShareButton,
  MailruShareButton,
  WhatsappIcon,
  EmailShareButton,
} from "react-share";
import { withSnackbar } from "notistack";
import Footer from "../Footer";

function ProfileBase(props) {
  const logindetails = useContext(LoginContext);
  const [openModal, setOpenModal] = useState(false);
  const [modalmsg, setModalmsg] = useState("");
  const [modalvariation, setModalvariation] = useState("success");

  const [shareButton, setShareButton] = useState(true);

  const shareUrl = "https://studost.org/";
  const sharehastag = "#studost";

  // const baseInfo = logindetails.userData.benefactorBasicProfileDto;
  const [baseInfo, setBaseInfo] = useState(
    logindetails.userData.benefactorBasicProfileDto
  );

  useEffect(() => {
    getUserinfo(logindetails.user);
  }, []);

  const [edit, setEdit] = useState(false);
  const [addClass, setAddClass] = useState(true);
  // const [bio, setBio] = useState(
  //   baseInfo.bio != null ? baseInfo.bio : "write about yourself !!"
  // );
  const [saveButton, setSaveButton] = useState("none");
  const [avatar, setAvatar] = useState(
    logindetails.userData.objectUrl ? logindetails.userData.objectUrl : "none"
  );
  const [fName, setFName] = useState("Edit and enter name");
  const [lName, setLName] = useState("");
  const [summary, setSummary] = useState(
    baseInfo && baseInfo.summary ? baseInfo.summary : ""
  );

  const [phoneNumber, setPhoneNumber] = useState(
    baseInfo && baseInfo.phoneNumber ? baseInfo.phoneNumber : ""
  );
  const [emailAddress, setEmailAddress] = useState(
    logindetails.email ? logindetails.email : "Enter email address here"
  );
  const [gender, setgender] = useState(
    baseInfo && baseInfo.genderDto != null ? baseInfo.genderDto.name : ""
  );
  const [genderName, setGenderName] = useState("");
  const [address, setAddress] = useState(
    baseInfo && baseInfo.address ? baseInfo.address : "Enter address"
  );
  const [addPic, setaddPic] = useState(true);

  const [facebookId, setFacebookId] = useState("");
  const [linkedinId, setLinkedinId] = useState("");
  const [twitterId, setTwitterId] = useState("");
  const [checkFname, setCheckFname] = useState(false);

  // const getSocialMediaList = (socialList) => {
  //   console.log("from social list----", socialList);
  //   if (socialList && socialList != null) {
  //     for (let i = 0; i < socialList.length; i++) {
  //       if (socialList[i].socialMediaId == 1) {
  //         setLinkedinId(socialList[i].url);
  //       } else if (socialList[i].socialMediaId == 2) {
  //         setFacebookId(socialList[i].url);
  //       } else if (socialList[i].socialMediaId == 3) {
  //         setTwitterId(socialList[i].url);
  //       }
  //     }
  //   }
  // };

  const getUserinfo = (id) => {
    axios
      .get(baseUrl + `/student/load-student-profile-data?userId=${id}`)
      .then((res) => {
        // console.log(res.data.body);
        setFName(res.data.body.studentBasicProfileDto.firstName);
        setLName(res.data.body.studentBasicProfileDto.lastName);
        setPhoneNumber(res.data.body.studentBasicProfileDto.phoneNumber);
        setSummary(res.data.body.studentBasicProfileDto.summary);
        setAvatar(res.data.body.objectUrl);
        // getSocialMediaList(
        //   res.data.body.studentBasicProfileDto.socialMediaDtoList
        // );
        // logindetails.setUserData(res.data.body);
      })
      .catch((err) => console.log(err));
  };

  const classes = useStyles();
  const baseUrl = process.env.REACT_APP_URL;

  const url =
    logindetails.userData.studentId == 0
      ? `${baseUrl}/student/create-basic-profile`
      : `${baseUrl}/student/update-basic-profile`;

  const body = {
    firstName: fName,
    lastName: lName,
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
    if (
      fName.length == 0 ||
      !fName ||
      lName.length == 0 ||
      !lName ||
      phoneNumber.length == 0 || 
      phoneNumber.length < 10 || 
      phoneNumber.length > 10 ||
      !phoneNumber ||
      emailAddress.length == 0 ||
      !emailAddress ||
      summary.length == 0 ||
      !summary
    ) {
      setCheckFname(true);
      return;
    } else {
      setCheckFname(false);
    }
    setAddClass(true);
    setaddPic(true);
    setSaveButton("none");
    setEdit(false);
    axios(config)
      .then((response) => {
        // console.log(response.data);
        // console.log("check--", url, body, response.data.body);
        // setOpenModal(true);
        // setModalmsg("Base Profile updated Sucessfully ");
        // setModalvariation("success");
        getUserinfo(logindetails.user);
        props.enqueueSnackbar("Base Profile Updated Sucessfully ", {
          variant: "success",
        });
      })
      .catch((err) => {
        // setOpenModal(true);
        // setModalmsg("Something went wrong  ");
        // setModalvariation("error");
        props.enqueueSnackbar("Something Went Wrong", {
          variant: "error",
        });
        console.log(err);
        // console.log("check--", url, body);
      });
  };

  const addPhoto = (e) => {
    let formdata = new FormData();

    if (
      e.name.includes("jpeg") ||
      e.name.includes("png") ||
      e.name.includes("jpg")
    ) {
      // console.log("hi");
      formdata.append("file", e);
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
          // console.log("from changes ---", response.data.body);
          // console.log(url);
          setAvatar(response.data.body.objectUri);
          logindetails.setAvatarImage(response.data.body.objectUri);
          // setOpenModal(true);
          // setModalmsg(response.data.message);
          // setModalvariation("success");
          // getUserinfo(logindetails.user);
          props.enqueueSnackbar("Successfully Saved", {
            variant: "success",
          });
        })
        .catch(function (error) {
          console.log(error);
          props.enqueueSnackbar("Something Went Wrong", {
            variant: "error",
          });
        });
    } else {
      props.enqueueSnackbar("please add image like jpeg  or png or jpg", {
        variant: "error",
      });
    }
  };

  // const addVideo = (e) => {
  //   let formdataV = new FormData();
  //   formdataV.append("file", e);
  //   formdataV.append("userId", logindetails.userData.userId);
  //   formdataV.append("operationType", "U");

  //   let configV = {
  //     method: "post",
  //     url: `${baseUrl}/benefactor/upload-video-profile`,
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //     data: formdataV,
  //   };

  //   axios(configV)
  //     .then((response) => {
  //       // console.log(JSON.stringify(response.data));
  //       // setAvatar(response.data.body.objectUri);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const handleGender = (e) => {
  //   setgender(e.target.value);
  //   if (e.target.value == 1) {
  //     setGenderName("Male");
  //   } else if (e.target.value == 2) {
  //     setGenderName("Female");
  //   } else if (e.target.value == 3) {
  //     setGenderName("Non-Binary");
  //   } else if (e.target.value == 4) {
  //     setGenderName("Other");
  //   }
  // };

  const [shareMessage, setShareMessage] = useState(
    "Hello All that's my Studost Profile which is helping me gain the scholarship to study in premier institute and follow my dreams, Kindly share and like my video, which would help me grab this scholarship"
  );

  const shareMessageChange = (e) => {
    setShareMessage(e.target.value);
  };

  const showShareLinks = () => {
    setShareButton(!shareButton);
  };

  return (
    <div className={classes.root}>
      {/* <SimpleModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalmsg={modalmsg}
        modalvariation={modalvariation}
        setModalvariation={setModalvariation}
      /> */}

      <div className={classes.uppercontainer}>
        <div className={classes.avatarContainer}>
          <Badge
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
                  onChange={(e) => {
                    addPhoto(e.target.files[0]);
                    // console.log(e.target.files[0].name);
                  }}
                />
              </IconButton>
            }
          >
            <Avatar
              className={classes.avatar}
              variant="circular"
              src={avatar}
            />
          </Badge>
        </div>
        {/* <div className={classes.heroWriting}>
          <Typography variant="h3">
            Welcome {fName} {lName} !
          </Typography>
          <Typography variant="body2">
            "Some quirky text, about studost that will be added later, in
            production !!"
          </Typography>
        </div> */}
      </div>
      <Paper elevation={3} className={classes.mainbody}>
        <div className={classes.middle}>
          <div className={classes.editContainer}>
            <div>
              <Tooltip title="save">
                <IconButton
                  style={{ backgroundColor: "white", display: saveButton }}
                  onClick={saveChanges}
                >
                  <CheckIcon button="true" color="primary" />
                </IconButton>
              </Tooltip>
              <Tooltip title="edit">
                <IconButton
                  onClick={editNow}
                  style={{ backgroundColor: "white" }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>

          <Paper elevation={3} className={classes.paper}>
            <Container className={classes.inputfield}>
              <Grid container item xs={12}>
                <Grid item xs={12} container>
                  <Grid item xs={12} container className={classes.first}>
                    <Hidden xsUp={!addClass}>
                      <Typography variant="h6">
                        {fName + " " + lName}
                      </Typography>
                    </Hidden>
                    <Hidden xsUp={addClass}>
                      <div>
                        <InputLabel>Full name</InputLabel>
                        <Input
                          value={fName}
                          onChange={(e) => setFName(e.target.value)}
                          id="standard-multiline-static"
                          style={{ width: "50%" }}
                          label="Full Name"
                          readOnly={addClass}
                        />
                        <Input
                          style={{ width: "50%" }}
                          value={lName}
                          onChange={(e) => setLName(e.target.value)}
                          endAdornment={
                            <InputAdornment position="end">
                              <People style={{ color: "grey" }} />
                            </InputAdornment>
                          }
                        />
                      </div>
                      {checkFname && (fName.length < 1 || lName.length < 1) && (
                        <Typography style={{ color: "red" }}>
                          Enter Full Name
                        </Typography>
                      )}
                    </Hidden>
                  </Grid>
                  <Grid item xs={6} container className={classes.first}>
                    <InputLabel>Phone Number</InputLabel>
                    <Hidden xsUp={!addClass}>{phoneNumber}</Hidden>
                    <Hidden xsUp={addClass}>
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
                      {checkFname && (phoneNumber.length < 1 || phoneNumber.length < 10 || phoneNumber.length > 10) && (
                        <Typography style={{ color: "red" }} align="left">
                          enter the phone number
                        </Typography>
                      )}
                    </Hidden>
                  </Grid>
                  <Grid item xs={12} container className={classes.first}>
                    <Hidden xsUp={!addClass}>
                      <div>
                        <InputLabel>Email</InputLabel>
                        <Typography>{emailAddress}</Typography>
                      </div>
                    </Hidden>
                    <Hidden xsUp={addClass}>
                      <div>
                        <InputLabel>Email</InputLabel>
                        <Typography>{emailAddress}</Typography>
                      </div>
                      {/* <Input
                        value={emailAddress}
                        //onChange={(e) => setEmailAddress(e.target.value)}
                        type="email"
                        fullWidth
                        disabled
                        readOnly={addClass}
                        endAdornment={
                          <InputAdornment position="end">
                            <EmailIcon style={{ color: "grey" }} />
                          </InputAdornment>
                        }
                      />
                      {checkFname && emailAddress.length < 1 && (
                        <Typography style={{ color: "red" }} align="left">
                          enter the email
                        </Typography>
                      )} */}
                    </Hidden>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </Paper>
          <Paper elevation={3} className={classes.paper}>
            <Container
              className={classes.summary}
              style={!addClass ? { display: "none" } : { display: "flex" }}
            >
              <Typography variant="h5"> Profile Summary</Typography>
              <Typography>{summary}</Typography>
            </Container>
            <Container
              className={classes.summary}
              style={addClass ? { display: "none" } : { display: "flex" }}
            >
              <TextField
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                variant="outlined"
                label="Summary"
                multiline
                fullWidth
                rows={4}
              />
              {checkFname && summary.length < 1 && (
                <Typography style={{ color: "red" }} align="left">
                  enter the summary
                </Typography>
              )}
            </Container>
          </Paper>
          <Paper elevation={3} className={classes.paper}>
            <Container
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                height: "100%",
                paddingTop: "10px",
              }}
            >
              <Grid
                item
                xs={12}
                container
                style={{
                  justifyContent: "space-between",
                }}
              >
                <Tooltip title="Linkedin">
                  <div>
                    <IconButton href={linkedinId} target="_blank">
                      <LinkedInIcon
                        style={{ color: "#0e76a8" }}
                        className={classes.socialLinks}
                      />
                    </IconButton>

                    <TextField
                      style={!edit ? { display: "none" } : null}
                      value={linkedinId}
                      placeholder="https://www.linkedin.com"
                      onChange={(e) => setLinkedinId(e.target.value)}
                    />
                  </div>
                </Tooltip>

                <Tooltip title="Facebook">
                  <div>
                    <IconButton href={facebookId} target="_blank">
                      <FacebookIcon
                        style={{ color: "#3b5998" }}
                        className={classes.socialLinks}
                      />
                    </IconButton>
                    <TextField
                      style={!edit ? { display: "none" } : null}
                      placeholder="https://www.facebook.com"
                      onChange={(e) => setFacebookId(e.target.value)}
                      value={facebookId}
                    />
                  </div>
                </Tooltip>
                <Tooltip title="Twitter">
                  <div>
                    <IconButton href={twitterId} target="_blank">
                      <TwitterIcon
                        style={{ color: "#1DA1F2" }}
                        className={classes.socialLinks}
                      />
                    </IconButton>

                    <TextField
                      style={!edit ? { display: "none" } : null}
                      placeholder="https://www.twitter.com"
                      onChange={(e) => setTwitterId(e.target.value)}
                      value={twitterId}
                    />
                  </div>
                </Tooltip>
              </Grid>
              <Hidden lgDown={!addClass}>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={showShareLinks}
                  >
                    <ShareIcon />
                  </Button>
                </Grid>
                <div
                  className={classes.share__btn}
                  style={
                    shareButton ? { display: "none" } : { display: "flex" }
                  }
                >
                  <LinkedinShareButton
                    url={shareUrl}
                    quote={shareMessage}
                    hashtag={sharehastag}
                  >
                    <LinkedInIcon
                      style={{ color: "#0e76a8" }}
                      className={classes.socialLinks___round}
                    />
                  </LinkedinShareButton>
                  <FacebookShareButton
                    url={shareUrl}
                    quote={shareMessage}
                    hashtag={sharehastag}
                  >
                    <FacebookIcon
                      style={{ color: "#3b5998" }}
                      className={classes.socialLinks___round}
                    />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={shareUrl}
                    hashtag={sharehastag}
                    title={shareMessage}
                  >
                    <TwitterIcon
                      style={{ color: "#1DA1F2" }}
                      className={classes.socialLinks___round}
                    />
                  </TwitterShareButton>
                  <RedditShareButton
                    url={shareUrl}
                    quote={shareMessage}
                    hashtag={sharehastag}
                  >
                    <RedditIcon
                      className={classes.socialLinks___round}
                      style={{ color: "#ff5700" }}
                    />
                  </RedditShareButton>
                  <WhatsappShareButton
                    url={shareUrl}
                    quote={shareMessage}
                    hashtag={sharehastag}
                  >
                    <WhatsappIcon
                      className={classes.socialLinks___round}
                      style={{ color: "#25D366" }}
                    />
                  </WhatsappShareButton>
                  <EmailShareButton
                    url={shareUrl}
                    quote={shareMessage}
                    hashtag={sharehastag}
                    style={{ color: "#800080" }}
                  >
                    <EmailIcon className={classes.socialLinks___round} />
                  </EmailShareButton>
                </div>
              </Hidden>
            </Container>
          </Paper>
        </div>
      </Paper>
    </div>
  );
}

export default withSnackbar(ProfileBase);

const useStyles = makeStyles((theme) => ({
  root: {
    flex: "1",
    // minHeight: "80vh",
    // maxWidth: "1300px",
    marginRight: "auto",
    marginLeft: "auto",
    display: "flex",
    justifyContent: "space-evenly",
    padding: theme.spacing(10, 5, 5, 5),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      padding: theme.spacing(10, 2, 2, 2),
    },
  },
  uppercontainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  heroWriting: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  middle: {
    // display: "flex",
    // justifyContent: "space-between",
    // flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      // flexDirection: "column",
    },
  },
  paper: {
    width: theme.spacing(40),
    marginTop: theme.spacing(5),
    borderRadius: theme.spacing(1),
    backgroundColor: "white",
    padding: "auto",
    // padding: theme.spacing(2),
    // [theme.breakpoints.down("md")]: {
    //   padding: theme.spacing(5, 0, 10, 0),
    // },
  },
  avatar: {
    display: "flex",
    flex: 1,
    width: theme.spacing(25),
    height: theme.spacing(25),
    // color: "#2e81f4",
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(18),
      height: theme.spacing(18),
    },
  },
  avatarContainer: {
    // marginTop: theme.spacing(-15),
    // paddingLeft: theme.spacing(12),
    // paddingBottom: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(-5),
      paddingBottom: theme.spacing(2),
    },
  },
  inputfield: {
    padding: theme.spacing(3, 2, 2, 2),
  },
  first: {
    paddingBottom: theme.spacing(2),
  },
  summary: {
    height: "100%",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  socialLinks: {
    fontSize: "30px",
  },
  editContainer: {
    display: "flex",
    justifyContent: "flex-end",
    // border: "2px solid red",
  },
  share__btn: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  socialLinks___round: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "#f1f2f5",
  },
  mainbody: {
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    width: "60%",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
}));
