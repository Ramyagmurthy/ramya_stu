import React, { useContext, useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Button,
  Grid,
  Badge,
  IconButton,
  Tooltip,
  Input,
  Avatar,
  MenuItem,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import CancelIcon from "@material-ui/icons/Cancel";
import { LoginContext } from "../../Context/LoginContext";
import axios from "axios";
import SimpleModal from "./Modal";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { Link } from "react-router-dom";
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
import { useTheme } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";

export default function FundsCard({
  index,
  values,
  getAllScholarships,
  reLoadScholarships,
}) {
  const theme = useTheme();
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
  const [value, setvalue] = useState([]);
  useEffect(() => {
    // let days = lastDate.split("-");
    // console.log(days[1]);
    // let monthNumber = "01";
    // if (days[1] == "Jan") {
    //   monthNumber = "01";
    // } else if (days[1] == "Feb") {
    //   monthNumber = "02";
    // } else if (days[1] == "Mar") {
    //   monthNumber = "03";
    // } else if (days[1] == "Apr") {
    //   monthNumber = "04";
    // } else if (days[1] == "May") {
    //   monthNumber = "05";
    // } else if (days[1] == "Jun") {
    //   monthNumber = "06";
    // } else if (days[1] == "Jul") {
    //   monthNumber = "07";
    // } else if (days[1] == "Aug") {
    //   monthNumber = "08";
    // } else if (days[1] == "Sep") {
    //   monthNumber = "09";
    // } else if (days[1] == "Oct") {
    //   monthNumber = "10";
    // } else if (days[1] == "Nov") {
    //   monthNumber = "11";
    // } else if (days[1] == "Dec") {
    //   monthNumber = "12";
    // }
    // const lastDate2 = (days[0] + "-" + monthNumber + "-" + days[2]);
    // console.log(days[0] + "-" + monthNumber + "-" + days[2]);
    // alert(days[2] + "-" + monthNumber + "-" + days[0]);
    // setLastDate(lastDate2);
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [modalmsg, setModalmsg] = useState("");
  const [modalvariation, setModalvariation] = useState("success");
  const [sname, setSname] = useState(values.scholarshipName);
  const [checkSname, setCheckSname] = useState(false);
  const [saim, setSaim] = useState(values.scholarshipAim);
  const [checkSaim, setCheckSaim] = useState(false);
  const [sIcandidate, setSIcandidate] = useState(
    values.scholarshipIdealCandidateDescription
  );
  const [checkSicandidate, setCheckSicandidate] = useState(false);
  const [samount, setSamount] = useState(values.amount);
  const [checkSamount, setCheckSamount] = useState(false);
  const [scity, setScity] = useState({ name: "", id: "" });
  const [scountry, setScountry] = useState({ name: "", id: "" });
  const [sgender, setSgender] = useState({ name: "", id: "" });
  const [sdurationY, setSdurationY] = useState(values.durationInYears);
  const [sdurationM, setSdurationM] = useState(values.durationInMonths);
  const [sLastDate, setSLastDate] = useState("hi");
  const [sno, setSno] = useState(values.totalNumberOfScholarships);
  const [sField, setSField] = useState({ name: "", id: "" });

  const [lastDate, setLastDate] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [myscholarships, setmyscholarships] = useState([]);

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
  const [indexId, setIndexId] = useState(values.scholarshipId);
  const [snameM, setSnameM] = useState(false);
  const [saimM, setSaimM] = useState(false);
  const [sIcandidateM, setSIcandidateM] = useState(false);

  const baseUrl = process.env.REACT_APP_URL;

  const [image, setimage] = useState(
    values.scholarshipImagePath ? values.scholarshipImagePath : ""
  );

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

  const addPhoto = (e) => {
    console.log("from pic 1", indexId);
    console.log("from pic 2", index);
    let formdata = new FormData();
    formdata.append("file", e.target.files[0]);
    formdata.append("userId", logindetails.userData.userId);
    formdata.append("scholarshipId", values.scholarshipId);
    formdata.append("benefactorId", logindetails.userData.benefactorId);
    formdata.append("operationType", "U");

    let config = {
      method: "post",
      url: `${baseUrl}/scholarship/upload-scholarship-image`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formdata,
    };

    axios(config)
      .then(function (response) {
        // console.log("from changes ---", response.data);
        // console.log(url);
        setOpenModal(true);
        setModalmsg(response.data.message);
        setModalvariation("success");
        setimage(response.data.body.objectUri);
        reLoadScholarships();
        // getUserinfo(logindetails.user);
        getAllScholarships(logindetails.userData.benefactorId);
      })
      .catch(function (error) {
        console.log(error);
        setOpenModal(true);
        setModalmsg("Failed to upload images");
        setModalvariation("error");
      });
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

    // let days = lastDate.split("-");
    // console.log(days[1]);
    // let monthNumber = "01";
    // if (days[1] == "Jan") {
    //   monthNumber = "01";
    // } else if (days[1] == "Feb") {
    //   monthNumber = "02";
    // } else if ((days[1] == "Mar")) {
    //   monthNumber = "03";
    // } else if ((days[1] == "Apr")) {
    //   monthNumber = "04";
    // } else if ((days[1] == "May")) {
    //   monthNumber = "05";
    // } else if ((days[1] == "Jun")) {
    //   monthNumber = "06";
    // } else if ((days[1] == "Jul")) {
    //   monthNumber = "07";
    // } else if ((days[1] == "Aug")) {
    //   monthNumber = "08";
    // } else if ((days[1] == "Sep")) {
    //   monthNumber = "09";
    // } else if ((days[1] == "Oct")) {
    //   monthNumber = "10";
    // } else if ((days[1] == "Nov")) {
    //   monthNumber = "11";
    // } else if ((days[1] == "Dec")) {
    //   monthNumber = "12";
    // }
    // const lastDate2 = days[2] + "-" + monthNumber + "-" + days[0];
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
      scholarshipId: values.scholarshipId,
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
      // degreeDtoSet: [
      //   {
      //     degreeId: 1,
      //     name: "Bachelor of Arts (General)",
      //   },
      // ],
    };

    const config = {
      method: "post",
      url: `${baseUrl}/scholarship/update-scholarship`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };
    if (sname.length > 1000) {
      setSnameM(true);
    } else setSnameM(false);
    if (saim.length > 2000) {
      setSaimM(true);
    } else setSaimM(false);
    if (sIcandidate.length > 1500) {
      setSIcandidateM(true);
    } else setSIcandidateM(false);
    if (
      sname.length <= 1000 &&
      saim.length <= 2000 &&
      sIcandidate.length <= 1500
    ) {
      axios(config)
        .then((response) => {
          console.log(response.data);
          setOpenModal(true);
          setModalmsg(response.data.message);
          getAllScholarships(logindetails.user);

          setAddfunds(true);
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

  const closenewFund = () => {
    setAddfunds(true);
  };

  const getApplicants = () => {
    alert(values.scholarshipId);
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
    setSelectionProcessRounds(event.target.value);
  };

  const statusListChanges = (event) => {
    setStatusList(event.target.value);
  };

  function getStyles(name, city, theme) {
    return {
      fontWeight:
        city.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  return (
    <div>
      <Card className={classes.root} raised>
        <SimpleModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          modalmsg={modalmsg}
          modalvariation={modalvariation}
          setModalvariation={setModalvariation}
        />
        <Accordion style={{ width: "100%" }}>
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            classes={classes.cardPage}
            style={{
              width: "800px",
            }}
          >
            <CardMedia className={classes.cover}>
              <Avatar
                variant="square"
                style={{ width: "100%", height: "100%" }}
                src={image}
              >
                <IconButton style={{ width: "100%", height: "100%" }}>
                  <label htmlFor={values.scholarshipName}>
                    <AddAPhotoIcon style={{ width: "30%", height: "30%" }} />
                  </label>
                  <input
                    id={values.scholarshipName}
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => addPhoto(e)}
                  />
                </IconButton>
              </Avatar>
            </CardMedia>

            <div
              className={classes.details}
              // style={{ marginLeft: "80px" }}
            >
              <CardContent className={classes.content}>
                <Typography className={classes.heading__card}>
                  {values.scholarshipName}
                </Typography>
                <Typography color="textSecondary" className={classes.heading2}>
                  {values.scholarshipAim}
                </Typography>
                <Typography
                  variant="subtitle1"
                  className={classes.heading__smaller}
                  color="textSecondary"
                >
                  <b>Duration :</b> {values.durationInYears} years
                  {values.durationInMonths} months
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  className={classes.heading__smaller}
                >
                  <b>Type :</b>
                  {values.scholarshipTypeDto && values.scholarshipTypeDto.name
                    ? values.scholarshipTypeDto.name
                    : "All"}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  className={classes.heading__smaller}
                >
                  <b>Studost :</b> {values.benefactorName}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  className={classes.amount}
                >
                  <div className={classes.applicantsNo}>
                    <Typography>
                      <b>No of Applicants : </b>
                    </Typography>

                    <Typography className={classes.number}>
                      {values.countOfApplications}
                    </Typography>
                  </div>
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  className={classes.amount}
                >
                  <b>Fund Amount : Rs {values.amount}</b>
                </Typography>
              </CardContent>
            </div>
          </AccordionSummary>
          <StyledAccordionDetails>
            <div
              style={{
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Link
                  className={classes.button}
                  to={{
                    pathname: `/homecontrol/launchfund/${values.scholarshipId}`,
                    state: { values: values },
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{
                      textTransform: "none",
                      borderRadius: theme.spacing(2),
                    }}
                  >
                    Check All Applicants
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  style={{ paddingBottom: "0px" }}
                >
                  <label htmlFor={values.scholarshipName}>Edit Photo</label>
                </Button>

                <input
                  id={values.scholarshipName}
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => addPhoto(e)}
                />
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setAddfunds(false);
                  }}
                >
                  Edit File
                </Button>
              </div>
              <Card className={classes.newfund} hidden={addfunds}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={closenewFund}>
                    <CancelIcon />
                  </IconButton>
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
                {snameM && (
                  <Typography style={{ color: "red" }}>
                    Exceeding 1000 character
                  </Typography>
                )}
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
                {saimM && (
                  <Typography style={{ color: "red" }}>
                    Exceeding 2000 character
                  </Typography>
                )}
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
                {sIcandidateM && (
                  <Typography style={{ color: "red" }}>
                    Exceeding 2000 character
                  </Typography>
                )}
                <div className={classes.eachfield}>
                  <Typography className={classes.labeltypo} variant="subtitle1">
                    Based On{" "}
                    <sup style={{ color: "red", marginLeft: "3px" }}>*</sup> :
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
                    <FormControlLabel
                      value="merit"
                      control={<Radio />}
                      label="Merit"
                    />
                    <FormControlLabel
                      value="need"
                      control={<Radio />}
                      label="Need"
                    />
                    {/* </div> */}
                  </RadioGroup>
                </div>
                <div className={classes.eachfield}>
                  <Typography className={classes.labeltypo} variant="subtitle1">
                    Type{" "}
                    <sup style={{ color: "red", marginLeft: "3px" }}>*</sup> :
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
                    Amount{" "}
                    <sup style={{ color: "red", marginLeft: "3px" }}>*</sup> :
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
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
                    City{" "}
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
                      renderValue={(selected) =>
                        selected.map((ele) => ele.name + ", ")
                      }
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
                    Country{" "}
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
                      renderValue={(selected) =>
                        selected.map((ele) => ele.name + ", ")
                      }
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
                    Gender{" "}
                    <sup style={{ color: "red", marginLeft: "3px" }}>*</sup> :
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
                      renderValue={(selected) =>
                        selected.map((ele) => ele.name + ", ")
                      }
                      input={<Input />}
                      MenuProps={MenuProps}
                    >
                      <MenuItem
                        key={"hemanth"}
                        value={"hemanth"}
                        style={getStyles("Hemanth", city, theme)}
                      >
                        <Checkbox checked={city.indexOf("hemanth") > -1} />
                        <ListItemText primary={"hemanth"} />
                      </MenuItem>
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
                    Duration{" "}
                    <sup style={{ color: "red", marginLeft: "3px" }}>*</sup> :
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
                    Study Field{" "}
                    <sup style={{ color: "red", marginLeft: "3px" }}>*</sup> :
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-mutiple-name-label"
                      id="demo-mutiple-name"
                      fullWidth
                      multiple
                      value={studyFields}
                      onChange={studyFieldChange}
                      renderValue={(selected) =>
                        selected.map((ele) => ele.name + ", ")
                      }
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
                      renderValue={(selected) =>
                        selected.map((ele) => ele.name + ", ")
                      }
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
                          <Checkbox
                            checked={institutesList.indexOf(name) > -1}
                          />
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
                      renderValue={(selected) =>
                        selected.map((ele) => ele.name + ", ")
                      }
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
                    !institutesList.length > 0
                      ? true
                      : false
                  }
                >
                  Update Scholarship
                </Button>
              </Card>

              <div className={classes.details__accordian}>
                <Typography className={classes.details__title}>
                  Status
                </Typography>

                <Typography style={{ marginRight: "10px", marginLeft: "10px" }}>
                  : {values.scholarshipStatusDto.label}
                </Typography>
              </div>
              <div className={classes.details__accordian}>
                <Typography className={classes.details__title}>
                  Studost
                </Typography>

                <Typography style={{ marginRight: "10px", marginLeft: "10px" }}>
                  : {values.benefactorName}
                </Typography>
              </div>
              <div className={classes.details__accordian}>
                <Typography className={classes.details__title}>
                  Scholarships
                </Typography>

                <Typography style={{ marginRight: "10px", marginLeft: "10px" }}>
                  : {values.numberOfScholarshipsAvailable}
                </Typography>
              </div>
              <div className={classes.details__accordian}>
                <Typography className={classes.details__title}>For</Typography>
                {values.genderDtoSet ? (
                  values.genderDtoSet.map((opt, i) => (
                    <Typography style={{ marginLeft: "10px" }} key={i}>
                      {i == 0 ? ": " : ""} {opt.name}{" "}
                      {i != values.genderDtoSet.length - 1 ? "," : "."}
                    </Typography>
                  ))
                ) : (
                  <Typography>All</Typography>
                )}
              </div>
              <div className={classes.details__accordian}>
                <Typography className={classes.details__title}>
                  Cities
                </Typography>
                {values.cityDtoSet
                  ? values.cityDtoSet.map((opt, i) => (
                      <Typography style={{ marginLeft: "10px" }} key={i}>
                        {i == 0 ? ": " : ""} {opt.name}{" "}
                        {i != values.cityDtoSet.length - 1 ? "," : "."}
                      </Typography>
                    ))
                  : null}
              </div>
              <div className={classes.details__accordian}>
                <Typography className={classes.details__title}>
                  Countries
                </Typography>
                {values.countryDtoSet
                  ? values.countryDtoSet.map((opt, i) => (
                      <Typography style={{ marginLeft: "10px" }} key={i}>
                        {i == 0 ? ": " : ""} {opt.name}{" "}
                        {i != values.countryDtoSet.length - 1 ? "," : "."}
                      </Typography>
                    ))
                  : null}
              </div>

              <div className={classes.details__accordian}>
                <Typography className={classes.details__title}>
                  Institutes :
                </Typography>
                {values.institutionDtoSet
                  ? values.institutionDtoSet.map((opt, i) => (
                      <Typography style={{ marginLeft: "10px" }} key={i}>
                        {i == 0 ? ": " : ""} {opt.name}{" "}
                        {i != values.institutionDtoSet.length - 1 ? "," : "."}
                      </Typography>
                    ))
                  : null}
              </div>
              <div className={classes.details__accordian}>
                <Typography className={classes.details__title}>
                  Rounds :
                </Typography>
                {values.selectionProcessRoundSet ? (
                  values.selectionProcessRoundSet.map((opt, i) => (
                    <Typography style={{ marginLeft: "10px" }} key={i}>
                      {i == 0 ? ": " : ""} {opt.name}{" "}
                      {i != values.selectionProcessRoundSet.length - 1
                        ? ","
                        : "."}
                    </Typography>
                  ))
                ) : (
                  <Typography>Any</Typography>
                )}
              </div>
              <div className={classes.details__accordian}>
                <Typography className={classes.details__title}>
                  Study Field :
                </Typography>
                {values.studyFieldDtoSet ? (
                  values.studyFieldDtoSet.map((opt, i) => (
                    <Typography style={{ marginLeft: "10px" }} key={i}>
                      {i == 0 ? ": " : ""} {opt.name}{" "}
                      {i != values.studyFieldDtoSet.length - 1 ? "," : "."}
                    </Typography>
                  ))
                ) : (
                  <Typography>Any</Typography>
                )}
              </div>
              {/* <div  */}
              {/* <Typography className={classes.details__title}>
                  Degree :
                </Typography>
                {values.selectionProcessRoundSet ? (
                  values.selectionProcessRoundSet.degreeDtoSet.map((opt) => (
                    <Typography
                      style={{ marginRight: "10px", marginLeft: "10px" }}
                    >
                      {opt.name}
                    </Typography>
                  ))
                ) : (
                  <Typography>Any</Typography>
                )} */}
              {/* </div> */}
              <div className={classes.details__accordian}>
                <Typography className={classes.details__title}>
                  Ideal Candidate
                </Typography>

                <Typography style={{ marginLeft: "10px" }}>
                  : {values.scholarshipIdealCandidateDescription}
                </Typography>
              </div>
              <div className={classes.details__accordian}>
                <Typography className={classes.details__title}>
                  Creation Date
                </Typography>

                <Typography style={{ marginLeft: "10px" }}>
                  : {values.scholarshipCreationDate}
                </Typography>
              </div>
              <div className={classes.details__accordian}>
                <Typography className={classes.details__title}>
                  Last Date
                </Typography>

                <Typography style={{ marginLeft: "10px" }}>
                  : {values.lastDateToApply}
                </Typography>
              </div>
            </div>
          </StyledAccordionDetails>
          <div
            className={classes.button_container}
            // style={benefactors && { marginBottom: "20px" }}
          ></div>
        </Accordion>
      </Card>
    </div>
  );
}

const StyledAccordionDetails = withStyles({
  Accorroot: {
    margin: "20px",
    diplay: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
})(AccordionDetails);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: theme.spacing(2, 0, 2, 0),
    borderRadius: theme.spacing(2),
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  content: {
    width: "100%",
  },
  cover: {
    width: 300,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  amount: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    // fontSize: theme.typography.pxToRem(12),
    // fontWeight: theme.typography.fontWeightRegular,
  },
  heading__smaller: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightRegular,
  },
  heading__card: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
  heading2: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  details__accordian: {
    display: "flex",
    backgroundColor: "#E8E8E8",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(8),
  },

  details__title: {
    minWidth: theme.spacing(20),
  },
  apply__button: {
    margin: theme.spacing(2),
  },
  button_container: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
  number: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(0.5, 1.2),
    borderRadius: "50%",
    marginLeft: "10px",
    color: "white",
    // marginRight: theme.spacing(1),
  },
  applicantsNo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "auto",
  },
  cardPage: {
    width: "100%",
    padding: theme.spacing(2),
    border: "2px solid red",
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
  radioGroup: {
    width: "100%",
    justifyContent: "space-arround",
  },
  red: {
    color: "red",
  },
  submit: {
    borderRadius: theme.spacing(2),
  },
  button: {
    width: "30%",
    textTransform: "none",
    textDecoration: "none",
    borderRadius: theme.spacing(2),
  },
}));
