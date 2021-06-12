import React, { useState, useContext, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { IconButton, Tooltip, Button } from "@material-ui/core";
import { LoginContext } from "../../Context/LoginContext";
import axios from "axios";
import SimpleModal from "./Modal";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";

export default function ApplicationCards({ values, getAppliedScholaships }) {
  const classes = useStyles();
  // const [value, setvalue] = useState([]);
  useEffect(() => {
    //  console.log(values)
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [modalmsg, setModalmsg] = useState("");
  const [modalvariation, setModalvariation] = useState("success");

  const [confirm, setConfirm] = useState(false);
  const [detailedView, setDetailedView] = useState(false);

  const logindetails = useContext(LoginContext);
  const baseUrl = process.env.REACT_APP_URL;

  // console.log(values, logindetails);

  const deleteApplication = () => {
    const config = {
      method: "DELETE",
      url: `${baseUrl}/application/delete-user-application?application_id=${values.applicationId}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then((res) => {
        setOpenModal(true);
        setModalmsg(res.data.message);
        getAppliedScholaships();
      })
      .catch((err) => console.log(err));
    setConfirm(false);
  };

  const handleClose = () => {
    setConfirm(false);
  };

  const closeDetailedView = () => {
    setDetailedView(false);
  };

  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.Muiroot} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);

  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

  // console.log("values",values)
  return (
    <Card className={classes.root} raised>
      <SimpleModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalmsg={modalmsg}
        modalvariation={modalvariation}
        setModalvariation={setModalvariation}
      />
      <Dialog
        open={confirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you really want to delete the application ?"}
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Disagree
          </Button>
          <Button
            onClick={deleteApplication}
            variant="contained"
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        onClose={closeDetailedView}
        aria-labelledby="customized-dialog-title"
        open={detailedView}
      >
        <DialogTitle id="customized-dialog-title" onClose={closeDetailedView}>
          {values.scholarshipName}
          <Typography>{values.scholarshipAim}</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <div>
            <div className={classes.details__accordian}>
              <Typography className={classes.details__title}>
                Application Id
              </Typography>

              <Typography style={{ marginRight: "10px", marginLeft: "10px" }}>
                : {values.applicationId}
              </Typography>
            </div>
            <div className={classes.details__accordian}>
              <Typography className={classes.details__title}>
                Scholarship Status
              </Typography>

              <Typography style={{ marginRight: "10px", marginLeft: "10px" }}>
                : {values.scholarshipStatusDto.name}
              </Typography>
            </div>
            <div className={classes.details__accordian}>
              <Typography className={classes.details__title}>
                Application Status
              </Typography>

              <Typography style={{ marginRight: "10px", marginLeft: "10px" }}>
                : {values.applicationStatusDto.label}
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
              <Typography className={classes.details__title}>
                Ideal Candidate
              </Typography>

              <Typography style={{ marginRight: "10px", marginLeft: "10px" }}>
                : {values.scholarshipIdealCandidateDescription}
              </Typography>
            </div>
            <div className={classes.details__accordian}>
              <Typography className={classes.details__title}>
                Creation Date
              </Typography>

              <Typography style={{ marginRight: "10px", marginLeft: "10px" }}>
                : {values.scholarshipCreationDate}
              </Typography>
            </div>
            <div className={classes.details__accordian}>
              <Typography className={classes.details__title}>
                Last Date
              </Typography>

              <Typography style={{ marginRight: "10px", marginLeft: "10px" }}>
                : {values.lastDateToApply}
              </Typography>
            </div>
            <div className={classes.details__accordian}>
              <Typography className={classes.details__title}>
                Application Status Changed On
              </Typography>

              <Typography style={{ marginRight: "10px", marginLeft: "10px" }}>
                : {values.statusChangedDate}
              </Typography>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeDetailedView} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <div className={classes.details}>
        <CardContent className={classes.content}>
          <div style={{ width: "230px" }}>
            {/* <Backdrop className={classes.backdrop}>
            </Backdrop> */}
            <Typography component="h5" variant="h5">
              {values.scholarshipName}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {values.scholarshipAim}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <b>App Date :</b> {values.dateOfSubmission}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <b>App Id :</b> {values.applicationId}
            </Typography>
          </div>

          <div style={{ width: "230px" }}>
            <Typography variant="subtitle1" color="textSecondary">
              <b>Duration :</b> {values.durationInYears} years
              {values.durationInMonths} months
            </Typography>
            {/* <Typography variant="subtitle1" color="textSecondary">
              <b>Studost :</b> {values.benefactorName}
            </Typography> */}
            <Typography variant="subtitle1" color="textSecondary">
              <b>Status :</b> {values.applicationStatusDto.label}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              // className={classes.amount}
            >
              <b>Fund Amount : Rs {values.amount}</b>
            </Typography>
          </div>
          <div>
            <div className={classes.lastcoloumn}>
              <div className={classes.statuswidth}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  style={{ textTransform: "none" }}
                >
                  {values.applicationStatusDto.label}
                </Button>
              </div>

              <div className={classes.tools}>
                <Tooltip title="view">
                  <IconButton
                    fontSize="small"
                    onClick={() => setDetailedView(true)}
                  >
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                {/* <Tooltip title="edit">
                  <IconButton>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip> */}
                <Tooltip title="delete">
                  <IconButton onClick={() => setConfirm(true)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: theme.spacing(2, 0, 2, 0),
    borderRadius: theme.spacing(2),
    border: "1px solid black",
    padding: theme.spacing(2),
    width: "100%",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },

  content: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column-reverse",
      height: "auto",
      alignItems: "center",
    },
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
  },
  status: {
    border: "1px solid black",
    padding: theme.spacing(2, 4),
    backgroundColor: theme.palette.primary.main,
    color: "white",
    display: "flex",
    justifyContent: "space-around",
    minWidth: theme.spacing(25),
    // borderRadius: theme.spacing(2),
  },
  lastcoloumn: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  tools: {
    color: "light-grey",
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      maxWidth: "230px",
    },

    // marginRight: "-10px",
    // marginLeft: "-10px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  Muiroot: {
    margin: 0,
    padding: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  details__accordian: {
    display: "flex",
    marginTop: "10px",
    backgroundColor: "#E8E8E8",
    paddingBottom: "5px",
    paddingTop: "5px",
    paddingLeft: "5px",
    borderRadius: "8px",
    marginLeft: "10px",
    marginRight: "10px",
    width: "350px",
  },
  details__title: {
    minWidth: "150px",
  },
  statuswidth: {
    width: "230px",
    // [theme.breakpoints.down("md")]: {
    //   width: "100px",
    // },
  },
}));
