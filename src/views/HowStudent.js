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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import "./../assets/assets1/css/main.css";
import Login from "./../components/students/LoginPage";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Navbar from "../StaticPageComponents/StaticNavBar";
import BenifactoreSignUp from "./../components/benefactors/BenifactoreSignUp";

const LandingView = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [benifatorStatus, setBenifatorStatus] = useState(false);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Navbar value="how" />
      {loginStatus && <Login setLoginStatus={setLoginStatus} />}
      {benifatorStatus && (
        <BenifactoreSignUp setBenifatorStatus={setBenifatorStatus} />
      )}
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
                Find a Fund
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
              <Link to="/">
                <a>Home</a>
              </Link>
            </li>
            <li className="breadcrumb-item">
              <a>How It Works</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              FIND A FUND
            </li>
            {/* <li className="breadcrumb-item">
              <a href="/findscholar">Find a Scholar</a>
            </li> */}
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
              Learn how you can receive funding through StuDost
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
              anywhere in the world. These funds may fully or partially cover
              your education and can be based on merit and/or need.
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
    </>
  );
};

export default LandingView;
