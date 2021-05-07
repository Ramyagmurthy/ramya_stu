import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import girlImage from "../assets/img/girl21.png"
const useStyles = makeStyles((theme) => ({
  root: {   
    width:"100%",
    height: "768px",
    marginRight: "auto",
    marginLeft: "0px",
    maxWidth: "100%",
    fontFamily: "Poppins",
    //padding: theme.spacing(10),
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  bgImage:{
    backgroundImage: `url(${girlImage})`,
    height: "600px",
    width: "100%",
  },
  first__div: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Poppins",
    justifyContent: "space-between",
    height: "250px",
    color: "#000000",
  },
  container_one: {
    display: "flex",
    justifyContent: "space-between",
    fontFamily: "Poppins",
    marginTop: "85px",
  },
  first_subdiv: {
    width: "553px",
    fontFamily: "Poppins",
    height: "57px",
    fontWeight: "bolder",
    fontSize: "35px",
    textAlign:"right",
  },
  second_subdiv:{
    width: "553px",
    textAlign:"right",
    fontSize: "31px",
    height: "44px",
    fontFamily: "Poppins",
    marginBottom: "10px",
  },
  third_subdiv: {
    width: "553px",
    textAlign:"right",
    fontSize: "22px",
    fontFamily: "Poppins",
    //marginRight: "35px",
    marginTop: "30px",
  },
  fourth_subdiv: {
    width: "597px",
    height: "89px",
    borderRadius: "48px",
    backgroundColor: "#DAE27E",
    marginLeft:"-40px",
  },
  fifth_subdiv: {
    fontSize: "44px",
    textAlign: "center",
    fontWeight: "300",
    marginTop: "30px",
    padding: theme.spacing(1),
  },
}));
function FourthBanner() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.bgImage} >
      <div className={classes.container_one}>
            <div className={classes.first__div}>
            </div>
            <div className={classes.first__div}>
                <div >
                    <Typography className={classes.first_subdiv} style={{marginTop: "150px"}}>PARIVARTHAN SCHOLARSHIP</Typography>
                </div>
                <div>
                    <Typography className={classes.second_subdiv}>By Shikha Sharma</Typography>
                </div>
                <div>
                    <Typography className={classes.third_subdiv}>
                        Scholarship Award : For MBA Students pursuing finance
                    </Typography>
                </div>
                <div>
                    <Typography className={classes.fourth_subdiv}>
                        <Typography className={classes.fifth_subdiv}>
                            Up to INR 8,50,000
                        </Typography>
                    </Typography>
                </div>
            </div>
      </div>
      </div>
    </div>
  );
}
export default FourthBanner;