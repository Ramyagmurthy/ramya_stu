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
  FormControl,
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
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { LoginContext } from "../../Context/LoginContext";
import axios from "axios";
import SimpleModal from "../atoms/Modal";
import ShareIcon from "@material-ui/icons/Share";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import RedditIcon from "@material-ui/icons/Reddit";

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

function ProfileinfoB({ handleChange }) {
  const logindetails = useContext(LoginContext);
  const [openModal, setOpenModal] = useState(false);
  const [modalmsg, setModalmsg] = useState("");
  const [modalvariation, setModalvariation] = useState();

  const [shareButton, setShareButton] = useState(true);
  const shareUrl = "https://www.studost.org";
  const sharehastag = "#studost";
  const [shareMessage, setShareMessage] = useState(
    "Hello All , we can make a difference by offering to pay for a part of the education fees for these wonderfull kids. Join Studost now to get started !!"
  );

  const showShareLinks = () => {
    setShareButton(!shareButton);
  };
  const baseInfo = logindetails.userData.benefactorBasicProfileDto;

  const [edit, setEdit] = useState(false);
  const [addClass, setAddClass] = useState(true);
  const [bio, setBio] = useState("write about yourself !!");
  const [saveButton, setSaveButton] = useState("none");
  const [avatar, setAvatar] = useState(
    logindetails.userData.objectUrl ? logindetails.userData.objectUrl : "none"
  );
  const [fName, setFName] = useState(baseInfo.firstName);
  const [lName, setLName] = useState(baseInfo.lastName);

  const [fNameM, setFNameM] = useState(false);
  const [lNameM, setLNameM] = useState(false);
  const [facebookIdM, setFacebookIdM] = useState(false);
  const [linkedinIdM, setLinkedinIdM] = useState(false);
  const [twitterIdM, setTwitterIdM] = useState(false);
  const [addressM, setAddressM] = useState(
    false
  );
  const [bioM, setBioM] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState(
    baseInfo.phoneNumber ? baseInfo.phoneNumber : ""
  );
  const [emailAddress, setEmailAddress] = useState(
    logindetails.email ? logindetails.email : "Enter email address here"
  );
  const [gender, setgender] = useState(
    baseInfo.genderDto != null ? baseInfo.genderDto.name : ""
  );
  const [genderName, setGenderName] = useState("");
  const [address, setAddress] = useState(
    baseInfo.address ? baseInfo.address : "Enter address"
  );
  const [addPic, setaddPic] = useState(true);

  const [facebookId, setFacebookId] = useState("");
  const [linkedinId, setLinkedinId] = useState("");
  const [twitterId, setTwitterId] = useState("");
  const [checkFname, setCheckFname] = useState(false);
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [cityList, setCityList] = useState([]);

  const getSocialMediaList = (socialMediaDtoList) => {
    // console.log("from social list----", baseInfo.socialMediaDtoList);
    if (baseInfo.socialMediaDtoList && baseInfo.socialMediaDtoList != null) {
      for (let i = 0; i < socialMediaDtoList.length; i++) {
        if (socialMediaDtoList[i].socialMediaId == 1) {
          setLinkedinId(socialMediaDtoList[i].url);
        } else if (socialMediaDtoList[i].socialMediaId == 2) {
          setFacebookId(socialMediaDtoList[i].url);
        } else if (socialMediaDtoList[i].socialMediaId == 3) {
          setTwitterId(socialMediaDtoList[i].url);
        }
      }
    }
  };

  const getMasterData = () => {
    axios
      .get(`${baseUrl}/master/get-master-data`)
      .then((res) => {
        console.log(res.data.body);
        setCityList(res.data.body.cityDtoList);
        // console.log(res.data.body);
      })
      .catch((err) => console.log(`${baseUrl}/master/get-master-data`));
  };

  useEffect(() => {
    handleChange("a", 1);
    // console.log("profile base", logindetails);
    getUserinfo(logindetails.user);
    getMasterData();
  }, []);
  const classes = useStyles();
  const baseUrl = process.env.REACT_APP_URL;
  //const baseUrl = "http://studost.devkraft.in/studost/api";

  const url =
    logindetails.userData.benefactorBasicProfileDto.benefactorId == 0
      ? `${baseUrl}/benefactor/save-basic-profile`
      : `${baseUrl}/benefactor/save-basic-profile`;

  const body = {
    cityDto: {
      cityId: city.cityId,
      name: city.name,
      operationType: "U",
    },
    address: address,
    benefactorId: baseInfo.benefactorId,
    bio: bio,
    firstName: fName,
    genderDto: {
      genderId: gender,
      name: genderName,
      operationType: "U",
    },
    lastName: lName,
    phoneNumber: phoneNumber,
    preferredPronounDto: {
      name: "He/Him",
      pronounId: 1,
    },
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
    userId: baseInfo.userId,
    pinCode: pinCode,
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
    // console.log(body);
    if(fName.length > 255) {
      setFNameM(true);
    } else setFNameM(false);
    if(lName.length > 255) {
      setLNameM(true);
    } else setLNameM(false);
    if(address.length > 1000) {
      setAddressM(true);
    } else setAddressM(false);
    if(bio.length > 2000) {
      setBioM(true);
    } else setBioM(false);
    if(linkedinId.length > 500) {
      setLinkedinIdM(true);
    } else setLinkedinIdM(false);
    if(facebookId.length > 500) {
      setFacebookIdM(true);
    } else setFacebookIdM(false);
    if(twitterIdM.length > 500) {
      setTwitterIdM(true);
    } else setTwitterIdM(false);
    if(fName.length <= 255 && lName.length <= 255 && address.length <= 1000 && bio.length <=2000 && linkedinId.length <= 500 && facebookId.length <= 500 && twitterIdM.length <= 500 ) {
      axios(config)
    .then((response) => {
      console.log("save idea---", response.data);
      setOpenModal(true);
      setModalmsg(response.data.message);
    })
    .catch((err) => {
      setOpenModal(true);
      setModalmsg(err.message);
      setModalvariation("error");
      console.log(err);
    });
    
    setAddClass(true);
    setaddPic(true);
    setSaveButton("none");
    setEdit(false);
    }
    if (
      fName.length == 0 ||
      !fName ||
      lName.length == 0 ||
      !lName ||
      genderName.length == 0 ||
      phoneNumber.length < 11 ||
      phoneNumber.length > 10 ||
      !gender ||
      phoneNumber.length == 0 ||
      !phoneNumber ||
      emailAddress.length == 0 ||
      !emailAddress ||
      bio.length == 0 ||
      !bio ||
      address.length == 0 ||
      !address
    ) {
      setCheckFname(true);
      return;
    } else {
      setCheckFname(false);
    }

  };

  const addPhoto = (e) => {
    let formdata = new FormData();
    if (
      e.name.includes("jpeg") ||
      e.name.includes("png") ||
      e.name.includes("jpg")
    ) {
      formdata.append("file", e);
      formdata.append("userId", logindetails.userData.userId);
      formdata.append("operationType", "U");

      let config = {
        method: "post",
        url: `${baseUrl}/benefactor/upload-profile-image`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formdata,
      };

      axios(config)
        .then(function (response) {
          // console.log(JSON.stringify(response.data));
          setAvatar(response.data.body.objectUri);
          logindetails.setAvatarImage(response.data.body.objectUri);
        })
        .catch(function (error) {
          //console.log(error);
        });
    } else {
      alert("please add image like jpeg  or png or jpg");
    }
  };

  const addVideo = (e) => {
    let formdataV = new FormData();
    formdataV.append("file", e);
    formdataV.append("userId", logindetails.userData.userId);
    formdataV.append("operationType", "U");

    let configV = {
      method: "post",
      url: `${baseUrl}/benefactor/upload-video-profile`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formdataV,
    };

    axios(configV)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        // setAvatar(response.data.body.objectUri);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGender = (e) => {
    setgender(e.target.value);
    if (e.target.value == 1) {
      setGenderName("Male");
    } else if (e.target.value == 2) {
      setGenderName("Female");
    } else if (e.target.value == 3) {
      setGenderName("Non-Binary");
    } else if (e.target.value == 4) {
      setGenderName("Other");
    }
  };

  const getUserinfo = (id) => {
    axios
      .get(baseUrl + `/benefactor/load-benefactor-profile-data?userId=${id}`)
      .then((res) => {
        console.log(res);
        logindetails.setUserData(res.data.body);
        setGenderName(res.data.body.benefactorBasicProfileDto.genderDto.name);
        setAvatar(res.data.body.objectUrl);
        setBio(res.data.body.benefactorBasicProfileDto.bio);
        setPhoneNumber(res.data.body.benefactorBasicProfileDto.phoneNumber);
        setCity(res.data.body.benefactorBasicProfileDto.cityDto);
        setPinCode(res.data.body.benefactorBasicProfileDto.pinCode);
        setAddress(res.data.body.benefactorBasicProfileDto.address);
        getSocialMediaList(
          res.data.body.studentBasicProfileDto.socialMediaDtoList
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.root}>
      <SimpleModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalmsg={modalmsg}
        modalvariation={modalvariation}
        setModalvariation={setModalvariation}
      />
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
                  imgExtension={[".jpeg", ".png", ".jpg"]}
                  style={{ display: "none" }}
                  onChange={(e) => {
                    addPhoto(e.target.files[0]);
                    // console.log("hiiiiiiiiiiiiii");
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
        <div className={classes.heroWriting}>
          <Typography variant="h3">
            Welcome {fName} {lName} !
          </Typography>
        </div>
      </div>
      <div className={classes.editContainer}>
        <div>
          <Tooltip title="save">
            <IconButton
              style={{ backgroundColor: "white", display: saveButton }}
              onClick={() => saveChanges()}
            >
              <CheckIcon button="true" color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="edit">
            <IconButton
              onClick={() => editNow()}
              style={{ backgroundColor: "white" }}
            >
              <EditIcon button="true" />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <div className={classes.middle}>
        <Paper elevation={3} className={classes.paper}>
          <Grid container item xs={12}>
            <Grid item xs={12} container>
              <Grid item xs={12} container className={classes.first}>
                <Hidden xsUp={!addClass}>
                  <Typography variant="h5">{fName + " " + lName}</Typography>
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
                  { (fNameM || lNameM) && (
                    <Typography style={{ color: "red" }}>
                      Exceeding 255 character
                    </Typography>
                  )}
                </Hidden>

                {/*                   
                  <InputLabel>Full name</InputLabel>
                  <div style={{ display: "flex" }}>
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
                  </div> */}
              </Grid>
              <Grid item xs={5} container className={classes.first}>
                <div>
                  <InputLabel fullWidth>Gender</InputLabel>
                  <Hidden xsUp={!addClass}>{genderName}</Hidden>
                </div>
                <Hidden xsUp={addClass}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gender}
                    readOnly={addClass}
                    onChange={(e) => handleGender(e)}
                    fullWidth
                  >
                    <MenuItem value={1}>Male</MenuItem>
                    <MenuItem value={2}>Female</MenuItem>
                    <MenuItem value={3}>Non-Binary</MenuItem>
                    <MenuItem value={4}>Other</MenuItem>
                  </Select>
                  {checkFname && genderName.length < 1 && (
                    <Typography style={{ color: "red" }} align="left">
                      select the gender
                    </Typography>
                  )}
                </Hidden>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={6} container className={classes.first}>
                <div>
                  <InputLabel>Phone Number</InputLabel>
                  <Hidden xsUp={!addClass}>
                    <Typography
                      endAdornment={
                        <InputAdornment position="end">
                          <PhoneIcon style={{ color: "grey" }} />
                        </InputAdornment>
                      }
                    >
                      {phoneNumber}
                    </Typography>
                  </Hidden>
                  {checkFname && phoneNumber.length < 1 && (
                    <Typography style={{ color: "red" }} align="left">
                      select phoneNumber
                    </Typography>
                  )}
                </div>

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
                  {checkFname &&
                    (phoneNumber.length < 1 ||
                      phoneNumber.length < 10 ||
                      phoneNumber.length > 10) && (
                      <Typography style={{ color: "red" }} align="left">
                        enter phoneNumber
                      </Typography>
                    )}
                </Hidden>
              </Grid>
              <Grid item xs={2} />
              <Grid item xs={12} container className={classes.first}>
              <Grid item xs={5} container className={classes.first}>
                <Hidden xsUp={!addClass}>
                  <div>
                    <InputLabel>Email</InputLabel>
                    <Typography>{emailAddress}</Typography>
                  </div>
                </Hidden>
              </Grid>
              <Hidden xsUp={!addClass}>
              <Grid item xs={1} container className={classes.first}></Grid>
              <Grid item xs={5} container className={classes.first}>
              <div>
                    <InputLabel>City</InputLabel>
                    <Typography>{city.name}-{pinCode}</Typography>
                  </div>
              </Grid>
              </Hidden>
              </Grid>
              <Grid item xs={12} container className={classes.first}>
              <Hidden xsUp={addClass}>
                <div className={classes.citypin}>
                
                  <FormControl
                    variant="outlined"
                    className={classes.cityListClass}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      City
                    </InputLabel>
                    <Select
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                      label="City"
                      readOnly={addClass}
                    >
                      <MenuItem value={city}>
                        <em>{city.name}</em>
                      </MenuItem>
                      {cityList &&
                        cityList.map((cities) => (
                          <MenuItem value={cities}>{cities.name}</MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  
                  <Grid item xs={2} container className={classes.first}></Grid>
                  <Grid item xs={5} container className={classes.first}>
                  <TextField
                    label="Pin Code"
                    variant="outlined"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                  />
                  </Grid>
                </div>
              </Hidden>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Paper
          elevation={3}
          className={classes.paper}
          style={{ flexDirection: "column", justifyContent: "space-evenly" }}
        >
          <Hidden xsUp={!addClass}>
            <div>
              <Typography variant="h5">Bio</Typography>
              <Typography>{bio}</Typography>
            </div>

            <div>
              <Typography variant="h5">Address</Typography>
              <Typography>{address}</Typography>
            </div>
          </Hidden>
          <Hidden xsUp={addClass}>
            <TextField
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              variant="outlined"
              label="Bio"
              multiline
              fullWidth
              rows={4}
              InputProps={{
                readOnly: addClass,
              }}
            />
            {checkFname && bio.length < 1 && (
              <Typography style={{ color: "red" }} align="left">
                enter the bio
              </Typography>
            )}
            {bioM && (
              <Typography style={{ color: "red" }} align="left">
                Exceeding 2000 charactor
              </Typography>
            )}
            <TextField
              style={{ marginTop: "20px" }}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              variant="outlined"
              label="Postal address"
              fullWidth
              rows={2}
              InputProps={{
                readOnly: addClass,
              }}
            />
            {checkFname && address.length < 1 && (
              <Typography style={{ color: "red" }} align="left">
                enter the address
              </Typography>
            )}
            {addressM && (
              <Typography style={{ color: "red" }} align="left">
                Exceeding 1000 character
              </Typography>
            )}
          </Hidden>
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
              <Tooltip title={linkedinId ? linkedinId :"Linkedin"}>
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
                  {linkedinIdM && (
              <Typography style={{ color: "red" }} align="left">
                Exceeding 500 character
              </Typography>
            )}
                </div>
              </Tooltip>

              <Tooltip title={facebookId ? facebookId :"Facebook"}>
                <div>
                  <IconButton href={facebookId} target="_blank">
                    <FacebookIcon
                      style={{ color: "#3b5998" }}
                      className={classes.socialLinks}
                    />
                  </IconButton>
                  <TextField
                    style={!edit ? { display: "none" } : null}
                    onChange={(e) => setFacebookId(e.target.value)}
                    value={facebookId}
                    placeholder="https://www.facebook.com"
                  />
                  {facebookIdM && (
              <Typography style={{ color: "red" }} align="left">
                Exceeding 500 character
              </Typography>
            )}
                </div>
              </Tooltip>
              <Tooltip title={twitterId ? twitterId :"Twitter"}>
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
                  {twitterIdM && (
              <Typography style={{ color: "red" }} align="left">
                Exceeding 500 character
              </Typography>
            )}
                  
                </div>
              </Tooltip>
            </Grid>
            <Hidden lgDown={!addClass}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={showShareLinks}
                >
                  <ShareIcon />
                </Button>
              </Grid>
              <div
                className={classes.share__btn}
                style={shareButton ? { display: "none" } : { display: "flex" }}
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
    </div>
  );
}

export default ProfileinfoB;

const useStyles = makeStyles((theme) => ({
  root: {
    flex: "1",
    justifyContent: "center",
    // backgroundColor: "#f1f2f5",
    padding: theme.spacing(10, 10, 5, 10),
    minHeight: "100vh",
  },
  uppercontainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  heroWriting: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  middle: {
    display: "flex",
    justifyContent: "space-between",
  },
  paper: {
    width: theme.spacing(40),
    height: theme.spacing(35),
    marginTop: theme.spacing(5),
    borderRadius: theme.spacing(2),
    display: "flex",
    padding: theme.spacing(2),
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
    // borderRadius: theme.spacing(2),
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "space-between",
    // height: "100%",
    // border: "2px solid red",
  },
  summary: {
    height: "100%",
    padding: theme.spacing(3, 2, 2, 2),
  },
  socialLinks: {
    fontSize: "30px",
  },
  editContainer: {
    display: "flex",
    justifyContent: "flex-end",
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
  cityListClass: {
    width: "50%",
  },
  citypin: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
}));
