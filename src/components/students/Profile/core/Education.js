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
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  Hidden,
  Card,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SchoolIcon from "@material-ui/icons/School";
import { LoginContext } from "../../../../Context/LoginContext";
import axios from "axios";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import SimpleModal from "../../../../components/atoms/Modal";
import theme from "../../../mui_themes";
import { withSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import {Checkbox, Tooltip} from '@material-ui/core';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
 
function Education(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const logindetails = useContext(LoginContext);

  const educationType = [...logindetails.masterData.educationTypeDtoList];
  const collegeNames = [...logindetails.masterData.collegeDtoList];
  const degreeList = [...logindetails.masterData.degreeDtoList.filter((e)=> e.name != "All")];
  const studyFieldList = [...logindetails.masterData.studyFieldDtoList.filter((e)=> e.name != "All")];

  const [educationList, setEducationList] = useState([""]);

  const userinfo = logindetails.masterData.studyFieldDtoList;

  const [openModal, setOpenModal] = useState(false);
  const [modalmsg, setModalmsg] = useState("");
  const [modalvariation, setModalvariation] = useState("success");

  const [education, setEducation] = useState({ name: "", id: "" });
  const [school, setSchool] = useState({ name: "", id: "" });
  const [degree, setDegree] = useState({ name: "", id: "" });
  const [fieldofstudy, setFieldofstudy] = useState({ name: "", id: "" });

  const [educationEdit, setEducationEdit] = useState({ name: "", id: "" });
  const [schoolEdit, setSchoolEdit] = useState({ name: "", id: "" });
  const [degreeEdit, setDegreeEdit] = useState({ name: "", id: "" });
  const [fieldofstudyEdit, setFieldofstudyEdit] = useState({ name: "", id: "" });
  const [gpaEdit, setGpaEdit] = useState("");
  const [startDateEdit, setStartDateEdit] = useState(new Date());
  const [endDateEdit, setEndDateEdit] = useState(new Date());
  const [checkedEdit, setCheckedEdit] = useState(false);

  const [gpa, setGpa] = useState("");
  const [year, setYear] = useState("");
  const [yeare, setYeare] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [addClass, setAddClass] = useState(true);
  const [addClassEdit, setAddClassEdit] = useState(true);
  const [startDate1, setStartDate1] = useState();
  const [endDate1, setEndDate1] = useState();
  const [checked, setChecked] = useState(false);
  const [indexValue, setIndexValue] = useState();
  const [educationId, setEducationId] = useState();
  const baseUrl = process.env.REACT_APP_URL;
  // const baseUrl = "http://studost.devkraft.in/studost/api"

  const url = `${baseUrl}/student/save-education-details`;

  // useEffect(() => {
  //   getuserInfo(logindetails.user);
  // }, []);

  const getuserInfo = (id) => {
    axios
      .get(baseUrl + `/student/load-student-profile-data?userId=${id}`)
      .then((res) => {setEducationList([...res.data.body.educationList]);
      //console.log(res.data.body.educationList);
    })
      .catch((err) => console.log(err));
  };

  const body = {
    studentEducationList: [
      {
        collegeDto: {
          collegeId: school.id,
          name: school.name,
        },
        // collegeNameIfOtherSelected: "string",
        completionDate: endDate,
        degreeDto: {
          degreeId: degree.id,
          operationType: "U",
          name: degree.name,
        },
        educationId: 0,
        educationTypeDto: {
          educationTypeId: education.id,
          educationTypeName: education.name,
        },
        highestEducationFlag: checked,
        operationType: "U",
        percentage: Number(gpa),
        startDate: startDate,
        studyFieldDto: {
          operationType: "U",
          name: fieldofstudy.name,
          studyFieldId: fieldofstudy.id,
        },
      },
    ],
    studentId: logindetails.userData.studentId,
    userId: logindetails.userData.userId,
  };

  const config = {
    method: "post",
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
  };

  const saveEducation = () => {
    //e.preventDefault();
    // console.log("hi");
    
    // if (checkStartDate == checkEndDate) return;
    // console.log(endDate1);
    // console.log(startDate1);
    if(endDate1==startDate1) return;

    
    // console.log(body);
    if (gpa < 0) return;
    axios(config)
      .then((response) => {
        // console.log(response);
        setOpenModal(true);
        // setModalmsg(response.data.message);
        getuserInfo(logindetails.user);
        setAddClass(true);
        props.enqueueSnackbar("Successfully Saved", {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log(err.data);
        setOpenModal(true);
        // setModalmsg(err.data.message);
        props.enqueueSnackbar(err, {
          variant: "error",
        });
      });
  };

  const saveEducationEditted = () => {
    //e.preventDefault();
    // console.log("hi");
    
    // if (checkStartDate == checkEndDate) return;
    // console.log(endDate1);
    // console.log(startDate1);
    // if(endDate1==startDate1) return;

    
    // console.log(body);

    const body = {
      studentEducationList: [
        {
          collegeDto: {
            collegeId: schoolEdit.id,
            name: schoolEdit.name,
          },
          // collegeNameIfOtherSelected: "string",
          completionDate: endDate,
          degreeDto: {
            degreeId: degreeEdit.id,
            operationType: "U",
            name: degreeEdit.name,
          },
          educationId: educationId,
          educationTypeDto: {
            educationTypeId: educationEdit.id,
            educationTypeName: educationEdit.name,
          },
          highestEducationFlag: checkedEdit,
          operationType: "U",
          percentage: Number(gpaEdit),
          startDate: startDateEdit,
          studyFieldDto: {
            operationType: "U",
            name: fieldofstudyEdit.name,
            studyFieldId: fieldofstudyEdit.id,
          },
        },
      ],
      studentId: logindetails.userData.studentId,
      userId: logindetails.userData.userId,
    };
    //console.log(body);
  
    const config = {
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };


    if (gpaEdit < 0) return;
    axios(config)
      .then((response) => {
        // console.log(response);
        setOpenModal(true);
        // setModalmsg(response.data.message);
        getuserInfo(logindetails.user);
        setAddClass(true);
        props.enqueueSnackbar("Successfully Saved", {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log(err.data);
        setOpenModal(true);
        // setModalmsg(err.data.message);
        props.enqueueSnackbar(err, {
          variant: "error",
        });
      });
  };

  const deleteParticular = (id) => {
    //e.preventDefault();
    // console.log("hi");
    
    // if (checkStartDate == checkEndDate) return;
    // console.log(endDate1);
    // console.log(startDate1);
    // if(endDate1==startDate1) return;

    
    // console.log(body);

    const body = {
      studentEducationList: [
        {
          collegeDto: {
            collegeId: schoolEdit.id,
            name: schoolEdit.name,
          },
          // collegeNameIfOtherSelected: "string",
          completionDate: endDate,
          degreeDto: {
            degreeId: degreeEdit.id,
            operationType: "U",
            name: degreeEdit.name,
          },
          educationId: id,
          educationTypeDto: {
            educationTypeId: educationEdit.id,
            educationTypeName: educationEdit.name,
          },
          highestEducationFlag: checkedEdit,
          operationType: "D",
          percentage: Number(gpaEdit),
          startDate: startDateEdit,
          studyFieldDto: {
            operationType: "U",
            name: fieldofstudyEdit.name,
            studyFieldId: fieldofstudyEdit.id,
          },
        },
      ],
      studentId: logindetails.userData.studentId,
      userId: logindetails.userData.userId,
    };
    //console.log(body);
  
    const config = {
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };


    if (gpaEdit < 0) return;
    axios(config)
      .then((response) => {
        // console.log(response);
        setOpenModal(true);
        // setModalmsg(response.data.message);
        getuserInfo(logindetails.user);
        setAddClass(true);
        props.enqueueSnackbar("Successfully Saved", {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log(err.data);
        setOpenModal(true);
        // setModalmsg(err.data.message);
        props.enqueueSnackbar(err, {
          variant: "error",
        });
      });
  };

  const showForm = () => {
    setAddClass(!addClass);
  };

  const classes = useStyles();

  const startDateChange = (e) => {
    //console.log(startDate); 
    setStartDate1(
      e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate()
    );
    setStartDate(
      e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate()
    );
    setStartDateEdit(
      e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate()
    );
  };

  const startDateChangeEdit = (edit) => {
    let days = edit.split("-");
    let monthNumber = "01";
    if(days[1] = "Jan"){
      monthNumber = "01";
    } else if(days[1] = "Feb"){ 
      monthNumber = "02";
    } else if(days[1] = "Mar"){ 
      monthNumber = "03";
    } else if(days[1] = "Apr"){ 
      monthNumber = "04";
    } else if(days[1] = "May"){ 
      monthNumber = "05";
    } else if(days[1] = "Jun"){ 
      monthNumber = "06";
    } else if(days[1] = "Jul"){ 
      monthNumber = "07";
    } else if(days[1] = "Aug"){ 
      monthNumber = "08";
    } else if(days[1] = "Sep"){ 
      monthNumber = "09";
    } else if(days[1] = "Oct"){ 
      monthNumber = "10";
    } else if(days[1] = "Nov"){ 
      monthNumber = "11";
    } else if(days[1] = "Dec"){ 
      monthNumber = "12";
    }
    setStartDateEdit(days[0]+"-"+monthNumber+"-"+days[2]);
  }

  const endDateChangeEdit = (edit) => {
    setEndDateEdit(edit);
  }

  const endDateChange = (e) => {
    //console.log(endDate);
    setEndDate1(e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate());
    setEndDate(e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate());
    setEndDateEdit(e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate());
  };

  //console.log(startDate==endDate)
  useEffect(()=>{
    getuserInfo(logindetails.user);
    setStartDate1(startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate())
    setEndDate1(endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate())
  },[]);
  
  useEffect(()=>{
    getuserInfo(logindetails.user);
  },[educationEdit, schoolEdit, degreeEdit, fieldofstudyEdit, gpaEdit, startDateEdit, endDateEdit, checkedEdit])


  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
// console.log("educationList",educationList)
  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paperarea}>
        <SimpleModal
          //openModal={openModal}
          setOpenModal={setOpenModal}
          modalmsg={modalmsg}
          modalvariation={modalvariation}
          setModalvariation={setModalvariation}
        />
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
          <Typography variant="h5">Education </Typography>
          <SchoolIcon
            style={{
              fontSize: "50px",
              marginLeft: "20px",
            }}
          />
        </Grid>
        <div>
          {educationList
            ? educationList[0]
              ? educationList.map((edu, index) => {
                  return (<>
                    <Card
                      className={classes.education__style}
                      raised
                      key={index}
                    >
                      <div style={{display:"flex", justifyContent:"space-between", flexDirection:"column"}}>
                        <div>
                        <div className={classes.addEditDelete}>
                        <Typography>
                          <strong>
                            {edu.educationTypeDto.educationTypeName}
                          </strong>
                        </Typography>
                        <div>
                        <IconButton    onClick = {()=> { setEducationEdit({  name: edu.educationTypeDto.educationTypeName,
                          id: edu.educationTypeDto.educationTypeId,
                        });setSchoolEdit({
                          name: edu.collegeDto.name,
                          id: edu.collegeDto.collegeId,
                        });
                        setDegreeEdit({
                          name: edu.degreeDto.name,
                          id: edu.degreeDto.degreeId,
                        });
                        setFieldofstudyEdit({
                          name: edu.studyFieldDto.name,
                          id: edu.studyFieldDto.studyFieldId,
                        });
                        setGpaEdit(edu.percentage);
                        startDateChangeEdit(edu.startDate);
                        endDateChangeEdit(edu.completionDate);
                        setCheckedEdit(edu.highestEducationFlag);
                        setIndexValue(index);
                        setAddClassEdit(false);
                        setEducationId(edu.educationId);
                        getuserInfo(logindetails.user);
                      }}
              
                                    >
                          <EditIcon/>
                        </IconButton>
                        <IconButton onClick={()=> {deleteParticular(edu.educationId)}}>
                          <DeleteIcon  />
                        </IconButton>
                      </div>
                        </div>
                        <Typography>
                          <b>Certificate: </b>
                          {edu.degreeDto.name}
                        </Typography>
                        <Typography>
                          <b>School/College: </b>
                          {edu.collegeDto.name}
                        </Typography>
                        <Typography>
                          <b>Year of Completion : </b>
                          {edu.completionDate}
                        </Typography>
                        </div>
                        {edu.highestEducationFlag && <Tooltip title="Highest Education"><AcUnitIcon></AcUnitIcon></Tooltip>}
                      </div>
                    </Card>
         {indexValue === index && <Hidden xsUp={addClassEdit}>
         <IconButton onClick={()=>{setAddClassEdit(true)}} style={{marginLeft:"90%"}}>
                          <CancelIcon />
                  </IconButton>
          <form onSubmit={handleSubmit(saveEducationEditted)}>
            <Grid container className={classes.form}>
              <Grid item xs={12} style={{ padding: "20px 0px 20px 0px" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  select
                  value={educationEdit.name}
                  label="Highest Education Awarded :"
                  inputProps={{ ...register("eduName", { required: true }) }}
                >
                  {educationType.map((option, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        setEducationEdit({
                          name: option.educationTypeName,
                          id: option.educationTypeId,
                        });
                      }}
                      value={option.educationTypeName}
                      name={option.educationTypeId}
                    >
                      {option.educationTypeName}
                    </MenuItem> 
                  ))}
                </TextField>
                {errors.eduName && (
                  <Typography style={{ color: "red" }} align="left">
                    Select Highest Education
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} style={{ padding: "20px 0px 20px 0px" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  select
                  value={schoolEdit.name}
                  label="College/School Name :"
                  inputProps={{ ...register("schoolName", { required: true }) }}
                >
                  {collegeNames.map((option, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        setSchoolEdit({
                          name: option.name,
                          id: option.collegeId,
                        });
                      }}
                      value={option.name}
                      name={option.collegeId}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                {errors.schoolName && (
                  <Typography style={{ color: "red" }} align="left">
                    Select School/college Name
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} style={{ padding: "20px 0px 20px 0px" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  select
                  value={degreeEdit.name}
                  label="Degree :"
                  inputProps={{ ...register("degreeName", { required: true }) }}
                >
                  {degreeList.map((option, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        setDegreeEdit({
                          name: option.name,
                          id: option.degreeId,
                        });
                      }}
                      value={option.name}
                      name={option.degreeId}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                {errors.degreeName && (
                  <Typography style={{ color: "red" }} align="left">
                    Select Degree Name
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} style={{ padding: "20px 0px 20px 0px" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  select
                  value={fieldofstudyEdit.name}
                  label="Study Field :"
                  inputProps={{ ...register("studyField", { required: true }) }}
                >
                  {studyFieldList.map((option, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        setFieldofstudyEdit({
                          name: option.name,
                          id: option.studyFieldId,
                        });
                      }}
                      value={option.name}
                      name={option.studyFieldId}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                {errors.studyField && (
                  <Typography style={{ color: "red" }} align="left">
                    Select Study Field
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} style={{ padding: "20px 0px 20px 0px" }}>
                <TextField
                  variant="outlined"
                  label="GPA : "
                  value={gpaEdit}
                  onChange={(e) => setGpaEdit(e.target.value)}
                  fullWidth
                  inputProps={{ ...register("gpa", { required: true }) }}
                />
                {errors.gpa && (
                  <Typography style={{ color: "red" }} align="left">
                    Select GPA
                  </Typography>
                )}
                {gpa < 0 && (
                  <Typography style={{ color: "red" }} align="left">
                    select positive number
                  </Typography>
                )}
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
                        disableToolbar
                        disableFuture
                        variant="outline"
                        label="Start Date"
                        format="dd-MMM-yyyy"
                        openTo="year"
                        value={startDateEdit}
                        maxDate={endDate}
                        onChange={startDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <KeyboardDatePicker
                      fullWidth
                      disableToolbar
                      disableFuture
                      //minDate={startDate}
                      variant="outline"
                      onChange={endDateChange}
                      label="End Date"
                      format="dd-MMM-yyyy"
                      openTo="year"
                      value={endDateEdit}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                </Grid>
              </MuiPickersUtilsProvider>
              {/* {(startDate1 === endDate1) && (
                  <Typography style={{ color: "red" }} align="left">
                      Start and End date cannot be equal
                  </Typography>
                )} */}
                <Grid item xs={12} style={{ padding: "20px 0px 20px 0px" }}>
                  <div style={{display:"flex"}}>
                  <Checkbox
                    checked={checkedEdit}
                    onClick={(event)=>{setCheckedEdit(event.target.checked)}}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                  <Typography style={{marginTop:"10px"}}>This Is The Highest Education</Typography>
                  </div> 
                </Grid>
            </Grid>
            
            <Grid xs={12} style={{ marginTop: "60px" }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.rounding__edge}
                fullWidth
                //onClick={saveEducation}
              >
                Save
              </Button>
            </Grid>
          </form>
        </Hidden>}
                 </> );
                })
              : null
            : null}
        </div>

        <div className={classes.addexpbutton}>
          <Button
            variant="contained"
            className={classes.rounding__edge}
            color={addClass ? "primary" : "secondary"}
            onClick={showForm}
          >
            {addClass ? <>Add Education</> : <>Cancel</>}
          </Button>
        </div>
        <Hidden xsUp={addClass}>
          <form onSubmit={handleSubmit(saveEducation)}>
            <Grid container className={classes.form}>
              <Grid item xs={12} style={{ padding: "20px 0px 20px 0px" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  select
                  value={education.name}
                  label="Highest Education Awarded :"
                  inputProps={{ ...register("eduName", { required: true }) }}
                >
                  {educationType.map((option, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        setEducation({
                          name: option.educationTypeName,
                          id: option.educationTypeId,
                        });
                      }}
                      value={option.educationTypeName}
                      name={option.educationTypeId}
                    >
                      {option.educationTypeName}
                    </MenuItem> 
                  ))}
                </TextField>
                {errors.eduName && (
                  <Typography style={{ color: "red" }} align="left">
                    Select Highest Education
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} style={{ padding: "20px 0px 20px 0px" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  select
                  value={school.name}
                  label="College/School Name :"
                  inputProps={{ ...register("schoolName", { required: true }) }}
                >
                  {collegeNames.map((option, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        setSchool({
                          name: option.name,
                          id: option.collegeId,
                        });
                      }}
                      value={option.name}
                      name={option.collegeId}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                {errors.schoolName && (
                  <Typography style={{ color: "red" }} align="left">
                    Select School/college Name
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} style={{ padding: "20px 0px 20px 0px" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  select
                  value={degree.name}
                  label="Degree :"
                  inputProps={{ ...register("degreeName", { required: true }) }}
                >
                  {degreeList.map((option, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        setDegree({
                          name: option.name,
                          id: option.degreeId,
                        });
                      }}
                      value={option.name}
                      name={option.degreeId}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                {errors.degreeName && (
                  <Typography style={{ color: "red" }} align="left">
                    Select Degree Name
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} style={{ padding: "20px 0px 20px 0px" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  select
                  value={fieldofstudy.name}
                  label="Study Field :"
                  inputProps={{ ...register("studyField", { required: true }) }}
                >
                  {studyFieldList.map((option, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        setFieldofstudy({
                          name: option.name,
                          id: option.studyFieldId,
                        });
                      }}
                      value={option.name}
                      name={option.studyFieldId}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                {errors.studyField && (
                  <Typography style={{ color: "red" }} align="left">
                    Select Study Field
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} style={{ padding: "20px 0px 20px 0px" }}>
                <TextField
                  variant="outlined"
                  label="GPA : "
                  onChange={(e) => setGpa(e.target.value)}
                  fullWidth
                  inputProps={{ ...register("gpa", { required: true }) }}
                />
                {errors.gpa && (
                  <Typography style={{ color: "red" }} align="left">
                    Select GPA
                  </Typography>
                )}
                {gpa < 0 && (
                  <Typography style={{ color: "red" }} align="left">
                    select positive number
                  </Typography>
                )}
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
                        disableToolbar
                        disableFuture
                        variant="outline"
                        label="Start Date"
                        format="dd-MMM-yyyy"
                        openTo="year"
                        value={startDate}
                        maxDate={endDate}
                        onChange={startDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <KeyboardDatePicker
                      fullWidth
                      disableToolbar
                      disableFuture
                      //minDate={startDate}
                      variant="outline"
                      onChange={endDateChange}
                      label="End Date"
                      format="dd-MMM-yyyy"
                      openTo="year"
                      value={endDate}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                </Grid>
              </MuiPickersUtilsProvider>
              {(startDate1 === endDate1) && (
                  <Typography style={{ color: "red" }} align="left">
                      Start and End date cannot be equal
                  </Typography>
                )}
                <Grid item xs={12} style={{ padding: "20px 0px 20px 0px" }}>
                  <div style={{display:"flex"}}>
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                  <Typography style={{marginTop:"10px"}}>This Is The Highest Education</Typography>
                  </div> 
                </Grid>
            </Grid>
            
            <Grid xs={12} style={{ marginTop: "60px" }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.rounding__edge}
                fullWidth
                //onClick={saveEducation}
              >
                Save
              </Button>
            </Grid>
          </form>
        </Hidden>
      </Paper>
    </div>
  );
}

export default withSnackbar(Education);

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
  addEditDelete: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
  addexpbutton: {
    margin: theme.spacing(4, 2),
    paddingRight: theme.spacing(2),
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  form: {
    backgroundColor: "white",
    padding: theme.spacing(4, 4),
    borderRadius: theme.spacing(2),
  },
  education__style: {
    margin: theme.spacing(2),
    padding: theme.spacing(2, 4),
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "100%",
     marginLeft: "0px",
    },
  },
  rounding__edge: {
    borderRadius: theme.spacing(2),
  },
}));
