import React, { useEffect, useState, useContext } from "react";
import Footer from "../StaticPageComponents/LandingPageComponents/Footer";
import Aboutfirst from "../StaticPageComponents/AboutUs/AboutFirst";
import AboutUsSecondPage from "../StaticPageComponents/AboutUs/aboutUsSecondPage";
import AboutUsThirdPage from "../StaticPageComponents/AboutUs/AboutUsThirdPage";
import image1 from "./../assets/assets1/images/logo.svg";
import image2 from "./../assets/assets1/images/about-bg.png";
import image3 from "./../assets/assets1/images/vision.svg";
import image4 from "./../assets/assets1/images/mission.svg";
import image5 from "./../assets/assets1/images/integrity.svg";
import image6 from "./../assets/assets1/images/innovation.svg";
import image7 from "./../assets/assets1/images/impact.svg";
import image8 from "./../assets/assets1/images/team1.png";
import image9 from "./../assets/assets1/images/team2.png";
import image10 from "./../assets/assets1/images/team3.png";
import image11 from "./../assets/assets1/images/team4.png";
import image12 from "./../assets/assets1/images/team5.png";
import image13 from "./../assets/assets1/images/team6.png";
import image14 from "./../assets/assets1/images/team7.png";
import image15 from "./../assets/assets1/images/team8.png";
import image16 from "./../assets/assets1/images/social5.svg";
import image17 from "./../assets/assets1/images/social6.svg";
import image18 from "./../assets/assets1/images/social7.svg";
import image19 from "./../assets/assets1/images/karun.png";
import Login from "../components/students/LoginPage";
import Bindi from "../assets/assets1/images/bindi_img.png";
import { Link } from "react-router-dom";
// import people from "../assets/assets1/images/people.png";
import time from "../assets/assets1/images/time.png";
import message from "../assets/assets1/images/message.png";
import fund1 from "../assets/assets1/images/fund1.png";
import telegram from "../assets/assets1/images/telegram.png";
import timer from "../assets/assets1/images/timer.png";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import StaticNavBar from "../StaticPageComponents/StaticNavBar";
import "./../assets/assets1/css/main.css";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import SearchIcon from "@material-ui/icons/Search";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import TelegramIcon from "@material-ui/icons/Telegram";
import axios from "axios";
import { LoginContext } from "../Context/LoginContext";
import calender from "../assets/img/calender.png";
import { TextField, InputAdornment } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { CardTravelSharp } from "@material-ui/icons";
import users from "../assets/assets1/images/users.png";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import * as yup from "yup";
import VideoModal from "../components/atoms/VideoModal";
import image from "./../assets/assets1/images/play.png";
import people from "../assets/assets1/images/people.png";
import FacebookIcon from "@material-ui/icons/Facebook";
import Navbar from "../StaticPageComponents/StaticNavBar";

// import time from "../assets/assets1/images/time.png";
// import message from "../assets/assets1/images/message.png";

