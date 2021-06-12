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
import "./../assets/assets1/css/main.css";
import * as yup from "yup";
import Navbar from "../StaticPageComponents/StaticNavBar";
import { Link } from "react-router-dom";

const ContactUsView = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [fnamev, setFnamev] = useState(true);
  const [lnamev, setLnamev] = useState(true);
  const [emailv, setEmailv] = useState(true);
  const [messagev, setMessagev] = useState(true);
  const [fnameM, setFnameM] = useState(true);
  const [lnameM, setLnameM] = useState(true);
  const [emailM, setEmailM] = useState(true);
  const [messageM, setMessageM] = useState(true);
  const [total, setTotalv] = useState(false);
  const [modalmsg, setModalmsg] = useState("");
  const [modalvariation, setModalvariation] = useState("success");
  const [openModal, setOpenModal] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  const baseUrl = process.env.REACT_APP_URL;

  const url = `${baseUrl}/contact-us/save-contact-details`;

  const handleSubmit1 = () => {
    let fnames = true;
    if (fname.length === 0) {
      setFnamev(false);
      fnames = false;
    } else setFnamev(true);
    if (fname.length > 255) {
      setFnameM(false);
      fnames = false;
    } else setFnameM(true);
    let lnames = true;
    if (lname.length === 0) {
      setLnamev(false);
      lnames = false;
    } else setLnamev(true);
    if (lname.length > 255) {
      setLnameM(false);
      lnames = false;
    } else setLnameM(true);
    let messages = true;
    if (message.length === 0) {
      setMessagev(false);
      messages = false;
    } else setMessagev(true);
    if (message.length > 3000) {
      setMessageM(false);
      messages = false;
    } else setMessageM(true);
    if (email.length > 255) {
      setEmailM(true);
    }
    let emailValue = email;
    let emails = true;
    let schema = yup.object().shape({
      emailSchema: yup.string().email().max(255).required(),
    });
    schema
      .isValid({
        emailSchema: emailValue,
      })
      .then(function (valid) {
        setEmailv(valid);
        emails = valid;
        if (fnames && lnames && emails && messages) {
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
          console.log("sending");

          axios(config)
            .then((response) => {
              console.log(response);
              setFname("");
              setFnamev(true);
              setLname("");
              setLnamev(true);
              setEmail("");
              setEmailv(true);
              setMessage("");
              setMessagev(true);
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
      });

    if (email.length === 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailv(false);
      emails = false;
    } else setEmailv(true);
  };

  return (
    <>
      <Navbar value="contact" />
      {loginStatus && <Login setLoginStatus={setLoginStatus} />}

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
              <p
                className="title"
                style={{
                  margin: "0px",
                }}
              >
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
              <Link to="/" style={{ textDecoration: "none" }}>
                <a>Home</a>
              </Link>
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
                {!fnamev && (
                  <p style={{ color: "red" }}>Please enter the first name</p>
                )}
                {!fnameM && (
                  <p style={{ color: "red" }}>Exceeding 255 character</p>
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
                {!lnamev && (
                  <p style={{ color: "red" }}>Please enter the last name</p>
                )}
                {!lnameM && (
                  <p style={{ color: "red" }}>Exceeding 255 character</p>
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
                {!emailv && (
                  <p style={{ color: "red" }}>Please enter the email</p>
                )}
                {!emailM && (
                  <p style={{ color: "red" }}>Exceeding 255 character</p>
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
                {!messagev && (
                  <p style={{ color: "red" }}>Please enter the message</p>
                )}
                {!messageM && (
                  <p style={{ color: "red" }}>Exceeding 3000 character</p>
                )}
                <div
                  class="btn theme  m-0"
                  type="submit"
                  onClick={() => {
                    handleSubmit1();
                  }}
                >
                  SEND US MESSAGE
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
    </>
  );
};

export default ContactUsView;
