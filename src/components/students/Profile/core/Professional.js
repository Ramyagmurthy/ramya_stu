import React, { useState, useContext, useEffect } from "react";
import {
  Paper,
  TextField,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  Grid,
  Typography,
  Button,
  InputLabel,
  Select,
  MenuItem,
  Card,
  IconButton,
  Tooltip,
  Hidden,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { LoginContext } from "../../../../Context/LoginContext";
import axios from "axios";
import SimpleModal from "../../../atoms/Modal";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Checkbox from "@material-ui/core/Checkbox";
import { withSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { roundToNearestMinutes } from "date-fns";
import { CheckBox } from "@material-ui/icons";

function Professional(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const baseUrl = process.env.REACT_APP_URL;

  const logindetails = useContext(LoginContext);

  useEffect(() => {
    getuserInfo(logindetails.user);
    
  }, []);

  const getuserInfo = (id) => {
    axios
      .get(baseUrl + `/student/load-student-profile-data?userId=${id}`)
      .then((res) =>
        res.data.body.professionalExperienceList
          ? setExpArr([...res.data.body.professionalExperienceList])
          : [""]
      )
      .catch((err) => console.log(err));
  };

  const [expArr, setExpArr] = useState([]);

  const [addClass, setAddClass] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [noOfOrganization, setNoOfOrganization] = useState([
    {
      city: "",
      designation: "",
      endDate: new Date(),
      operationType: "U",
      organizationName: "",
      presentCompanyFlag: false,
      professionalExperienceId: 0,
      roleDescription: "",
      startDate: new Date(),
    },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [modalmsg, setModalmsg] = useState("");
  const [modalvariation, setModalvariation] = useState("success");

  const addMoreOrganization = () => {
    setNoOfOrganization([
      ...noOfOrganization,
      {
        city: "",
        designation: "",
        endDate: "",
        operationType: "U",
        organizationName: "",
        presentCompanyFlag: false,
        professionalExperienceId: 0,
        roleDescription: "",
        startDate: "",
      },
    ]);
  };

  const saveProfessional = () => {
    //console.log(endDate == startDate) 
    //console.log(startDate)
    //console.log(endDate)

    if (endDate == startDate) return;

    let body = {
      professionalExperienceDetails: noOfOrganization,
      studentId: logindetails.userData.studentId,
      userId: logindetails.user,
    };

    const config = {
      method: "post",
      url: `${baseUrl}/student/save-professional-details`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };

    axios(config)
      .then((res) => {
        // console.log(res.data);
        setOpenModal(true);
        setModalmsg(res.data.message);
        setAddClass(true);
        getuserInfo(logindetails.user);
        props.enqueueSnackbar("Successfully Saved", {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        props.enqueueSnackbar(err.data.message, {
          variant: "error",
        });
      });
  };

  const handleChange = (index, e) => {
    const values = [...noOfOrganization];
    values[index][e.target.name] = e.target.value;
    setNoOfOrganization(values);
  };

  const handleChangeDate = (index, e, c) => {
   
    const values = [...noOfOrganization];
    values[index][c] =
      e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate();
    setNoOfOrganization(values);
    //console.log(e);
    if(c == "startDate"){
      setStartDate(e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate());
    }
    else{
      setEndDate(e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate());
    }
    
  };

  const handleCheckChange = (index, e, c) => {
    const values = [...noOfOrganization];
    values[index][c] = !values[index][c];
    setNoOfOrganization(values);
  };

  const showForm = () => {
    setAddClass(!addClass);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SimpleModal
        //openModal={openModal}
        setOpenModal={setOpenModal}
        modalmsg={modalmsg}
        modalvariation={modalvariation}
        a
        setModalvariation={setModalvariation}
      />
      <Paper elevation={3} className={classes.paperarea}>
        <form onSubmit={handleSubmit(saveProfessional)}>
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
            <Typography variant="h5">Professional Experience</Typography>
            <WorkOutlineIcon
              style={{
                fontSize: "50px",
                marginLeft: "20px",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            {expArr.map((exp, i) => {
              return (
                <Card className={classes.displayCard} raised key={i}>
                  <Typography>
                    <b>Organization Name: </b>
                    {exp.organizationName}
                  </Typography>
                  <Typography>
                    <b>Designation: </b>
                    {exp.designation}
                  </Typography>
                  <Typography>
                    <b>Role Description: </b>
                    {exp.roleDescription}
                  </Typography>
                  <Typography>
                    <b>From </b>
                    {exp.startDate}
                    <b> To </b>
                    {exp.endDate}
                  </Typography>
                </Card>
              );
            })}
          </Grid>
          <div className={classes.addexpbutton}>
            <Button
              variant="contained"
              color={addClass ? "primary" : "secondary"}
              onClick={showForm}
              className={classes.submit}
            >
              {addClass ? <>Add Experience</> : <>Cancel</>}
            </Button>
          </div>

          <Hidden xsUp={addClass}>
            {noOfOrganization.map((organs, index) => {
              return (
                <Grid container className={classes.form} key={index}>
                  <h5>Organization no : {index + 1}</h5>

                  <Grid container item xs={12}>
                    <TextField
                      name="organizationName"
                      label="Name of the Organisation"
                      fullWidth
                      value={organs.organizationName}
                      onChange={(e) => handleChange(index, e)}
                      inputProps={{
                        ...register("organizationName", {
                          required: true,
                          pattern: /[a-zA-Z]/,
                        }),
                      }}
                    ></TextField>
                    {errors.organizationName && (
                      <Typography style={{color: "red"}}>
                        Enter the Organization Name
                      </Typography>
                    )}
                    <TextField
                      name="designation"
                      label="Designation"
                      fullWidth
                      value={organs.designation}
                      onChange={(e) => handleChange(index, e)}
                      inputProps={{
                        ...register("designation", {
                          required: true,
                          pattern: /[a-zA-Z]/,
                        }),
                      }}
                    ></TextField>
                    {errors.designation && (
                      <Typography  style={{color: "red"}}>
                        Enter the Designation
                      </Typography>
                    )}
                    <TextField
                      name="city"
                      label="City"
                      fullWidth
                      value={organs.city}
                      onChange={(e) => handleChange(index, e)}
                      inputProps={{
                        ...register("city", {
                          required: true,
                          pattern: /[a-zA-Z]/,
                        }),
                      }}
                    ></TextField>
                    {errors.city && (
                      <Typography style={{color: "red"}}>Enter the City</Typography>
                    )}
                    <TextField
                      name="roleDescription"
                      label="Role description"
                      multiline
                      fullWidth
                      value={organs.roleDescription}
                      onChange={(e) => handleChange(index, e)}
                      inputProps={{
                        ...register("roleDescription", {
                          required: true,
                          pattern: /[a-zA-Z]/,
                        }),
                      }}
                    ></TextField>
                    {errors.roleDescription && (
                      <Typography style={{color: "red"}}>
                        Enter the Role Description
                      </Typography>
                    )}
                  </Grid>
                  {/* <FormControlLabel
                control={
                  <Checkbox
                    checked={organs.presentCompanyFlag}
                    onChange={(e) => handleChange(index, e)}
                    value={organs.presentCompanyFlag}
                    name="presentCompanyFlag"
                    color="primary"
                  />
                }
                label="Still working in this organization ?"
              /> */}
                  <Grid container>
                    <Grid item xs={12} style={{ marginTop: "20px" }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={organs.presentCompanyFlag}
                            value={organs.presentCompanyFlag}
                            onChange={(e) =>
                              handleCheckChange(index, e, "presentCompanyFlag")
                            }
                            name="presentCompanyFlag"
                            color="Primary"
                          />
                        }
                        label="Currently working here "
                      />
                    </Grid>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
                      <Grid
                        item
                        xs={12}
                        container
                        style={{ padding: "20px 0px 20px 0px" }}
                        
                      >
                        <Grid item xs={6}>
                          <Grid container justify="space-around" item xs={12}>
                            <KeyboardDatePicker
                              fullWidth
                              disableFuture
                              // disableToolbar
                              maxDate={organs.endDate}
                              variant="outline"
                              label="Start Date"
                              format="dd-MMM-yyyy"
                              openTo="year"
                              name="startDate"
                              value={organs.startDate}
                              onChange={(e) =>
                                handleChangeDate(index, e, "startDate")
                              }
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          </Grid>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          style={
                            organs.presentCompanyFlag
                              ? { display: "none" }
                              : { display: "block" }
                          }
                        >
                          <KeyboardDatePicker
                            fullWidth
                            // disableToolbar
                            disableFuture
                            //minDate={organs.startDate}
                            variant="outline"
                            label="End Date"
                            format="dd-MMM-yyyy"
                            openTo="year"
                            name="endDate"
                            value={organs.endDate}
                            onChange={(e) =>
                              handleChangeDate(index, e, "endDate")
                            }
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </Grid>
                      </Grid>
                    </MuiPickersUtilsProvider>
                    {(endDate === startDate) && (
                      <Typography style={{ color: "red" }} align="left">
                         Start and End date cannot be equal
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              );
            })}
            <Grid
              style={{
                paddingTop: "50px",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              item
              xs={12}
            >
              <Typography>Add more organizations</Typography>
              <Tooltip title="click to add more organizations">
                <IconButton onClick={addMoreOrganization}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid xs={12} style={{ marginTop: "50px" }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                // onClick={() => saveProfessional()}
                type="submit"
                className={classes.submit}
              >
                Save
              </Button>
            </Grid>
          </Hidden>
        </form>
      </Paper>
    </div>
  );
}

export default withSnackbar(Professional);

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(100),
    marginRight: "auto",
    marginLeft: "auto",
    paddingTop: theme.spacing(2),
  },
  paperarea: {
    padding: theme.spacing(10),
    paddingTop: theme.spacing(5),
    // backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
    borderRadius: theme.spacing(2),
    backgroundColor: "#f1f2f5",
  },
  formItem: {
    paddingBottom: theme.spacing(5),
    paddingTop: theme.spacing(5),
  },
  formcontrol: {
    maxWidth: "100px",
  },
  form: {
    margin: "20px 0px 20px 0px",
    padding: theme.spacing(2, 4),
    backgroundImage: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
    borderRadius: theme.spacing(2),
  },
  displayCard: {
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
    borderRadius: theme.spacing(2),
  },
  addexpbutton: {
    margin: theme.spacing(4, 2),
    paddingRight: theme.spacing(2),
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  submit: {
    borderRadius: theme.spacing(2),
  },
  red:{
    color:"red"
  }
}));
