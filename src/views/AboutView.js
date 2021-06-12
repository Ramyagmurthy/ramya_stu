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
import StaticNavBar from "./../StaticPageComponents/StaticNavBar";
import Navbar from "../StaticPageComponents/StaticNavBar";
import manuc from "../assets/img/manuc.png";

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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (window.location.href.includes("/about#menu4")) {
      setMenu1("");
      setMenu2("active");
      setTab1("tab-pane fade");
      setTab2("tab-pane fade in active show");
    }
  }, []);

  return (
    <>
      <Navbar value="about" />
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
              <Link to="/" style={{ textDecoration: "none" }}>
                <a>Home</a>
              </Link>
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
                  factors that limit their access to higher education, and that
                  hamper their ability to succeed and achieve their full
                  potential.
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
                    <div
                      className="heading about"
                      style={{ textDecoration: "underline" }}
                    >
                      Manish Maheshwari
                    </div>
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
                    <div
                      className="heading about"
                      style={{ textDecoration: "underline" }}
                    >
                      Bindi Dharia
                    </div>
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
                    <div
                      className="heading about"
                      style={{ textDecoration: "underline" }}
                    >
                      Ahana Gautam
                    </div>
                  </div>
                  <div
                    className="col-6 col-lg-6"
                    data-toggle="modal"
                    data-target="#team2"
                  >
                    <div className="teamImg">
                      <img src={image15} />
                    </div>
                    <div
                      className="heading about"
                      style={{ textDecoration: "underline" }}
                    >
                      Lakshmi Potluri
                    </div>
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
                    <div
                      className="heading about"
                      style={{ textDecoration: "underline" }}
                    >
                      Gauri Bansal
                    </div>
                  </div>
                  <div
                    className="col-6 col-lg-6"
                    data-toggle="modal"
                    data-target="#team5"
                  >
                    <div className="teamImg">
                      <img src={image19} />
                    </div>
                    <div
                      className="heading about"
                      style={{ textDecoration: "underline" }}
                    >
                      Karun Gopinath
                    </div>
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
                    <div
                      className="heading about"
                      style={{ textDecoration: "underline" }}
                    >
                      Avantika Kolluru
                    </div>
                  </div>
                  <div
                    className="col-6 col-lg-6"
                    data-toggle="modal"
                    data-target="#team7"
                  >
                    <div className="teamImg">
                      <img src={image14} />
                    </div>
                    <div
                      className="heading about"
                      style={{ textDecoration: "underline" }}
                    >
                      Sangita Baruah
                    </div>
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
                    <div
                      className="heading about"
                      style={{ textDecoration: "underline" }}
                    >
                      Siddhant Gupta
                    </div>
                  </div>
                  <div
                    className="col-6 col-lg-6"
                    data-toggle="modal"
                    data-target="#team12"
                  >
                    <div className="teamImg">
                      <img src={team12} />
                    </div>
                    <div
                      className="heading about"
                      style={{ textDecoration: "underline" }}
                    >
                      Aanand Krishnan
                    </div>
                  </div>
                </div>
                <div className="row teams">
                  <div
                    className="col-6 col-lg-6"
                    data-toggle="modal"
                    data-target="#team13"
                  >
                    <div className="teamImg">
                      <img src={manuc} style={{ maxWidth: "70%" }} />
                    </div>
                    <div
                      className="heading about"
                      style={{ textDecoration: "underline" }}
                    >
                      Manu C
                    </div>
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
                    <b>Current job - </b>As MD of Twitter India, Manish drives
                    an integrated strategy to accelerate Twitter’s audience and
                    revenue growth in the country. India is one of the
                    fastest-growing audience markets globally for Twitter, and a
                    destination for the latest conversation on sports, news,
                    politics and entertainment.
                    <br />
                    <br />
                    <b> Association with StuDost - </b>Founder <br />
                    <br />
                    <b>Past experience - </b>Before joining Twitter, Manish was
                    the CEO of Network18 Digital, managing one of India’s
                    largest digital media conglomerates with brands such as
                    Moneycontrol, Firstpost, CNN-News18, and CNBC India. Manish
                    comes with 20 years of international experience across
                    industries at P&G (Asia-Pacific, Consumer Goods), McKinsey
                    (New York, Consulting), Intuit (San Francisco, Consumer
                    Software), and Flipkart (Bangalore, eCommerce). Manish also
                    co-founded txtWeb which became the world’s largest app store
                    for text-based apps. <br />
                    <br /> <b>Education -</b> Manish holds an MBA with honors
                    from Wharton Business School. He attributes his success to
                    the exposure he received through education and strongly
                    believes in giving back to the community by creating similar
                    opportunities for others.
                    <br /> <br />
                    <b> Hobbies/Areas of Interest - </b>He enjoys traveling,
                    cricket, movies, family time, and reading stories with his
                    daughter. He can be found at{" "}
                    <a
                      href="https://twitter.com/manishm"
                      style={{ textDecoration: "none" }}
                    >
                      @manishm
                    </a>{" "}
                    on Twitter.
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
                    <b> Current job - </b>Bindi is currently the Deputy Director
                    at the Centre for Social Impact & Philanthropy at Ashoka
                    University.
                    <br />
                    <br />
                    <b> Association with StuDost - </b>Advisor
                    <br />
                    <br />
                    <b> Past experience -</b> She has previously worked with the
                    Tata Trusts for Grant Relationships Management and with the
                    Piramal Foundation for Education Leadership as their Program
                    Director for Technology. She also has experience in the
                    space of engineering and operations with ArcelorMittal.
                    <br />
                    <br />
                    <b> Education - </b>She holds a master’s degree in
                    engineering from the University of Michigan and an MBA from
                    Harvard Business School.
                    <br />
                    <br />
                    <b> Hobbies/Areas of Interest -</b> Bindi enjoys traveling,
                    reading, puzzles and painting. Her passion in life is to try
                    and serve the nonprofit space and generate impact for the
                    ground.
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
                    <b> Current job -</b> As CEO of DCF Ventures, Lakshmi is
                    creating India’s first innovation-as-a-service platform to
                    facilitate digital-ready solutions for government,
                    corporates, and family offices leveraging her connection
                    with global start-ups and the broader innovation ecosystem
                    across US, Israel, Korea, and Germany. <br />
                    <br />
                    <b> Association with StuDost - </b>Advisor <br />
                    <br />
                    <b> Past experience -</b> Lakshmi comes with 15 years of
                    global experience where she has taken several leadership
                    roles in finance, technology, e-commerce, and digital media
                    at IBM (US/Canada/Europe/Latin America), Goldman Sachs (Hong
                    Kong), Network18 (India), and Shopify (India). Earlier, she
                    co-founded Jabong.com, a leading fashion e-commerce site,
                    which was acquired by Myntra. <br />
                    <br />
                    <b> Education - </b>Lakshmi holds an MBA from Columbia
                    Business School, New York, and an MS in Computer Science
                    from the University of Texas. <br />
                    <br />
                    <b>Hobbies/Areas of Interest -</b> She has been a recipient
                    of many awards, a speaker at many prestigious organizations
                    such as NASSCOM, FICCI, CII, UK-IBC, Techsparks, IIMs, and
                    IITs.
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
                    <b> Current job -</b> CEO & Co-Founder at Open Secret
                    <br />
                    <br />
                    <b> Association with StuDost -</b> Advisor
                    <br />
                    <br />
                    <b> Past experience -</b> Ahana is an experienced marketer
                    with a passion to build and grow the biggest consumer brands
                    in India. Ahana comes with global experience across multiple
                    functions at P&G and General Mills - from running
                    multi-million dollar businesses (P&L) to launching health
                    and wellness brands.
                    <br />
                    <br />
                    <b> Education -</b> She has a B.Tech from IIT Bombay and an
                    MBA from Harvard Business School.
                    <br />
                    <br />
                    <b> Hobbies/Areas of Interest -</b> Growing up in a small
                    city in Rajasthan, she was always driven by living a life of
                    purpose. Post HBS, when she was working in the US, she asked
                    herself this question: "What do I want to do with this one
                    wild and precious life?" The answer was clear - "It was her
                    turn to create a meaningful difference in the world". With
                    that mission, she decided to come back to India to create a
                    dent in the snacking landscape. She can be found at
                    <a
                      href="https://twitter.com/GautamAhana"
                      style={{ textDecoration: "none" }}
                    >
                      @GautamAhana
                    </a>{" "}
                    on Twitter.
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
                    <b> Current job - </b>As a consultant to Texas-based JMJ
                    Associates, Karun delivers behaviour-based, safety
                    transformation programs for large oil and gas projects in
                    India and the Middle East.
                    <br />
                    <br />
                    <b> Association with StuDost - </b>Education Domain Expert
                    <br />
                    <br />
                    <b> Past experience -</b> Since his return to India, he has
                    established The Collective Consciousness; an early stage
                    nonprofit addressing various systemic challenges and
                    leveraging technology to advance basic human rights. He
                    previously led a comprehensive school transformation program
                    working with more than 37 schools and 7,200 children in
                    Bangalore. Karun also leads Program Design and Strategic
                    Partnerships at Citizens for Leadership, a nonpartisan,
                    youth leadership public policy Fellowship.
                    <br />
                    <br />
                    <b> Education - </b>Karun Gopinath is a recent graduate in
                    Development Studies from the Graduate Institute, Geneva.
                    <br />
                    <br />
                    <b> Hobbies/Areas of Interest - </b> Karun leads Program
                    Design and Strategic Partnerships at Citizens for
                    Leadership, a nonpartisan, youth leadership public policy
                    Fellowship.
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
                    <b> Current job - </b>She currently drives strategic
                    initiatives to grow Twitter’s audience and revenue in India,
                    as part of the Managing Director’s Office.
                    <br />
                    <br />
                    <b> Association with StuDost - </b>Product Strategy
                    <br />
                    <br />
                    <b> Past experience - </b>Prior to this, she was a business
                    and policy consultant at 9.9 Insights - India Partner of the
                    Albright Stonebridge Group. She worked with multinational
                    clients across technology, renewable energy, and civil
                    society to help them enter in new markets, leverage
                    opportunities, mitigate risks, and engage with the
                    government in India. Driven by her passion for education,
                    she has contributed to organisations like Teach for India,
                    Central Square Foundation, and Child Rights and You. She is
                    keen to advance the role technology plays in emerging
                    economies and bridge the digital divide.
                    <br />
                    <br />
                    <b> Education - </b>She is a student of liberal arts and
                    graduated cum laude with a major in history and
                    international relations from Ashoka University.
                    <br />
                    <br />
                    <b> Hobbies/Areas of Interest -</b> Gauri is a trained
                    dancer and enjoys history, film, and culture.
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
                    <b> Association with StuDost - </b>As Partnerships and
                    Community Manager at StuDost, Avantika identifies and works
                    with diverse communities of students and benefactors. By
                    connecting students with the right benefactors, she hopes to
                    help them meet their financial needs and further their
                    career goals.
                    <br />
                    <br />
                    <b> Past experience -</b> She has previously worked as an
                    educational counsellor and has experience providing hands-on
                    guidance to students.
                    <br />
                    <br />
                    <b> Education - </b>Graduate of Economics and International
                    Relations from Ashoka University.
                    <br />
                    <br />
                    <b> Hobbies/Areas of Interest - </b>Avantika is also
                    passionate about music and enjoys writing, cooking and
                    watching documentaries in her free time.
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
                    <b> Association with StuDost - </b>Content and Social Media
                    Manager
                    <br />
                    <br />
                    <b> Past experience - </b>Prior to joining Studost, she has
                    worked as a Fashion Writer, Beauty/Culture/Lifestyle Editor
                    and Content Lead for organizations like POPxo, Culture91,
                    Assam Times, Everymedia and celebrity fashion house Mojostar
                    (JUSTF with Jacqueline Fernandez and PROWL with Tiger
                    Shroff).
                    <br />
                    <br />
                    <b> Education -</b> She holds a Masters (Merit) in Fashion
                    Design Management from London College of Fashion, University
                    of the Arts London, a specialization in Fashion
                    Communication from University of the Arts London, a Post
                    Graduate Diploma in Fashion Entrepreneurship from National
                    Institute of Fashion Technology, and a Bachelor of Arts (H)
                    in English Literature (Silver Medalist) from Amity
                    University.
                    <br />
                    <br />
                    <b> Hobbies/Areas of Interest -</b> She has an inherent
                    interest in Literature, Fashion, Travel and the Creative
                    Arts. She is also a trained Bharatnatyam dancer.
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
                    <b> Current job -</b> As Lead, Strategy and Operations at an
                    early stage startup in Bengaluru, he is continuing to create
                    impact and helping disrupt B2B services in the manufacturing
                    sector.
                    <br />
                    <br />
                    <b> Association with StuDost -</b> Business Strategy
                    <br />
                    <br />
                    <b> Past experience - </b>Siddhant Gupta’s 5+ years of
                    experience in management consulting and start-ups have given
                    him deep exposure to both strategy and execution across
                    sectors including tech, real estate, energy and
                    infrastructure. He has worked in client-facing roles at
                    Auctus Advisors, McKinsey and Unbxd.
                    <br />
                    <br />
                    <b> Education - </b>He has an MBA from IIM Calcutta and a B.
                    Tech from IIT Roorkee where he received the award for
                    outstanding performance in academics and extracurriculars in
                    his branch.
                    <br />
                    <br />
                    <b> Hobbies/Areas of Interest -</b> He is a state-level
                    champion in squash and has collaborated closely with Nobel
                    laureate Kailash Satyarthi, supporting his drive against
                    child labour. In his spare time, Siddhant enjoys world
                    building for his upcoming fantasy novel.
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
                    <b> Current job -</b> Product Management Intern at Juspay
                    <br />
                    <br />
                    <b> Association with StuDost -</b> Product and Strategy
                    intern with Studost.
                    <br />
                    <br />
                    <b> Past experience - </b>Aanand has 4.5 years of work
                    experience in operations, product management and marketing.
                    He has worked with Goldman Sachs and a social impact
                    start-up called Inkludo. Under Inkludo, he helped two social
                    impact start-ups which aided the deaf community to
                    communicate with the hearing and get education. He also
                    launched a social enterprise to teach sign language to
                    hearing people, in order to build an inclusive culture.
                    <br />
                    <br />
                    <b> Education -</b> MBA from Masters' Union.
                    <br />
                    <br />
                    <b> Hobbies/Areas of Interest -</b> Apart from engaging with
                    the social sector, he also enjoys trekking in The Himalayas,
                    noodling with musical instruments such as guitar, ukulele
                    and playing sports.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="team13"
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
                    <img src={manuc} />
                  </div>
                  <div className="heading team about">Manu C</div>
                  <div className="text team p-0">
                    Partnerships and Community Manager
                  </div>
                  <div className="socialIcon">
                    <a
                      href="https://www.linkedin.com/in/manuskc/"
                      target="_blank"
                    >
                      <img src={image17} width="40px" />
                    </a>{" "}
                    &nbsp;
                    {/* <a
                      href="https://www.instagram.com/aanandkrishnan04/"
                      target="_blank"
                    >
                      <img src={image18} width="40px" />
                    </a> */}
                  </div>
                </div>
                <div className="col-12 col-lg-7 mt-50">
                  <div className="text esmall">
                    <b> Current job -</b> Software Engineer at LinkedIn
                    <br />
                    <br />
                    <b> Association with StuDost -</b> He strongly believes
                    education is the single most powerful tool one can posses
                    which can positively change their life without any
                    discrimination. He believes in creating equal opportunities
                    for everyone to pursue their career aspirations.
                    <br />
                    <br />
                    <b> Past experience - </b>Manu comes with 10+ years of
                    experience in the Software industry. He has worked on early
                    stage products like txtWeb - which went on to become world's
                    largest text based app platform, he has also contributed to
                    critical end user facing highly distributed services at his
                    current workplace Linkedin. Prior to working at LinkedIn, he
                    worked at Intuit and Goldman Sachs.
                    <br />
                    <br />
                    <b> Education -</b> Manu has a Bachelor's Degree in Computer
                    Science from B.M.S.C.E Bangalore.
                    <br />
                    <br />
                    <b> Hobbies/Areas of Interest -</b> He enjoys traveling,
                    music and technology. He can be found at{" "}
                    <a
                      href="https://www.linkedin.com/in/manuskc/"
                      target="_blank"
                    >
                      @manuskc
                    </a>{" "}
                    on Twitter.{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingView;
