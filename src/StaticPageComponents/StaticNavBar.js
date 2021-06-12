import React, { useEffect, useState, useMediaQuery } from "react";
import image1 from "./../assets/assets1/images/logo.svg";
import Login from "../components/students/LoginPage";
import BenifactoreSignUp from "../components/benefactors/BenifactoreSignUp";
import { Link } from "react-router-dom";

const StaticNavBar = ({ value }) => {
  const x = window.matchMedia("(max-width: 999px)");

  const [cssStyle, setCssStyle] = useState(
    "navbar navbar-expand-lg navbar-dark fixed-top maxedheight"
  );
  const [loginStatus, setLoginStatus] = useState(false);
  const [benifatorStatus, setBenifatorStatus] = useState(false);

  useEffect(() => {
    if (x.matches == false) {
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
    }
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
          <Link className="navbar-brand" to="/">
            <img
              className="logo"
              src={image1}
              className="logowidth"
              alt="logo"
            />
          </Link>
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
              <li className={value == "home" ? "nav-item active" : "nav-item"}>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <a className="nav-link">Home</a>
                </Link>
              </li>
              <li className={value == "about" ? "nav-item active" : "nav-item"}>
                <Link to="/about" style={{ textDecoration: "none" }}>
                  <a className="nav-link">About Us</a>
                </Link>
              </li>

              <li
                className={
                  value == "how"
                    ? "nav-item active dropdown"
                    : "nav-item dropdown"
                }
              >
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                >
                  How It Works
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/student" style={{ textDecoration: "none" }}>
                      <a>Find a Fund</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/findscholar" style={{ textDecoration: "none" }}>
                      <a>Find a Scholar</a>
                    </Link>
                  </li>
                </ul>
              </li>
              {/* <li
                className={
                  value == "explore"
                    ? "nav-item active dropdown"
                    : "nav-item dropdown"
                }
              >
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                >
                  Explore
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      to="/explore-scholars"
                      style={{ textDecoration: "none" }}
                    >
                      <a>Student</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/explore-funds"
                      style={{ textDecoration: "none" }}
                    >
                      <a href="explore-funds">Studost</a>
                    </Link>
                  </li>
                </ul>
              </li> */}

              <li
                className={value == "contact" ? "nav-item active" : "nav-item"}
              >
                <Link to="/contactus" style={{ textDecoration: "none" }}>
                  <a className="nav-link">Contact Us</a>
                </Link>
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
    </>
  );
};

export default StaticNavBar;
