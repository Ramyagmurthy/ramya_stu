// import React, { useEffect, useState, useContext } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import { Link } from "react-router-dom";
// import ProfileCard from "../components/atoms/ProfileCard";
// import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
// import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";
// import MailIcon from "@material-ui/icons/Mail";
// import LiveHelpOutlinedIcon from "@material-ui/icons/LiveHelpOutlined";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
// import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
// import EqualizerIcon from "@material-ui/icons/Equalizer";
// import { LoginContext } from "../Context/LoginContext";

// function Home() {
//   const logindetails = useContext(LoginContext);
//   // console.log("from home---", logindetails.roleId);
//   const [cards, setCards] = useState(null);

//   const classes = useStyles();

//   const StudentCards = [
//     {
//       header: "Profile",
//       avatar: AccountCircleIcon,
//       link: "/homecontrol/profile",
//     },
//     {
//       header: "Application",
//       avatar: DeveloperBoardIcon,
//       link: "/homecontrol/application",
//     },
//     {
//       header: "Discover",
//       avatar: PublicOutlinedIcon,
//       link: "/homecontrol/discover",
//     },
//     // { header: "Inbox", avatar: MailIcon, link: "/homecontrol/mail" },
//     {
//       header: "FAQ",
//       avatar: LiveHelpOutlinedIcon,
//       link: "/homecontrol/faq",
//     },
//   ];

//   const BenefactorCards = [
//     {
//       header: "Profile",
//       avatar: AccountCircleIcon,
//       link: "/homecontrol/profilestudost",
//     },
//     {
//       header: "My Funds",
//       avatar: FlightTakeoffIcon,
//       link: "/homecontrol/launchfund",
//     },
//     // {
//     //   header: "Fund Status",
//     //   avatar: EqualizerIcon,
//     //   link: "/",
//     // },
//     {
//       header: "FAQ",
//       avatar: LiveHelpOutlinedIcon,
//       link: "/homecontrol/faqstudost",
//     },
//   ];
//   useEffect(() => {
//     // console.log("from home useEffect");
//     if (logindetails.roleId == 1) {
//       setCards(StudentCards);
//     } else if (logindetails.roleId == 2) {
//       setCards(BenefactorCards);
//     }
//   }, []);

//   return (
//     <div className={classes.root}>
//       <div className={classes.cards}>
//         {cards
//           ? cards.map((card, index) => {
//               return (
//                 <Link
//                   key={index}
//                   to={card.link}
//                   style={{ textDecoration: "none" }}
//                 >
//                   <ProfileCard heading={card.header} avatar={card.avatar} />
//                 </Link>
//               );
//             })
//           : null}
//       </div>
//     </div>
//   );
// }

// export default Home;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flex: 1,
//     height: "80vh",
//     margin: 0,
//     padding: 0,
//   },

//   cards: {
//     boxSizing: "border-box",
//     display: "grid",
//     // marginTop: "10%",
//     paddingTop: "5%",
//     maxWidth: "800px",
//     margin: "auto",
//     // border: "2px solid red",
//     // backgroundColor: "#eff2f5",
//     gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
//     [theme.breakpoints.down("sm")]: {
//       gridTemplateColumns: "repeat(auto-fit, minmax(100px,1fr))",
//       gridRowGap: theme.spacing(1),
//       columnGap: theme.spacing(1),
//     },
//     gridRowGap: theme.spacing(10),
//     columnGap: theme.spacing(10),
//     justifyItems: "space-evenly",
//     flexWrap: "wrap",
//     alignItems: "center",
//     justifyItems: "center",
//     "& > *": {
//       // margin: theme.spacing(5),
//       width: theme.spacing(20),
//       [theme.breakpoints.down("sm")]: {
//         margin: theme.spacing(1),
//         width: theme.spacing(10),
//         height: theme.spacing(10),
//       },
//     },
//   },
//   paper: {
//     justify: "center",
//   },
//   media: {
//     height: 180,
//   },
//   linkStyle: {
//     textDecoration: "none",
//   },
// }));
