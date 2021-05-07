import React, { useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    zIndex: 100,
    // width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars({
  openModal,
  setOpenModal,
  modalmsg,
  severity,
  modalvariation,
  setModalvariation,
}) {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenModal(false);
    setModalvariation("success");
  };

  return (
    <div className={classes.root}>
      <Snackbar open={openModal} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={modalvariation ? modalvariation : "success"}
        >
          {modalmsg}
        </Alert>
        {/* <Alert open={false} severity="error">
          {modalmsg}
        </Alert>
        <Alert open={false} severity="warning">
          {modalmsg}
        </Alert>
        <Alert open={false} severity="info">
          {modalmsg}
        </Alert>
        <Alert open={false} severity="success">
          {modalmsg}
        </Alert> */}
      </Snackbar>
    </div>
  );
}
