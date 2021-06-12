import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../../assets/assets1/images/logo.svg";
import image1 from "../../assets/assets1/images/social1.svg";
import image2 from "../../assets/assets1/images/social2.svg";
import image3 from "../../assets/assets1/images/social3.svg";
import image4 from "../../assets/assets1/images/Phone.svg";
import image5 from "../../assets/assets1/images/mail.svg";
import image6 from "../../assets/assets1/images/social4.svg";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},
}));
function Footer() {
  const classes = useStyles();
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-4 tagline">
            <div className="row">
              <div className="col-12 col-lg-12">
                <Link to="/" style={{ textDecoration: "none" }}>
                  <a>
                    <img className="icon" src={Logo} width="150" />
                  </a>
                </Link>
              </div>
              <div className="col-12 col-lg-8 social-links">
                <a href="https://www.facebook.com/StudostOrg" target="_blank">
                  <img src={image1} width="40px" />
                </a>
                <a href="https://twitter.com/StudostOrg" target="_blank">
                  <img src={image2} width="40px" />
                </a>
                <a
                  href="https://www.linkedin.com/company/studost/"
                  target="_blank"
                >
                  <img src={image3} width="40px" />
                </a>
                {/* <a href="#" target="_blank">
                  <img src={image6} />
                </a> */}
              </div>
            </div>
          </div>
          <div className="col-6 col-lg-3 links">
            <p>Overview</p>
            <Link to="/" style={{ textDecoration: "none" }}>
              Home
            </Link>
            <Link to="/about" style={{ textDecoration: "none" }}>
              About Us
            </Link>
            <Link to="/about#menu4" style={{ textDecoration: "none" }}>
              Our Team
            </Link>
            <Link to="/contactus" style={{ textDecoration: "none" }}>
              Contact Us
            </Link>
          </div>
          <div className="col-6 col-lg-3 links p-0">
            <p> How it Works</p>
            <Link to="/student" style={{ textDecoration: "none" }}>
              Find a Fund
            </Link>
            <Link to="/findscholar" style={{ textDecoration: "none" }}>
              Find a Scholar
            </Link>
          </div>
          <div className="col-12 col-lg-2 links p-0 footer-contact">
            <p>Contact</p>
            <a href="tel:+919717688800" target="_blank">
              <img src={image4} />
              &nbsp; 97176 88800
            </a>

            <a href="mailto:contact@studost.org" target="_blank">
              <img src={image5} />
              &nbsp; contact@studost.org
            </a>
          </div>
        </div>
      </div>
      <div className="dark">© 2021 All Rights Reserved</div>
    </div>
  );
}
export default Footer;
