// import React, { useState, useContext, useEffect } from "react";
// import { makeStyles, withStyles } from "@material-ui/core/styles";
// import { AppBar, Typography } from "@material-ui/core";
// import Boy from "../assets/img/events-bg.jpeg";
// import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
// import ExploreIcon from "@material-ui/icons/Explore";
// import RateReviewIcon from "@material-ui/icons/RateReview";
// // import { Swiper, SwiperSlide } from 'swiper/react';
// import Card from "@material-ui/core/Card";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
// import CarouselSlide from "../components/comps/CarouselSlide";
// import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
// import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
// import Slide from "@material-ui/core/Slide";
// // import Footer from "./Footer";
// import LandingView from "./LandingView";
// // import FourthBanner from "./FourthBanner";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: "#fff",
//     width: "100%",
//     // display: "flex",
//     // flexDirection: "column",
//     // justifyContent: "space-evenly",
//     // marginLeft: "auto",
//     // marginRight: "auto",
//   },
//   appbar: {
//     background: "none",
//   },
//   bar: {
//     width: "57px",
//     height: "4px",
//     backgroundColor: "#ffc600",
//     margin: "19px 0 0 110px",
//   },
//   aboutTitle: {
//     width: "143px",
//     height: "28px",
//     margin: "112px 240px 0px 110px",
//     fontFamily: "Poppins",
//     fontSize: "20px",
//     fontWeight: "500",
//     fontStretch: "normal",
//     fontStyle: "normal",
//     lineHeight: "1.5",
//     letterSpacing: "normal",
//     textAlign: "left",
//     color: "#07294d",
//   },
//   std_pwr_talent: {
//     width: "334px",
//     height: "122px",
//     margin: "90px 0 0 110px",
//     fontFamily: "Poppins",
//     fontSize: "42px",
//     fontWeight: "normal",
//     fontStretch: "normal",
//     fontStyle: "normal",
//     lineHeight: " 1.5",
//     letterSpacing: "normal",
//     textAlign: "left",
//     color: "#23252a",
//   },
//   about_explain: {
//     width: "383px",
//     height: " 185px",
//     margin: "27px 0 0 110px",
//     fontFamily: "Poppins",
//     fontSize: "18px",
//     fontWeight: "300",
//     fontStretch: "normal",
//     fontStyle: "normal",
//     lineHeight: "1.5",
//     letterSpacing: "normal",
//     textAlign: "left",
//     color: "#23252a",
//   },
//   events_bg_mg: {
//     width: "440.1px",
//     height: "600px",
//     objectFit: "contain",
//     margin: "39px 0 0 10px",
//     position: "relative",
//   },
//   subHead: {
//     display: "flex",
//     width: "100%",
//   },
//   card: {
//     background: "#fff",
//     borderRadius: "2px",
//     display: "inline-block",
//     height: "331px",
//     margin: "226px 97px 0 821px ",
//     position: "absolute",
//     width: "457px",
//     boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
//     opacity: "0.96",
//   },
//   cardContent: {
//     display: "flex",
//     flexDirection: "column",
//     margin: "32px 29px 34px 33px",
//   },

