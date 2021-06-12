import React, { useState, useContext, useEffect } from "react";
import { LoginContext } from "../../../../Context/LoginContext";
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
  Input,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import axios from "axios";
import { DomainDisabledOutlined, Label, People } from "@material-ui/icons";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Modal from "../../../../components/atoms/Modal";
import { withSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

function CorePersonal(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const logindetails = useContext(LoginContext);
  const userId = logindetails.userData.userId;
  const studentId = logindetails.userData.studentId;

  const [baseInfo, setBaseInfo] = useState(
    logindetails.userData.studentBasicProfileDto
  );

  useEffect(() => {
    getUserInfo(logindetails.userData.userId);
    getMasterData();
  }, []);
  const [genderId, setGenderId] = useState(1);
  const [genderName, setGenderName] = useState("Male");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("2000-01-01");
  const [cityList, setCityList] = useState();
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [adressM, setAdressM] = useState(false);

  const getUserInfo = (id) => {
    axios
      .get(baseUrl + `/student/load-student-profile-data?userId=${id}`)
      .then((res) => {
        setBaseInfo(res.data.body.studentPersonalDetailsDto);
        console.log(res.data.body.studentPersonalDetailsDto);
        if (res.data.body.studentPersonalDetailsDto.cityDto)
          setCity({ ...res.data.body.studentPersonalDetailsDto.cityDto });
        if (res.data.body.studentPersonalDetailsDto.pinCode)
          setPinCode(res.data.body.studentPersonalDetailsDto.pinCode);
        setFname(res.data.body.studentBasicProfileDto.firstName);
        setLname(res.data.body.studentBasicProfileDto.lastName);
        if (res.data.body.studentPersonalDetailsDto.preferredPronounDto) {
          setPrefG(
            res.data.body.studentPersonalDetailsDto.preferredPronounDto.name
          );
          setPrefGId(
            res.data.body.studentPersonalDetailsDto.preferredPronounDto
              .pronounId
          );
        }
        if (res.data.body.studentPersonalDetailsDto.genderDto) {
          setGenderName(res.data.body.studentPersonalDetailsDto.genderDto.name);
          setGenderId(
            res.data.body.studentPersonalDetailsDto.genderDto.genderId
          );
        }
        if (res.data.body.studentPersonalDetailsDto.dateOfBirth) {
          setDob(res.data.body.studentPersonalDetailsDto.dateOfBirth);
        }
        if (res.data.body.studentPersonalDetailsDto.address) {
          setAddress(res.data.body.studentPersonalDetailsDto.address);
        }
      })
      .catch((err) => console.log(err, "from student get", id));
  };

  const corePer = logindetails.userData.studentPersonalDetailsDto;

  const DobChange = (e) => {
    if (e) {
      setDob(e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate());
    }
  };

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [prefG, setPrefG] = useState("He/Him");
  const [prefGId, setPrefGId] = useState(1);

  const [openModal, setOpenModal] = useState(true);
  const [modalmsg, setModalmsg] = useState("");
  const [modalvariation, setModalvariation] = useState("success");
  const [checkFname, setCheckFname] = useState(false);

  const body = JSON.stringify({
    address: address,
    cityDto: {
      cityId: city.cityId,
      name: city.name,
      operationType: "U",
    },
    dateOfBirth: `${dob}`,
    genderDto: {
      genderId: genderId,
      name: genderName,
      operationType: "U",
    },
    preferredPronounDto: {
      name: prefG,
      pronounId: prefGId,
    },
    studentId: studentId,
    userId: userId,
    pinCode: pinCode,
  });

  const baseUrl = process.env.REACT_APP_URL;

  const url = `${baseUrl}/student/save-personal-details`;

  const config = {
    method: "post",
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
  };

  const getMasterData = () => {
    axios
      .get(`${baseUrl}/master/get-master-data`)
      .then((res) => {
        console.log(res.data.body);
        setCityList(res.data.body.cityDtoList);
        // console.log(res.data.body);
      })
      .catch((err) => console.log(`${baseUrl}/master/get-master-data`));
  };

  const saveCorePersonal = () => {
    //console.log(fname.length, fname);
    if (
      fname.length == 0 ||
      !fname ||
      lname.length == 0 ||
      !lname ||
      address.length == 0 ||
      !address
    ) {
      setCheckFname(true);
      return;
    } else {
      setCheckFname(false);
    }
    // console.log(body);
    if (address.length <= 1000) {
      axios(config)
        .then((response) => {
          //console.log(response.data.message);
          setOpenModal(true);
          setModalmsg(response.data.message);
          setModalvariation("success");
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
    } else {
      setAdressM(true);
    }
  };

  const genderSelect = (e) => {
    setGenderName(e.target.value);
    setGenderId(e.target.name);
  };

  const prefgenderchange = (e) => {
    setPrefGId(e.target.name);
    setPrefG(e.target.value);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Modal
        //openModal={openModal}
        setOpenModal={setOpenModal}
        modalmsg={modalmsg}
        modalvariation={modalvariation}
        setModalvariation={setModalvariation}
      />
      <Paper elevation={3} className={classes.paperarea}>
        <form onSubmit={handleSubmit(saveCorePersonal)}>
          <Grid
            container
            // xs={12}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "50px",
            }}
          >
            <Typography variant="h5">Personal Information</Typography>
            <GroupAddIcon
              style={{
                fontSize: "50px",
                marginLeft: "20px",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <div style={{ display: "flex" }}>
              <Grid item xs={5}>
                <InputLabel>Full name</InputLabel>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <Input
                    value={fname}
                    style={{ width: "50%", fontWeight: "bold" }}
                    disabled
                    onChange={(e) => setFname(e.target.value)}
                  />
                  <Input
                    style={{ width: "50%", fontWeight: "bold" }}
                    value={lname}
                    disabled
                    onChange={(e) => setLname(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <People style={{ color: "grey" }} />
                      </InputAdornment>
                    }
                  />
                </div>
                {checkFname && (fname.length < 1 || lname.length < 1) && (
                  <Typography style={{ color: "red" }}>
                    Enter Full Name
                  </Typography>
                )}
              </Grid>
              <Grid item xs={2}></Grid>

              <Grid item xs={5}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
                  <Grid item xs={12}>
                    <KeyboardDatePicker
                      fullWidth
                      disableToolbar
                      variant="inline"
                      // margin="normal"
                      label="Date of Birth"
                      format="dd MMMM yyyy"
                      openTo="year"
                      value={dob}
                      onChange={DobChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>
            </div>
            <Grid item xs={12} className={classes.formItem}>
              <TextField
                fullWidth
                id=""
                label="Permanent Address"
                multiline
                rows={4}
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                // inputProps={{ ...register("pAddress", { required: true }) }}
              />
              {checkFname && address.length < 1 && (
                <Typography style={{ color: "red" }} align="left">
                  Please enter the permanent address
                </Typography>
              )}
              {adressM && (
                <Typography style={{ color: "red" }} align="left">
                  Exceeding 1000
                </Typography>
              )}
            </Grid>
            <div className={classes.cityListClass}>
              <FormControl variant="outlined" className={classes.cityfield}>
                <InputLabel>City</InputLabel>
                <Select
                  label="City"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                >
                  <MenuItem value={city}>
                    <em>{city.name}</em>
                  </MenuItem>
                  {cityList &&
                    cityList.map((cities) => (
                      <MenuItem value={cities}>{cities.name}</MenuItem>
                    ))}
                </Select>
              </FormControl>
              <div className={classes.pincode}>
                <TextField
                  label="Pin Code"
                  variant="outlined"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
              </div>
            </div>

            <Grid
              container
              style={{
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <Grid item xs={12} style={{ alignSelf: "center" }}></Grid>
              <Grid item xs={12} style={{ paddingBottom: "20px" }}>
                <FormLabel>Gender :</FormLabel>

                <FormControl component="fieldset" fullWidth>
                  <RadioGroup
                    aria-label="Role"
                    name="Gender"
                    value={genderName}
                    onChange={genderSelect}
                  >
                    <div className={classes.flexgroup}>
                      <FormControlLabel
                        value="Male"
                        name={1}
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="Female"
                        name={2}
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="Non-Binary"
                        name={3}
                        control={<Radio />}
                        label="Non-Binary"
                      />
                      <FormControlLabel
                        value="Other"
                        name={4}
                        control={<Radio />}
                        label="Other"
                      />
                      {/* <FormControlLabel
                      value="All"
                      name={5}
                      control={<Radio />}
                      label="All"
                    /> */}
                    </div>
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            <Grid item xs={12} style={{ alignSelf: "center" }}>
              <FormLabel>Preferred Pronoun :</FormLabel>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <RadioGroup
                  aria-label="Role"
                  name="prefferedgender"
                  value={prefG}
                  onChange={prefgenderchange}
                >
                  <div className={classes.flexgroup}>
                    <FormControlLabel
                      value="He/Him"
                      name={1}
                      control={<Radio />}
                      label="He/Him"
                    />
                    <FormControlLabel
                      value="She/Her"
                      name={2}
                      control={<Radio />}
                      label="She/Her"
                    />
                    <FormControlLabel
                      value="They/Them"
                      name={3}
                      control={<Radio />}
                      label="They/Them"
                    />
                    <FormControlLabel
                      value="Ze/Zir"
                      name={4}
                      control={<Radio />}
                      label="Ze/Zir"
                    />
                  </div>
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>

          <Grid item xs={12} style={{ marginTop: "50px" }}>
            <Button
              variant="contained"
              color="primary"
              // onClick={saveCorePersonal}
              type="submit"
              fullWidth
              className={classes.submit}
            >
              Save
            </Button>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}

export default withSnackbar(CorePersonal);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.spacing(80),
    marginRight: "auto",
    marginLeft: "auto",
    paddingTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      padding: "0",
      margin: "0",
      maxWidth: "100%",
      padding: theme.spacing(5, 1, 5, 1),
    },
  },
  cityListClass: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(5),
  },
  paperarea: {
    padding: theme.spacing(10),
    paddingTop: theme.spacing(5),
    borderRadius: theme.spacing(2),

    [theme.breakpoints.down("sm")]: {
      padding: "10px 20px 20px 20px",
    },
  },
  formItem: {
    paddingBottom: theme.spacing(5),
    paddingTop: theme.spacing(5),
    color: "grey",
  },
  submit: {
    borderRadius: theme.spacing(2),
  },
  red: {
    color: "red",
  },
  cityfield: {
    width: "40%",
  },
  pincode: {
    width: "40%",
    display: "flex",
    justifyContent: "flex-end",
  },
  flexgroup: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
}));
