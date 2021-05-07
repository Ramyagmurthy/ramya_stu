import React, { useEffect, useState } from "react";
import FirstComponent from "../StaticPageComponents/LandingPageComponents/FirstComponent";
import SecondComponent from "../StaticPageComponents/LandingPageComponents/SecondComponent";
import LandingSectionFourComponent from "../StaticPageComponents/LandingPageComponents/LandingSectionFourComponent";
import Footer from "../StaticPageComponents/LandingPageComponents/Footer";
import ThirdBanner from "../StaticPageComponents/LandingPageComponents/ThirdBanner";
import { Link, Redirect, useHistory } from "react-router-dom";
import image1 from "./../assets/assets1/images/logo.svg";
import image2 from "./../assets/assets1/images/banner1.png";
import image3 from "./../assets/assets1/images/banner2.png";
import image_third from "./../assets/assets1/images/banner3.png";
import image4 from "./../assets/assets1/images/men.png";
import image5 from "./../assets/assets1/images/Stu2.png";
import image6 from "./../assets/assets1/images/Stu4.png";
import image7 from "./../assets/assets1/images/Stu1.png";
import image8 from "./../assets/assets1/images/Stu3.png";
import image9 from "./../assets/assets1/images/pp1.png";
import image10 from "./../assets/assets1/images/pp2.png";
import image11 from "./../assets/assets1/images/rupee.svg";
import image12 from "./../assets/assets1/images/divya.jpg";
import image13 from "./../assets/assets1/images/ganita.jpeg";
import anaha from "./../assets/assets1/images/anaha.jpg";
import manish from "./../assets/assets1/images/team1.png";
import anahGautam from "./../assets/assets1/images/team2.png";
import "../assets/assets1/css/main.css";
import Login from "./../components/students/LoginPage";
import BenifactoreSignUp from "./../components/benefactors/BenifactoreSignUp";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import VideoModal from "../components/atoms/VideoModal";