//   cardPoints: {
//     width: "359px",
//     height: "28px",
//     margin: "2.4px 0 39px 11.7px",
//     fontFamily: "Poppins",
//     fontSize: "20px",
//     fontWeight: "300",
//     fontStretch: "normal",
//     fontStyle: "normal",
//     lineHeight: "1.5",
//     letterSpacing: "normal",
//     textAlign: "left",
//     color: " #23252a",
//   },
//   button: {
//     width: "390px",
//     height: "65px",
//     margin: "6px 2px 0",
//     padding: "17px 0px 17px 0px",
//     opacity: "0.96",
//     borderRadius: "6px",
//     boxShadow: "0 3px 12px 0 rgba(0, 0, 0, 0.16)",
//     backgroundColor: "#f9c705",
//     display: "flex",
//     justifyContent: "center",
//   },
//   submitTitle: {
//     width: "390px",
//     height: " 31px",
//     fontFamily: "Poppins",
//     fontSize: "22px",
//     fontWeight: "500",
//     fontStretch: "normal",
//     fontStyle: "normal",
//     lineHeight: "1.5",
//     letterSpacing: "normal",
//     textAlign: "left",
//     color: "#575757",
//     margin: "0 10px",
//     textAlign: "center",
//   },
//   testimony: {
//     width: "100%",
//     height: "768px",
//     margin: "50px 1px 5px 0",
//     padding: "77px 250px 148px 251px",
//     backgroundColor: "#f8fcff",
//   },
//   testTitle: {
//     width: "545px",
//     height: "59px",
//     margin: "0px 160px 59px 220px",
//     fontFamily: "Poppins",
//     fontSize: "42px",
//     fontWeight: "normal",
//     fontStretch: "normal",
//     fontStyle: "normal",
//     lineHeight: "1.5",
//     letterSpacing: "normal",
//     textAlign: "left",
//     color: "#23252a",
//   },
//   svg: {
//     height: "30px",
//     cursor: "pointer",
//   },
//   slider: {
//     textAlign: "center",
//     padding: "100px",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: "-100px",
//   },
//   head: {
//     width: "100%",
//   },
//   fullbody: {
//     maxWidth: "1366px",
//     marginRight: "auto",
//     marginLeft: "auto",
//   },
//   yellowButton: {
//     width: "859px",
//     height: "65px",
//     margin: "-100px 90px 10px -5px",
//     padding: "17px 362px 17px 363px",
//     opacity: "0.96",
//     borderRadius: "6px",
//     boxShadow: "0 3px 12px 0 rgba(0, 0, 0, 0.16)",
//     backgroundColor: "#f9c705",
//   },
//   learnMore: {
//     width: "150px",
//     height: "31px",
//     fontFamily: "Poppins",
//     fontSize: "22px",
//     fontWeight: "500",
//     fontStretch: "normal",
//     fontStyle: "normal",
//     lineHeight: "1.5",
//     letterSpacing: "normal",
//     textAlign: "left",
//     color: "#575757",
//   },
// }));

// const StyledMonetizationOnIcon = withStyles({
//   root: {
//     color: "#50a05c",
//   },
// })(MonetizationOnIcon);

// const StyledExploreIcon = withStyles({
//   root: {
//     color: "#50a05c",
//   },
// })(ExploreIcon);

// const StyledRateReviewIcon = withStyles({
//   root: {
//     color: "#50a05c",
//   },
// })(RateReviewIcon);

// export default function Homepage() {
//   const classes = useStyles();
//   const SLIDE_INFO = [
//     {
//       backgroundColor: "#ff7c7c",
//       title: "Slide 1",
//       image_url: "https://unsplash.com/photos/ROJFuWCsfmA",
//     },
//     { backgroundColor: "#ffb6b9", title: "Slide 2" },
//     { backgroundColor: "#8deaff", title: "Slide 3" },
//     { backgroundColor: "#ffe084", title: "Slide 4" },
//     { backgroundColor: "#d9d9d9", title: "Slide 5" },
//   ];

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.keyCode === 39) {
//         onArrowClick("right");
//       }
//       if (e.keyCode === 37) {
//         onArrowClick("left");
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   });

//   const [index, setIndex] = useState(0);
//   const [slideIn, setSlideIn] = useState(true);
//   const [slideDirection, setSlideDirection] = useState("down");

//   const content = SLIDE_INFO[index];
//   const numSlides = SLIDE_INFO.length;

//   function Arrow(props) {
//     const { direction, clickFunction } = props;
//     const icon =
//       direction === "left" ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />;

//     return <div onClick={clickFunction}>{icon}</div>;
//   }

//   const onArrowClick = (direction) => {
//     const increment = direction === "left" ? -1 : 1;
//     const newIndex = (index + increment + numSlides) % numSlides;

