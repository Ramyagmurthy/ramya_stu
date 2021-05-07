import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Card, Paper, StylesProvider } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import People from "@material-ui/icons/People";
import EmailIcon from "@material-ui/icons/Email";
import image from "../../assets/img/bg7.jpg";
import Navbar from "./Navbar";
import Nav from "../Nav";
import { LoginContext } from "../../Context/LoginContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { SnackbarProvider } from "notistack";
import SimpleModal from '../atoms/Modal';
import {useHistory} from 'react-router-dom'
function ForgetPassword() {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let history = useHistory()
  const logindetails = useContext(LoginContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openModal,setOpenModel] = useState(false);
  const [msg, setMsg] =useState("");
  const [modalvariation, setModalvariation] = useState("success");
  const submitForm = (e) => {
    const body = {
      userName: email,
      newPassword: password,
    };
    const config = {
      method: "post",
      url: `${baseUrl}/resetpassword?userName=${email}&newPassword=${password}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };
    // console.log(filterBody);
    axios(config)
      .then((res) => {
        setOpenModel(true)
        setMsg("Password Changed Successfully")
        setModalvariation("success")
        setTimeout(
          function(){ 
            history.push("/") 
          }, 1000);
        
      })
      .catch((err) => {
        console.log(err);
        setOpenModel(true)
        setMsg("Something Went Wrong")
        setModalvariation("error")
        
      });
  };
  const baseUrl = process.env.REACT_APP_URL;

  const getRecomendations = () => {};
  return (
    <>
    <SimpleModal
        openModal={openModal}
        setOpenModal={setOpenModel}
        modalmsg={msg}
        modalvariation={modalvariation}
        setModalvariation={setModalvariation}
      />
      <div
        style={{
          margin: 0,
          padding: 0,
          minHeight: "110vh",
          marginTop: "-40px",
          paddingTop: "40px",
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <Container component="main" className={classes.root}>
          <Paper elevation={3} className={classes.formitems}>
            <div className={classes.paper} style={{ marginTop: "300px" }}>
              <Card
                className={classes.cards}
                style={{
                  height: "120px",
                  marginTop: "-80px",
                  width: "100%",
                }}
              >
                <Avatar
                  className={classes.avatar}
                  style={{
                    marginRight: "auto",
                    marginLeft: "auto",
                    color: "black",
                    backgroundColor: "white",
                  }}
                >
                  <LockOutlinedIcon
                    style={{ marginRight: "auto", marginLeft: "auto" }}
                  />
                </Avatar>{" "}
                <Typography
                  component="h1"
                  variant="h6"
                  style={{ color: "white", textAlign: "center" }}
                >
                  Forgot Password
                </Typography>
              </Card>
              <form
                className={classes.form}
                onSubmit={handleSubmit(submitForm)}
              >
                <FormControl className={classes.forminputs}>
                  <InputLabel>Email</InputLabel>
                  <Input
                    type="email"
                    id="email"
                    label="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <EmailIcon style={{ color: "grey" }} />
                      </InputAdornment>
                    }
                    inputProps={{ ...register("email", { required: true }) }}
                  />
                  {errors.email && (
                    <Typography color="secondary">
                      Please enter the email
                    </Typography>
                  )}
                </FormControl>{" "}
                <FormControl className={classes.forminputs}>
                  <InputLabel>New Password</InputLabel>
                  <Input
                    type="password"
                    id="password"
                    label="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <LockOutlinedIcon style={{ color: "grey" }} />
                      </InputAdornment>
                    }
                    inputProps={{ ...register("password", { required: true }) }}
                  />
                  {errors.password && (
                    <Typography color="secondary">
                      Please enter the password
                    </Typography>
                  )}
                </FormControl>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.submit}
                  // onClick={submitForm}
                >
                  Change Password
                </Button>
                <Grid container>
                  <Grid item xs={12}>
                    {/* <Link href="#" variant="body2">
                      Forgot password?
                    </Link> */}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    {" "}
                  </Grid>
                </Grid>
              </form>
            </div>
          </Paper>
        </Container>
      </div>
    </>
  );
}
export default ForgetPassword;

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "-150px",
    maxWidth: theme.spacing(50),
  },
  paper: {
    // marginTop: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // width: "300px",
    marginRight: "auto",
    marginLeft: "auto",
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    marginTop: theme.spacing(3),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(8),
    // width: "300px",
    padding: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(0, 0, 2),
    // backgroundImage: "linear-gradient(120deg, #84FAB0
  },
  formitems: {
    // marginTop: theme.spacing(20),
    // width: "300px",
  },
  forminputs: {
    width: "100%",
    margin: theme.spacing(1, 0, 1, 0),
    // padding: theme.spacing(0, 1, 0, 1),
  },
  cards: {
    backgroundColor: "#3F51B5",
  },
}));
