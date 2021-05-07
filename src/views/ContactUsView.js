import React, { useEffect, useState } from "react";
import Footer from "../StaticPageComponents/LandingPageComponents/Footer";
import ContactUsFirstPage from "../StaticPageComponents/ContactUs/ContactUsFirstPage";
import ContactDeatail from "../StaticPageComponents/ContactUs/ContactDeatail";
import SimpleModal from "../components/atoms/Modal";
import axios from "axios";
import image1 from "./../assets/assets1/images/logo.svg";
import image2 from "./../assets/assets1/images/contact-bg.png";
import image3 from "./../assets/assets1/images/contact1.svg";
import image4 from "./../assets/assets1/images/contact2.svg";
import image5 from "./../assets/assets1/images/social11.svg";
import image6 from "./../assets/assets1/images/social21.svg";
import image7 from "./../assets/assets1/images/social31.svg";
import image8 from "./../assets/assets1/images/social41.svg";
import Login from "./../components/students/LoginPage";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import "./../assets/assets1/css/main.css";

const ContactUsView = () => {
  const [logoWidth, setlogoWidth] = useState(160);
  const matches = useMediaQuery("(min-width:600px)");
  const [cssStyle, setCssStyle] = useState(
    "navbar navbar-expand-lg navbar-dark fixed-top maxedheight"
  );
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [fnamev, setFnamev] = useState(false);
  const [lnamev, setLnamev] = useState(false);
  const [emailv, setEmailv] = useState(false);
  const [messagev, setMessagev] = useState(false);
  const [total, setTotalv] = useState(false);
  const [modalmsg, setModalmsg] = useState("");
  const [modalvariation, setModalvariation] = useState("success");
  const [openModal, setOpenModal] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  const baseUrl = process.env.REACT_APP_URL;
  // const baseUrl = "http://studost.devkraft.in/studost/api"

  const url = `${baseUrl}/contact-us/save-contact-details`;

  const handleSubmit1 = () => {
    if (fname.length === 0) setFnamev(true);
    else setFnamev(false);
    if (lname.length === 0) setLnamev(true);
    else setLnamev(false);
    if (email.length === 0) setEmailv(true);
    else setEmailv(false);
    if (message.length === 0) setMessagev(true);
    else setMessagev(false);
    //console.log("hi");

    if (!(!fnamev || !lnamev || !emailv || !messagev)) {
      const body = {
        emailId: email,
        firstName: fname,
        lastName: lname,
        message: message,
      };
      const config = {
        method: "post",
        url: url,
        headers: {
          "Content-Type": "application/json",
        },
        data: body,
      };

      axios(config)
        .then((response) => {
          //console.log(response);
          setFname("");
          setFnamev(false);
          setLname("");
          setLnamev(false);
          setEmail("");
          setEmailv(false);
          setMessage("");
          setMessagev(false);
          setOpenModal(true);
          setModalmsg("Message sucessfully sent ");
        })
        .catch((err) => {
          console.log(err);
          setOpenModal(true);
          setModalmsg(err.Error);
        });
    } else {
      setOpenModal(false);
      setModalmsg(false);
    }
  };

  useEffect(() => {
    //console.log(matches);
    if (!matches) {
      setlogoWidth(100);
    } else {
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
      <nav className={cssStyle}>
        <div class="container">
          <a class="navbar-brand" href="/">
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
              <li className="nav-item active">
                <a className="nav-link">Contact Us</a>
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
          <div className="carousel-item active ">
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
                Contact us
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
            <li className="breadcrumb-item active" aria-current="page">
              Contact Us
            </li>
          </ol>
        </div>
      </nav>
      {/* <!---------- END: Breadcrumbs ------------->

<!---------- START: Contact Us -------------> */}
      <div class="container">
        <SimpleModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          modalmsg={modalmsg}
          modalvariation={modalvariation}
          setModalvariation={setModalvariation}
        />
        <div class="row">
          <div class="col-12 col-lg-6">
            <div class="heading small mob center mt-60">Send us a message</div>
            <form
              onSubmit={() => {
                handleSubmit1();
              }}
            >
              <div class="contact-form">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name *"
                  required
                  value={fname}
                  onChange={(e) => {
                    setFname(e.target.value);
                  }}
                />
                {fnamev && (
                  <p style={{ color: "red" }}>Please enter the first name</p>
                )}
                <input
                  type="text"
                  class="form-control"
                  value={lname}
                  onChange={(e) => {
                    setLname(e.target.value);
                  }}
                  placeholder="Last Name"
                  required
                />
                {lnamev && (
                  <p style={{ color: "red" }}>Please enter the last name</p>
                )}
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email ID *"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
                {emailv && (
                  <p style={{ color: "red" }}>Please enter the email</p>
                )}
                <textarea
                  rows="4"
                  className="form-control"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  required
                ></textarea>
                {messagev && (
                  <p style={{ color: "red" }}>Please enter the message</p>
                )}
                <div
                  type="submit"
                  onClick={() => {
                    handleSubmit1();
                  }}
                >
                  <div
                    class="btn theme  m-0"
                    type="submit"
                    // onClick={() => {
                    //   handleSubmit1();
                    // }}
                  >
                    SEND US MESSAGE
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-12 col-lg-2"></div>
          <div className="col-12 col-lg-4 contact-no">
            <a href="tel:+919717688800" target="_blank">
              <img src={image3} />
              &nbsp; +91-97176 88800
            </a>
            <a href="mailto:contact@studost.org" target="_blank">
              <img src={image4} />
              &nbsp; contact@studost.org
            </a>
            <div className="col-12 col-lg-8 social-links">
              <a href="https://www.facebook.com/StudostOrg" target="_blank">
                <img src={image5} width="45px" />
              </a>
              <a href="https://twitter.com/StudostOrg" target="_blank">
                <img src={image6} width="45px" />
              </a>
              <a
                href="https://www.linkedin.com/company/studost/"
                target="_blank"
              >
                <img src={image7} width="45px" />
              </a>
              {/* <a href="#" target="_blank">
                <img src="assets/images/social41.svg" width="45px" />
              </a> */}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactUsView;
