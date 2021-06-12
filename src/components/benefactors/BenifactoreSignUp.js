import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Paper } from "@material-ui/core";
import image from "../../assets/img/bg7.jpg";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { LoginContext } from "../../Context/LoginContext";
import { Redirect } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import SimpleModal from "../atoms/Modal";
import { useForm } from "react-hook-form";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Login from "./../students/LoginPage";
export default function BenifactoreSignUp({ setBenifatorStatus }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //const submitForm = data => console.log(data);
  const classes = useStyles();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [students, setStudents] = useState(true);
  const [benefactors, setBenefactors] = useState(false);
  const [signUp, setSignup] = useState(false);
  const [roleName, setRoleName] = useState("Student");
  const [roleId, setRoleId] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [modalmsg, setModalmsg] = useState("");
  const [modalvariation, setModalvariation] = useState("success");
  const [open, setOpen] = useState(true);
  const [loginStatus, setLoginStatus] = useState(false);
  const [emailM, setEmailM] = useState(false);
  const [lnameM, setLnameM] = useState(false);
  const [fnameM, setFnameM] = useState(false);

  const history = useHistory();
  const { user } = useContext(LoginContext);
  const handleSignUp = (e) => {
    //e.preventDefault();

    //console.log(fname, lname, email, password, roleName, roleId);
    // if((!errors.firstName && !errors.lastName && !errors.password && !errors.roleName)) {
    // alert("hi");
    if(email.length > 255){
      setEmailM(true);
    }
    if(lname.length > 255){
      setLnameM(true);
    }
    if(fname.length > 255){
      setFnameM(true);
    }
    if(email.length < 255 && lname.length < 255 && fname.length < 255) {
        const data = JSON.stringify({
          firstName: fname,
          lastName: lname,
          password: password,
          roleDto: {
            roleId: roleId,
            roleName: roleName,
          },
          signupMessage: "string",
          userId: 0,
          userName: email,
        });
        const config = {
          method: "post",
          url: process.env.REACT_APP_URL + "/user/signup",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };
        axios(config)
          .then((response) => {
            //console.log(response.data);
            //setSignup(true);

            if (response.data.body.signupMessage == "User created") {
              setModalmsg(response.data.body.signupMessage);
              setModalvariation("success");
              setOpenModal(true);
              setTimeout(() => {
                // setBenifatorStatus(false);
                setLoginStatus(true);
              }, 2000);
            } else {
              setOpenModal(true);
              setModalmsg(response.data.body.signupMessage);
              setModalvariation("warning");
            }
            // setLoginStatus(true);
          })
          .catch((err) => console.log(err));
        // }
        }
  };
  const handleChange = (event) => {
    setRoleName(event.target.value);
    if (event.target.value == "Student") {
      setRoleId(1);
    } else if (event.target.value == "Benefactor") {
      setRoleId(2);
    }
  };
  return (
    <>
      {loginStatus && <Login setLoginStatus={setLoginStatus} />}

      {/* <div className={classes.root}> */}

      {/* {signUp ? <Redirect to="/signin" /> : null} */}
      <Dialog
        open={true}
        aria-labelledby="form-dialog-title"
        className={classes.modalBody}
      >
        <SimpleModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          modalmsg={modalmsg}
          modalvariation={modalvariation}
          setModalvariation={setModalvariation}
        />
        <div className={classes.closebutton}>
          <IconButton
            className={classes.avatar}
            onClick={() => {
              setBenifatorStatus(false);
              setOpen(false);
            }}
          >
            <CloseIcon style={{ width: "25px", height: "25px" }} />
          </IconButton>
        </div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography variant="h5" style={{ paddingBottom: "20px" }}>
              Sign Up
            </Typography>
            <form
              className={classes.form}
              onSubmit={handleSubmit(handleSignUp)}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    autoFocus
                    name="firstName"
                    inputProps={{
                      ...register("firstName", { required: true }),
                    }}
                  />
                  {errors.firstName && (
                    <Typography color="secondary">
                      Enter the first name
                    </Typography>
                  )}
                  {
                    fnameM && <Typography style={{color:"red"}}>
                    Exceeding 255 charecter
                  </Typography>
                  }
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="lastName"
                    type="text"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    inputProps={{
                      ...register("lastName", { required: true }),
                    }}
                  />
                  {errors.lastName && (
                    <Typography color="secondary">
                      Enter the last name
                    </Typography>
                  )}
                  {
                    lnameM && <Typography style={{color:"red"}}>
                    Exceeding 250 character
                  </Typography>
                  }
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    inputProps={{ ...register("email", { required: true }) }}
                  />
                  {errors.email && (
                    <Typography color="secondary">enter email</Typography>
                  )}
                  {
                    emailM && <Typography style={{color:"red"}}>
                    Exceeding 250 character
                  </Typography>
                  }
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    inputProps={{
                      ...register("password", { required: true }),
                    }}
                  />
                  {errors.password && (
                    <Typography color="secondary">
                      enter the password
                    </Typography>
                  )}
                </Grid>
                <FormControl component="fieldset" fullWidth>
                  <RadioGroup
                    aria-label="Role"
                    name="Role"
                    value={roleName}
                    onChange={handleChange}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <FormControlLabel
                        value="Student"
                        control={
                          <Radio checked={roleId === 1 ? true : false} />
                        }
                        label="Student"
                      />
                      <FormControlLabel
                        value="Benefactor"
                        control={
                          <Radio checked={roleId === 2 ? true : false} />
                        }
                        label="Benefactor"
                      />
                    </div>
                    {!roleId && (
                      <Typography color="secondary" align="center">
                        select one
                      </Typography>
                    )}
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                // onClick={handleSignUp}
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <div
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => {
                      setLoginStatus(true);
                    }}
                  >
                    Already have an account? Sign in
                  </div>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}></Box>
        </Container>
      </Dialog>
    </>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#F1F2F5",
    margin: 0,
    padding: 0,
    minHeight: "110vh",
    marginTop: theme.spacing(-5),
    paddingTop: theme.spacing(5),
    backgroundImage: "url(" + image + ")",
    backgroundSize: "cover",
    backgroundPosition: "top center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#3F51B5",
    // backgroundImage: "linear-gradient(120deg, #84FAB0 0%, #8FD3F4 100%)",
  },
  mainpaper: {
    maxWidth: theme.spacing(60),
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: theme.spacing(5),
    // minHeight: theme.spacing(50),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  modalBody: {
    width: "50%",
    marginRight: "auto",
    marginLeft: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  closebutton: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));
