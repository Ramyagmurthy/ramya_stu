import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CarouselSlide from "../../components/comps/CarouselSlide";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Slide from "@material-ui/core/Slide";
import { Typography } from "@material-ui/core";
import image from "./../../assets/img/wave.png";
export default function ThirdBanner() {
  const classes = useStyles();
  const SLIDE_INFO = [
    {
      backgroundColor: "#ff7c7c",
      title: "Slide 1",
      videoUrl:
        "https://studost-bucket.s3.ap-south-1.amazonaws.com/USER_VIDEO_PROFILE/3/2021-04-14%2015:51:03.094",
    },
    {
      backgroundColor: "#ffb6b9",
      title: "Slide 2",
      videoUrl:
        "https://studost-bucket.s3.ap-south-1.amazonaws.com/USER_VIDEO_PROFILE/33/2021-04-14%2017:49:41.834",
    },
    // { backgroundColor: "#d9d9d9", title: "Slide 5", videoUrl: "" },
    // { backgroundColor: "#8deaff", title: "Slide 3", videoUrl: "" },
    // { backgroundColor: "#ffe084", title: "Slide 4", videoUrl: "" },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 39) {
        onArrowClick("right");
      }
      if (e.keyCode === 37) {
        onArrowClick("left");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const [index, setIndex] = useState(0);
  const [slideIn, setSlideIn] = useState(true);
  const [slideDirection, setSlideDirection] = useState("down");

  const content = SLIDE_INFO[index];
  const numSlides = SLIDE_INFO.length;

  function Arrow(props) {
    const { direction, clickFunction } = props;
    const icon =
      direction === "left" ? (
        <ArrowBackIosIcon className={classes.arrows} />
      ) : (
        <ArrowForwardIosIcon className={classes.arrows} />
      );

    return <div onClick={clickFunction}>{icon}</div>;
  }

  const onArrowClick = (direction) => {
    const increment = direction === "left" ? -1 : 1;
    const newIndex = (index + increment + numSlides) % numSlides;

    const oppDirection = direction === "left" ? "right" : "left";
    setSlideDirection(direction);
    setSlideIn(false);

    setTimeout(() => {
      setIndex(newIndex);
      setSlideDirection(oppDirection);
      setSlideIn(true);
    }, 500);
  };
  return (
    <>
      <div className={classes.mainRoot}>
        <div className={classes.root}>
          <div className={classes.wrap}>
            <Typography className={classes.testTitle}>
              Words from our members
            </Typography>

            <div style={{ display: "flex" }} className={classes.slider}>
              <Arrow
                direction="left"
                clickFunction={() => onArrowClick("left")}
              />
              <Slide in={slideIn} direction={slideDirection}>
                <div style={{ display: "flex" }}>
                  <CarouselSlide content={content} />
                </div>
              </Slide>
              <Arrow
                direction="right"
                clickFunction={() => onArrowClick("right")}
              />
            </div>
            <div className={classes.yellowButton}>
              <Typography className={classes.learnMore}>LEARN MORE</Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  mainRoot: {
    width: "100%",
    backgroundImage: `url(${image})`,
    // backgroundSize: "100%",
    position: "relative",
    backgroundRepeat: "no-repeat",
    marginTop: "2%",
    [theme.breakpoints.down("sm")]: {
      height: "100vh",
      marginTop: "-20%",
    },
  },
  root: {
    width: "100%",
    // backgroundColor:"white"
    height: "800px",
    [theme.breakpoints.down("sm")]: {
      height: "100vh",
      marginTop: "-20%",
    },
  },
  wrap: {
    width: "90%",
    maxWidth: theme.spacing(180),
    marginRight: "auto",
    marginLeft: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  testTitle: {
    width: "50%",
    height: "59px",
    margin: "3% 0 5% 7%",
    // fontFamily: "Poppins",
    fontSize: "42px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.5",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#23252a",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "0px",
      fontSize: "42px",
    },
  },
  slider: {
    maxWidth: "60%",
    minWidth: "50%",
    // maxWidth:"70%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    // margin: "0 12% 0 12%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "0px",
      // fontSize: "42px",
      marginTop: theme.spacing(20),
      marginBottom: theme.spacing(10),
    },
  },
  yellowButton: {
    width: "50%",

    height: "65px",
    // margin: " 45% 7% -5% 7%",
    opacity: "0.96",
    borderRadius: theme.spacing(2),
    boxShadow: "0 3px 12px 0 rgba(0, 0, 0, 0.16)",
    backgroundColor: "#f9c705",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // position: "absolute",
  },
  learnMore: {
    width: "50%",
    height: "31px",
    // fontFamily: "Poppins",
    fontSize: "22px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.5",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#575757",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
  },
  arrows: {
    fontSize: "50px",
    color: "grey",
    [theme.breakpoints.down("sm")]: {
      fontSize: "25px",
      marginBottom: "-50px",
    },
    // border: "2px solid red",
  },
}));