const ExploreStudent = (props) => {
  useEffect(() => {
    getStudents("", "", "", noOfrecoords);
    getDashboardCount();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const logindetails = useContext(LoginContext);

  const studyField =
    logindetails.masterData && logindetails.masterData.studyFieldDtoList
      ? [...logindetails.masterData.studyFieldDtoList]
      : [];

  const cityList =
    logindetails.masterData && logindetails.masterData.cityDtoList
      ? [...logindetails.masterData.cityDtoList]
      : [];

  const [loginStatus, setLoginStatus] = useState(false);
  const [menu1, setMenu1] = useState("active");
  const [menu2, setMenu2] = useState("");
  const [tab1, setTab1] = useState("tab-pane fade in active show");
  const [tab2, setTab2] = useState("tab-pane fade");
  const [students, setStudents] = useState();
  const [cities, setCities] = useState();
  const [studyFields, setStudyFields] = useState();
  const [displayCards, setDisplayCards] = useState([]);
  const [city, setCity] = useState(null);
  const [discipline, setDiscipline] = useState(null);
  const [funds, setFunds] = useState(null);
  const [displayViewMore, setdisplayViewMore] = useState(false);
  const [noOfrecoords, setnoofrecords] = useState(9);
  const [viewMore, setViewMore] = useState(true);
  const [videopen, setVidOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const handleOpenVideo = (e) => {
    setVidOpen(true);
    setVideoSrc(e);
  };

  const baseUrl = process.env.REACT_APP_URL;

  const getDashboardCount = () => {
    axios
      .get(`${baseUrl}/prelogin/get-explore-dashboard-data-count`)
      .then((res) => {
        setStudents(res.data.body.countOfStudents);
        setCities(res.data.body.countOfCities);
        setStudyFields(res.data.body.countOfStudyFields);
      })
      .catch((err) => console.log(err));
  };

  const getStudents = (a, b, c, d) => {
    // console.log("data",a,b,c,d)
    let body = {
      pageNumber: 1,
      sortingOrderDirection: "asc",
      totalRecordPerPage: d,
      exploreStudentFilterDto: {},
    };
    if (a || city) {
      if (a) {
        body.exploreStudentFilterDto.cityList = [
          {
            cityId: a.cityId,
            name: a.name,
            operationType: "string",
          },
        ];
        setCity([
          {
            cityId: a.cityId,
            name: a.name,
            operationType: "string",
          },
        ]);
      } else {
        body.exploreStudentFilterDto.cityList = city;
      }
    }
    if (b || discipline) {
      if (b) {
        body.exploreStudentFilterDto.studyFieldList = [
          {
            studyFieldId: b.studyFieldId,
            name: b.name,
            operationType: "string",
          },
        ];
        setDiscipline([
          {
            studyFieldId: b.studyFieldId,
            name: b.name,
            operationType: "string",
          },
        ]);
      } else {
        body.exploreStudentFilterDto.studyFieldList = discipline;
      }
    }
    if (c || funds) {
      if (c) {
        body.exploreStudentFilterDto.maxFundAmount = Number(c);
        body.exploreStudentFilterDto.minFundAmount = 0;
        setFunds(c);
      } else {
        body.exploreStudentFilterDto.maxFundAmount = funds;
      }
    }
    const config = {
      method: "post",
      url: `${baseUrl}/prelogin/explore-students`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };

    axios(config)
      .then((res) => {
        setDisplayCards(res.data.body.studentList);
        const studentList = res.data.body.studentList;
      })
      .catch((err) => console.log(err));
  };

  const handleDiscipline = (e) => {
    const disciplineName = e.target.value;
    let discipline1 = {};
    for (let i = 0; i < studyField.length; i++) {
      if (studyField[i].name == disciplineName) {
        discipline1 = studyField[i];
      }
    }
    setDiscipline(discipline1);

    getStudents(null, discipline1, null, 9);
  };

  const handleRupees = (e) => {
    getStudents(null, null, e.target.value, noOfrecoords);
  };

  const handleCity = (e) => {
    const cityName = e.target.value;
    let city1 = {};
    for (let i = 0; i < cityList.length; i++) {
      if (cityList[i].name == cityName) {
        city1 = cityList[i];
      }
    }
    setCity(city1);
    // console.log(city1);

    getStudents(city1, null, null, noOfrecoords);
  };

  const getmoreStudents = () => {
    getStudents("", "", "", noOfrecoords + 9);
    setnoofrecords(noOfrecoords + 9);
  };

  return (
    <>
      <Navbar value="explore" />
      {loginStatus && <Login setLoginStatus={setLoginStatus} />}

      {/* <!---------- END: Header ------------->


    
     
<!---------- START: Breadcrumbs -------------> */}

      <div
        id="slider"
        className="carousel slide"
        data-ride="carousel"
        data-interval="1000"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100 smallview"
              src={image2}
              alt="First slide"
            />
            <div
              className="carousel-caption  "
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                top: "50px",
              }}
            >
              <p
                className="title"
                style={{
                  margin: "0px",
                }}
              >
                Student
              </p>
            </div>
          </div>
        </div>
      </div>

      <nav aria-label="breadcrumb" className="breadcrumb-bg">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Explore Student
            </li>
          </ol>
        </div>
      </nav>

      {/* dashboard display  ends */}
      <div className="container-fluid mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12 smallerSizeDash">
              <div className="media bg-primary media-card ">
                <img
                  src={people}
                  style={{ height: "120px", width: "120px" }}
                  className="align-self-center mr-5 ml-3 rounded-circle border-0 blueImage"
                  id="blueImage"
                />
                <div className="media-body p-3 fields">
                  <h1 className="mt-0 display-4 text-white headerMobile">
                    <b>{students}</b>
                  </h1>
                  <h4 className="text-white bodyMobile">Students</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 smallerSizeDash">
              <div className="media bg-primary media-card">
                <img
                  src={time}
                  style={{ height: "120px", width: "120px" }}
                  className="align-self-center mr-5 ml-3 rounded-circle border-0 blueImage"
                />
                <div className="media-body p-3 fields">
                  <h1 className="mt-0 display-4 text-white headerMobile">
                    <b>{studyFields}</b>
                  </h1>
                  <h4 className="text-white bodyMobile">Discipline</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 smallerSizeDash">
              <div className="media bg-primary media-card">
                <img
                  src={message}
                  style={{ height: "120px", width: "120px" }}
                  className="align-self-center mr-5 ml-3 rounded-circle border-0"
                />
                <div className="media-body p-3 fields">
                  <h1 className="mt-0 display-4 text-white headerMobile">
                    <b>{cities}</b>
                  </h1>
                  <h4 className="text-white bodyMobile">Cities</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* dashboard display  begins */}

      <div className="container-fluid mt-5">
        <div className="container">
          <h1 className="text-center headerMobile">
            <b>Find A Scholar Today</b>
          </h1>
          <hr className="line" />
          <h3
            className="text-center bodyMobile"
            style={{
              maxWidth: "800px",
              marginRight: "auto",
              marginLeft: "auto",
            }}
          >
            Empower students to take a step towards their dreams and learn
            without limits
          </h3>
          <h3 className="text-center bodyMobile"></h3>
        </div>
      </div>
      {/* dashboard filter begins */}

      <div className="container-fluid back-color mt-5">
        <div className="container pt-5 pb-5">
          <h6>Browse by:</h6>
          <div className="row bg-dark rounded">
            <div className="col-lg-4 col-md-12 col-sm-12 align-self-center">
              <div className="input-group p-3">
                <div className="input-group-prepend">
                  <label
                    className="input-group-text"
                    style={{ backgroundColor: "white" }}
                    for="inputGroupSelect01"
                  >
                    <SearchIcon />
                  </label>
                </div>
                <select
                  className="custom-select"
                  id="inputGroupSelect01"
                  onChange={handleCity}
                >
                  <option selected>By City</option>
                  {cityList.map((e) => {
                    return <option value={e.name}>{e.name}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 align-self-center">
              {/* <div className="input-group p-2">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1"><SearchIcon/></span>
            </div>
            <input type="text" className="form-control" placeholder="Search Discipline" aria-label="Username" aria-describedby="basic-addon1"/>
          </div> */}
              <div className="input-group p-3">
                <div className="input-group-prepend">
                  <label
                    className="input-group-text"
                    style={{ backgroundColor: "white" }}
                    for="inputGroupSelect01"
                  >
                    <SearchIcon />
                  </label>
                </div>
                <select
                  className="custom-select"
                  id="inputGroupSelect01"
                  onChange={handleDiscipline}
                >
                  <option selected>By Discipline</option>
                  {studyField.map((e) => {
                    return <option value={e.name}>{e.name}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 align-self-center">
              <div className="input-group p-3">
                <div className="input-group-prepend">
                  <label
                    className="input-group-text"
                    for="inputGroupSelect01"
                    style={{ width: "40px", backgroundColor: "white" }}
                  >
                    ₹
                  </label>
                </div>
                <select
                  className="custom-select"
                  id="inputGroupSelect01"
                  onChange={handleRupees}
                >
                  <option selected>Select Fund Range</option>
                  <option value="10000">Up to 10,000 Rs</option>
                  <option value="50000">Up to 50,000 Rs</option>
                  <option value="100000">Up to 1,00,000 Rs</option>
                  <option value="500000">Up to 5,00,000 Rs</option>
                  <option value="1000000">Up to 10,00,000 Rs</option>
                  <option value="5000000">Up to 50,00,000 Rs</option>
                </select>
              </div>
            </div>
          </div>
          {/* dashboard filter ends */}

          {/* students section begins */}
          <div className="explorerstudentcardssection p-1">
            {displayCards &&
              displayCards.map((card, i) => {
                // console.log(
                //   "nameees",
                //   card.studentBasicProfileDto.firstName,
                //   card.studentBasicProfileDto.firstName.length
                // );
                return (
                  <>
                    <div
                      className="student-block1 "
                      // data-toggle="modal"
                      // data-target={
                      //   "#" +
                      //   card.studentBasicProfileDto.firstName
                      //     .split(" ")
                      //     .join("")
                      // }
                      // onClick={() =>
                      //   handleOpenVideo(
                      //     "https://studost-prod-bucket.s3.ap-south-1.amazonaws.com/STUDOST_FRONT_END_VIDEO/student2.mp4"
                      //   )
                      // }
                    >
                      <img
                        className="videoheight"
                        src={
                          card.objectUrl
                            ? card.objectUrl
                            : "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg"
                        }
                        alt={
                          card.studentBasicProfileDto.firstName +
                          " " +
                          card.studentBasicProfileDto.lastName
                        }
                        width="100%"
                        style={{ cursor: "pointer" }}
                      />
                      {card.videoProfileObjectUri && (
                        <img
                          className="icon"
                          src={image}
                          onClick={() =>
                            handleOpenVideo(card.videoProfileObjectUri)
                          }
                        />
                      )}

                      <div className="card-body">
                        <h4
                          className="card-title card_title_studost"
                          data-toggle="modal"
                          data-target={
                            "#" +
                            card.studentBasicProfileDto.firstName
                              .split(" ")
                              .join("") +
                            card.userId
                          }
                        >
                          {card.studentBasicProfileDto.firstName +
                            " " +
                            card.studentBasicProfileDto.lastName}
                        </h4>
                        <p
                          className="card-text"
                          style={{
                            overflow: "clip",
                            maxHeight: "80px",
                          }}
                        >
                          {card.studentBasicProfileDto.summary}
                        </p>
                      </div>
                    </div>

                    <div
                      className="modal fade"
                      id={
                        card.studentBasicProfileDto.firstName
                          .split(" ")
                          .join("") + card.userId
                      }
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <div className="row">
                              <div className="col-12 col-lg-5  img_social">
                                <img
                                  src={
                                    card.objectUrl
                                      ? card.objectUrl
                                      : "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg"
                                  }
                                  height="300px"
                                  width="100%"
                                  style={{
                                    borderRadius: "10px",
                                    objectFit: "cover",
                                  }}
                                />

                                <div
                                  className="socialIcon"
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  {card.studentBasicProfileDto.socialMediaDtoList.map(
                                    (link) => {
                                      return (
                                        <a href={link.url} target="_blank">
                                          {link.name == "Facebook" ? (
                                            <div
                                              style={{
                                                width: "40px",
                                                height: "40px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                borderRadius: "50%",
                                                backgroundColor: "#191d49",
                                                color: "white",
                                                fontSize: "20px",
                                              }}
                                            >
                                              f
                                            </div>
                                          ) : (
                                            <img
                                              src={
                                                link.name == "Linkedin"
                                                  ? image17
                                                  : link.name == "Twitter"
                                                  ? image16
                                                  : null
                                              }
                                              width="40px"
                                            />
                                          )}
                                        </a>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                              <div className="col-12 col-lg-7 ">
                                <div className="heading team about">
                                  {card.studentBasicProfileDto.firstName +
                                    " " +
                                    card.studentBasicProfileDto.lastName}
                                </div>
                                <div className="text esmall">
                                  {card.studentBasicProfileDto.summary}
                                </div>
                                <div className="headingBio">Bio</div>
                                <div className="text esmall">
                                  {card.studentBasicProfileDto.summary}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            <div></div>
            <div
              className="mb-5"
              onClick={getmoreStudents}
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                cursor: "pointer",
                color: "blue",
              }}
            >
              view more <ExpandMoreIcon />
            </div>
          </div>
          {/* students section ends */}
          {/* <div className="notify">
            <img src={calender} className="noifyImage" />
            <div className="dateText">
              <p style={{ color: "white", marginBottom: "0px" }}>
                Fund Deadline
              </p>
              <h4 style={{ fontWeight: "bold" }}>Mon 19, May 2022</h4>
            </div>
            <div>
              <TextField
                className="notifyTextfield"
                size="small"
                type="email"
                variant="outlined"
                placeholder="Enter Email ID"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="notifyButton">NOTIFY ME</div>
          </div> */}

          <button
            className="button mx-auto d-block mt-5 p-2 onhover"
            onClick={() => setLoginStatus(true)}
          >
            <span>START YOUR JOURNEY </span>
          </button>

          <div className="query__section">
            <div>
              <img src={calender} className="noifyImage" />
            </div>
            <div className="query__text">Have A Query?</div>
            <Link to="/contactus">
              <div className="btn studost__notify__btn">CONTACT</div>
            </Link>
          </div>
        </div>
      </div>
      <VideoModal
        videopen={videopen}
        setVidOpen={setVidOpen}
        handleOpenVideo={handleOpenVideo}
        videoSrc={videoSrc}
        setVideoSrc={setVideoSrc}
      />
    </>
  );
};

export default ExploreStudent;