const LandingView = () => {
  const [logoWidth, setlogoWidth] = useState(160);
  const matches = useMediaQuery("(min-width:600px)");

  const [cssStyle, setCssStyle] = useState(
    "navbar navbar-expand-lg navbar-dark fixed-top maxedheight"
  );
  const [loginStatus, setLoginStatus] = useState(false);
  const [benifatorStatus, setBenifatorStatus] = useState(false);

  useEffect(() => {
    if (!matches) {
      setlogoWidth(100);
    }
    // console.log(window.scrollY);
    document.addEventListener("scroll", () => {
      if (window.scrollY < 100)
        setCssStyle(
          "navbar navbar-expand-lg navbar-dark fixed-top maxedheight"
        );
      else
        setCssStyle(
          "navbar navbar-expand-lg navbar-dark fixed-top bg-theme maxedheight"
        );
    });
  }, [window.scrollY]);

  const changeNav = () => {
    if (cssStyle != "navbar navbar-expand-lg navbar-dark fixed-top bg-theme") {
      setCssStyle("navbar navbar-expand-lg navbar-dark fixed-top bg-theme");
    } else {
      setCssStyle(
        "navbar navbar-expand-lg navbar-dark fixed-top bg-theme maxedheight"
      );
    }
  };

  // modal video logic
  const [videopen, setVidOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const handleOpenVideo = (e) => {
    setVidOpen(true);
    setVideoSrc(e);
  };

  return (
    <>
      {loginStatus && <Login setLoginStatus={setLoginStatus} />}
      {benifatorStatus && (
        <BenifactoreSignUp setBenifatorStatus={setBenifatorStatus} />
      )}
      <nav className={cssStyle}>
        <div className="container">
          <a className="navbar-brand" href="/">
            <img className="logo" src={image1} width={logoWidth} alt="logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={changeNav}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="about">
                  About Us
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                >
                  How It Works
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="student">Find a Scholarship</a>
                  </li>
                  <li>
                    <a href="findscholar">Find a Scholar</a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="contactus">
                  Contact Us
                </a>
              </li>
            </ul>
            <div
              className="btn"
              onClick={() => {
                setLoginStatus(true);
                // history.push("homecontrol/home");
              }}
            >
              LOGIN
            </div>
          </div>
        </div>
      </nav>

      {/* slide */}

      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
        data-interval="4000"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100 smallheight"
              src={image2}
              alt="First slide"
            />
            <div className="carousel-caption d-md-block">
              <p className="title">SHARE YOUR STORY</p>
              <p className="subtext">
                Find a StuDost who can take you a step closer to your goals
              </p>
              <div
                className="btn"
                style={{ marginBottom: "15%" }}
                onClick={() => {
                  setBenifatorStatus(true);
                }}
              >
                SIGN UP TODAY
              </div>
            </div>
          </div>
          <div className="carousel-item slide2">
            <img
              className="d-block w-100 smallheight"
              src={image3}
              alt="Second slide"
            />
            <div className="carousel-caption  d-md-block">
              <p className="title" style={{ paddingBottom: "50px" }}>
                Discover world-class
                <br />
                opportunities
              </p>
              <p className="subtext small-hide">
                Access unique funding and mentorship opportunities to unlock the
                next stage of your journey
              </p>
              <a
                className="btn top-padd"
                href="student"
                style={{ marginBottom: "8%" }}
              >
                LEARN MORE
              </a>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100 smallheight"
              src={image_third}
              alt="Third slide"
            />
            <div className="carousel-caption  d-md-block">
              <p className="title">Be a changemaker</p>
              <p className="subtext">
                Inspire and support students to achieve their full potential
              </p>
              <a
                className="btn"
                href="findscholar"
                style={{ marginBottom: "15%" }}
              >
                KNOW MORE
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* About us  */}

      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="heading mt-80">
              StuDost For Every
              <br />
              Student<span></span>
            </div>
            <div className="text">
              We believe in the power of big dreams. We want to empower students
              to take a step closer to their goals and learn without limits.
            </div>
            <a className="btn" href="about">
              ABOUT US
            </a>
          </div>
          <div className="col-12 col-lg-6 mt-25 text-center">
            <img src={image4} width="100%" />
          </div>
        </div>
      </div>
      {/* student slider */}
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-12 text-center">
            <div className="heading two mob center mt-80">
              Every Student Has A Unique Story
              <span></span>
            </div>
            <div className="text">
              Students are not just a sum of their credentials but also their
              experiences,
              <br /> motivations, and aspirations.
            </div>
          </div>
        </div>
      </div>
      <div className="row negative">
        <div
          id="studentSlide"
          className="carousel slide mt-25"
          data-ride="carousel"
          data-interval="400000"
        >
          <div className="carousel-inner text-left">
            <div className="carousel-item active">
              <div className="row">
                <div className="col-6 col-lg-3 hideSmall">
                  {/* <div
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(255,255,255,0.4)",
                    }}
                  /> */}
                  <div className="student-block">
                    <img
                      src={image12}
                      style={{
                        width: "100%",
                        objectFit: "cover",
                      }}
                      className="videoheight"
                      onClick={() =>
                        handleOpenVideo(
                          "https://studost-prod-bucket.s3.ap-south-1.amazonaws.com/STUDOST_FRONT_END_VIDEO/Divya+Goyal_video.mov"
                        )
                      }
                    />

                    <div className="name">Divya Goyal</div>
                    <div className="age">21yrs old</div>
                    <div className="text">
                      Improving the systems that ignored her disability
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-3">
                  <div
                    className="student-block"
                    // data-toggle="modal"
                    // data-target="#student1"
                    onClick={() =>
                      handleOpenVideo(
                        "https://studost-prod-bucket.s3.ap-south-1.amazonaws.com/STUDOST_FRONT_END_VIDEO/student2.mp4"
                      )
                    }
                  >
                    <img src={image6} width="100%" className="videoheight" />

                    <div className="name">Jigyasa Labroo</div>
                    <div className="age">22yrs old</div>
                    <div className="text">
                      Helping every child in India find their voice
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-3">
                  <div
                    className="student-block"
                    data-toggle="modal"
                    data-target="#student2"
                    onClick={() =>
                      handleOpenVideo(
                        "https://studost-prod-bucket.s3.ap-south-1.amazonaws.com/STUDOST_FRONT_END_VIDEO/Studost+Story+Ganita.mp4"
                      )
                    }
                    // style={{ border: "2px solid red" }}
                  >
                    <img src={image13} width="100%" className="videoheight" />
                    <div className="name">Ganita Dahiya </div>
                    <div className="age">22yrs old</div>
                    <div className="text">
                      Diminishing inequalities in the social strata of India
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-3 hideSmall">
                  <div
                    className="student-block"
                    onClick={() =>
                      handleOpenVideo(
                        "https://studost-prod-bucket.s3.ap-south-1.amazonaws.com/STUDOST_FRONT_END_VIDEO/Studost_Pitch_Pius_FINAL.mp4"
                      )
                    }
                  >
                    <img src={image7} width="100%" className="videoheight" />
                    <div className="name">Pius Fozan </div>
                    <div className="age">25yrs old</div>
                    <div className="text">
                      Working for a hunger-free Jharkhand through empathetic
                      policymaking
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row">
                <div className="col-6 col-lg-3 hideSmall">
                  <div
                    className="student-block"
                    onClick={() =>
                      handleOpenVideo(
                        "https://studost-prod-bucket.s3.ap-south-1.amazonaws.com/STUDOST_FRONT_END_VIDEO/Studost_Pitch_Pius_FINAL.mp4"
                      )
                    }
                  >
                    <img src={image7} width="100%" className="videoheight" />
                    <div className="name">Pius Fozan </div>
                    <div className="age">25yrs old</div>
                    <div className="text">
                      Working for a hunger-free Jharkhand through empathetic
                      policymaking
                    </div>
                  </div>
                </div>

                <div className="col-6 col-lg-3">
                  <div
                    className="student-block"
                    data-toggle="modal"
                    data-target="#student2"
                    onClick={() =>
                      handleOpenVideo(
                        "https://studost-prod-bucket.s3.ap-south-1.amazonaws.com/STUDOST_FRONT_END_VIDEO/Divya+Goyal_video.mov"
                      )
                    }
                  >
                    <img src={image12} width="100%" className="videoheight" />
                    {/* <video
                      src="https://studost-prod-bucket.s3.ap-south-1.amazonaws.com/STUDOST_FRONT_END_VIDEO/Divya+Goyal_video.mov"
                      height="100%"
                      width="100%"
                      autoPlay={false}
                      controls={true}
                      loop={true}
                      className="videoheight"
                    /> */}
                    <div className="name">Divya Goyal</div>
                    <div className="age">21yrs old</div>
                    <div className="text">
                      Improving the systems that ignored her disability
                    </div>
                    {/* <div className="name">Neha Verma</div>
                    <div className="age">22yrs old</div>
                    <div className="text">
                      Working for a hunger-free Jharkhand through empathetic
                      policymaking
                    </div> */}
                  </div>
                </div>
                <div className="col-6 col-lg-3">
                  <div
                    className="student-block"
                    onClick={() =>
                      handleOpenVideo(
                        "https://studost-prod-bucket.s3.ap-south-1.amazonaws.com/STUDOST_FRONT_END_VIDEO/Vandita+Studost+3.mov"
                      )
                    }
                  >
                    <div
                      className="videoheight"
                      style={{ backgroundColor: "black" }}
                    />
                    {/* <img src={image8} width="100%" className="videoheight" /> */}

                    <div className="name">Vandita Moraka </div>
                    <div className="age">25yrs old</div>
                    <div className="text">
                      Building a force of feminist leadership to create a
                      gender-just world
                    </div>
                  </div>
                </div>

                <div className="col-6 col-lg-3 hideSmall">
                  <div
                    className="student-block"
                    onClick={() =>
                      handleOpenVideo(
                        "https://studost-prod-bucket.s3.ap-south-1.amazonaws.com/STUDOST_FRONT_END_VIDEO/student2.mp4"
                      )
                    }
                  >
                    <img src={image6} width="100%" className="videoheight" />

                    <div className="name">Jigyasa Labroo</div>
                    <div className="age">22yrs old</div>
                    <div className="text">
                      Helping every child in India find their voice
                    </div>
                  </div>
                </div>

                {/* <div className="student-block">
                    <img
                      src={anaha}
                      width="100%"
                      className="videoheight"
                      style={{ width: "100%", objectFit: "cover" }}
                    />

                    <div className="name">Anah Bagdadi</div>
                    <div className="age">21yrs old</div>
                    <div className="text"></div>
                  </div> */}

                {/* <div className="col-6 col-lg-3">
                  <div
                    className="student-block"
                    data-toggle="modal"
                    data-target="#student1"
                  >
                    <img src={image6} width="100%" />
                    <div className="name">Jigyasa Labroo</div>
                    <div className="age">22yrs old</div>
                    <div className="text">
                      Helping every child in India find their voice
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="carousel-item">
              <div className="row">
                <div className="col-6 col-lg-3 hideSmall">
                  <div
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(255,255,255,0.4)",
                    }}
                  />
                  <div className="student-block">
                    <img
                      src={image6}
                      style={{ width: "100%", objectFit: "cover" }}
                      className="videoheight"
                    />

                    {/* <video
                      src="https://studost-prod-bucket.s3.ap-south-1.amazonaws.com/STUDOST_FRONT_END_VIDEO/Divya+Goyal_video.MOV"
                      height="100%"
                      width="100%"
                      autoPlay={false}
                      controls={true}
                      
                      loop={true}
                      className="videoheight"
                    /> */}

                    <div className="name">Jigyasa Labroo</div>
                    <div className="age">22yrs old</div>
                    <div className="text">
                      Helping every child in India find their voice
                    </div>
                  </div>
                </div>
                {/* <div className="col-6 col-lg-3">
                  <div
                    className="student-block"
                    // data-toggle="modal"
                    // data-target="#student1"
                  >
                     <img src="assets/images/Stu4.png" width="100%" /> 
                    <video
                      src="https://studost-prod-bucket.s3.ap-south-1.amazonaws.com/STUDOST_FRONT_END_VIDEO/VID-20210410-WA0013.mp4"
                      height="100%"
                      width="100%"
                      autoPlay={false}
                      controls={true}
                      loop={true}
                      className="videoheight"
                    />

                    <div className="name">Anah Bagdadi</div>
                    <div className="age">21yrs old</div>
                    <div className="text">
                    Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. 
                    </div>
                  </div>
                </div> */}
                {/* <div className="col-6 col-lg-3">
                  <div
                    className="student-block"
                    data-toggle="modal"
                    data-target="#student2"
                  >
                     <img src={image7} width="100%" /> 
                    <video
                      src="https://studost-prod-bucket.s3.ap-south-1.amazonaws.com/STUDOST_FRONT_END_VIDEO/Video_20210421221607980_by_Filmigo_2.mp4"
                      height="100%"
                      width="100%"
                      autoPlay={false}
                      controls={true}
                      loop={true}
                      className="videoheight"
                    />
                    <div className="name">Neha Verma </div>
                    <div className="age">22yrs old</div>
                    <div className="text">
                       Diminishing inequalities in the social strata of India 
                    </div>
                  </div>
                </div> */}
                {/* <div className="col-6 col-lg-3 hideSmall">
                  <div
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(255,255,255,0.4)",
                    }}
                  /> */}
                {/* <div className="student-block">
                    <img
                      src={image13}
                      width="100%"
                      className="videoheight"
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                     <video
                      src="https://studost-prod-bucket.s3.ap-south-1.amazonaws.com/STUDOST_FRONT_END_VIDEO/Studost_Pitch_Pius_FINAL.mp4"
                      height="100%"
                      width="100%"
                      autoPlay={false}
                      controls={true}
                      
                      loop={true}
                      className="videoheight"
                    /> 

                    <div className="name">Ganita Dahiya </div>
                    <div className="age">25yrs old</div>
                    <div className="text">
                      Diminishing inequalities in the social strata of India
                    </div>
                  </div> */}
                {/* </div> */}
              </div>
            </div>
          </div>
          <ol className="carousel-indicators one">
            <li
              data-target="#studentSlide"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#studentSlide" data-slide-to="1"></li>
          </ol>
        </div>
        <div className="col-12 col-lg-12 text-center">
          <a href="student" className="btn mt-25">
            Find a scholarship
          </a>
        </div>
      </div>

      {/* start fund */}

      <div className="container mb-50">
        <div className="row bg-white">
          <div className="col-12 col-lg-12 text-center mb-50">
            <div className="heading two mob center mt-80">
              Give Back And Transform A Life<span></span>
            </div>
          </div>
          <div className="col-12 col-lg-5 bg-white index-999">
            <div className="heading small mt-80">
              Become A StuDost
              <br />
              Today<span></span>
            </div>
            <div className="text">
              Help students gain a high-quality education by supporting their
              dreams and removing barriers to improve their access.
            </div>
            <a href="findscholar" className="btn">
              Find a Scholar
            </a>
          </div>
          <div className="col-12 col-lg-7 mt-25 text-center">
            <div
              id="founderSlide"
              className="carousel slide mt-25"
              data-ride="carousel"
              data-interval="4000"
            >
              <div className="carousel-inner text-left ">
                <div className="carousel-item active">
                  <div className="row negative2">
                    <div className="col-6 col-lg-6">
                      <div className="student-block two heightstudostcard">
                        <img
                          className="studost_img"
                          src={anahGautam}
                          width="100%"
                        />
                        <div className="name">Ahana Gautam</div>
                        <div className="text">Parivartan Fund</div>
                        <span className="amount_tag">₹ &nbsp; 10 Lakhs</span>
                      </div>
                    </div>
                    <div className="col-6 col-lg-6">
                      <div className="student-block two heightstudostcard">
                        <img
                          className="studost_img"
                          src={manish}
                          width="100%"
                        />
                        <div className="name">Manish Maheshwari</div>
                        <span className="amount_tag">₹ &nbsp;15 Lakhs</span>
                        <div className="text">Law Fund</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="carousel-item">
                  <div className="row negative2">
                    <div className="col-6 col-lg-6">
                      <div className="student-block two heightstudostcard">
                        <img
                          className="studost_img"
                          src={anahGautam}
                          width="100%"
                        />
                        <div className="name">Ahana Gautam</div>
                        <div className="text">Parivartan Fund</div>
                        <span className="amount_tag">₹ &nbsp; 10 Lakhs</span>
                      </div>
                    </div>
                    <div className="col-6 col-lg-6">
                      <div className="student-block two heightstudostcard">
                        <img
                          className="studost_img"
                          src={manish}
                          width="100%"
                        />
                        <div className="name">Manish Maheshwari</div>
                        <span className="amount_tag">₹ &nbsp;15 Lakhs</span>
                        <div className="text">Law Fund</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="carousel-item">
                  <div className="row negative2">
                    <div className="col-6 col-lg-6">
                      <div className="student-block two heightstudostcard">
                        <img
                          className="studost_img"
                          src={anahGautam}
                          width="100%"
                        />
                        <div className="name">Ahana Gautam</div>
                        <div className="text">Parivartan Fund</div>
                        <span className="amount_tag">₹ &nbsp; 10 Lakhs</span>
                      </div>
                    </div>
                    <div className="col-6 col-lg-6">
                      <div className="student-block two heightstudostcard">
                        <img
                          className="studost_img"
                          src={manish}
                          width="100%"
                        />
                        <div className="name">Manish Maheshwari</div>
                        <span className="amount_tag">₹ &nbsp;15 Lakhs</span>
                        <div className="text">Law Fund</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ol className="carousel-indicators two">
                <li
                  data-target="#founderSlide"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li data-target="#founderSlide" data-slide-to="1"></li>
                <li data-target="#founderSlide" data-slide-to="2"></li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <Footer />
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

export default LandingView;
