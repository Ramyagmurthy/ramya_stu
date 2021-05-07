import React, { useContext, useEffect, useState } from "react";
import {
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  IconButton,
  Tooltip,
  Hidden,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import { LoginContext } from "../../../../Context/LoginContext";
import axios from "axios";
import SimpleModal from "../../../../components/atoms/Modal";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import { TrainRounded, TrendingUpRounded } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import { withSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(100),
    marginRight: "auto",
    marginLeft: "auto",
    paddingTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  paperarea: {
    padding: theme.spacing(10),
    paddingTop: theme.spacing(5),
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  body: {
    minHeight: "450px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  ccard: {
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
    borderRadius: theme.spacing(2),
  },
  submit: {
    borderRadius: theme.spacing(2),
  },
  red:{
    color:"red"
  },
  addEditDelete: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

function Recommendation(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const classes = useStyles();
  const logindetails = useContext(LoginContext);
  // console.log("from reco", logindetails);
  const baseUrl = process.env.REACT_APP_URL;

  const [recom, setRecom] = useState();
  const [showEdit, setShowEdit] = useState(true);
  const [index2, setIndex2] = useState(null);
  // logindetails.userData.recommendationDetailsList

  

  const [contactNumber, setContactNumber] = useState(recom ? recom.contactNumber : "");
  const [emailId, setEmailId] = useState(recom ? recom.emailId : "");
  const [firstName, setFirstName] = useState(recom ? recom.firstName : "");
  const [lastName, setLastName] = useState(recom ? recom.lastName : "");

  const [contactNumberEdit, setContactNumberEdit] = useState("");
  const [emailIdEdit, setEmailIdEdit] = useState("");
  const [firstNameEdit, setFirstNameEdit] = useState("");
  const [lastNameEdit, setLastNameEdit] = useState("");

  useEffect(() => {
    getuserInfo(logindetails.user);
  }, [contactNumberEdit,emailIdEdit,firstNameEdit,lastNameEdit]);

  const [openModal, setOpenModal] = useState(false);
  const [modalmsg, setModalmsg] = useState("");
  const [modalvariation, setModalvariation] = useState("success");

  const [show, setShow] = useState(true);
  const [recId, setRecId] = useState(0);

  const body = {
    recommendationDetails: [
      {
        contactNumber: contactNumber,
        emailId: emailId,
        firstName: firstName,
        lastName: lastName,
        operationType: "U",
        recommendationId: 0,
      },
    ],
    studentId: logindetails.userData.studentId,
    userId: logindetails.userData.userId,
  };

  const config = {
    method: "post",
    url: `${baseUrl}/student/save-recommendation-details`,
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
  };

  const saveRecomen = (e) => {
    // e.preventDefault();

    axios(config)
      .then((response) => {
        // console.log(response.data);
        setOpenModal(true);
        setModalmsg(response.data.message);
        setShow(true);
        getuserInfo(logindetails.user);
        props.enqueueSnackbar("Successfully Saved", {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        setOpenModal(true);
        setModalmsg(err.data.message);
        props.enqueueSnackbar(err.data.message, {
          variant: "error",
        });
      });
  };

  const getuserInfo = (id) => {
    axios
      .get(baseUrl + `/student/load-student-profile-data?userId=${id}`)
      .then((res) => setRecom(res.data.body.recommendationDetailsList))
      .catch((err) => console.log(err));
  };

  const saveRecomen2 = () => {
    const body = {
      recommendationDetails: [
        {
          contactNumber: contactNumberEdit,
          emailId: emailIdEdit,
          firstName: firstNameEdit,
          lastName: lastNameEdit,
          operationType: "U",
          recommendationId: recId,
        },
      ],
      studentId: logindetails.userData.studentId,
      userId: logindetails.userData.userId,
    };

    const config = {
      method: "post",
      url: `${baseUrl}/student/save-recommendation-details`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };
    axios(config)
      .then((response) => {
        // console.log(response.data);
        setOpenModal(true);
        setModalmsg(response.data.message);
        setShowEdit(true);
        getuserInfo(logindetails.user);
        props.enqueueSnackbar("Successfully Edited", {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        setOpenModal(true);
        setModalmsg(err.data.message);
        props.enqueueSnackbar(err.data.message, {
          variant: "error",
        });
      });
    
  }

  const deleteTheItem = (reco) => {
    //console.log(reco);
    const body = {
      recommendationDetails: [
        {
          contactNumber: reco.contactNumber,
          emailId: reco.emailId,
          firstName: reco.firstName,
          lastName: reco.lastName,
          operationType: "D",
          recommendationId: reco.recommendationId,
        },
      ],
      studentId: logindetails.userData.studentId,
      userId: logindetails.userData.userId,
    };

    const config = {
      method: "post",
      url: `${baseUrl}/student/save-recommendation-details`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };

    axios(config)
    .then((response) => {
      // console.log(response.data);
      setOpenModal(true);
      setModalmsg(response.data.message);
      setShow(true);
      getuserInfo(logindetails.user);
      props.enqueueSnackbar("Successfully deleted", {
        variant: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      setOpenModal(true);
      setModalmsg(err.data.message);
      props.enqueueSnackbar(err.data.message, {
        variant: "error",
      });
    });

  };

  
  return (
    <div className={classes.root}>
      <SimpleModal
        //openModal={openModal}
        setOpenModal={setOpenModal}
        modalmsg={modalmsg}
        modalvariation={modalvariation}
        setModalvariation={setModalvariation}
      />
      <Paper elevation={3} className={classes.paperarea}>
        <Grid
          container
          xs={12}
          style={{
            display: "flex",
            alignItems: "center",
            paddingBottom: "50px",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">Recommendations</Typography>
          <ContactPhoneIcon
            style={{
              fontSize: "50px",
              marginLeft: "20px",
            }}
          />
        </Grid>
        <div>
          {recom
            ? recom.map((reco, index) => {
                return (<>
                  <Card className={classes.ccard} raised key={index}>
                    <div className={classes.addEditDelete}>
                      <Typography>No : {index + 1}</Typography>
                      <div>
                        <Tooltip title="Edit">
                          <IconButton onClick={()=>{
                                    setShowEdit(false); 
                                    setIndex2(index); 
                                    setRecId(reco.recommendationId); 
                                    setContactNumberEdit(reco.contactNumber); 
                                    setEmailIdEdit(reco.emailId); 
                                    setFirstNameEdit(reco.firstName); 
                                    setLastNameEdit(reco.lastName); }}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">                        
                          <IconButton onClick={() => {deleteTheItem(reco)}}>
                            <DeleteIcon  />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                    <Typography>
                      {reco.firstName} {reco.lastName}
                    </Typography>
                    <Typography>Contact no : {reco.contactNumber}</Typography>

                    <Typography>Email : {reco.emailId}</Typography>
                  </Card>
                  {index=== index2 &&  <Hidden xsUp={showEdit}>
            <form className={classes.body} onSubmit={handleSubmit(saveRecomen2)}>
                  <IconButton onClick={()=>{setShowEdit(true); setIndex2(index)}}>
                          <CancelIcon/>
                  </IconButton>
              <TextField
                variant="outlined"
                label="Contact no"
                fullWidth
                value={contactNumberEdit}
                onChange={(e) => setContactNumberEdit(e.target.value)}
                inputProps={{
                  ...register("contactNo", { required: true, pattern: /^\d{10}$/ }),
                }}
              />
              {errors.contactNo && (<>
                {errors.contactNo.type === "required" ?
                <Typography style={{color: "red"}}>
                  please enter the contact Number 
                </Typography> : 
                <Typography style={{color: "red"}}>
                please enter the 10 digit Numeric Number
              </Typography>
                }
              </>)}
              <TextField
                variant="outlined"
                label="Email Id"
                type="email"
                fullWidth
                value={emailIdEdit}
                onChange={(e) => setEmailIdEdit(e.target.value)}
                inputProps={{
                  ...register("email", { required: true, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ }),
                }}
              />
              {errors.email && (
                <Typography style={{color: "red"}}>
                  please enter the Email id
                </Typography>
              )}
              <TextField
                variant="outlined"
                label="First Name"
                value={firstNameEdit}
                onChange={(e) => setFirstNameEdit(e.target.value)}
                fullWidth
                inputProps={{
                  ...register("firstName", {
                    required: true,
                    pattern: /[a-zA-Z]/,
                  }),
                }}
              />
              {errors.firstName && (
                <Typography style={{color: "red"}}>
                  please enter the first name
                </Typography>
              )}
              <TextField
                variant="outlined"
                label="Last Name"
                fullWidth
                value={lastNameEdit}
                onChange={(e) => setLastNameEdit(e.target.value)}
                inputProps={{
                  ...register("lastName", {
                    required: true,
                    pattern: /[a-zA-Z]/,
                  }),
                }}
              />
              {errors.lastName && (
                <Typography style={{color: "red"}}>
                  please enter the last name
                </Typography>
              )}
              <Button
                type="submit"
                // onClick={(e) => saveRecomen(e)}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.submit}
              >
                Save
              </Button>
            </form>
          </Hidden>}
                  </>
                );
              })
            : null}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Typography>Add Contacts</Typography>
            <Tooltip title="Click to add more contacts">
              <IconButton onClick={() => setShow(false)}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </div>
          <Hidden xsUp={show}>
          <IconButton onClick={()=>{setShow(true)}} style={{marginLeft:"90%"}}>
                          <CancelIcon/>
                  </IconButton>
            <form className={classes.body} onSubmit={handleSubmit(saveRecomen)}>
              <TextField
                variant="outlined"
                label="Contact no"
                fullWidth
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                inputProps={{
                  ...register("contactNo", { required: true, pattern: /^\d{10}$/ }),
                }}
              />
              {errors.contactNo && (
                <Typography style={{color: "red"}}>
                  please enter the contact Number
                </Typography>
              )}
              <TextField
                variant="outlined"
                label="Email Id"
                type="email"
                fullWidth
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                inputProps={{
                  ...register("email", { required: true, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ }),
                }}
              />
              {errors.email && (
                <Typography style={{color: "red"}}>
                  please enter the Email id
                </Typography>
              )}
              <TextField
                variant="outlined"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                inputProps={{
                  ...register("firstName", {
                    required: true,
                    pattern: /[a-zA-Z]/,
                  }),
                }}
              />
              {errors.firstName && (
                <Typography style={{color: "red"}}>
                  please enter the first name
                </Typography>
              )}
              <TextField
                variant="outlined"
                label="Last Name"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                inputProps={{
                  ...register("lastName", {
                    required: true,
                    pattern: /[a-zA-Z]/,
                  }),
                }}
              />
              {errors.lastName && (
                <Typography style={{color: "red"}}>
                  please enter the last name
                </Typography>
              )}
              <Button
                type="submit"
                // onClick={(e) => saveRecomen(e)}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.submit}
              >
                Save
              </Button>
            </form>
          </Hidden>
        </div>
      </Paper>
    </div>
  );
}

export default withSnackbar(Recommendation);
