// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import SingleApplicantCard from "../../../../atoms/SingleApplicantCard";
// import { CircularProgress, Typography } from "@material-ui/core";
// import { makeStyles, useTheme } from "@material-ui/core/styles";

// const AllApplicants = ({ scholarshipId }) => {
//   const baseUrl = process.env.REACT_APP_URL;
//   const [applicantdata, setApplicantdata] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isEmpty, setIsEmpty] = useState(false);

//   const classes = useStyles();

//   useEffect(() => {
//     getapplicants(scholarshipId);
//   }, []);

//   const getapplicants = (id) => {
//     const body = {
//       // applicationFilterDto: {
//       //   status: "string",
//       // },
//       pageNumber: 1,
//       scholarshipId: id,
//       totalRecordPerPage: 100,
//     };
//     const config = {
//       method: "post",
//       url: `${baseUrl}/benefactor/get-scholarship-application-data`,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: body,
//     };

//     axios(config)
//       .then((res) => {
//         setApplicantdata(res.data.body.applicationList);
//         setIsLoading(true);
//         if (res.data.body.applicationList.length == 0) {
//           setIsEmpty(true);
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div>
//       {isLoading ? (
//         applicantdata &&
//         applicantdata.length != 0 &&
//         applicantdata.map((applicant) => {
//           return (
//             <div className={classes.applicants__card}>
//               <SingleApplicantCard applicant={applicant} />
//             </div>
//           );
//         })
//       ) : (
//         <div className={classes.loading}>
//           <CircularProgress />
//         </div>
//       )}
//       {isEmpty && (
//         <div className={classes.noData}>
//           <Typography variant="h4">No Applicants</Typography>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllApplicants;

// const useStyles = makeStyles((theme) => ({
//   loading: {
//     margin: theme.spacing(0, 30, 20, 83),
//   },
//   mainRoot: {
//     maxWidth: "1350px",
//     marginRight: "auto",
//     marginLeft: "auto",
//   },
//   applicants__card: {
//     display: "flex",
//     margin: theme.spacing(3, 0, 3, 0),
//     justifyContent: "space-evenly",
//   },
//   noData: {
//     margin: theme.spacing(0, 30, 20, 80),
//   },
// }));
