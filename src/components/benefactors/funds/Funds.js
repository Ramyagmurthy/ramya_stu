import React, { useState, useContext, useEffect } from "react";
import FundsNavbar from "./FundsNavbar";
import AddIcon from "@material-ui/icons/Add";
import {
  IconButton,
  Input,
  TextField,
  Typography,
  InputAdornment,
  Card,
  MenuItem,
  Button,
  Hidden,
  Tooltip,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import RemoveIcon from "@material-ui/icons/Remove";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { LoginContext } from "../../../Context/LoginContext";
import axios from "axios";
import SimpleModal from "../../atoms/Modal";
import CancelIcon from "@material-ui/icons/Cancel";
import DiscoverCard from "../../atoms/DiscoverCard";
import FundsCard from "../../atoms/FundsCard";
import { ContactSupportOutlined } from "@material-ui/icons";
import CircularProgress from "@material-ui/core/CircularProgress";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
// import { useForm } from 'react-hook-form';

const Funds = ({ handleChange, state }) => {
  const classes = useStyles();
  const logindetails = useContext(LoginContext);
  const cityList =
    logindetails.masterData && logindetails.masterData.cityDtoList
      ? [...logindetails.masterData.cityDtoList]
      : [];
  const countryList =
    logindetails.masterData && logindetails.masterData.countryDtoList
      ? [...logindetails.masterData.countryDtoList]
      : [];
  const genderList =
    logindetails.masterData && logindetails.masterData.genderDtoList
      ? [...logindetails.masterData.genderDtoList]
      : [];
  const studyField =
    logindetails.masterData && logindetails.masterData.studyFieldDtoList
      ? [...logindetails.masterData.studyFieldDtoList]
      : [];
  const institutionsList =
    logindetails.masterData && logindetails.masterData.institutionDtoList
      ? [...logindetails.masterData.institutionDtoList]
      : [];
  const selectionProcessList =
    logindetails.masterData &&
    logindetails.masterData.selectionProcessRoundDtoList
      ? [...logindetails.masterData.selectionProcessRoundDtoList]
      : [];
  const scholarshipStatusList =
    logindetails.masterData && logindetails.masterData.scholarshipStatusDtoList
      ? [...logindetails.masterData.scholarshipStatusDtoList]
      : [];

  const behaviouralQuestionsList =
    logindetails.masterData &&
    logindetails.masterData.behaviouralQuestionsDtoList
      ? [...logindetails.masterData.behaviouralQuestionsDtoList]
      : [];

  const baseUrl = process.env.REACT_APP_URL;

  const [sname, setSname] = useState();
  const [checkSname, setCheckSname] = useState(false);
  const [saim, setSaim] = useState();
  const [checkSaim, setCheckSaim] = useState(false);
  const [sIcandidate, setSIcandidate] = useState();
  const [checkSicandidate, setCheckSicandidate] = useState(false);
  const [samount, setSamount] = useState(0);
  const [checkSamount, setCheckSamount] = useState(false);
  const [scity, setScity] = useState({ name: "", id: "" });
  const [scountry, setScountry] = useState({ name: "", id: "" });
  const [sgender, setSgender] = useState({ name: "", id: "" });
  const [sdurationY, setSdurationY] = useState(0);
  const [sdurationM, setSdurationM] = useState(0);
  const [sLastDate, setSLastDate] = useState();
  const [sno, setSno] = useState();
  const [sField, setSField] = useState({ name: "", id: "" });
  const [openModal, setOpenModal] = useState(false);
  const [modalmsg, setModalmsg] = useState("");
  const [modalvariation, setModalvariation] = useState("success");

  const [lastDate, setLastDate] = useState("2022-01-01");
  const [isLoading, setIsLoading] = useState(false);

  const [myscholarships, setmyscholarships] = useState([]);

  const [snameM, setSnameM] = useState(false);
  const [saimM, setSaimM] = useState(false);
  const [sIcandidateM, setSIcandidateM] = useState(false);


  const [addfunds, setAddfunds] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [meritBase, setMeritBase] = useState("merit");
  const [meritType, setMeritType] = useState("full");
  const [city, setCity] = useState([]);
  const [country, setCountry] = useState([]);
  const [gender, setGender] = useState([]);
  const [studyFields, setStudyFields] = useState([]);
  const [institutesList, setInstitutesList] = useState([]);
  const [selectionProcessRounds, setSelectionProcessRounds] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [question, setQuestion] = useState([]);
  const [customeQuestion, setCustomQuestion] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [questionId, setQuestionId] = useState();
  const [fields, setFields] = useState([]);

  const theme = useTheme();

  useEffect(() => {
    handleChange("a", 2);
    getAllScholarships(logindetails.user);
    let values = logindetails.masterData.behaviouralQuestionsDtoList.filter(
      (e) => e.isMandatory == 1
    );
    setQuestion(values);
    if (window.location.href.includes("/launchfund1")) {
      // setAddfunds(true);
    }
    // console.log(logindetails.user);
  }, []);

  const handleChangeInput = (i, event) => {
    const values = [...fields];
    values[i].answer = null;
    values[i].isMandatory = 0;
    values[i].operationType = "U";
    values[i].otherQuestionName = event.target.value;
    values[i].questionDescription = "Add custom question";
    values[i].questionId = questionId;
    // values[i].scholarshipQuestionMappingId=0;
    setFields(values);
    // setQuestion(...question,values)
    // console.log("filds",fields)
  };

  const handleAdd = () => {
    const values = [...fields];
    values.push({ scholarshipQuestionMappingId: 0 });
    setFields(values);
  };

  const handleRemove = (i) => {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  };

  const reLoadScholarships = () => {
    getAllScholarships(logindetails.user);
  };

  const getAllScholarships = (id) => {
    let getbody = {
      userId: id,
      totalRecordPerPage: 100,
      pageNumber: 1,
    };

    let config = {
      method: "post",
      url: `${baseUrl}/benefactor/get-benefactor-scholarship-data`,
      headers: {
        "Content-Type": "application/json",
      },
      data: getbody,
    };

    axios(config)
      .then((res) => {
        if (res.data.body.scholarshipList != null) {
          setmyscholarships([...res.data.body.scholarshipList]);
        }
        setIsLoading(true);
      })
      .catch((err) => console.log(err));
  };

  const addNewFund = () => {
    setAddfunds(false);
  };
  const closenewFund = () => {
    setAddfunds(true);
  };

  const saveScholarship = () => {
    // var date = new Date();
    // var creationDate =
    //   date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    var base;
    var type;
    if (meritBase == "merit") {
      base = {
        name: "merit",
        scholarshipBasisId: 1,
      };
    } else {
      base = {
        name: "need",
        scholarshipBasisId: 2,
      };
    }

    if (meritType == "partial") {
      type = {
        name: "partial",
        scholarshipTypeId: 1,
      };
    } else {
      type = {
        name: "full",
        scholarshipTypeId: 2,
      };
    }
    

    // if (
    //   !sname ||
    //   !saim ||
    //   !sIcandidate ||
    //   !samount ||
    //   !sdurationY ||
    //   !sdurationM ||
    //   !city.length > 0 ||
    //   !country.length > 0 ||
    //   !gender.length > 0 ||
    //   !studyFields.length > 0 ||
    //   !institutesList.length > 0 ||
    //   !selectionProcessRounds.length > 0 ||
    //   !statusList.length > 0
    // ) {
    //   return;
    // } else {
    let filteredQuestiones = question.filter(
      (e) => e.questionDescription != "Add custom question"
    );
    const body = {
      amount: Number(samount),
      benefactorId: logindetails.userData.benefactorId,
      benefactorName:
        logindetails.userData.benefactorBasicProfileDto.firstName +
        " " +
        logindetails.userData.benefactorBasicProfileDto.lastName,
      cityDtoSet: city,
      countryDtoSet: country,
      durationInMonths: Number(sdurationM),
      durationInYears: Number(sdurationY),
      genderDtoSet: gender,
      institutionDtoSet: institutesList,
      lastDateToApply: `${lastDate}`,
      numberOfScholarshipsAvailable: Number(sno),
      scholarshipAim: saim,
      scholarshipId: 0,
      scholarshipIdealCandidateDescription: sIcandidate,
      scholarshipName: sname,
      scholarshipBasisDto: { ...base },
      // scholarshipStatusDto: { ...statusList },
      scholarshipTypeDto: { ...type },
      selectionProcessRoundSet: [
        {
          selectionProcessRoundId: 1,
          name: "Application Screening",
        },
        {
          selectionProcessRoundId: 4,
          name: "Selection Announcement",
        },
        ...selectionProcessRounds,
      ],
      studyFieldDtoSet: studyFields,
      totalNumberOfScholarships: Number(sno),
      userId: logindetails.userData.userId,
      scholarshipStatusDto: {
        name: "Open",
        scholarshipStatusId: 1,
      },
      scholarshipQuestionsSet: [...filteredQuestiones, ...fields],
      // degreeDtoSet: [
      //   {
      //     degreeId: 1,
      //     name: "Bachelor of Arts (General)",
      //   },
      // ],
    };

    const config = {
      method: "post",
      url: `${baseUrl}/scholarship/create-scholarship`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };
    if(sname.length > 1000){
      setSnameM(true);
    } else setSnameM(false);
    if(saim.length > 2000){
      setSaimM(true);
    } else setSaimM(false);
    if(sIcandidate.length > 1500){
      setSIcandidateM(true);
    } else setSIcandidateM(false);
    if(sname.length <= 1000 && saim.length <= 2000 && sIcandidate.length <= 1500) {
    axios(config)
      .then((response) => {
        setOpenModal(true);
        setModalmsg(response.data.message);
        getAllScholarships(logindetails.user);
        setSname("");
        setSaim("");
        setSIcandidate("");
        setSamount(0);
        setSdurationY(0);
        setSdurationM(0);
        setSno("");
        setLastDate("2022-01-01");
        setMeritBase("merit");
        setMeritType("full");
        setAddfunds(true);
        setCity([]);
        setCountry([]);
        setGender([]);
        setStudyFields([]);
        setInstitutesList([]);
        setSelectionProcessRounds([]);
        setQuestion([]);
        setShowForm(false);
        if (response.data.status == 200) {
          setModalvariation("success");
        } else {
          setModalvariation("error");
        }
      })
      .catch((err) => {
        console.log(err);
        setOpenModal(true);
        setModalmsg("oops !! something went wrong ");
      });
    }
    // }
  };

  const dateChange = (e) => {
    console.log(e);
    if (e)
      setLastDate(
        e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate()
      );
  };

  const handleChangeBase = (event) => {
    setMeritBase(event.target.value);
  };

  const handleChangeType = (event) => {
    setMeritType(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handlegenderChange = (event) => {
    setGender(event.target.value);
  };

  const studyFieldChange = (event) => {
    setStudyFields(event.target.value);
  };

  const institutionChange = (event) => {
    setInstitutesList(event.target.value);
  };

  const selectionProcessChange = (event) => {
    let values = event.target.value;
    let value = [];
    for (let i = 0; i < values.length; i++) {
      if (
        values[i].selectionProcessRoundId != 1 &&
        values[i].selectionProcessRoundId != 4
      ) {
        value.push(values[i]);
      }
    }
    setSelectionProcessRounds(value);
  };

  const selectBehaviouralQuestionChange = (event) => {
    let values = event.target.value;
    // console.log("values",event.target.value ,values.some((e) => e.questionDescription == "Add custom question") )

    // console.log("getQuestionId",getQuestionId)
    if (values.some((e) => e.questionDescription == "Add custom question")) {
      setShowForm(true);
      setFields([{ scholarshipQuestionMappingId: 0 }]);

      let tempData = values.filter(
        (e) => e.questionDescription == "Add custom question"
      );
      var getQuestionId = tempData[0].questionId;
      setQuestionId(getQuestionId);
    } else {
      setShowForm(false);
      setFields([]);
    }

    let value = logindetails.masterData.behaviouralQuestionsDtoList.filter(
      (e) => e.isMandatory == 1
    );
    // console.log("value",value)
    for (let i = 0; i < values.length; i++) {
      if (values[i].isMandatory != 1) {
        value.push(values[i]);
      }
      // console.log("value[i].questionDescription",i ,value[i].questionDescription)
      // if(value[i].questionDescription == "Add custom question"){
      //   setShowForm(true)
      // }
    }
    setQuestion(value);
    // console.log("question",question )
  };

  const statusListChanges = (event) => {
    setStatusList(event.target.value);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(name, city, theme) {
    return {
      fontWeight:
        city.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const displayQuestions = () => {};

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  // console.log("logindetails ravi", logindetails.masterData.behaviouralQuestionsDtoList)
  return (
    <div className={classes.root}>
      {/* <FundsNavbar /> */}
      <SimpleModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalmsg={modalmsg}
        modalvariation={modalvariation}
        setModalvariation={setModalvariation}
      />
      <div className={classes.body}>
        <IconButton onClick={addNewFund}>
          <div className={classes.addbutton}>
            <Typography>Add New Scholarship</Typography>
            <AddIcon />
          </div>
        </IconButton>
      </div>
      <Card className={classes.newfund} hidden={addfunds}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Tooltip title="cancel">
            <IconButton onClick={closenewFund}>
              <CancelIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className={classes.eachfield}>
          <Typography className={classes.labeltypo} variant="subtitle1">
            Scholarship Name{" "}
            <sup style={{ color: "red", marginLeft: "3px" }}>*</sup> :
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={sname}
            name="scholarshipName"
            onChange={(e) => setSname(e.target.value)}
            required
          />
        </div>
        { snameM &&
          <Typography style={{color:"red"}}>
            Exceeding 1000 character
          </Typography>
        }
        <div className={classes.eachfield}>
          <Typography className={classes.labeltypo} variant="subtitle1">
            Scholarship Aim{" "}
            <sup style={{ color: "red", marginLeft: "3px" }}>*</sup> :
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Write a few words about the Scholarship"
            multiline
            value={saim}
            onChange={(e) => setSaim(e.target.value)}
            required
          />
        </div>
        { saimM &&
          <Typography style={{color:"red"}}>
            Exceeding 2000 character
          </Typography>
        }
        <div className={classes.eachfield}>
          <Typography className={classes.labeltypo} variant="subtitle1">
            Ideal Candidate{" "}
            <sup style={{ color: "red", marginLeft: "3px" }}>*</sup> :
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Write a few words about an ideal candidate"
            multiline
            value={sIcandidate}
            onChange={(e) => setSIcandidate(e.target.value)}
            required
          />
        </div>
        { sIcandidateM &&
          <Typography style={{color:"red"}}>
            Exceeding 2000 character
          </Typography>
        }
        <div className={classes.eachfield}>
          <Typography className={classes.labeltypo} variant="subtitle1">
            Based On <sup style={{ color: "red", marginLeft: "3px" }}>*</sup> :
          </Typography>
          <RadioGroup
            row
            className={classes.radioGroup}
            aria-label="base"
            name="base1"
            value={meritBase}
            onChange={handleChangeBase}
            required
          >
            {/* <div style={{width:"100%",display: 'flex',justifyContent: 'flex-start'}}> */}
            <FormControlLabel value="merit" control={<Radio />} label="Merit" />
            <FormControlLabel value="need" control={<Radio />} label="Need" />
            {/* </div> */}
          </RadioGroup>
        </div>
        <div className={classes.eachfield}>
          <Typography className={classes.labeltypo} variant="subtitle1">
            Type <sup style={{ color: "red", marginLeft: "3px" }}>*</sup> :
          </Typography>
          <FormControl fullWidth>
            <RadioGroup
              row
              className={classes.radioGroup}
              aria-label="type"
              name="type1"
              value={meritType}
              onChange={handleChangeType}
              required
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <FormControlLabel
                  value="full"
                  control={<Radio />}
                  label="Full"
                />
                <FormControlLabel
                  value="partial"
                  control={<Radio />}
                  label="Partial"
                />
              </div>
            </RadioGroup>
          </FormControl>
        </div>

        <div className={classes.eachfield}>
          <Typography variant="subtitle1" className={classes.labeltypo}>
            Amount <sup style={{ color: "red", marginLeft: "3px" }}>*</sup> :
          </Typography>
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <TextField
              variant="filled"
              fullWidth
              required
              value={String(samount)}
              onChange={(e) => setSamount(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Rs</InputAdornment>
                ),
              }}
            />
            {samount <= 0 && (
              <Typography className={classes.red}>
                Amount Should Be Greater Then Zero
              </Typography>
            )}
          </div>
        </div>
        <div className={classes.eachfield}>
          <Typography className={classes.labeltypo} variant="subtitle1">
            Recepient City{" "}
            <sup style={{ color: "red", marginLeft: "3px" }}>*</sup> :
          </Typography>
          <FormControl fullWidth>
            <Select
              labelId="demo-mutiple-name-checkbox-label"
              id="demo-mutiple-name"
              multiple
              value={city}
              onChange={handleCityChange}
              input={<Input />}
              renderValue={(selected) => selected.map((ele) => ele.name + ", ")}
              MenuProps={MenuProps}
              required
            >
              {cityList.map((name) => (
                <MenuItem
                  key={name.name}
                  value={name}
                  style={getStyles(name.name, city, theme)}
                >
                  <Checkbox checked={city.indexOf(name) > -1} />
                  <ListItemText primary={name.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={classes.eachfield}>
          <Typography className={classes.labeltypo} variant="subtitle1">
            Scholarship Country{" "}
            <sup style={{ color: "red", marginLeft: "3px" }}>*</sup> :
          </Typography>
          <FormControl fullWidth>
            <Select
              labelId="demo-mutiple-name-label"
              id="demo-mutiple-name"
              fullWidth
              multiple
              value={country}
              onChange={handleCountryChange}
              renderValue={(selected) => selected.map((ele) => ele.name + ", ")}
              input={<Input />}
              required
              MenuProps={MenuProps}
            >
              {countryList.map((name) => (
                <MenuItem
                  key={name.name}
                  value={name}
                  style={getStyles(name.name, city, theme)}
                >
                  <Checkbox checked={country.indexOf(name) > -1} />
                  <ListItemText primary={name.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className={classes.eachfield}>
          <Typography className={classes.labeltypo} variant="subtitle1">
            Gender <sup style={{ color: "red", marginLeft: "3px" }}>*</sup> :
          </Typography>
          <FormControl fullWidth>
            <Select
              labelId="demo-mutiple-name-label"
              id="demo-mutiple-name"
              fullWidth
              multiple
              required
              value={gender}
              onChange={handlegenderChange}
              renderValue={(selected) => selected.map((ele) => ele.name + ", ")}
              input={<Input />}
              MenuProps={MenuProps}
            >
              {genderList.map((name) => (
                <MenuItem
                  key={name.name}
                  value={name}
                  style={getStyles(name.name, city, theme)}
                >
                  <Checkbox checked={gender.indexOf(name) > -1} />
                  <ListItemText primary={name.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={classes.eachfield}>
          <Typography className={classes.labeltypo} variant="subtitle1">
            Duration <sup style={{ color: "red", marginLeft: "3px" }}>*</sup> :
          </Typography>
          <TextField
            variant="filled"
            label="Years"
            style={{ width: "50%" }}
            value={sdurationY}
            onChange={(e) => setSdurationY(e.target.value)}
            required
          />
          <TextField
            variant="filled"
            label="Months"
            style={{ width: "50%" }}
            value={sdurationM}
            onChange={(e) => setSdurationM(e.target.value)}
            required
          />
        </div>
        <div className={classes.eachfield}>
          <Typography className={classes.labeltypo} variant="subtitle1">
            Last Date to apply{" "}
            <sup style={{ color: "red", marginLeft: "3px" }}>*</sup> :
          </Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
            <KeyboardDatePicker
              fullWidth
              variant="outline"
              // margin="normal"
              label="last Date"
              format="dd MMM yyyy"
              onChange={dateChange}
              value={lastDate}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              required
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className={classes.eachfield}>
          <Typography className={classes.labeltypo} variant="subtitle1">
            No of Scholarships <sup style={{ color: "red" }}>*</sup> :
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Enter numbers"
            value={sno}
            onChange={(e) => setSno(e.target.value)}
            required
          />
        </div>

        <div className={classes.eachfield}>
          <Typography className={classes.labeltypo} variant="subtitle1">
            Study Field <sup style={{ color: "red", marginLeft: "3px" }}>*</sup>{" "}
            :
          </Typography>
          <FormControl fullWidth>
            <Select
              labelId="demo-mutiple-name-label"
              id="demo-mutiple-name"
              fullWidth
              multiple
              value={studyFields}
              onChange={studyFieldChange}
              renderValue={(selected) => selected.map((ele) => ele.name + ", ")}
              input={<Input />}
              MenuProps={MenuProps}
              required
            >
              {studyField.map((name) => (
                <MenuItem
                  key={name.name}
                  value={name}
                  style={getStyles(name.name, city, theme)}
                >
                  <Checkbox checked={studyFields.indexOf(name) > -1} />
                  <ListItemText primary={name.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={classes.eachfield}>
          <Typography className={classes.labeltypo} variant="subtitle1">
            Institutions{" "}
            <sup style={{ color: "red", marginLeft: "3px" }}>*</sup> :
          </Typography>
          <FormControl fullWidth>
            <Select
              labelId="demo-mutiple-name-label"
              id="demo-mutiple-name"
              fullWidth
              multiple
              value={institutesList}
              onChange={institutionChange}
              renderValue={(selected) => selected.map((ele) => ele.name + ", ")}
              input={<Input />}
              MenuProps={MenuProps}
              required
            >
              {institutionsList.map((name) => (
                <MenuItem
                  key={name.name}
                  value={name}
                  style={getStyles(name.name, city, theme)}
                >
                  <Checkbox checked={institutesList.indexOf(name) > -1} />
                  <ListItemText primary={name.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={classes.eachfield}>
          <Typography className={classes.labeltypo} variant="subtitle1">
            Selection Rounds{" "}
            <sup style={{ color: "red", marginLeft: "3px" }}>*</sup> :
          </Typography>
          <FormControl fullWidth>
            <Select
              labelId="demo-mutiple-name-label"
              id="demo-mutiple-name"
              fullWidth
              multiple
              value={selectionProcessRounds}
              onChange={selectionProcessChange}
              renderValue={(selected) => selected.map((ele) => ele.name + ", ")}
              input={<Input />}
              MenuProps={MenuProps}
              required
            >
              {selectionProcessList.map((name) => (
                <MenuItem
                  key={name.name}
                  value={name}
                  style={getStyles(name.name, city, theme)}
                >
                  <Checkbox
                    disabled={
                      name.name == "Application Screening" ||
                      name.name == "Selection Announcement"
                        ? true
                        : false
                    }
                    checked={
                      name.name == "Application Screening" ||
                      name.name == "Selection Announcement"
                        ? true
                        : selectionProcessRounds.indexOf(name) > -1
                    }
                  />
                  <ListItemText primary={name.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={classes.eachfield}>
          <Typography className={classes.labeltypo} variant="subtitle1">
            Questions <sup style={{ color: "red", marginLeft: "3px" }}>*</sup> :
          </Typography>
          <FormControl fullWidth>
            <Select
              labelId="demo-mutiple-name-label"
              id="demo-mutiple-name"
              fullWidth
              multiple
              value={question}
              onChange={selectBehaviouralQuestionChange}
              renderValue={(selected) =>
                selected.map((ele) => ele.questionDescription + ", ")
              }
              input={<Input />}
              MenuProps={MenuProps}
              required
            >
              {behaviouralQuestionsList.map((name) => (
                <MenuItem
                  key={name.name}
                  value={name}
                  style={getStyles(name.name, city, theme)}
                >
                  <Checkbox
                    disabled={name.isMandatory == 1 ? true : false}
                    checked={
                      name.isMandatory == 1 ? true : question.indexOf(name) > -1
                    }
                  />
                  <ListItemText primary={name.questionDescription} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {/* <div className={classes.eachfield}>
          <Typography className={classes.labeltypo} variant="subtitle1">
            Scholarship Status{" "}
            <sup style={{ color: "red", marginLeft: "3px" }}>*</sup> :
          </Typography>
          <FormControl fullWidth>
            <Select
              labelId="demo-mutiple-name-label"
              id="demo-mutiple-name"
              fullWidth
              multiple
              value={statusList}
              onChange={statusListChanges}
              renderValue={(selected) => selected.map((ele) => ele.name + ", ")}
              input={<Input />}
              MenuProps={MenuProps}
              required
            >
              {scholarshipStatusList.map((name) => (
                <MenuItem
                  key={name.name}
                  value={name}
                  style={getStyles(name.name, city, theme)}
                >
                  <Checkbox checked={statusList.indexOf(name) > -1} />
                  <ListItemText primary={name.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div> */}
        <Hidden xsUp={!showForm}>
          <div
            className={classes.eachfield}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {fields.map((field, idx) => {
              return (
                <>
                  <div key={`${field}-${idx}`} style={{ width: "100%" }}>
                    <div style={{ display: "flex", margin: "10px" }}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        value={field.otherQuestionName || ""}
                        name="scholarshipName"
                        placeholder="Add custom question"
                        onChange={(e) => handleChangeInput(idx, e)}
                        style={{ marginRight: "10px" }}
                      />
                      {
                        field.otherQuestionName && field.otherQuestionName.length > 1500 &&
                        <Typography style={{color:"red"}}>Exceding 1500</Typography>
                      }
                      <Button
                        color="secondary"
                        variant="contained"
                        type="button"
                        onClick={() => handleRemove(idx)}
                      >
                        X
                      </Button>
                    </div>
                  </div>
                </>
              );
            })}
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={() => handleAdd()}
            >
              +
            </Button>
          </div>
        </Hidden>

        <Button
          variant="contained"
          color="primary"
          className={classes.submit}
          style={{ width: "100%", marginTop: "20px" }}
          onClick={saveScholarship}
          disabled={
            !sname ||
            !saim ||
            !sIcandidate ||
            !samount ||
            samount <= 0 ||
            !city.length > 0 ||
            !country.length > 0 ||
            !gender.length > 0 ||
            !studyFields.length > 0 ||
            !institutesList.length > 0 ||
            !selectionProcessRounds.length > 0
              ? true
              : false
          }
        >
          Launch Scholarship
        </Button>
      </Card>
      <Hidden xsUp={!addfunds}>
        <div className={classes.display__cards}>
          {isLoading ? (
            myscholarships &&
            myscholarships.map((sholarship, i) => {
              return (
                <div key={i}>
                  <FundsCard
                    index={i}
                    values={sholarship}
                    getAllScholarships={getAllScholarships}
                    reLoadScholarships={reLoadScholarships}
                  />
                </div>
              );
            })
          ) : (
            <div className={classes.loading}>
              <CircularProgress />
            </div>
          )}
        </div>
      </Hidden>
    </div>
  );
};

export default Funds;

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
  },
  body: {
    display: "flex",
    justifyContent: "space-around",
  },
  addbutton: {
    width: "100px",
    height: "100px",
    padding: "auto",
  },
  newfund: {
    maxWidth: "650px",
    minHeight: "450px",
    padding: theme.spacing(2, 8),
    marginRight: "auto",
    marginLeft: "auto",
    borderRadius: theme.spacing(2),
  },
  eachfield: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(2),
    alignItems: "center",
  },
  labeltypo: {
    width: "40%",
    display: "flex",
  },
  display__cards: {
    maxWidth: theme.spacing(110),
    marginRight: "auto",
    marginLeft: "auto",
  },

  submit: {
    borderRadius: theme.spacing(2),
  },
  loading: {
    margin: theme.spacing(20, 30, 20, 52),
  },
  radioGroup: {
    width: "100%",
    justifyContent: "space-arround",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  red: {
    color: "red",
  },
  addQuestion: {
    marginLeft: theme.spacing(1),
  },
}));
