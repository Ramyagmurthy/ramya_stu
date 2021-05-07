import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import MailIcon from '@material-ui/icons/Mail';
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import SimpleModal from "../../components/atoms/Modal";
import { useForm } from "react-hook-form";
import {
    AppBar,
    Typography,
    Button,
    Hidden,
    IconButton,
    Divider,
    Box,
TextField,
TextareaAutosize,
Grid, 

  } from "@material-ui/core";
  import axios from "axios";

  const useStyles = makeStyles((theme) => ({
    root : {
      marginTop : "-1%"
    },
    root1: {
      width : "40%",
      margin : "0% 0 0% 00%",
      backgroundColor : "#f2f2f2"
    },
    submit: {
        width : "40%",
        margin: theme.spacing(3, 0, 2),
        marginLeft : "05%",
        marginRight : "55%",
        backgroundColor: "#ffca64",
        color : "black"
        // backgroundImage: "linear-gradient(120deg, #84FAB0 0%, #8FD3F4 100%)",
      },
      contactUsHeading : {
        color : "#604a91",
        fontSize : "20px",
        fontFamily: "Montserrat",
    fontWeight: "700",
    marginLeft : "5%",
      },
      bar: {
        width: "57px",
        height: "4px",
        backgroundColor: "#ffc600",
        marginLeft : "5%",
        borderRaduis : "10%",
        marginBottom : "3%",
      },
      ContactUsContainer : {
        display : "flex",
        flexDirection : "row",
      },
      containerBox2 : {
       
        width : "60%",
        marginLeft : "5%",
        marginRight : "3%",
      },
      containerBox1 : {
        backgroundColor : "black"
      },
      contactText : {
        marginTop : "10%",
        fontFamily: "Montserrat",
    color: "#444444",
    fontSize: "20px",
    letterSpacing: "-0.4px",
      },
      lineDivider : {
        width : "100%",
        backgroundColor : "#604a91",
        height : "4px",
        borderRaduis : "10%",
        marginTop : "2%",
        marginBottom : "2%",
      },
      contactHeading : {
        fontSize : "28px",
        fontWeight : "700",
        fontFamily: "Montserrat",
        lineHeight : "45px"
      },
      contactDetailsText : {
        fontFamily: "Montserrat",
        color: "#444444",
        fontSize: "20px",
        letterSpacing: "-0.4px",
      }
}));

  export default function ContactDeatail() {
    const classes = useStyles();
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [openModal, setOpenModal] = useState(false);
  const [modalmsg, setModalmsg] = useState("");
  const [modalvariation, setModalvariation] = useState("success");
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
    
  const baseUrl = process.env.REACT_APP_URL;
  // const baseUrl = "http://studost.devkraft.in/studost/api"

  const url = `${baseUrl}/contact-us/save-contact-details`;

    const handleSubmit1 = () => {
     const body = {
        "contactNumber": phoneNumber,
        "emailId": email,
        "firstName": fname,
        "lastName": lname,
        "message": message
      }; 
      const config = {
        method: "post",
        url: url,
        headers: {
          "Content-Type": "application/json",
        },
        data: body,
      };

      axios(config)
      .then((response) => {
        console.log(response);
        setOpenModal(true);
        setModalmsg(response.data.message);
      })
      .catch((err) => {
        console.log(err);
        setOpenModal(true);
        setModalmsg(err.Error);
       
        
      });

    }

return(
<div className={classes.root}>
<SimpleModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          modalmsg={modalmsg}
          modalvariation={modalvariation}
          setModalvariation={setModalvariation}
        />

<div className={classes.ContactUsContainer}>

<div className={classes.root1}>
<Typography className={classes.contactUsHeading}>
  Reach Out Us
</Typography>
<div className={classes.bar} >
          </div>
<form
              className={classes.form}
              onSubmit={handleSubmit(handleSubmit1)}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <TextField
                    variant="filled"
                    style={{ width : "90%", marginLeft : "5%", marginRight : "5%"}}
                    id="firstName"
                    label="First Name*"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    autoFocus
                    name="firstName"
                    inputProps={{
                      ...register("firstName", { required: true }),
                    }}
                  />
                  {errors.firstName && (
                    <Typography color="secondary" style={{color:"red", marginLeft: "5%"}}>
                      Enter the first name
                      </Typography>
                  )}
                 
                </Grid>
                <Grid item xs={12} >
                  <TextField
                    variant="filled"
                    style={{ width : "90%", marginLeft : "5%", marginRight : "5%"}}
                    id="lastName"
                    type="text"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    label="Last Name*"
                    name="lastName"
                    autoComplete="lname"
                    inputProps={{ ...register("lastName", { required: true }) }}
                    />
                    {errors.lastName && (
                      <Typography color="secondary" style={{color:"red", marginLeft: "5%"}}>
                        Enter the last name
                      </Typography>
                    )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="filled"
                    style={{ width : "90%", marginLeft : "5%", marginRight : "5%"}}
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    label="Phone Number*"
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    
                    inputProps={{ ...register("phoneNumber", { required: true , pattern: /^\d{10}$/ }) }}
                    />
                    {errors.phoneNumber && (<>
                {errors.phoneNumber.type === "required" ?
                <Typography style={{color: "red", marginLeft: "5%"}}>
                  Please enter the contact Number 
                </Typography> : 
                <Typography style={{color: "red", marginLeft: "5%"}}>
                Please enter the 10 digit Numeric Number
              </Typography>
                }
              </>)}
                  
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="filled"
                    style={{ width : "90%", marginLeft : "5%", marginRight : "5%"}}
                    id="email"
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    label="E-mail*"
                    name="email"
                    autoComplete="email"
                    
                    inputProps={{ ...register("email", { required: true }) }}
                    />
                    {errors.email && (
                      <Typography color="secondary" style={{color:"red", marginLeft: "5%"}}>enter email</Typography>
                    )}
                  
                </Grid>
                <Grid item xs={12}>
                  <TextareaAutosize
                    style = {{backgroundColor:"grey"}}
                    variant="filled"
                    style={{ width : "90%", marginLeft : "5%", marginRight : "5%"}}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    name="message"
                    label="Message*"
                    type="message"
                    id="message"
                    name="message"
                    autoComplete="current-message"
                    rowsMin={5}
                    inputProps={{ ...register("message", { required: true }) }}
                    />
                    {errors.email && (
                      <Typography color="secondary" style={{color:"red", marginLeft: "5%"}}>enter message</Typography>
                    )}
                 
                </Grid>
               
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
               
                className={classes.submit}
              >
                Submit
              </Button>
             
            </form>
            </div>
            
            <div className={classes.containerBox2}>
                <Typography className={classes.contactText}>
                Please let us know if you have a question, want to leave a comment, or would like further information about Studost.
                </Typography>
                <div className={classes.lineDivider} >
                         </div> 
               <Typography className={classes.contactHeading}>
                  Inquires          
                </Typography>
                <div style={{display: "flex", flexDirection : "row",  marginTop : "3%"}}>
                <LocationOnIcon
                  style={{ marginRight: "8px" , color : "#ffc600", marginTop : "1%"}}
                  className={classes.contactIcon}
                />
                <Typography variant="h6" className={classes.contactDetailsText}>
                  Studost
                </Typography>
                </div>
                <div style={{display: "flex", flexDirection : "row",  marginTop : "3%"}}>
                <PhoneInTalkIcon
                  style={{ marginRight: "8px" , color : "#ffc600", marginTop : "1%"}}
                  className={classes.contactIcon}
                />
                <Typography variant="h6" className={classes.contactDetailsText}>
                9717688800
                </Typography>
                </div>
                <div style={{display: "flex", flexDirection : "row",  marginTop : "3%"}}>
                <MailIcon
                  style={{ marginRight: "8px" , color : "#ffc600", marginTop : "1%"}}
                  className={classes.contactIcon}
                />
                <Typography variant="h6" className={classes.contactDetailsText}>
                contact@studost.org
                </Typography>
                </div>
                <div style={{display: "flex", flexDirection : "row",  marginTop : "3%", marginLeft : "2%"}}>
                <FacebookIcon style={{ fontSize: "30px", color: "#02112c" }} />
              <TwitterIcon
                color="primary"
                style={{
                  fontSize: "30px",
                  marginLeft: "20px",
                  color: "#02112c",
                }}
              />
              <YouTubeIcon
                color="primary"
                style={{
                  fontSize: "30px",
                  marginLeft: "20px",
                  color: "#02112c",
                }}
              />
                </div>
             </div>
            </div>
            </div>);
  }