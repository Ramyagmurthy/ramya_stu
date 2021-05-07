// import FirstComponent from "../StaticPageComponents/HowStudost/StuFirstComponentent.js";
import React, { useEffect, useState } from "react";
import StuSecondComponent from "../StaticPageComponents/HowStudost/StuSecondComponent";
import StuThirdComponent from "../StaticPageComponents/HowStudost/StuThirdComponent";
import StuFirst1Component from "../StaticPageComponents/HowStudost/StuFirst1Component";
import StuForthComponent from "../StaticPageComponents/HowStudost/StuForthComponent";
import Footer from "../StaticPageComponents/LandingPageComponents/Footer";
import image1 from "./../assets/assets1/images/logo.svg";
import image2 from "./../assets/assets1/images/how-bg.jpg";
import image3 from "./../assets/assets1/images/icon1.svg";
import image4 from "./../assets/assets1/images/icon4.svg";
import image5 from "./../assets/assets1/images/icon4.svg";
import image6 from "./../assets/assets1/images/fund4.png";
import image7 from "./../assets/assets1/images/fund5.png";
import image8 from "./../assets/assets1/images/fund6.png";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import BenifactoreSignUp from "./../components/benefactors/BenifactoreSignUp";

import "./../assets/assets1/css/main.css";
import Login from "./../components/students/LoginPage";

const HowStudost = () => {
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
    <div>
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
                    <a href="student">Find a Scholarship</a>
                  </li>
                  <li>
                    <a className="active" href="findscholar">
                      Find a Scholar
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="contactus">
                  Contact Us
                </a>
              </li>
            </ul>
            <a href="signin" style={{ color: "inherit" }}>
              <div
                className="btn"
                onClick={() => {
                  setLoginStatus(true);
                }}
              >
                {" "}
                LOGIN
              </div>
            </a>
          </div>
        </div>
      </nav>

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
              <p className="title" style={{ margin: "0px" }}>
                Find a Scholar
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
            <li className="breadcrumb-item">
              <a href="student">FIND A SCHOLARSHIP</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Find a Scholar
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
              Become a StuDost<span></span>
            </div>
            <div className="subheading">
              Take a step closer towards changing a student’s life
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
              <img src={image3} className="fundiconimage" /> &nbsp; Why should I
              become a StuDost?
            </div>
          </div>
          <div className="col-12 col-lg-11">
            <div className="heading fund mob-hide">
              Why should I become a StuDost?{" "}
            </div>
            <div className="text fund">
              Are you someone who had the privilege of benefiting from a great
              education? Do you believe that a strong educational foundation can
              empower future leaders to create strong societal impact? If so,
              you can give back to a community of aspiring students by becoming
              their StuDost.
            </div>
          </div>
        </div>
        <div className="row mt-30">
          <div className="col-12 col-lg-1 mob-hide">
            <img src={image4} />
          </div>
          <div className="col-12 col-lg-1 fund mob-show">
            <div className="heading fund">
              <img src={image4} className="fundiconimage" /> &nbsp; What is a
              StuDost fund?
            </div>
          </div>
          <div className="col-12 col-lg-11">
            <div className="heading fund mob-hide">What is a StuDost fund?</div>
            <div className="text fund">
              StuDost funds are created by industry leaders, philanthropists and
              benefactors who wish to support a student gain an excellent higher
              education. Through your fund, you can choose to provide aid to
              students seeking an undergraduate or postgraduate degree anywhere
              in the world.
            </div>
          </div>
        </div>
        <div className="row mt-30">
          <div className="col-12 col-lg-1 mob-hide">
            <img src={image5} />
          </div>
          <div className="col-12 col-lg-1 fund mob-show">
            <div className="heading fund">
              <img src={image5} className="fundiconimage" /> &nbsp; How can I
              create a fund?
            </div>
          </div>
          <div className="col-12 col-lg-11">
            <div className="heading fund mob-hide">
              How can I create a fund?
            </div>
            <div className="text fund">
              You can start your fund today. Whatever be your motivation and
              whoever you may be looking to support, you can define the
              requirements and eligibility of your fund to attract the brightest
              students across India.
            </div>
            <div
              onClick={() => {
                setBenifatorStatus(true);
              }}
              className="btn theme mt-25"
            >
              Launch your fund
            </div>
          </div>
        </div>
        <div className="row detail">
          <div className="col-12 col-lg-6 mt-50">
            <div className="heading fund">
              Drive Meaningful impact<span></span>
            </div>
            <br />
            <div className="text fund">
              By becoming a StuDost, you are investing in a student, who is
              driven to make the world a better place. In a world riddled with
              institutional inequality, you can pay it forward and join the
              movement to secure someone’s future.
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
              Build your tribe<span></span>
            </div>
            <br />
            <div className="text fund">
              Through your fund, you can choose to support students who wish to
              work on issues close to your heart or gaps you would like to see
              addressed.
            </div>
          </div>
          <div className="col-12 col-lg-6 mob-show">
            <img src={image7} width="100%" />
          </div>
        </div>
        <div className="row detail mt-60 mb-50">
          <div className="col-12 col-lg-6 mt-80">
            <div className="heading fund">
              Ensure Fair and transparent Process<span></span>
            </div>
            <br />
            <div className="text fund">
              The StuDost team provides end-to-end guidance on how you can
              create a fund, design a fair and transparent selection process,
              and ensure clear and consistent communication with the applicants.
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <img src={image8} width="100%" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HowStudost;
