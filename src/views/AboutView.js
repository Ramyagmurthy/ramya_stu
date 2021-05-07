import React, { useEffect, useState } from "react";
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
import Login from "./../components/students/LoginPage";
import Bindi from "../assets/assets1/images/bindi_img.png";
import { Link } from "react-router-dom";
import team6 from "../assets/assets1/images/team6.png";
import team7 from "../assets/assets1/images/team7.png";
import team3 from "../assets/assets1/images/team3.png";
import team12 from "../assets/assets1/images/team12.png";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import StaticNavBar from "./../StaticPageComponents/StaticNavBar"

import "./../assets/assets1/css/main.css";

const LandingView = (props) => {
  const [logoWidth, setlogoWidth] = useState(160);
  const matches = useMediaQuery("(min-width:600px)");

  const [cssStyle, setCssStyle] = useState(
    "navbar navbar-expand-lg navbar-dark fixed-top maxedheight"
  );
  const [loginStatus, setLoginStatus] = useState(false);
  const [menu1, setMenu1] = useState("active");
  const [menu2, setMenu2] = useState("");
  const [tab1, setTab1] = useState("tab-pane fade in active show");
  const [tab2, setTab2] = useState("tab-pane fade");

  useEffect(() => {
    // console.log(window.scrollY);
    // console.log(props);
    if (!matches) {
      setlogoWidth(100);
    }
    if (window.location.href.includes("/about#menu4")) {
      setMenu1("");
      setMenu2("active");
      setTab1("tab-pane fade");
      setTab2("tab-pane fade in active show");
    }
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
    if (cssStyle == "navbar navbar-expand-lg navbar-dark fixed-top bg-theme") {
      setCssStyle(
        "navbar navbar-expand-lg navbar-dark fixed-top bg-theme maxedheight"
      );
    } else {
      setCssStyle("navbar navbar-expand-lg navbar-dark fixed-top bg-theme");
    }
  };

  return (
    <>
      {loginStatus && <Login setLoginStatus={setLoginStatus} />}
      <StaticNavBar/>
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
              <li className="nav-item active">
                <a className="nav-link" href="/about">About Us</a>
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
              }}
            >
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
                About us
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
              About Us
            </li>
          </ol>
        </div>
      </nav>
      {/* <!---------- END: Breadcrumbs ------------->

<!---------- START: About Us -------------> */}
      <div className="container ">
        <div className="row">
          <div className="col-12 col-lg-3">
            <ul className="nav nav-pills">
              <li>
                <a data-toggle="pill" href="#menu1" className={menu1}>
                  Vision and Mission
                </a>
              </li>
              <li>
                <a data-toggle="pill" href="#menu2">
                  Theory of Change
                </a>
              </li>
              <li>
                <a data-toggle="pill" href="#menu3">
                  Our Values
                </a>
              </li>
              <li>
                <a data-toggle="pill" href="#menu4" className={menu2}>
                  Our Team
                </a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-lg-9 border-left">
            <div className="tab-content spacingforsmall">
              <div id="menu1" className={tab1}>
                <div className="row mt-90">
                  <div className="col-12 col-lg-3">
                    <img src={image3} />
                  </div>
                  <div className="col-12 col-lg-9">
                    <div className="heading about">Vision</div>
                    <div className="text small">
                      Ensure students in India have the opportunity to gain a
                      high-quality education and achieve their full potential.
                    </div>
                  </div>
                </div>
                <div className="row mt-90">
                  <div className="col-12 col-lg-3">
                    <img src={image4} />
                  </div>
                  <div className="col-12 col-lg-9">
                    <div className="heading about">Mission</div>
                    <div className="text small">
                      Empower students to discover opportunities and improve
                      access to gain an excellent higher education by connecting
                      them with those who have had the privilege of benefitting
                      from it.
                    </div>
                  </div>
                </div>
              </div>
              <div id="menu2" className="tab-pane fade">
                <div className="text bold mt-25">
                  In our society, students are often constrained by various
                  factors that limit their access to higher education, succeed
                  and achieve their full potential.{" "}
                </div>
                <div className="text small">
                  Despite that, each student has a unique story to tell. They
                  are not just a sum of their credentials but also their
                  motivations, experiences, and aspirations.
                  <br />
                  <br />
                  We aim to enable students to share their stories and discover
                  benefactors who can support their dreams. By becoming their
                  StuDost, these benefactors select and enable bright and driven
                  students to achieve their goals and secure a high-quality
                  education by eliminating the financial constraints they face.
                  In empowering these students, they also increase the overall
                  pool of affordable and reliable funding opportunities
                  available in India.{" "}
                </div>
              </div>
              <div id="menu3" className="tab-pane fade">
                <div className="row mt-90">
                  <div className="col-12 col-lg-2">
                    <img src={image5} />
                  </div>
                  <div className="col-12 col-lg-10">
                    <div className="heading about">Integrity</div>
                    <div className="text about">
                      We will remain committed to being authentic, transparent,
                      and impartial in our service.
                    </div>
                  </div>
                </div>
                <div className="row mt-40">
                  <div className="col-12 col-lg-2">
                    <img src={image6} />
                  </div>
                  <div className="col-12 col-lg-10">
                    <div className="heading about">Innovation</div>
                    <div className="text about">
                      We want to reimagine traditional scholarship mechanisms
                      and introduce smarter ways to support and fund students in
                      lieu of the changing times. We will provide a smart,
                      efficient and technologically advanced process for
                      discovery of funds, application, and selection.
                    </div>
                  </div>
                </div>
                <div className="row mt-40">
                  <div className="col-12 col-lg-2">
                    <img src={image7} />
                  </div>
                  <div className="col-12 col-lg-10">
                    <div className="heading about">Impact-driven</div>
                    <div className="text about">
                      We will put our best effort to serve our communities and
                      drive positive and meaningful impact in the lives of
                      students and studosts.
                    </div>
                  </div>
                </div>
              </div>
              <div id="menu4" className={tab2}>
                <div className="row teams">
                  <div
                    className="col-6 col-lg-6"
                    data-toggle="modal"
                    data-target="#team1"
                  >
                    <div className="teamImg">
                      <img src={image8} />
                    </div>
                    <div className="heading about">Manish Maheshwari</div>
                    {/* <!-- <div className="text team">Partnerships and Community Manager</div> --> */}
                  </div>
                  <div
                    className="col-6 col-lg-6"
                    data-toggle="modal"
                    data-target="#team9"
                  >
                    <div className="teamImg">
                      <img src={Bindi} />
                    </div>
                    <div className="heading about">Bindi Dharia</div>
                  </div>
                </div>
                <div className="row teams">
                  <div
                    className="col-6 col-lg-6"
                    data-toggle="modal"
                    data-target="#team3"
                  >
                    <div className="teamImg">
                      <img src={image9} />
                    </div>
                    <div className="heading about">Ahana Gautam</div>
                  </div>
                  <div
                    className="col-6 col-lg-6"
                    data-toggle="modal"
                    data-target="#team2"
                  >
                    <div className="teamImg">
                      <img src={image15} />
                    </div>
                    <div className="heading about">Lakshmi Potluri</div>
                  </div>
                </div>
                <div className="row teams">
                  <div
                    className="col-6 col-lg-6"
                    data-toggle="modal"
                    data-target="#team4"
                  >
                    <div className="teamImg">
                      <img src={image11} />
                    </div>
                    <div className="heading about">Gauri Bansal</div>
                  </div>
                  <div
                    className="col-6 col-lg-6"
                    data-toggle="modal"
                    data-target="#team5"
                  >
                    <div className="teamImg">
                      <img src={image19} />
                    </div>
                    <div className="heading about">Karun Gopinath</div>
                  </div>
                </div>
                <div className="row teams">
                  <div
                    className="col-6 col-lg-6"
                    data-toggle="modal"
                    data-target="#team6"
                  >
                    <div className="teamImg">
                      <img src={image13} />
                    </div>
                    <div className="heading about">Avantika Kolluru</div>
                  </div>
                  <div
                    className="col-6 col-lg-6"
                    data-toggle="modal"
                    data-target="#team7"
                  >
                    <div className="teamImg">
                      <img src={image14} />
                    </div>
                    <div className="heading about">Sangita Baruah</div>
                  </div>
                </div>
                <div className="row teams">
                  <div
                    className="col-6 col-lg-6"
                    data-toggle="modal"
                    data-target="#team8"
                  >
                    <div className="teamImg">
                      <img src={image10} />
                    </div>
                    <div className="heading about">Siddhant Gupta</div>
                  </div>
                  <div
                    className="col-6 col-lg-6"
                    data-toggle="modal"
                    data-target="#team12"
                  >
                    <div className="teamImg">
                      <img src={team12} />
                    </div>
                    <div className="heading about">Aanand Krishnan</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="team1"
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
                <div className="col-6 col-lg-5 mt-50 teamImagesmallbox">
                  <div className="teamImg">
                    <img src={image8} />
                  </div>
                  <div className="heading team about">Manish Maheshwari</div>
                  <div className="text team p-0">
                    Partnerships and Community Manager
                  </div>
                  <div className="socialIcon">
                    <a href="https://twitter.com/manishm" target="_blank">
                      <img src={image16} width="40px" />
                    </a>{" "}
                    &nbsp;
                    <a
                      href="https://www.linkedin.com/in/manishm345/"
                      target="_blank"
                    >
                      <img src={image17} width="40px" />
                    </a>
                  </div>
                </div>
                <div className="col-12 col-lg-7 mt-50">
                  <div className="text esmall">
                    As MD of Twitter India, Manish drives an integrated strategy
                    to accelerate Twitter’s audience and revenue growth in the
                    country. India is one of the fastest-growing audience
                    markets globally for Twitter, and a destination for the
                    latest conversation on sports, news, politics and
                    entertainment. <br />
                    <br />
                    Before joining Twitter, Manish was the CEO of Network18
                    Digital, managing one of India’s largest digital media
                    conglomerates with brands such as Moneycontrol, Firstpost,
                    CNN-News18, and CNBC India with over 100 million monthly
                    active users (MAUs). <br />
                    <br />
                    Manish comes with 20 years of international experience
                    across industries at P&G (Asia-Pacific, Consumer Goods),
                    McKinsey (New York, Consulting), Intuit (San Francisco,
                    Consumer Software), and Flipkart (Bangalore, eCommerce).
                    Manish also co-founded txtWeb which became the world’s
                    largest app store for text-based apps.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="team9"
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
                <div className="col-6 col-lg-5 mt-50">
                  <div className="teamImg">
                    <img src={Bindi} />
                  </div>
                  <div className="heading team about">Bindi Dharia</div>
                  <div className="text team p-0">
                    Partnerships and Community Manager
                  </div>
                  <div className="socialIcon">
                    <a href="https://twitter.com/bdharia" target="_blank">
                      <img src={image16} width="40px" />
                    </a>{" "}
                    &nbsp;
                    <a
                      href="https://www.linkedin.com/in/bindidharia/"
                      target="_blank"
                    >
                      <img src={image17} width="40px" />
                    </a>
                  </div>
                </div>
                <div className="col-12 col-lg-7 mt-50">
                  <div className="text esmall">
                    Bindi is currently the Deputy Director at the Centre for
                    Social Impact & Philanthropy at Ashoka University. She has
                    previously worked with the Tata Trusts for Grant
                    Relationships Management and with the Piramal Foundation for
                    Education Leadership as their Program Director for
                    Technology.
                    <br />
                    <br />
                    She holds a master’s degree in engineering from the
                    University of Michigan and an MBA from Harvard Business
                    School. Her earlier experience is in the space of
                    engineering and operations with ArcelorMittal. <br />
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="team2"
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
                <div className="col-6 col-lg-5 mt-50 teamImagesmallbox">
                  <div className="teamImg">
                    <img src={image15} />
                  </div>
                  <div className="heading team about">Lakshmi Potluri</div>
                  <div className="text team p-0">
                    Partnerships and Community Manager
                  </div>
                  <div className="socialIcon">
                    <a
                      href="https://twitter.com/lakshmipotluri5"
                      target="_blank"
                    >
                      <img src={image16} width="40px" />
                    </a>{" "}
                    &nbsp;
                    <a
                      href="https://www.linkedin.com/in/lakshmipotluri/"
                      target="_blank"
                    >
                      <img src={image17} width="40px" />
                    </a>{" "}
                    &nbsp;
                    <a
                      href="https://www.instagram.com/jothipotluri"
                      target="_blank"
                    >
                      <img src={image18} width="40px" />
                    </a>
                  </div>
                </div>
                <div className="col-12 col-lg-7 mt-50">
                  <div className="text esmall">
                    As CEO of DCF Ventures, Lakshmi is creating India’s first
                    innovation-as-a-service platform to facilitate digital-ready
                    solutions for government, corporates, and family offices
                    leveraging her connection with global start-ups and the
                    broader innovation ecosystem across US, Israel, Korea, and
                    Germany. Earlier, she co-founded Jabong.com, a leading
                    fashion e-commerce site, which was acquired by Myntra.
                    <br />
                    <br />
                    Lakshmi comes with 15 years of global experience where she
                    has taken several leadership roles in finance, technology,
                    e-commerce, and digital media at IBM (US/Canada/Europe/Latin
                    America), Goldman Sachs (Hong Kong), Network18 (India), and
                    Shopify (India).
                    <br />
                    <br />
                    Lakshmi holds an MBA from Columbia Business School, New
                    York, and an MS in Computer Science from the University of
                    Texas. She has been a recipient of many awards, a speaker at
                    many prestigious organizations such as NASSCOM, FICCI, CII,
                    UK-IBC, Techsparks, IIMs, and IITs.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="team3"
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
                <div className="col-6 col-lg-5 mt-50 teamImagesmallbox">
                  <div className="teamImg">
                    <img src={image9} />
                  </div>
                  <div className="heading team about">Ahana Gautam</div>
                  <div className="text team p-0">
                    Partnerships and Community Manager
                  </div>
                  <div className="socialIcon">
                    <a href="https://twitter.com/GautamAhana" target="_blank">
                      <img src={image16} width="40px" />
                    </a>{" "}
                    &nbsp;
                    <a
                      href="https://www.linkedin.com/in/ahanagautam/"
                      target="_blank"
                    >
                      <img src={image17} width="40px" />
                    </a>{" "}
                    &nbsp;
                    <a
                      href="https://www.instagram.com/ahanagautam"
                      target="_blank"
                    >
                      <img src={image18} width="40px" />
                    </a>
                  </div>
                </div>
                <div className="col-12 col-lg-7 mt-50">
                  <div className="text esmall">
                    Ahana Gautam, CEO & Co-Founder at Open Secret, is an
                    experienced marketer with a passion to build and grow the
                    biggest consumer brands in India. She is currently building
                    Open Secret with a mission to make every Indian family snack
                    better.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="team5"
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
                <div className="col-6 col-lg-5 mt-50">
                  <div className="teamImg">
                    <img src={image19} />
                  </div>
                  <div className="heading team about">Karun Gopinath</div>
                  <div className="text team p-0">
                    Partnerships and Community Manager
                  </div>
                  <div className="socialIcon">
                    <a href="https://twitter.com/Kargoth" target="_blank">
                      <img src={image16} width="40px" />
                    </a>{" "}
                    &nbsp;
                    <a
                      href="https://www.linkedin.com/in/karungopinath/"
                      target="_blank"
                    >
                      <img src={image17} width="40px" />
                    </a>
                  </div>
                </div>
                <div className="col-12 col-lg-7 mt-50">
                  <div className="text esmall">
                    Karun Gopinath is a recent graduate in Development Studies
                    from the Graduate Institute, Geneva. Since his return to
                    India, he has established The Collective Consciousness; an
                    early stage nonprofit addressing various systemic challenges
                    and leveraging technology to advance basic human rights. He
                    previously led a comprehensive school transformation program
                    working with more than 37 schools and 7,200 children in
                    Bangalore.
                    <br />
                    <br />
                    Karun also leads Program Design and Strategic Partnerships
                    at Citizens for Leadership, a nonpartisan, youth leadership
                    public policy Fellowship. As a consultant to Texas-based JMJ
                    Associates, Karun delivers behaviour-based, safety
                    transformation programs for large oil and gas projects in
                    India and the Middle East.
                    <br />
                    <br />
                    Karun is a Masters in Political Science from the Masters
                    Christian College, a PG-Diploma in Journalism from the Asian
                    College of Journalism and a Bachelor in Commerce from
                    St.Joseph's College of Commerce.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="team4"
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
                <div className="col-6 col-lg-5 mt-50">
                  <div className="teamImg">
                    <img src={image11} />
                  </div>
                  <div className="heading team about">Gauri Bansal </div>
                  <div className="text team p-0">
                    Product and Strategy Lead{" "}
                  </div>
                  <div className="socialIcon">
                    <a href="https://twitter.com/gaurib_" target="_blank">
                      <img src={image16} width="40px" />
                    </a>{" "}
                    &nbsp;
                    <a
                      href="https://www.linkedin.com/in/gauribansal1/"
                      target="_blank"
                    >
                      <img src={image17} width="40px" />
                    </a>{" "}
                    &nbsp;
                  </div>
                </div>
                <div className="col-12 col-lg-7 mt-50">
                  <div className="text esmall">
                    Gauri is a part of the founding team at Studost. <br />
                    <br />
                    She currently drives strategic initiatives to grow Twitter’s
                    audience and revenue in India, as part of the Managing
                    Director’s Office. <br />
                    <br />
                    Prior to this, she was a business and policy consultant at
                    9.9 Insights - India Partner of the Albright Stonebridge
                    Group. She worked with multinational clients across
                    technology, renewable energy, and civil society to help them
                    enter new markets, leverage opportunities, mitigate risks,
                    and engage with the government in India.
                    <br />
                    <br />
                    Driven by her passion for education, she has contributed to
                    organisations like Teach for India, Central Square
                    Foundation, and Child Rights and You. She is keen to advance
                    the role technology plays in emerging economies and bridge
                    the digital divide. <br />
                    <br />
                    She is a student of liberal arts and graduated cum laude
                    with a major in history and international relations from
                    Ashoka University. Gauri is a trained dancer and is always
                    eager to talk history, film, and culture.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="team6"
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
                <div className="col-6 col-lg-5 mt-50">
                  <div className="teamImg">
                    <img src={team6} />
                  </div>
                  <div className="heading team about">Avantika Kolluru</div>
                  <div className="text team p-0">
                    Partnerships and Community Manager
                  </div>
                  <div className="socialIcon">
                    <a href="https://twitter.com/avantikak97" target="_blank">
                      <img src={image16} width="40px" />
                    </a>{" "}
                    &nbsp;
                    <a
                      href="https://www.linkedin.com/in/avantikakolluru/"
                      target="_blank"
                    >
                      <img src={image17} width="40px" />
                    </a>
                  </div>
                </div>
                <div className="col-12 col-lg-7 mt-50">
                  <div className="text esmall">
                    As Partnerships and Community Manager at StuDost, Avantika
                    identifies and works with diverse communities of students
                    and benefactors. By connecting students with the right
                    benefactors, she hopes to help them meet their financial
                    needs and further their career goals. <br />
                    <br />
                    She has previously worked as an educational counsellor and
                    has experience providing hands-on guidance to students. As a
                    graduate of Economics and International Relations from
                    Ashoka University, she is also interested in designing
                    sustainable solutions for social impact. <br />
                    <br />
                    Avantika is also passionate about music and enjoys writing,
                    cooking and watching documentaries in her free time.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="team7"
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
                <div className="col-6 col-lg-5 mt-50">
                  <div className="teamImg">
                    <img src={team7} />
                  </div>
                  <div className="heading team about">Sangita Baruah</div>
                  <div className="text team p-0">
                    Content and Social Media Manager
                  </div>
                  <div className="socialIcon">
                    {/* <!-- <a href="https://twitter.com/aaaaaaaa" target="_blank"><img src={image16} width="40px" /></a> -->
					<!-- <a href="#" target="_blank"><img src={image17}" width="40px" /></a> -->				 */}
                  </div>
                </div>
                <div className="col-12 col-lg-7 mt-50">
                  <div className="text esmall">
                    Sangita is a graduate in Fashion Management from London
                    College of Fashion, University of the Arts London. Prior to
                    joining Studost, she has worked as a Fashion Writer,
                    Culture/Lifestyle Editor and Content Manager for
                    organizations like POPxo, Culture91, Everymedia and Mojostar
                    (JUSTF with Jacqueline Fernandez, PROWL with Tiger Shroff).{" "}
                    <br />
                    <br />
                    She has an inherent interest in Literature, Fashion, Travel
                    and the Creative Arts, and is a trained Bharatnatyam and
                    dancer. She specializes in Fashion, Creative Writing and
                    Communications. In her free time, you're most likely to find
                    her sipping on a Mimosa somewhere on Earth and getting lost
                    in the streets of Champs Elysees, Oxford Circus and Regent
                    Street! She idolizes Diana Vreeland and Audrey Hepburn.{" "}
                    <br />
                    <br />
                    Sangita holds a Master of Arts (Merit) in Fashion Design
                    Management from London College of Fashion, University of the
                    Arts London, a specialization in Communications from
                    University of the Arts London, a Post Graduate Diploma in
                    Fashion Entrepreneurship from National Institute of Fashion
                    Technology, and a Bachelor of Arts (H) in Literature (Silver
                    Medalist) from Amity University.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="team8"
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
                <div className="col-6 col-lg-5 mt-50">
                  <div className="teamImg">
                    <img src={team3} />
                  </div>
                  <div className="heading team about">Siddhant Gupta</div>
                  <div className="text team p-0">
                    Partnerships and Community Manager
                  </div>
                  <div className="socialIcon">
                    <a
                      href="https://www.linkedin.com/in/siddhantgupta23/"
                      target="_blank"
                    >
                      <img src={image17} width="40px" />
                    </a>
                  </div>
                </div>
                <div className="col-12 col-lg-7 mt-50">
                  <div className="text esmall">
                    Siddhant Gupta’s 5+ years of experience in management
                    consulting and start-ups have given him deep exposure to
                    both strategy and execution across sectors including tech,
                    real estate, energy and infrastructure. <br />
                    <br />
                    He has worked in client facing roles at Auctus Advisors,
                    McKinsey and Unbxd. Now, as Lead, Strategy and Operations at
                    an early stage startup in Bengaluru, he is continuing to
                    create impact and helping disrupt B2B services in the
                    manufacturing sector. <br />
                    <br />
                    He has an MBA from IIM Calcutta and a B. Tech from IIT
                    Roorkee where he received the award for outstanding
                    performance in academics and extracurriculars in his branch.
                    He is a state-level champion in squash and has collaborated
                    closely with Nobel laureate Kailash Satyarthi, supporting
                    his drive against child labour. In his spare time, Siddhant
                    enjoys world building for his upcoming fantasy novel.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="team12"
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
                <div className="col-6 col-lg-5 mt-50">
                  <div className="teamImg">
                    <img src={team12} />
                  </div>
                  <div className="heading team about">Aanand Krishnan</div>
                  <div className="text team p-0">
                    Partnerships and Community Manager
                  </div>
                  <div className="socialIcon">
                    <a
                      href="https://www.linkedin.com/in/aanandkrishnan04"
                      target="_blank"
                    >
                      <img src={image17} width="40px" />
                    </a>{" "}
                    &nbsp;
                    <a
                      href="https://www.instagram.com/aanandkrishnan04/"
                      target="_blank"
                    >
                      <img src={image18} width="40px" />
                    </a>
                  </div>
                </div>
                <div className="col-12 col-lg-7 mt-50">
                  <div className="text esmall">
                    Aanand has 4.5 years of work experience in operations,
                    product management and marketing. He has worked with Goldman
                    Sachs and a social impact start-up called Inkludo. Under
                    Inkludo, he helped two social impact start-ups which aided
                    the deaf community to communicate with the hearing and get
                    education. He also launched a social enterprise to teach
                    sign language to hearing people, in order to build an
                    inclusive culture. Currently, alongside his MBA from
                    Masters’, Aanand is working as a Product and Strategy intern
                    with Studost. <br />
                    <br />
                    Apart from engaging with the social sector, he also enjoys
                    trekking in The Himalayas, noodling with musical instruments
                    such as guitar, ukulele and playing sports.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LandingView;
