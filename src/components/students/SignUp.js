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
export default function SignUp() {
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
  const [roleName, setRoleName] = useState("");
  const [roleId, setRoleId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalmsg, setModalmsg] = useState("");
  const [modalvariation, setModalvariation] = useState("success");

  const history = useHistory();
  const { user } = useContext(LoginContext);
  const handleSignUp = (e) => {
    //e.preventDefault();
    //console.log(fname, lname, email, password, roleName, roleId);
    // console.log("hi");
    const data = JSON.stringify({
      firstName: fname,
      lastName: lname,
      password: password,
      roleDto: {
        roleId: 1,
        roleName: "Student",
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
        setOpenModal(true);
        setModalmsg(response.data.body.signupMessage);
        //console.log("response", response);
        if (response.data.body.signupMessage == "User created") {
          setTimeout(() => {
            setSignup(true);
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
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
      <div className={classes.root}>
        <SimpleModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          modalmsg={modalmsg}
          modalvariation={modalvariation}
          setModalvariation={setModalvariation}
        />
        {signUp ? <Redirect to="/signin" /> : null}
        <Paper elevattion={3} className={classes.mainpaper}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar
                className={classes.avatar}
                style={{
                  backgroundColor: "#3F51B5",
                }}
              >
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
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
                      inputProps={{
                        ...register("roleName", { required: true }),
                      }}
                    >
                      <FormControlLabel
                        value="Student"
                        control={<Radio />}
                        label="Student"
                      />
                      <FormControlLabel
                        value="Studost"
                        control={<Radio />}
                        label="Studost"
                      />
                      {/* </div> */}
                      {errors.roleName && !roleId && (
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
                    <Link href="/signin" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={5}></Box>
          </Container>
        </Paper>
      </div>
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
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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
}));
