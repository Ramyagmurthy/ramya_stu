import React, { useEffect, useState } from "react";
import Footer from "../StaticPageComponents/LandingPageComponents/Footer";
import FirstComponent from "../StaticPageComponents/HowStudent/FirstComponent";
import ThirdCOmponent from "../StaticPageComponents/HowStudent/ThirdAboutUsComponent";
import SecondComponent from "../StaticPageComponents/HowStudent/SecondAboutUs";
import image1 from "./../assets/assets1/images/logo.svg";
import image2 from "./../assets/assets1/images/how-bg.jpg";
import image3 from "./../assets/assets1/images/icon1.svg";
import image4 from "./../assets/assets1/images/icon2.svg";
import image5 from "./../assets/assets1/images/icon3.svg";
import image6 from "./../assets/assets1/images/fund1.png";
import image7 from "./../assets/assets1/images/fund2.png";
import image8 from "./../assets/assets1/images/fund3.png";

import "./../assets/assets1/css/main.css";
import Login from "./../components/students/LoginPage";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import BenifactoreSignUp from "./../components/benefactors/BenifactoreSignUp";

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
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="about">
                  About Us
                </a>
              </li>
              <li className="nav-item active dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                >
                  How It Works
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="active" href="student">
                      Find a Scholarship
                    </a>
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
              }}
            >
              {" "}
              LOGIN
            </div>
          </div>
        </div>
      </nav>
      {/* <!---------- END: Header ------------->

<!---------- START: Slider -------------> */}
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
              className="carousel-caption"
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
                Find a Scholarship
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <!---------- END: Slider ------------->

<!---------- START: Breadcrumbs -------------> */}
      <nav aria-label="breadcrumb" className="breadcrumb-bg">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="about">About Us</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              FIND A SCHOLARSHIP
            </li>
            <li className="breadcrumb-item">
              <a href="findscholar">Find a Scholar</a>
            </li>
          </ol>
        </div>
      </nav>
      {/* <!---------- END: Breadcrumbs ------------->

<!---------- START: Content -------------> */}
      <div className="container funds">
        <div className="row">
          <div className="col-12 col-lg-12 text-center">
            <div className="heading two mob center mt-60">
              Expand Your Horizons<span></span>
            </div>
            <div className="subheading">
              Learn how you can find a scholarship on StuDost
            </div>
            <div
              className="btn"
              onClick={() => {
                setBenifatorStatus(true);
              }}
            >
              APPLY NOW
            </div>
          </div>
        </div>
        <div className="row mt-50">
          <div className="col-12 col-lg-1 fund mob-hide">
            <img src={image3} />
          </div>
          <div className="col-12 col-lg-1 fund mob-show">
            <div className="heading fund">
              <img src={image3} className="fundiconimage" />
              &nbsp; What Is A StuDost Fund
            </div>
          </div>
          <div className="col-12 col-lg-11">
            <div className="heading fund mob-hide">What Is A StuDost Fund</div>
            <div className="text fund">
              While a large section of students are unable to access quality
              higher education in India, there are many who have had the
              privilege of benefiting from it. To pay it forward, StuDost funds
              are created by industry leaders, philanthropists and benefactors
              who wish to drive impact by supporting your educational goals.
            </div>
          </div>
        </div>
        <div className="row mt-30">
          <div className="col-12 col-lg-1 mob-hide">
            <img src={image4} />
          </div>
          <div className="col-12 col-lg-1 fund mob-show">
            <div className="heading fund">
              <img src={image4} className="fundiconimage" /> &nbsp; What can I
              use the fund for?
            </div>
          </div>
          <div className="col-12 col-lg-11">
            <div className="heading fund mob-hide">
              What can I use the fund for?
            </div>
            <div className="text fund">
              StuDost funds are designed to support students across various
              disciplines to pursue an undergraduate or postgraduate program
              anywhere in the world. These may be partial or full scholarships
              awarded based on merit and/or need.
            </div>
          </div>
        </div>
        <div className="row mt-30">
          <div className="col-12 col-lg-1 mob-hide">
            <img src={image5} />
          </div>
          <div className="col-12 col-lg-1 fund mob-show">
            <div className="heading fund ">
              <img src={image5} className="fundiconimage" /> &nbsp; How can I
              receive a fund?
            </div>
          </div>
          <div className="col-12 col-lg-11">
            <div className="heading fund mob-hide">
              How can I receive a fund?
            </div>
            <div className="text fund">
              Start your application today. A StuDost application is carefully
              designed to understand your unique story, intellectual rigor,
              leadership potential, and motivation to create an impact. You can
              explore funds, check your eligibility, and apply to as many as
              three at the same time.
            </div>
            <div
              className="btn theme mt-25"
              onClick={() => {
                setBenifatorStatus(true);
              }}
            >
              Start your StuDost journey
            </div>
          </div>
        </div>
        <div className="row detail">
          <div className="col-12 col-lg-6 mt-50">
            <div className="heading fund">
              Your story, Your voice<span></span>
            </div>
            <br />
            <div className="text fund">
              StuDost’s focus on visual storytelling helps you describe your
              journey and aspirations in an authentic and engaging way. Your
              video is an opportunity for you to give an insight into who you
              really are and what makes you unique.
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <img src={image6} width="100%" />
          </div>
        </div>
        <div className="row detail mt-60">
          <div className="col-12 col-lg-6 mob-hide">
            <img src={image7} width="100%" />
          </div>
          <div className="col-12 col-lg-6 mt-80">
            <div className="heading fund">
              For all backgrounds and disciplines<span></span>
            </div>
            <br />
            <div className="text fund">
              No matter where you’re from or what you wish to study, StuDost
              funds support a variety of subjects and disciplines.
            </div>
          </div>
          <div className="col-12 col-lg-6 mob-show">
            <img src={image7} width="100%" />
          </div>
        </div>
        <div className="row detail mt-60 mb-50">
          <div className="col-12 col-lg-6 mt-80">
            <div className="heading fund">
              Faster, Multi-Use Application<span></span>
            </div>
            <br />
            <div className="text fund">
              We understand that applying to scholarships can be a cumbersome
              process. The one-fill-multi-reuse feature of a StuDost application
              allows you to apply to three funds at once at a single click.
              Don’t worry, you get to give your final touches before you hit
              submit.
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <img src={image8} width="100%" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LandingView;
