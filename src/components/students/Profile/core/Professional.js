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
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddIcon from "@material-ui/icons/Add";

function Professional(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const baseUrl = process.env.REACT_APP_URL;

  const logindetails = useContext(LoginContext);

  const getuserInfo = (id) => {
    axios
      .get(baseUrl + `/student/load-student-profile-data?userId=${id}`)
      .then((res) => {
        res.data.body.professionalExperienceList
          ? setExpArr([...res.data.body.professionalExperienceList])
          : setAddClass(false);
        if (res.data.body.professionalExperienceList == null) {
          setAddClass(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const [expArr, setExpArr] = useState([]);

  const [addClass, setAddClass] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [indexValue, setIndexValue] = useState();
  const [roleDescriptionEditM, setRoleDescriptionEditM] = useState(false);
  const [roleDescriptionM, setRoleDescriptionM] = useState(false);
  const [designationM, setDesignationM] = useState(false);
  const [designationEditM, setDesignationEditM] = useState(false);
  const [todayDate, setTodayDate] = useState(new Date());

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
  const [editCity, setEditCity] = useState();
  const [editDesignation, setEditDesignation] = useState();
  const [editEndDate, setEditEndDate] = useState();
  const [editOrganizationName, setEditorganizationName] = useState();
  const [editPresentCompanyFlag, setEditPresentCompanyFlag] = useState();
  const [editRoleDescription, setEditRoleDescription] = useState();
  const [editStartDate, setEditStartDate] = useState();
  const [editProfessionalExperienceId, setProfessionalExperienceId] =
    useState();
  const [editExperiance, setEditExperiance] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [modalmsg, setModalmsg] = useState("");
  const [modalvariation, setModalvariation] = useState("success");
  const [addClassEdit, setAddClassEdit] = useState(true);
  const [editOrganisation, setEditOrganisation] = useState([]);
  const [employmentType, setEmploymentType] = useState();
  const [currentlyWorking, setCurrentlyWorking] = useState();
  const [showForm1, setShowForm] = useState(false);

  useEffect(() => {
    getuserInfo(logindetails.user);
  }, [
    editDesignation,
    editDesignation,
    editEndDate,
    editOrganizationName,
    editPresentCompanyFlag,
    editRoleDescription,
    editStartDate,
  ]);

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

  const saveProfessional = (e) => {
    e.preventDefault();
    //console.log(endDate == startDate)
    //console.log(startDate)
    //console.log(endDate)
    if (noOfOrganization[0].designation.length > 255) {
      setDesignationM(true);
    } else setDesignationM(false);
    if (noOfOrganization[0].roleDescription.length > 2000) {
      setRoleDescriptionM(true);
    } else setRoleDescriptionM(false);
    if (
      noOfOrganization[0].designation.length <= 255 &&
      noOfOrganization[0].roleDescription.length <= 2000
    ) {
      let body = {
        professionalExperienceDetails: noOfOrganization,
        studentId: logindetails.userData.studentId,
        userId: logindetails.user,
      };
      if (endDate == startDate)
        if (!currentlyWorking) return;
        else if (todayDate == startDate) return;
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
    }
  };

  const handleChange = (index, e) => {
    const values = [...noOfOrganization];
    values[index][e.target.name] = e.target.value;
    setNoOfOrganization(values);
  };

  const editHandleChange = (index, e) => {
    const values = [];
    values[index][e.target.name] = e.target.value;
    editOrganisation(values);
  };

  const handleChangeDate = (index, e, c) => {
    if (e) {
      const values = [...noOfOrganization];
      values[index][c] =
        e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate();
      setNoOfOrganization(values);
      //console.log(e);
      if (c == "startDate") {
        setStartDate(
          e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate()
        );
        setEditStartDate(
          e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate()
        );
      } else {
        setEndDate(
          e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate()
        );
        setEditEndDate(
          e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate()
        );
      }
    }
  };

  const editHandleChangeDate = (e, c) => {
    if (e) {
      // const values = [...noOfOrganization];
      // values[index][c] =
      //   e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate();
      // setNoOfOrganization(values);
      //console.log(e);
      if (c == "startDate") {
        // setStartDate(e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate());
        setEditStartDate(
          e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate()
        );
      } else {
        // setEndDate(e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate());
        setEditEndDate(
          e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate()
        );
      }
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

  const clearAll = () => {
    let noOfOrganization1 = [...noOfOrganization];
    noOfOrganization1.pop();
    setNoOfOrganization([
      ...noOfOrganization1,
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
  };

  const DeleteExp = (data) => {
    let tempData = [
      {
        city: data.city,
        designation: data.designation,
        endDate: data.endDate,
        operationType: "D",
        organizationName: data.organizationName,
        presentCompanyFlag: data.presentCompanyFlag,
        professionalExperienceId: data.professionalExperienceId,
        roleDescription: data.roleDescription,
        startDate: data.startDate,
      },
    ];
    let body = {
      professionalExperienceDetails: tempData,
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
        // console.log(err);
        props.enqueueSnackbar(err.data.message, {
          variant: "error",
        });
      });
  };

  const saveProffesionEditted = () => {
    let tempData = [
      {
        city: editCity,
        designation: editDesignation,
        endDate: editEndDate,
        operationType: "U",
        organizationName: editOrganizationName,
        presentCompanyFlag: editPresentCompanyFlag,
        professionalExperienceId: editProfessionalExperienceId,
        roleDescription: editRoleDescription,
        startDate: editStartDate,
      },
    ];
    let body = {
      professionalExperienceDetails: tempData,
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
    if (editDesignation.length > 255) {
      setDesignationEditM(true);
    } else setDesignationEditM(false);
    if (editRoleDescription.length > 2000) {
      setRoleDescriptionEditM(true);
    } else setRoleDescriptionEditM(false);

    if (editDesignation.length <= 255 && editRoleDescription.length <= 2000) {
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
          // console.log(err);
          props.enqueueSnackbar(err.data.message, {
            variant: "error",
          });
        });
    }
  };
  // console.log("edit org",editOrganisation)
  const classes = useStyles();
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="bio__buttons mb-5">
          <div className="cancel__btn" type="button">
            CANCEL
          </div>
          <div className="save__btn " type="button">
            SUBMIT
          </div>
        </div>
        <div className="bio__container">
          <div className="title__container bg_blue p-2 pr-3 pl-3 mb-3">
            <div className="educatoin__title">Add your Professional Exp.</div>
            <IconButton
              style={{ backgroundColor: "#3586ff" }}
              onClick={() => {
                showForm();
              }}
            >
              <AddIcon
                style={{
                  color: "white",
                  transform: !addClass ? "rotate(45deg)" : "",
                }}
              />
            </IconButton>
          </div>
          {!addClass && (
            <form onSubmit={saveProfessional}>
              <div className="bio__buttons mb-3">
                <div
                  className="btn education__greenbtn"
                  type="button"
                  style={{ border: "none", marginRight: "10px" }}
                  onClick={clearAll}
                >
                  CLEAR DETAILS
                </div>
                <input
                  className="btn education__greenbtn"
                  type="submit"
                  name="SAVE DETAILS"
                />
              </div>
              <div className="container bg_blue">
                {noOfOrganization.map((organs, index) => {
                  return (
                    <>
                      <div className="container bg_blue">
                        {noOfOrganization.map((organs, index) => {
                          return (
                            <>
                              <div className="row p-2 ">
                                <div className="col-12 col-lg-6 p-2">
                                  <input
                                    name="designation"
                                    type="text"
                                    className="form-control"
                                    placeholder="Title"
                                    value={organs.designation}
                                    onChange={(e) => handleChange(index, e)}
                                  />
                                </div>
                                <div className="col p-2">
                                  <div className="form-control flex__center">
                                    <div className="col-6">Employment Type</div>
                                    <select
                                      className="no_border  col-6"
                                      placeholder="Employment Type"
                                      onChange={(e) =>
                                        setEmploymentType(e.target.value)
                                      }
                                      name="Employment Type"
                                    >
                                      <option value="Full">Full</option>
                                      <option value="Part Time">
                                        Part Time
                                      </option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="row p-2">
                                <div className="col-12 col-lg-6 p-2">
                                  <input
                                    name="organizationName"
                                    type="text"
                                    className="form-control"
                                    placeholder="Name of Organization"
                                    value={organs.organizationName}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                  />
                                </div>
                                <div className="col p-2">
                                  <input
                                    name="city"
                                    type="text"
                                    className="form-control"
                                    placeholder="City"
                                    value={organs.city}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                  />
                                  {errors.city && (
                                    <Typography style={{ color: "red" }}>
                                      Enter the City
                                    </Typography>
                                  )}
                                </div>
                              </div>
                              <div className="form-group">
                                <textarea
                                  name="roleDescription"
                                  className="form-control"
                                  id="exampleFormControlTextarea1"
                                  rows="4"
                                  placeholder="Role discription"
                                  value={organs.roleDescription}
                                  onChange={(e) => handleChange(index, e)}
                                  required
                                />
                                <div
                                  style={{
                                    fontSize: "12px",
                                    paddingLeft: "10px",
                                  }}
                                >
                                  0/400
                                </div>
                              </div>
                              <div className="form-group">
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Checkbox
                                    checked={currentlyWorking}
                                    onChange={() => {
                                      setCurrentlyWorking(!currentlyWorking);
                                    }}
                                    name="checkedG"
                                  />
                                  {/* <input type="checkbox" name="field name" value="Initial value" checked="yes"></input> */}
                                  <div className="educatoin__workinghere">
                                    Currently work Here
                                  </div>
                                </div>
                              </div>
                              {/* <div className="row p-2">
                                <div className="col p-2 ">
                                  <div className="form-control pro__date">
                                    Start Date
                                    <input
                                      type="date"
                                      style={{ border: "none" }}
                                      name="startDate"
                                      // value={organs.startDate}
                                      onChange={(e) =>
                                        handleChangeDate(index, e, "startDate")
                                      }
                                    />
                                  </div>
                                </div>
                                {!currentlyWorking && (
                                  <div className="col p-2 ">
                                    <div className="form-control pro__date">
                                      End Date
                                      <input
                                        type="date"
                                        style={{ border: "none" }}
                                        name="endDate"
                                        // value={organs.endDate}
                                        onChange={(e) =>
                                          handleChangeDate(index, e, "endDate")
                                        }
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                              {todayDate === startDate && currentlyWorking && (
                                <Typography
                                  style={{ color: "red" }}
                                  align="left"
                                >
                                  Start and End date cannot be equal
                                </Typography>
                              )}
                              {endDate === startDate && !currentlyWorking && (
                                <Typography
                                  style={{ color: "red" }}
                                  align="left"
                                >
                                  Start and End date cannot be equal
                                </Typography>
                              )} */}
                            </>
                          );
                        })}
                      </div>
                      <div className="row m-2 mt-2">
                        <div className="col-12 col-lg-6 p-2 ">
                          <div className="form-control pro__date">
                            <div className="col-6">Start Date</div>
                            <KeyboardDatePicker
                              disableFuture
                              // disableToolbar
                              maxDate={organs.endDate}
                              variant="dialog"
                              format="dd MMM yyyy"
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
                          </div>
                        </div>
                        {!currentlyWorking && (
                          <div className="col-12 col-lg-6 p-2 ">
                            <div className="form-control pro__date">
                              <div className="col-6">End Date</div>

                              <KeyboardDatePicker
                                // disableToolbar
                                disableFuture
                                //minDate={organs.startDate}
                                variant="dialog"
                                format="dd MMM yyyy"
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
                            </div>
                          </div>
                        )}
                      </div>
                      <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
                        {todayDate === startDate && currentlyWorking && (
                          <Typography style={{ color: "red" }} align="left">
                            Start is not today
                          </Typography>
                        )}
                        {endDate === startDate && !currentlyWorking && false && (
                          <Typography style={{ color: "red" }} align="left">
                            Start and End date cannot be equal
                          </Typography>
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
            </form>
          )}
        </div>

        <div className="bio__container mt-5">
          <SimpleModal
            //openModal={openModal}
            setOpenModal={setOpenModal}
            modalmsg={modalmsg}
            modalvariation={modalvariation}
            a
            setModalvariation={setModalvariation}
          />
          <div className="container bg_blue">
            {/* <Grid
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
          </Grid> */}
            <Grid item xs={12}>
              {expArr.map((exp, i) => {
                return (
                  <>
                    <Card className={classes.displayCard} raised key={i}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
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
                        </div>
                        <div style={{ display: "flex" }}>
                          <IconButton
                            style={{ border: 0, outline: 0 }}
                            onClick={() => {
                              setAddClassEdit(false);
                              setIndexValue(i);
                              setEditOrganisation(exp);
                              setEditCity(exp.city);
                              setEditDesignation(exp.designation);
                              setEditEndDate(exp.endDate);
                              setEditPresentCompanyFlag(exp.presentCompanyFlag);
                              setProfessionalExperienceId(
                                exp.professionalExperienceId
                              );
                              setEditRoleDescription(exp.roleDescription);
                              setEditStartDate(exp.startDate);
                              setEditorganizationName(exp.organizationName);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              DeleteExp(exp);
                            }}
                            style={{ border: 0, outline: 0 }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </div>
                    </Card>
                    {indexValue === i && (
                      <Hidden xsUp={addClassEdit}>
                        {/* {editOrganisation.map((organs, index) => {
              return ( */}
                        <IconButton
                          onClick={() => {
                            setAddClassEdit(true);
                          }}
                          style={{ marginLeft: "90%", border: 0, outline: 0 }}
                        >
                          <CancelIcon />
                        </IconButton>
                        <form onSubmit={handleSubmit(saveProffesionEditted)}>
                          <Grid container className={classes.form}>
                            {/* <h5>Organization no : {index + 1}</h5> */}

                            <Grid container item xs={12}>
                              <TextField
                                name="organizationName"
                                label="Name of the Organisation"
                                fullWidth
                                value={editOrganizationName}
                                onChange={(e) =>
                                  setEditorganizationName(e.target.value)
                                }
                                inputProps={{
                                  ...register("organizationName", {
                                    required: true,
                                    pattern: /[a-zA-Z]/,
                                  }),
                                }}
                              ></TextField>
                              {errors.organizationName && (
                                <Typography style={{ color: "red" }}>
                                  Enter the Organization Name
                                </Typography>
                              )}
                              <TextField
                                name="designation"
                                label="Designation"
                                fullWidth
                                value={editDesignation}
                                onChange={(e) =>
                                  setEditDesignation(e.target.value)
                                }
                                inputProps={{
                                  ...register("designation", {
                                    required: true,
                                    pattern: /[a-zA-Z]/,
                                  }),
                                }}
                              ></TextField>
                              {errors.designation && (
                                <Typography style={{ color: "red" }}>
                                  Enter the Designation
                                </Typography>
                              )}
                              {designationEditM && (
                                <Typography style={{ color: "red" }}>
                                  Exceeding 500 character
                                </Typography>
                              )}
                              <TextField
                                name="city"
                                label="City"
                                fullWidth
                                value={editCity}
                                onChange={(e) => setEditCity(e.target.value)}
                                inputProps={{
                                  ...register("city", {
                                    required: true,
                                    pattern: /[a-zA-Z]/,
                                  }),
                                }}
                              ></TextField>
                              {errors.city && (
                                <Typography style={{ color: "red" }}>
                                  Enter the City
                                </Typography>
                              )}

                              <TextField
                                name="roleDescription"
                                label="Role description"
                                multiline
                                fullWidth
                                value={editRoleDescription}
                                onChange={(e) =>
                                  setEditRoleDescription(e.target.value)
                                }
                                inputProps={{
                                  ...register("roleDescription", {
                                    required: true,
                                    pattern: /[a-zA-Z]/,
                                  }),
                                }}
                              ></TextField>
                              {errors.roleDescription && (
                                <Typography style={{ color: "red" }}>
                                  Enter the Role Description
                                </Typography>
                              )}
                              {roleDescriptionEditM && (
                                <Typography style={{ color: "red" }}>
                                  Exceeding 500 character
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
                                      checked={editPresentCompanyFlag}
                                      value={editPresentCompanyFlag}
                                      onChange={(e) =>
                                        setEditPresentCompanyFlag(
                                          !editPresentCompanyFlag
                                        )
                                      }
                                      name="presentCompanyFlag"
                                      color="Primary"
                                    />
                                  }
                                  label="Currently working here "
                                />
                              </Grid>
                              <MuiPickersUtilsProvider
                                utils={DateFnsUtils}
                                fullWidth
                              >
                                <Grid
                                  item
                                  xs={12}
                                  container
                                  style={{ padding: "20px 0px 20px 0px" }}
                                >
                                  <Grid item xs={6}>
                                    <Grid
                                      container
                                      justify="space-around"
                                      item
                                      xs={12}
                                    >
                                      <KeyboardDatePicker
                                        fullWidth
                                        disableFuture
                                        // disableToolbar
                                        maxDate={editStartDate}
                                        variant="outline"
                                        label="Start Date"
                                        format="dd-MMM-yyyy"
                                        openTo="year"
                                        name="startDate"
                                        value={editStartDate}
                                        onChange={(e) =>
                                          editHandleChangeDate(e, "startDate")
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
                                      editPresentCompanyFlag
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
                                      value={editEndDate}
                                      onChange={(e) =>
                                        editHandleChangeDate(e, "endDate")
                                      }
                                      KeyboardButtonProps={{
                                        "aria-label": "change date",
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                              </MuiPickersUtilsProvider>
                              {endDate === startDate && (
                                <Typography
                                  style={{ color: "red" }}
                                  align="left"
                                >
                                  Start and End date cannot be equal
                                </Typography>
                              )}
                            </Grid>
                          </Grid>

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
                              <IconButton
                                onClick={addMoreOrganization}
                                style={{ border: 0, outline: 0 }}
                              >
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
                        </form>
                      </Hidden>
                    )}
                  </>
                );
              })}
            </Grid>

            {/* <div className={classes.addexpbutton}>
            <Button
              variant="contained"
              color={addClass ? "primary" : "secondary"}
              onClick={showForm}
              className={classes.submit}
            >
              {addClass ? <>Add Experience</> : <>Cancel</>}
            </Button>
          </div> */}
            {/* <form onSubmit={handleSubmit(saveProfessional)}>
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
                        <Typography style={{ color: "red" }}>
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
                        <Typography style={{ color: "red" }}>
                          Enter the Designation
                        </Typography>
                      )}
                      {designationM && (
                        <Typography style={{ color: "red" }}>
                          Exceeding 255 words
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
                        <Typography style={{ color: "red" }}>
                          Enter the City
                        </Typography>
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
                        <Typography style={{ color: "red" }}>
                          Enter the Role Description
                        </Typography>
                      )}
                      {roleDescriptionM && (
                        <Typography style={{ color: "red" }}>
                          Exceeding 255 words
                        </Typography>
                      )}
                    </Grid>
         
                    <Grid container>
                      <Grid item xs={12} style={{ marginTop: "20px" }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={organs.presentCompanyFlag}
                              value={organs.presentCompanyFlag}
                              onChange={(e) =>
                                handleCheckChange(
                                  index,
                                  e,
                                  "presentCompanyFlag"
                                )
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
                      {endDate === startDate && (
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
                  <IconButton
                    onClick={addMoreOrganization}
                    style={{ border: 0, outline: 0 }}
                  >
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
          </form> */}
          </div>
        </div>
      </MuiPickersUtilsProvider>
    </>
  );
}

export default withSnackbar(Professional);

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(100),
    marginRight: "auto",
    marginLeft: "auto",
    paddingTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "100%",
      padding: theme.spacing(5, 0, 0, 0),
    },
  },
  paperarea: {
    padding: theme.spacing(10),
    paddingTop: theme.spacing(5),
    borderRadius: theme.spacing(2),
    backgroundColor: "#f1f2f5",
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2, 2, 5, 2),
    },
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
  red: {
    color: "red",
  },
}));
