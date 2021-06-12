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
import team6 from "../assets/assets1/images/team6.png";
import team7 from "../assets/assets1/images/team7.png";
import users from "../assets/assets1/images/users.png";
import fund1 from "../assets/assets1/images/fund1.png";
import telegram from "../assets/assets1/images/telegram.png";
import timer from "../assets/assets1/images/timer.png";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import StaticNavBar from "../StaticPageComponents/StaticNavBar";
import people from "../assets/assets1/images/people.png";
import time from "../assets/assets1/images/time.png";
import message from "../assets/assets1/images/message.png";
import "./../assets/assets1/css/main.css";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import SearchIcon from "@material-ui/icons/Search";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import TelegramIcon from "@material-ui/icons/Telegram";
import axios from "axios";
import { LoginContext } from "../Context/LoginContext";
import { TextField, InputAdornment } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import calender from "../assets/img/calender.png";
import SimpleModal from "../components/atoms/Modal";
import * as yup from "yup";
import Navbar from "../StaticPageComponents/StaticNavBar";

const ExploreStudent = (props) => {
  const logindetails = useContext(LoginContext);
  useEffect(() => {
    getStudents();
    getDashboardCount();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

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
  const [email, setemail] = useState();
  const [modalmsg, setModalmsg] = useState();
  const [modalvariation, setModalvariation] = useState("success");
  const [openModal, setOpenModal] = useState(false);
  const [city, setCity] = useState(null);
  const [discipline, setDiscipline] = useState(null);
  const [funds, setFunds] = useState(null);
  const [emailValid, setEmailValid] = useState(true);
  const [emailM, setEmailM] = useState(true);

  const baseUrl = process.env.REACT_APP_URL;

  const getDashboardCount = () => {
    axios
      .get(`${baseUrl}/prelogin/get-explore-dashboard-data-count`)
      .then((res) => {
        setStudents(res.data.body.countOfBenefactors);
        setCities(res.data.body.countOfCities);
        setStudyFields(res.data.body.countOfStudyFields);
      })
      .catch((err) => console.log(err));
  };

  let body = {
    pageNumber: 1,
    sortingOrderDirection: "asc",
    totalRecordPerPage: 100,
    exploreBenefactorFilterDto: {},
  };

  const getStudents = (a, b, c) => {
    if (a || city) {
      if (a) {
        body.exploreBenefactorFilterDto.cityList = [
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
        body.exploreBenefactorFilterDto.cityList = city;
      }
    }
    if (b || discipline) {
      if (b) {
        body.exploreBenefactorFilterDto.studyFieldList = [
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
        body.exploreBenefactorFilterDto.studyFieldList = discipline;
      }
    }
    if (c || funds) {
      if (c) {
        body.exploreBenefactorFilterDto.maxFundAmount = c;
        setFunds(c);
      } else {
        body.exploreBenefactorFilterDto.maxFundAmount = funds;
      }
    }
    // console.log(body);

    const config = {
      method: "post",
      url: `${baseUrl}/prelogin/explore-benefactors`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };

    axios(config)
      .then((res) => {
        setDisplayCards(res.data.body.benefactorList);
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
    getStudents(null, discipline1, null);
  };

  const handleRupees = (e) => {
    getStudents(null, null, e.target.value);
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
    console.log(city1);

    getStudents(city1, null, null);
  };

  //// notify me logic

  const emailType = (e) => {
    setemail(e.target.value);
  };
  const notifyMe = (e, b, c) => {
    if (email.length > 255) {
      setEmailM(true);
    }
    let schema = yup.object().shape({
      emailSchema: yup.string().email().max(255).required(),
    });
    schema
      .isValid({
        emailSchema: email,
      })
      .then(function (valid) {
        setEmailValid(valid);
        if (valid) {
          e.preventDefault();
          let body = {
            benefactorId: b,
            emailId: email,
            notifyMeId: 0,
            scholarshipId: c,
          };
          const config = {
            method: "post",
            url: `${baseUrl}/prelogin/notify-me`,
            headers: {
              "Content-Type": "application/json",
            },
            data: body,
          };

          axios(config)
            .then((res) => {
              setemail("");
              setModalmsg(
                "You will be notified about any updates via eamil. Thank You."
              );
              setOpenModal(true);
            })
            .catch((err) => {
              setModalmsg("Opps something went wrong");
              setOpenModal(true);
              setModalvariation("error");
            });
        }
      });
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
                Studost
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
              Explore Studost
            </li>
          </ol>
        </div>
      </nav>

      {/* dashboard display  begins */}
      <div className="container-fluid mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12 smallerSizeDash">
              <div className="media bg-primary media-card ">
                <img
                  src={people}
                  style={{ height: "120px", width: "120px" }}
                  className="align-self-center mr-5 ml-3 rounded-circle border-0 blueImage"
                />
                <div className="media-body p-3 fields">
                  <h1 className="mt-0 display-4 text-white headerMobile">
                    <b>{students}</b>
                  </h1>
                  <h4 className="text-white bodyMobile">Studosts</h4>
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
            <b>Find A Studost Today</b>
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
              {/* <div className="input-group p-2">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">₹</span>
            </div>
            <input type="text" className="form-control" placeholder="Select Fund Range" aria-label="Username" aria-describedby="basic-addon1"/>
          </div> */}
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
          <div className="explorerstudentcardssection">
            {displayCards &&
              displayCards.map((card, i) => {
                // console.log("nameees",card.benefactorBasicProfileDto.firstName,card.benefactorBasicProfileDto.firstName.length)
                return (
                  <>
                    <div
                      className="student-block1"
                      // onClick={() => alert("clicked")}
                      // data-toggle="modal"
                      // data-target={
                      //   "#" +
                      //   card.benefactorBasicProfileDto.firstName
                      //     .split(" ")
                      //     .join("")
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
                          card.benefactorBasicProfileDto.firstName +
                          " " +
                          card.benefactorBasicProfileDto.lastName
                        }
                        width="100%"
                        style={{
                          width: "100%",
                          margin: "0px",
                          padding: "0px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="card-body">
                        <h4
                          className="card-title card_title_studost"
                          data-toggle="modal"
                          data-target={
                            "#" +
                            card.benefactorBasicProfileDto.firstName
                              .split(" ")
                              .join("") +
                            card.userId
                          }
                        >
                          {card.benefactorBasicProfileDto.firstName +
                            " " +
                            card.benefactorBasicProfileDto.lastName}
                        </h4>
                        <p className="card-text">
                          {card.benefactorBasicProfileDto.bio}
                        </p>
                      </div>
                    </div>

                    <div
                      className="modal fade"
                      id={
                        card.benefactorBasicProfileDto.firstName
                          .split(" ")
                          .join("") + card.userId
                      }
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modalBenefactor"
                        role="document"
                      >
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
                            <div className="row ">
                              <div className="col-12 col-lg-5 img_social">
                                <div className="">
                                  <img
                                    src={
                                      card.objectUrl
                                        ? card.objectUrl
                                        : "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg"
                                    }
                                    height="300px"
                                    width="100%"
                                    className="popImage"
                                  />
                                </div>

                                <div
                                  className="socialIcon"
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <a
                                    href="https://www.linkedin.com"
                                    target="_blank"
                                  >
                                    <img src={image17} width="40px" />
                                  </a>
                                  &nbsp;
                                  <a href="https://twitter.com" target="_blank">
                                    <img src={image16} width="40px" />
                                  </a>{" "}
                                  &nbsp;
                                  <a
                                    href="https://www.instagram.com"
                                    target="_blank"
                                  >
                                    <img src={image18} width="40px" />
                                  </a>
                                </div>
                              </div>
                              <div className="col-12 col-lg-7 ">
                                <div className="heading team headingBio mobilepaddingtop">
                                  {card.benefactorBasicProfileDto.firstName +
                                    " " +
                                    card.benefactorBasicProfileDto.lastName}
                                </div>
                                <div className="text esmall">
                                  {card.latestScholarshipDto &&
                                    card.latestScholarshipDto.scholarshipAim}
                                </div>
                                <div className="headingBio">Bio</div>
                                <div className="text esmall">
                                  {card.benefactorBasicProfileDto.bio}
                                </div>
                                <div className="headingBio">
                                  Looking to Fund
                                </div>
                                <div className="text esmall">
                                  {card.latestScholarshipDto &&
                                    card.latestScholarshipDto
                                      .scholarshipIdealCandidateDescription}
                                </div>
                                <div className="headingBio">Fund Deadline</div>
                                <div className="text esmall">
                                  {card.latestScholarshipDto &&
                                    card.latestScholarshipDto.lastDateToApply}
                                </div>
                              </div>
                              <form
                                className="col-12 mt-5 studost__popup__notify"
                                onSubmit={(e) =>
                                  notifyMe(
                                    e,
                                    card.benefactorId,
                                    card.latestScholarshipDto.scholarshipId
                                  )
                                }
                              >
                                <div className="col-12 col-lg-8">
                                  <TextField
                                    className="notifyTextfield"
                                    style={{ width: "100%" }}
                                    size="small"
                                    type="email"
                                    value={email}
                                    onChange={emailType}
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
                                  {!emailValid && (
                                    <p style={{ color: "red" }}>
                                      Enter the valid E-mail
                                    </p>
                                  )}
                                </div>
                                <input
                                  className="button p-2 col-12 col-lg-4 studost__notify__btn"
                                  type="submit"
                                  value="NOTIFY ME"
                                />
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
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
            className="button mx-auto d-block p-2 onhover"
            style={{ marginTop: "10vh" }}
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

      <SimpleModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalmsg={modalmsg}
        modalvariation={modalvariation}
        setModalvariation={setModalvariation}
      />
    </>
  );
};

export default ExploreStudent;