//     const oppDirection = direction === "left" ? "right" : "left";
//     setSlideDirection(direction);
//     setSlideIn(false);

//     setTimeout(() => {
//       setIndex(newIndex);
//       setSlideDirection(oppDirection);
//       setSlideIn(true);
//     }, 500);
//   };

//   return (
//     <>
//       <LandingView />
//     </>
//     // <div className={classes.root}>
//     //   {/* <LandingView /> */}
//     //   <div className={classes.fullbody}>
//     //     <div className={classes.head}>
//     //       <div className={classes.subHead}>
//     //         <div
//     //           style={{
//     //             display: "flex",
//     //             flexDirection: "column",
//     //           }}
//     //         >
//     //           <div className={classes.aboutTitle}>About Studost</div>
//     //           <div className={classes.bar}></div>
//     //           <div className={classes.std_pwr_talent}>
//     //             <div>
//     //               <span>Studost</span>
//     //             </div>
//     //             <div>
//     //               <span>Powering Talent</span>
//     //             </div>
//     //           </div>
//     //           <div className={classes.about_explain}>
//     //             Studost partners with more than 200 Studost making it gateway to
//     //             affording education and enabling talent to achieve its dream.
//     //             Studost provide unique platform for enabling student to apply
//     //             for scholarships
//     //           </div>
//     //         </div>
//     //         <div className={classes.events_bg_mg}>
//     //           <img src={Boy} className={classes.events_bg_mg} />
//     //         </div>
//     //         <div className={classes.card}>
//     //           <div className={classes.cardContent}>
//     //             <div className={classes.subHead}>
//     //               <div style={{ marginTop: "5px" }}>
//     //                 <StyledMonetizationOnIcon
//     //                   fontSize="large"
//     //                   color="success"
//     //                 />
//     //               </div>
//     //               <div className={classes.cardPoints}>
//     //                 Scholarship/Funding for Education
//     //               </div>
//     //             </div>
//     //             <div className={classes.subHead}>
//     //               <div style={{ marginTop: "5px" }}>
//     //                 <StyledExploreIcon fontSize="large" color="success" />
//     //               </div>
//     //               <div className={classes.cardPoints}>
//     //                 Mentorship & Guidance
//     //               </div>
//     //             </div>
//     //             <div className={classes.subHead}>
//     //               <div style={{ marginTop: "5px" }}>
//     //                 <StyledRateReviewIcon fontSize="large" color="success" />
//     //               </div>
//     //               <div className={classes.cardPoints}>
//     //                 Personalized Recommendation
//     //               </div>
//     //             </div>
//     //             <div className={classes.button}>
//     //               <div className={classes.submitTitle}>
//     //                 HEAR FROM OUR COMMUNITY
//     //               </div>
//     //             </div>
//     //           </div>
//     //         </div>
//     //       </div>
//     //     </div>
//     //     <div className={classes.testimony}>
//     //       <div>
//     //         <div className={classes.wrap}>
//     //           <div className={classes.testTitle}>Students Video Testimony</div>
//     //           <div style={{ display: "flex" }} className={classes.slider}>
//     //             <Arrow
//     //               direction="left"
//     //               clickFunction={() => onArrowClick("left")}
//     //             />
//     //             <Slide in={slideIn} direction={slideDirection}>
//     //               <div style={{ display: "flex" }}>
//     //                 <CarouselSlide content={content} />
//     //                 <CarouselSlide content={content} />
//     //               </div>
//     //             </Slide>
//     //             <Arrow
//     //               direction="right"
//     //               clickFunction={() => onArrowClick("right")}
//     //             />
//     //           </div>
//     //           <div className={classes.yellowButton}>
//     //             <div className={classes.learnMore}>LEARN MORE</div>
//     //           </div>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </div>
//     //   {/* <FourthBanner />
//     //   <Footer /> */}
//     // </div>
//   );
// }
