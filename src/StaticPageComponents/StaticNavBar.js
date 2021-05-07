import React, { useEffect, useState , useMediaQuery} from "react";
import image1 from "./../assets/assets1/images/logo.svg";

const StaticNavBar = () => {
//     const [logoWidth, setlogoWidth] = useState(160);
//   const matches = useMediaQuery("(min-width:600px)");

//   const [cssStyle, setCssStyle] = useState(
//     "navbar navbar-expand-lg navbar-dark fixed-top maxedheight"
//   );
//   const [loginStatus, setLoginStatus] = useState(false);
//   const [benifatorStatus, setBenifatorStatus] = useState(false);

//   useEffect(() => {
//     if (!matches) {
//       setlogoWidth(100);
//     }
//     // console.log(window.scrollY);
//     document.addEventListener("scroll", () => {
//       if (window.scrollY < 100)
//         setCssStyle(
//           "navbar navbar-expand-lg navbar-dark fixed-top maxedheight"
//         );
//       else
//         setCssStyle(
//           "navbar navbar-expand-lg navbar-dark fixed-top bg-theme maxedheight"
//         );
//     });
//   }, [window.scrollY]);

//   const changeNav = () => {
//     if (cssStyle != "navbar navbar-expand-lg navbar-dark fixed-top bg-theme") {
//       setCssStyle("navbar navbar-expand-lg navbar-dark fixed-top bg-theme");
//     } else {
//       setCssStyle(
//         "navbar navbar-expand-lg navbar-dark fixed-top bg-theme maxedheight"
//       );
//     }
//   };
    return(<>
    {/* <nav className={cssStyle}>
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
      </nav> */}
    </>);
}

export default StaticNavBar;