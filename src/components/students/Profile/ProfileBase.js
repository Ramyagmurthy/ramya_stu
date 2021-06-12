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
import "./../../../assets/assets1/css/main.css";

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
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import upload from "../../../assets/img/upload.png";

function ProfileBase(props) {
  const logindetails = useContext(LoginContext);
  const [openModal, setOpenModal] = useState(false);
  const [modalmsg, setModalmsg] = useState("");
  const [modalvariation, setModalvariation] = useState("success");

  const [shareButton, setShareButton] = useState(true);
  const baseInfo = logindetails.userData.studentBasicProfileDto;
  const [src, setSrc] = useState(
    logindetails.userData.videoProfileObjectUri
      ? logindetails.userData.videoProfileObjectUri
      : null
  );

  const [firstName, setFirstName] = useState(
    baseInfo.firstName + baseInfo.lastName
  );
  const [email, setEmail] = useState(logindetails.userData.userName);
  const [pronoun, setPronoun] = useState("");
  const [missionName, setMissionName] = useState("");
  const [tellAbout, setTellAbout] = useState(baseInfo.summary);
  const [city, setCity] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [image, setImage] = useState("");
  const [video, setViode] = useState(
    logindetails.userData.videoProfileObjectUri
  );
  const [fundingRange, setFundingRange] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [facebook, setFacebook] = useState("");
  const [disciplineList, setDisciplineList] = useState([
    ...logindetails.masterData.studyFieldDtoList,
  ]);
  const [twitter, setTwitter] = useState("");
  const baseUrl = process.env.REACT_APP_URL;

  const shareUrl = "https://studost.org/";
  const sharehastag = "#studost";

  // const baseInfo = logindetails.userData.benefactorBasicProfileDto;

  useEffect(() => {
    getUserinfo(logindetails.user);
  }, []);

  const submit = () => {
    setSubmitted(true);
    // if (
    //   // linkedin.length < 1 ||
    //   // twitter.length < 1 ||
    //   // facebook.length < 1 ||
    //   // firstName.length < 1 ||
    //   // email.length < 1 ||
    //   address.length < 1 ||
    //   phoneNumber.length < 10 ||
    //   phoneNumber.length > 10 ||
    //   tellAbout.length < 1
    // )
    //   return;

    const body = {
      studentBasicProfileDto: {
        firstName: firstName,
        fundAmountRequired: fundingRange,
        lastName: "",
        mission: missionName,
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
        studyFieldDto: {
          name: discipline.name,
          operationType: "U",
          studyFieldId: discipline.id,
        },
        summary: tellAbout,
        userName: email,
      },
      studentPersonalDetailsDto: {
        address: address,
        cityDto: {
          cityId: city.cityId,
          name: city.name,
          operationType: "U",
        },
        preferredPronounDto: {
          name: pronoun.name,
          pronounId: pronoun.pronounId,
        },
      },
      userId: logindetails.userData.userId,
      studentId: logindetails.userData.studentId,
    };

    const config = {
      method: "post",
      url: `${baseUrl}/student/save-core-details`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };

    axios(config)
      .then((response) => {
        console.log("save idea---", response);
        setOpenModal(true);
        setModalmsg(response.data.message);
        setModalvariation("success");
      })
      .catch((err) => {
        setOpenModal(true);
        setModalmsg(err.message);
        setModalvariation("error");
        console.log(err);
      });
  };

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
  const [cityList, setCityList] = useState([
    ...logindetails.masterData.cityDtoList,
  ]);
  const [pronounList, setPrpnounList] = useState([
    ...logindetails.masterData.preferredPronounDtoList,
  ]);
  const [submitted, setSubmitted] = useState(false);

  const [fNameM, setFNameM] = useState(false);
  const [lNameM, setLnameM] = useState(false);
  const [summaryM, setSummaryM] = useState(false);
  const [facebookIdM, setFacebookIdM] = useState(false);
  const [linkedinIdM, setLinkedinIdM] = useState(false);
  const [twitterIdM, setTwitterIdM] = useState(false);
  const [controls, setControls] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState(
    baseInfo && baseInfo.phoneNumber ? baseInfo.phoneNumber : ""
  );
  const [emailAddress, setEmailAddress] = useState(
    logindetails.email ? logindetails.email : ""
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
  const [amount, setAmount] = useState(0);

  const getSocialMediaList = (socialList) => {
    if (socialList && socialList != null) {
      for (let i = 0; i < socialList.length; i++) {
        if (socialList[i].name == "Linkedin") {
          setLinkedinId(socialList[i].url);
        } else if (socialList[i].name == "Facebook") {
          setFacebookId(socialList[i].url);
        } else if (socialList[i].name == "Twitter") {
          setTwitterId(socialList[i].url);
        }
      }
    }
  };

  const getUserinfo = (id) => {
    axios
      .get(baseUrl + `/student/load-student-profile-data?userId=${id}`)
      .then((res) => {
        console.log(res.data.body);
        setFName(res.data.body.studentBasicProfileDto.firstName);
        setLName(res.data.body.studentBasicProfileDto.lastName);
        setPhoneNumber(res.data.body.studentBasicProfileDto.phoneNumber);
        setAmount(res.data.body.studentBasicProfileDto.fundAmountRequired);
        setSummary(res.data.body.studentBasicProfileDto.summary);
        setAvatar(res.data.body.objectUrl);
        setMissionName(res.data.body.studentBasicProfileDto.mission);
        setSrc(res.data.body.videoProfileObjectUri);
        setFundingRange(
          res.data.body.studentBasicProfileDto.fundAmountRequired
        );
        if (res.data.body.studentPersonalDetailsDto.address) {
          setAddress(res.data.body.studentPersonalDetailsDto.address);
        }
        if (res.data.body.studentBasicProfileDto.studyFieldDto) {
          setDiscipline(res.data.body.studentBasicProfileDto.studyFieldDto);
        }
        if (res.data.body.studentPersonalDetailsDto.cityDto)
          setCity(res.data.body.studentPersonalDetailsDto.cityDto);
        if (res.data.body.studentPersonalDetailsDto.preferredPronounDto) {
          setPronoun(
            res.data.body.studentPersonalDetailsDto.preferredPronounDto
          );
        }
        getSocialMediaList(
          res.data.body.studentBasicProfileDto.socialMediaDtoList
        );
        // logindetails.setUserData(res.data.body);
      })
      .catch((err) => console.log(err));
  };

  const classes = useStyles();

  const url = `${baseUrl}/student/update-basic-profile`;

  // const body = {
  //   firstName: fName,
  //   lastName: lName,
  //   phoneNumber: phoneNumber,
  //   fundAmountRequired: amount,
  //   socialMediaDtoList: [
  //     {
  //       name: "Linkedin",
  //       socialMediaId: 1,
  //       url: linkedinId,
  //     },
  //     {
  //       name: "Facebook",
  //       socialMediaId: 2,
  //       url: facebookId,
  //     },
  //     {
  //       name: "Twitter",
  //       socialMediaId: 3,
  //       url: twitterId,
  //     },
  //   ],
  //   studentId: logindetails.userData.studentId,
  //   summary: summary,
  //   userId: logindetails.userData.userId,
  // };
  // const config = {
  //   method: "post",
  //   url: url,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   data: body,
  // };

  const editNow = () => {
    setAddClass(false);
    setSaveButton("");
    setaddPic(false);
    setEdit(true);
  };

  // const saveChanges = () => {
  //   if (
  //     fName.length == 0 ||
  //     !fName ||
  //     lName.length == 0 ||
  //     !lName ||
  //     phoneNumber.length == 0 ||
  //     phoneNumber.length < 10 ||
  //     phoneNumber.length > 10 ||
  //     !phoneNumber ||
  //     emailAddress.length == 0 ||
  //     !emailAddress ||
  //     summary.length == 0 ||
  //     !summary
  //   ) {
  //     setCheckFname(true);
  //     return;
  //   } else {
  //     setCheckFname(false);
  //   }
  //   if (fName.length > 255) {
  //     setFNameM(true);
  //   } else setFNameM(false);
  //   if (lName.length > 255) {
  //     setLnameM(true);
  //   } else setLnameM(false);
  //   if (summary.length > 2000) {
  //     setSummaryM(true);
  //   } else setSummaryM(false);
  //   if (linkedinIdM.length > 500) {
  //     setLinkedinIdM(true);
  //   } else setLinkedinIdM(false);
  //   if (facebookIdM.length > 500) {
  //     setFacebookIdM(true);
  //   } else setFacebookIdM(false);
  //   if (twitterId.length > 500) {
  //     setTwitterIdM(true);
  //   } else setTwitterIdM(false);
  //   if (
  //     fName.length <= 255 &&
  //     lName.length <= 255 &&
  //     summary.length <= 2000 &&
  //     linkedinIdM <= 500 &&
  //     facebookIdM <= 500 &&
  //     twitterIdM <= 500
  //   ) {
  //     setAddClass(true);
  //     setaddPic(true);
  //     setSaveButton("none");
  //     setEdit(false);
  //     axios(config)
  //       .then((response) => {
  //         // console.log(response.data);
  //         // console.log("check--", url, body, response.data.body);
  //         // setOpenModal(true);
  //         // setModalmsg("Base Profile updated Sucessfully ");
  //         // setModalvariation("success");
  //         getUserinfo(logindetails.user);
  //         props.enqueueSnackbar("Base Profile Updated Sucessfully ", {
  //           variant: "success",
  //         });
  //       })
  //       .catch((err) => {
  //         // setOpenModal(true);
  //         // setModalmsg("Something went wrong  ");
  //         // setModalvariation("error");
  //         props.enqueueSnackbar("Something Went Wrong", {
  //           variant: "error",
  //         });
  //         console.log(err);
  //         // console.log("check--", url, body);
  //       });
  //   }
  // };

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

  const addVideo = (e) => {
    console.log(e.size);

    if (e.size < 5242880) {
      if (
        !e.name.includes(".doc") &&
        !e.name.includes(".pdf") &&
        !e.name.includes(".jpg") &&
        !e.name.includes(".jpeg") &&
        !e.name.includes(".png") &&
        !e.name.includes(".svg") &&
        !e.name.includes(".csv") &&
        !e.name.includes(".xls")
      ) {
        let formdataV = new FormData();
        formdataV.append("file", e);
        formdataV.append("userId", logindetails.userData.userId);
        formdataV.append("operationType", "U");

        let configV = {
          method: "post",
          url: `${baseUrl}/student/upload-user-video-profile`,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formdataV,
        };

        axios(configV)
          .then((response) => {
            // console.log(JSON.stringify(response.data));
            // setOpenModal(true);
            setSrc(response.data.body.videoProfileObjectUri);
            setModalmsg(response.data.message);
            props.enqueueSnackbar("Successfully Saved", {
              variant: "success",
            });
          })
          .catch((error) => {
            console.log(error);
            props.enqueueSnackbar("Something went wrong", {
              variant: "error",
            });
          });
      } else {
        props.enqueueSnackbar("video only", {
          variant: "error",
        });
      }
    } else {
      props.enqueueSnackbar("less than 5MB only", {
        variant: "error",
      });
    }
  };

  const [shareMessage, setShareMessage] = useState(
    "Hello All that's my Studost Profile which is helping me gain the scholarship to study in premier institute and follow my dreams, Kindly share and like my video, which would help me grab this scholarship"
  );

  const shareMessageChange = (e) => {
    setShareMessage(e.target.value);
  };

  const showShareLinks = () => {
    setShareButton(!shareButton);
  };
  const abortChanges = () => {
    getUserinfo(logindetails.user);
  };

  return (
    <>
      <SimpleModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalmsg={modalmsg}
        modalvariation={modalvariation}
        setModalvariation={setModalvariation}
      />
      <div class="container small__nopadding mt-3 mb-3">
        <div className={classes.info}>
          <InfoOutlinedIcon style={{ fontSize: "16px", marginRight: "5px" }} />
          These Details Will Be Display On Our Explore Page Can Be Publically
          Viewed By Benefactors
        </div>
      </div>
      <div className="container small__nopadding">
        <div className="row">
          <div className="col-lg-4 col-sm-12 col-md-12  small__padding">
            <div className="workdesk">Work Desk</div>
            <div>Edit your name avatar, personel info etc..</div>
          </div>
          <div className="col-lg-5"></div>
          <div
            className="col-lg-3 col-sm-12 col-md-12 d-flex  justify-content-center p-2"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="cancel__btn" type="button" onClick={abortChanges}>
              CANCEL
            </div>
            <div
              className="save__btn"
              type="button"
              onClick={() => {
                submit();
              }}
            >
              SAVE DETAILS
            </div>
          </div>
        </div>
      </div>

      {/*  */}

      <div
        className="container-fluid "
        style={{ margin: "0px", padding: "0px" }}
      >
        <div className="container small__nopadding">
          <div className="row ">
            <div
              className="col-lg-3 col-sm-12 col-md-12 mt-4
          "
            >
              <div className="bg_blue container__padding">
                <div className="name__render"> {fName + " " + lName}</div>
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
                <label
                  htmlFor="file-input"
                  type="button"
                  className="upload__btn"
                >
                  <div />
                  UPLOAD
                  <CameraAltOutlinedIcon />
                </label>
              </div>
              <div className="mt-4 link__headertext">
                Link Your Social Profile
              </div>
              <div className="p-2 bg_blue mt-1">
                <form>
                  <div className="input-group mt-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <a href={linkedinId} target="_blank">
                          <LinkedInIcon style={{ color: "#0e76a8" }} />
                        </a>
                      </div>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="inlineFormInputGroupUsername"
                      placeholder="https://linkedin.com"
                      value={linkedinId}
                      onChange={(e) => setLinkedinId(e.target.value)}
                    />
                    {/* {linkedin.length < 1 && submitted && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "18px",
                          marginLeft: "1px",
                        }}
                      >
                        {" "}
                        *
                      </p>
                    )} */}
                  </div>
                  <div className="input-group mt-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <a href={twitterId} target="_blank">
                          <TwitterIcon style={{ color: "#1DA1F2" }} />
                        </a>
                      </div>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="inlineFormInputGroupUsername"
                      placeholder="https://twitter.com"
                      value={twitterId}
                      onChange={(e) => setTwitterId(e.target.value)}
                    />
                    {/* {twitter.length < 1 && submitted && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "18px",
                          marginLeft: "1px",
                        }}
                      >
                        {" "}
                        *
                      </p>
                    )} */}
                  </div>
                  <div className="input-group mt-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <a href={facebookId} target="_blank">
                          <FacebookIcon style={{ color: "#3b5998" }} />
                        </a>
                      </div>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="inlineFormInputGroupUsername"
                      placeholder="https://facebook.com"
                      value={facebookId}
                      onChange={(e) => setFacebookId(e.target.value)}
                    />
                    {/* {facebook.length < 1 && submitted && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "18px",
                          marginLeft: "1px",
                        }}
                      >
                        {" "}
                        *
                      </p>
                    )} */}
                  </div>
                </form>
              </div>
              <div
                // type="button"
                className="share__btn mt-3"
                onClick={showShareLinks}
              >
                <ShareOutlinedIcon
                  style={{ marginRight: "16px", marginLeft: "-16px" }}
                />
                SHARE YOUR PROFILE
              </div>
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
            </div>

            <div className="col-lg-9 col-sm-12 col-md-12 bg_blue mt-4">
              <form>
                <div className="row p-2">
                  <div className="col p-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Your Name "
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    {firstName.length < 1 && submitted && (
                      <p style={{ color: "red" }}>Enter first name</p>
                    )}
                  </div>
                  <div className="col p-2">
                    <div style={{ display: "flex" }}>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email ID"
                        value={email}
                        readOnly
                        style={{ textDecoration: "none" }}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div
                        style={{
                          fontSize: "25px",
                          color: "#e05a5a",
                          paddingLeft: "8px",
                          paddingTop: "8px",
                        }}
                      >
                        *
                      </div>
                    </div>
                    {email.length < 1 && submitted && (
                      <p style={{ color: "red" }}>Enter Email</p>
                    )}
                  </div>
                </div>
                <div className="form-group ">
                  <div className="d-flex">
                    <div
                      className="form-control  small__flexdirection"
                      style={{ height: "auto" }}
                    >
                      <div className="col-12 col-lg-2">Address :</div>
                      <textarea
                        className="col-10 no_border"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        placeholder="Enter Address Here"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div
                      style={{
                        fontSize: "25px",
                        color: "#e05a5a",
                        paddingLeft: "8px",
                        paddingTop: "8px",
                      }}
                    >
                      *
                    </div>
                  </div>
                  {address.length < 1 && submitted && (
                    <p style={{ color: "red" }}>Enter Adress</p>
                  )}
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <div className="d-flex">
                      <div
                        className="form-control form-group"
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <div>+91</div>
                        <div className="line__horizontal"></div>
                        <input
                          type="text"
                          placeholder="00000-00000"
                          style={{ border: "none" }}
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>
                      <div
                        style={{
                          fontSize: "25px",
                          color: "#e05a5a",
                          paddingLeft: "8px",
                          paddingTop: "8px",
                        }}
                      >
                        *
                      </div>
                    </div>
                    {(phoneNumber.length < 10 || phoneNumber.length > 10) &&
                      submitted && (
                        <p className="error">Enter 10 digit Number</p>
                      )}
                  </div>
                  <div className="col">
                    <div
                      className="form-control d-flex"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div className="col-6">Preffered Pronoun:</div>

                      <select
                        id="inputState"
                        className="col-6 no_border"
                        value={pronoun.name}
                        onChange={(e) => setPronoun(e.target.value)}
                        placeholder={pronoun.name}
                        label={pronoun.name}
                      >
                        {/* <option disbaled value={pronoun}>
                          {pronoun.name}
                        </option> */}
                        {pronounList.map((pronounName) => {
                          return (
                            <option value={pronounName}>
                              {pronounName.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div
                    className="form-control  small__flexdirection"
                    style={{ height: "auto" }}
                  >
                    <div className="col-12 col-lg-1">Mission:</div>
                    <textarea
                      className="col-12 col-lg-11 no_border"
                      id="exampleFormControlTextarea1"
                      rows="2"
                      placeholder="Enter mission statement here"
                      value={missionName}
                      onChange={(e) => setMissionName(e.target.value)}
                    ></textarea>
                  </div>
                  {missionName
                    ? missionName.length < 1 &&
                      submitted && <p className="error">Enter Mission Name</p>
                    : null}
                </div>
                <div className="form-group ">
                  <div
                    className="form-control  small__flexdirection"
                    style={{ height: "auto" }}
                  >
                    <div className="col-12 col-lg-1">Bio:</div>
                    <textarea
                      className="col-12 col-lg-11 no_border"
                      id="exampleFormControlTextarea1"
                      rows="4"
                      placeholder="Tell us about yourself and past experians"
                      value={tellAbout}
                      onChange={(e) => setTellAbout(e.target.value)}
                    ></textarea>
                  </div>
                  {tellAbout
                    ? tellAbout.length < 1 &&
                      submitted && <p className="error">Enter Bio</p>
                    : null}
                </div>
                <div className="row  small__flexdirection">
                  <div className="col">
                    <div className="form-control flex__center form-group">
                      <div className="col-4">City:</div>
                      <select
                        id="inputState"
                        className="col-8 no_border"
                        value={city.name}
                        onChange={(e) => setCity(e.target.value)}
                      >
                        <option value={city}>{city.name}</option>
                        {cityList.map((cityName) => {
                          return (
                            <option value={cityName}>{cityName.name}</option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-control form-group flex__center">
                      <div className="col-4">Discipline:</div>
                      <select
                        id="inputState"
                        className="col-8 no_border"
                        value={discipline.name}
                        onChange={(e) => setDiscipline(e.target.value)}
                      >
                        <option value={discipline}>{discipline.name}</option>
                        {disciplineList.map((disciplineName) => {
                          return (
                            <option value={disciplineName}>
                              {disciplineName.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="card col-lg-12 ">
                  <div className="row justify-content-center mt-3">
                    <div className="upload__video">Upload Video</div>
                  </div>
                  <p className="text_light mx-auto d-block">
                    Click On The Video Upload Button
                  </p>
                  <div className="upload-btn-wrapper mx-auto d-block mt-3">
                    <label htmlFor="profilepicid">
                      <div className="upload__button" type="button">
                        <img src={upload} className="upload__icon" /> UPLOAD
                        VIDEO
                      </div>
                    </label>
                    <input
                      type="file"
                      name="myfile"
                      id="profilepicid"
                      style={{ display: "none" }}
                      onChange={(e) => addVideo(e.target.files[0])}
                    />
                  </div>
                  {src ? (
                    <div className="mb-3">
                      <video
                        width="100%"
                        height="250"
                        src={src}
                        allowFullScreen
                        onMouseEnter={(e) => setControls(true)}
                        onMouseLeave={(e) => setControls(false)}
                        controls={controls}
                      ></video>{" "}
                    </div>
                  ) : (
                    <div className="mb-5"></div>
                  )}
                </div>
                <div className="row mt-3 mb-3">
                  <div className="col-12 col-lg-6">
                    <div
                      className="form-control"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      Funding Amount in Rs :
                      <input
                        className="no_border"
                        placeholder="enter amount here"
                        value={fundingRange}
                        onChange={(e) => setFundingRange(e.target.value)}
                      />
                      {/* <select
                        id="fundingamount"
                        value={fundingRange}
                        style={{ border: "none", width: "40%" }}
                        onChange={(e) => setFundingRange(e.target.value)}
                      >
                        <option value="100000">100000</option>
                        <option value="200000">200000</option>
                        <option value="300000">300000</option>
                        <option value="400000">400000</option>
                        <option value="500000">500000</option>
                      </select> */}
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="red__disclaimer">
              <div
                style={{
                  fontSize: "25px",
                  color: "#e05a5a",
                  paddingRight: "8px",
                  paddingTop: "8px",
                }}
              >
                *
              </div>
              This won't be displayed publicly
            </div>
          </div>
        </div>
      </div>

      {/*  */}
      <div className={classes.root}>
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
                    // onClick={saveChanges}
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
                        {checkFname &&
                          (fName.length < 1 || lName.length < 1) && (
                            <Typography style={{ color: "red" }}>
                              Enter Full Name
                            </Typography>
                          )}
                        {(fNameM || lNameM) && (
                          <Typography style={{ color: "red" }}>
                            Exceeding 255
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
                        {checkFname &&
                          (phoneNumber.length < 1 ||
                            phoneNumber.length < 10 ||
                            phoneNumber.length > 10) && (
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
                    <Grid item xs={6} container className={classes.first}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <InputLabel>Fund Required</InputLabel>

                        <Hidden xsUp={!addClass}>{amount}</Hidden>
                      </div>
                      <Hidden xsUp={addClass}>
                        <Input
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          fullWidth
                          readOnly={addClass}
                        />
                        {checkFname && amount != 0 && (
                          <Typography style={{ color: "red" }} align="left">
                            enter the Amount
                          </Typography>
                        )}
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
                {summaryM && (
                  <Typography style={{ color: "red" }} align="left">
                    Exceeding 2000 chareacter
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
                      {linkedinIdM && (
                        <Typography style={{ color: "red" }} align="left">
                          Exceeding 500 chareacter
                        </Typography>
                      )}
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
                      {linkedinIdM && (
                        <Typography style={{ color: "red" }} align="left">
                          Exceeding 500 character
                        </Typography>
                      )}
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
    </>
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
    display: "none",
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    paddingTop: "20px",
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
  info: {
    lineHeight: "1.5",
    fontSize: "12px",
    color: "#7a7c81",
    [theme.breakpoints.down("md")]: {
      lineHeight: "1.5",
      fontSize: "10px",
    },
  },
}));
