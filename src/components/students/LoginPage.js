import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
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
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Dialog from "@material-ui/core/Dialog";
import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import BenifactoreSignUp from "./../benefactors/BenifactoreSignUp";

export default function SignIn({ setLoginStatus }) {
  const [open, setOpen] = useState(true);
  const [benifatorStatus, setBenifatorStatus] = useState(false);

  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const logindetails = useContext(LoginContext);

  const submitForm = (e) => {
    logindetails.handlesubmit(e);
  };

  return (
    <>
      {benifatorStatus && (
        <BenifactoreSignUp setBenifatorStatus={setBenifatorStatus} />
      )}
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
        className={classes.modalBody}
      >
        <div className={classes.closeicon}>
          <IconButton
            className={classes.avatar}
            onClick={() => {
              setLoginStatus(false);
              setOpen(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div>
          <Typography
            variant="h5"
            style={{
              color: "black",
              textAlign: "center",
            }}
          >
            Sign in
          </Typography>
          {/* </Card> */}
          <form className={classes.form} onSubmit={handleSubmit(submitForm)}>
            <FormControl className={classes.forminputs}>
              <InputLabel>Email</InputLabel>
              <Input
                type="email"
                value={logindetails.email}
                onChange={(e) => {
                  logindetails.setEmail(e.target.value);
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
            </FormControl>

            <FormControl className={classes.forminputs}>
              <InputLabel>Password</InputLabel>
              <Input
                type="password"
                value={logindetails.password}
                onChange={(e) => {
                  logindetails.setPassword(e.target.value);
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

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              style={{ marginTop: "50px" }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              className={classes.submit}
              // onClick={submitForm}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs={12}>
                <Link
                  to="/forgotpassword"
                  href="#"
                  style={{ color: "blue", textDecoration: "none" }}
                >
                  <Typography variant="body2">Forgot password ?</Typography>
                </Link>
                <div
                  onClick={() => {
                    setBenifatorStatus(true);
                  }}
                  style={{
                    color: "blue",
                    textDecoration: "none",
                    marginTop: "2%",
                    cursor: "pointer",
                  }}
                >
                  <Typography variant="body2">
                    Don't have an account? Sign Up
                  </Typography>
                </div>
              </Grid>
            </Grid>
            {logindetails.invalidUser && (
              <Typography color="secondary" style={{ color: "red" }}>
                Invalid User Name or password
              </Typography>
            )}
          </form>
        </div>
      </Dialog>
    </>
  );
}
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
    // padding: theme.spacing(3),
    // paddingBottom: theme.spacing(2),
  },
  avatar: {
    // margin: theme.spacing(1),
    // backgroundColor: theme.palette.primary.main,
    // marginTop: theme.spacing(3),
  },
  form: {
    // width: "80%", // Fix IE 11 issue.
    // marginLeft: theme.spacing(4),
    // marginTop: theme.spacing(-5),
    // width: "300px",
    padding: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(0, 0, 2),
    width: "100%",
    // backgroundImage: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
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

  closeicon: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  modalBody: {
    width: "450px",
    marginRight: "auto",
    marginLeft: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));
