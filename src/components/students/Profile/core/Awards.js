import React, { useContext, useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  IconButton,
  Tooltip,
  Hidden,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { LoginContext } from "../../../../Context/LoginContext";
import axios from "axios";
import SimpleModal from "../../../../components/atoms/Modal";
import { TrainRounded, TrendingUpRounded } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import AssistantIcon from "@material-ui/icons/Assistant";
import { withSnackbar } from "notistack";
import { set, useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(100),
    marginRight: "auto",
    marginLeft: "auto",
    paddingTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "100%",
      padding: theme.spacing(5, 0, 0, 0),
    },
  },
  paperarea: {
    display: "none",
    padding: theme.spacing(10),
    paddingTop: theme.spacing(5),
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2, 2, 5, 2),
    },
  },
  body: {
    minHeight: "250px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  ccard: {
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    // backgroundColor: "#3586ff",
  },
  submit: {
    borderRadius: theme.spacing(2),
  },
  red: {
    color: "red",
  },
  addEditDelete: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

function Recommendation(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const classes = useStyles();
  const logindetails = useContext(LoginContext);
  const baseUrl = process.env.REACT_APP_URL;
  // const baseUrl = "http://studost.devkraft.in/studost/api"

  const [recom, setAwardsList] = useState(logindetails.userData.awardsList);
  // console.log(recom);

  const [aname, setAname] = useState("");
  const [adescription, setAdescription] = useState("");

  const [anameM, setAnameM] = useState(false);
  const [adescriptionM, setAdescriptionM] = useState(false);

  const [awardName, setAwardName] = useState("");
  const [awardDescription, setAwardDescription] = useState("");

  const [awardNameM, setAwardNameM] = useState(false);
  const [awardDescriptionM, setAwardDescriptionM] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [modalmsg, setModalmsg] = useState("");
  const [modalvariation, setModalvariation] = useState("success");

  const [show, setShow] = useState(true);
  const [showEdit, setShowEdit] = useState(true);
  const [index2, setIndex2] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const body = {
    awardDetails: [
      {
        awardId: 0,
        description: adescription,
        name: aname,
        operationType: "string",
      },
    ],
    studentId: logindetails.userData.studentId,
    userId: logindetails.userData.userId,
  };

  const config = {
    method: "post",
    url: `${baseUrl}/student/save-awards-details`,
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
  };

  const saveRecomen = (e) => {
    // alert("qwertyu")
    if (aname.length > 1000) {
      setAnameM(true);
    } else setAnameM(false);
    if (adescription.length > 3000) {
      setAdescriptionM(true);
    } else setAnameM(false);
    if (aname.length <= 1000 && adescription.length <= 3000) {
      axios(config)
        .then((response) => {
          // console.log(response.data);
          setOpenModal(true);
          setModalmsg(response.data.message);
          setShow(true);
          getUserInfo(logindetails.userData.userId);
          props.enqueueSnackbar("Successfully Saved", {
            variant: "success",
          });
          setAname("");
          setAdescription("");
          setShowForm(!showForm);
        })
        .catch((err) => {
          console.log(err);
          props.enqueueSnackbar("Something Went Wrong", {
            variant: "error",
          });
          setOpenModal(true);
          setModalmsg(err.data.message);
        });
    }
  };

  useEffect(() => {
    getUserInfo(logindetails.userData.userId);
    //console.log(awardName+awardDescription);
  }, [awardName, awardDescription]);

  const getUserInfo = (id) => {
    axios
      .get(baseUrl + `/student/load-student-profile-data?userId=${id}`)
      .then((res) => {
        setAwardsList(res.data.body.awardsList);
      })
      .catch((err) => console.log(err));
  };

  const deleteTheItem = (deleteItem) => {
    //console.log(deleteItem);
    const body = {
      awardDetails: [
        {
          awardId: deleteItem.awardId,
          description: deleteItem.description,
          name: deleteItem.name,
          operationType: "D",
        },
      ],
      studentId: logindetails.userData.studentId,
      userId: logindetails.userData.userId,
    };
    const config = {
      method: "post",
      url: `${baseUrl}/student/save-awards-details`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };
    axios(config)
      .then((response) => {
        // console.log(response.data);
        setOpenModal(true);
        setModalmsg(response.data.message);
        setShow(true);
        getUserInfo(logindetails.userData.userId);
        props.enqueueSnackbar("Successfully deleted", {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        props.enqueueSnackbar("Something Went Wrong", {
          variant: "error",
        });
        setOpenModal(true);
        setModalmsg(err.data.message);
      });
  };

  const saveRecomen2 = (reco) => {
    const body = {
      awardDetails: [
        {
          awardId: reco.awardId,
          description: awardDescription,
          name: awardName,
          operationType: "U",
        },
      ],
      studentId: logindetails.userData.studentId,
      userId: logindetails.userData.userId,
    };

    const config = {
      method: "post",
      url: `${baseUrl}/student/save-awards-details`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };
    if (awardName.length > 1000) {
      setAwardNameM(true);
    } else setAwardNameM(false);
    if (awardDescription.length > 3000) {
      setAwardDescriptionM(true);
    } else setAwardDescriptionM(false);
    if (awardName.length <= 1000 && awardDescription.length <= 3000) {
      axios(config)
        .then((response) => {
          // console.log(response.data);
          setOpenModal(true);
          setModalmsg(response.data.message);
          setShow(true);
          getUserInfo(logindetails.userData.userId);
          setIndex2(null);
          props.enqueueSnackbar("Successfully updated", {
            variant: "success",
          });
          setAname("");
          setAdescription("");
        })
        .catch((err) => {
          console.log(err);
          props.enqueueSnackbar("Something Went Wrong", {
            variant: "error",
          });
          setOpenModal(true);
          setModalmsg(err.data.message);
        });
    }
  };
  return (
    <div>
      <SimpleModal
        //openModal={openModal}
        setOpenModal={setOpenModal}
        modalmsg={modalmsg}
        modalvariation={modalvariation}
        setModalvariation={setModalvariation}
      />
      <div className="bio__buttons mb-5">
        <div className="cancel__btn" type="button">
          CANCEL
        </div>
        <div className="save__btn " type="button">
          SUBMIT
        </div>
      </div>
      <div className="bio__container">
        <div className="title__container bg_blue p-2 pr-3 pl-3 mb-3">
          <div className="educatoin__title">Add Awards</div>
          <IconButton
            style={{ backgroundColor: "#3586ff", border: 0, outline: 0 }}
            onClick={() => setShowForm(!showForm)}
          >
            <AddIcon
              style={{
                color: "white",
                transform: showForm ? "rotate(45deg)" : "",
              }}
            />
          </IconButton>
        </div>
        {showForm && (
          <>
            {" "}
            <div className="bio__buttons mb-3">
              <div
                className="btn education__greenbtn"
                type="button"
                style={{ border: "none", marginRight: "10px" }}
                onClick={() => {
                  setAname("");
                  setAdescription("");
                }}
              >
                CLEAR DETAILS
              </div>
              <div
                className="btn education__greenbtn"
                type="button"
                onClick={saveRecomen}
              >
                SAVE DETAILS
              </div>
            </div>
            <div className="container bg_blue br_5">
              <form>
                <div className="">
                  <div className="col p-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Award Name"
                      value={aname}
                      onChange={(e) => setAname(e.target.value)}
                    />
                  </div>
                  <div className="col p-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Award Description"
                      value={adescription}
                      onChange={(e) => setAdescription(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
        <div>
          {recom
            ? recom.map((reco, index) => {
                //console.log({ reco });
                return (
                  <>
                    <div className="bg_blue pl-4 pr-4 pt-2 pb-2 mt-3 br_5">
                      <Card className={classes.ccard} raised key={index}>
                        {/* <Typography>Award No : {index + 1}</Typography> */}
                        <div className={classes.addEditDelete}>
                          <Typography variant="h6" style={{ fontSize: "16px" }}>
                            {reco.name}
                          </Typography>
                          <div>
                            <Tooltip title="Edit">
                              <IconButton
                                onClick={() => {
                                  setAwardName(reco.name);
                                  setAwardDescription(reco.description);
                                  setIndex2(index);
                                  setShowEdit(false);
                                }}
                                style={{ border: 0, outline: 0 }}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                onClick={() => {
                                  deleteTheItem(reco);
                                }}
                                style={{ border: 0, outline: 0 }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </div>
                        <Typography>{reco.description}</Typography>
                      </Card>
                      {index === index2 && (
                        <Hidden xsUp={showEdit}>
                          <form
                            className={classes.body}
                            onSubmit={handleSubmit(() => saveRecomen2(reco))}
                          >
                            <IconButton
                              onClick={() => {
                                setShowEdit(true);
                                setIndex2(index);
                              }}
                              style={{ border: 0, outline: 0 }}
                            >
                              <CancelIcon />
                            </IconButton>
                            <TextField
                              variant="outlined"
                              label="Award Name"
                              fullWidth
                              value={awardName}
                              onChange={(e) => setAwardName(e.target.value)}
                              inputProps={{
                                ...register("awardName", { required: true }),
                              }}
                            />
                            {errors.awardName && (
                              <Typography className={classes.red}>
                                please enter the award name
                              </Typography>
                            )}
                            {awardNameM && (
                              <Typography className={classes.red}>
                                Exceeding the 1000 character
                              </Typography>
                            )}

                            <TextField
                              variant="outlined"
                              label="Award Description "
                              type="email"
                              multiline
                              fullWidth
                              rows={2}
                              value={awardDescription}
                              onChange={(e) =>
                                setAwardDescription(e.target.value)
                              }
                              inputProps={{
                                ...register("awardDescription", {
                                  required: true,
                                }),
                              }}
                            />
                            {errors.awardDescription && (
                              <Typography className={classes.red}>
                                please enter the award description
                              </Typography>
                            )}
                            {awardDescriptionM && (
                              <Typography className={classes.red}>
                                Exceeding the 1000 character
                              </Typography>
                            )}
                            <Button
                              type="submit"
                              // onClick={(e) => saveRecomen(e)}
                              variant="contained"
                              color="primary"
                              fullWidth
                              className={classes.submit}
                            >
                              Save
                            </Button>
                          </form>
                        </Hidden>
                      )}
                    </div>
                  </>
                );
              })
            : null}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              display: "none",
            }}
          >
            <Typography>Add Awards</Typography>
            <Tooltip title="Click to add more Awards">
              <IconButton
                onClick={() => setShow(false)}
                style={{ border: 0, outline: 0 }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </div>
          <Hidden xsUp={show}>
            <IconButton
              onClick={() => {
                setShow(true);
              }}
              style={{ marginLeft: "90%" }}
            >
              <CancelIcon />
            </IconButton>
            <form className={classes.body} onSubmit={handleSubmit(saveRecomen)}>
              <TextField
                variant="outlined"
                label="Award Name"
                fullWidth
                value={aname}
                onChange={(e) => setAname(e.target.value)}
                inputProps={{
                  ...register("awardName", {
                    required: true,
                    pattern: /[a-zA-Z]/,
                  }),
                }}
              />
              {errors.awardName && (
                <Typography className={classes.red}>
                  please enter the award name
                </Typography>
              )}
              {awardNameM && (
                <Typography className={classes.red}>
                  Exceeding 1000 character
                </Typography>
              )}

              <TextField
                variant="outlined"
                label="Award Description"
                multiline
                fullWidth
                rows={2}
                value={adescription}
                onChange={(e) => setAdescription(e.target.value)}
                inputProps={{
                  ...register("awardDescription", {
                    required: true,
                    pattern: /[a-zA-Z]/,
                  }),
                }}
              />
              {errors.awardDescription && (
                <Typography className={classes.red}>
                  please enter the award description
                </Typography>
              )}
              {awardDescriptionM && (
                <Typography className={classes.red}>
                  Exceeding 3000 character
                </Typography>
              )}
              <Button
                type="submit"
                // onClick={(e) => saveRecomen(e)}
                variant="contained"
                color="primary"
                fullWidth
                className={classes.submit}
              >
                Save
              </Button>
            </form>
          </Hidden>
        </div>
        <Paper elevation={3} className={classes.paperarea}>
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
            <Typography variant="h5">Awards</Typography>
            <AssistantIcon
              style={{
                fontSize: "50px",
                marginLeft: "20px",
              }}
            />
          </Grid>
          <div>
            {recom
              ? recom.map((reco, index) => {
                  //console.log({ reco });
                  return (
                    <>
                      <Card className={classes.ccard} raised key={index}>
                        {/* <Typography>Award No : {index + 1}</Typography> */}
                        <div className={classes.addEditDelete}>
                          <Typography variant="h6">{reco.name}</Typography>
                          <div>
                            <Tooltip title="Edit">
                              <IconButton
                                onClick={() => {
                                  setAwardName(reco.name);
                                  setAwardDescription(reco.description);
                                  setIndex2(index);
                                  setShowEdit(false);
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                onClick={() => {
                                  deleteTheItem(reco);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </div>
                        <Typography>{reco.description}</Typography>
                      </Card>
                      {index === index2 && (
                        <Hidden xsUp={showEdit}>
                          <form
                            className={classes.body}
                            onSubmit={handleSubmit(() => saveRecomen2(reco))}
                          >
                            <IconButton
                              onClick={() => {
                                setShowEdit(true);
                                setIndex2(index);
                              }}
                            >
                              <CancelIcon />
                            </IconButton>
                            <TextField
                              variant="outlined"
                              label="Award Name"
                              fullWidth
                              value={awardName}
                              onChange={(e) => setAwardName(e.target.value)}
                              inputProps={{
                                ...register("awardName", { required: true }),
                              }}
                            />
                            {errors.awardName && (
                              <Typography className={classes.red}>
                                please enter the award name
                              </Typography>
                            )}
                            {awardNameM && (
                              <Typography className={classes.red}>
                                Exceeding the 1000 character
                              </Typography>
                            )}

                            <TextField
                              variant="outlined"
                              label="Award Description "
                              type="email"
                              multiline
                              fullWidth
                              rows={2}
                              value={awardDescription}
                              onChange={(e) =>
                                setAwardDescription(e.target.value)
                              }
                              inputProps={{
                                ...register("awardDescription", {
                                  required: true,
                                }),
                              }}
                            />
                            {errors.awardDescription && (
                              <Typography className={classes.red}>
                                please enter the award description
                              </Typography>
                            )}
                            {awardDescriptionM && (
                              <Typography className={classes.red}>
                                Exceeding the 1000 character
                              </Typography>
                            )}
                            <Button
                              type="submit"
                              // onClick={(e) => saveRecomen(e)}
                              variant="contained"
                              color="primary"
                              fullWidth
                              className={classes.submit}
                            >
                              Save
                            </Button>
                          </form>
                        </Hidden>
                      )}
                    </>
                  );
                })
              : null}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Typography>Add Awards</Typography>
              <Tooltip title="Click to add more Awards">
                <IconButton onClick={() => setShow(false)}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </div>
            <Hidden xsUp={show}>
              <IconButton
                onClick={() => {
                  setShow(true);
                }}
                style={{ marginLeft: "90%" }}
              >
                <CancelIcon />
              </IconButton>
              <form
                className={classes.body}
                onSubmit={handleSubmit(saveRecomen)}
              >
                <TextField
                  variant="outlined"
                  label="Award Name"
                  fullWidth
                  value={aname}
                  onChange={(e) => setAname(e.target.value)}
                  inputProps={{
                    ...register("awardName", {
                      required: true,
                      pattern: /[a-zA-Z]/,
                    }),
                  }}
                />
                {errors.awardName && (
                  <Typography className={classes.red}>
                    please enter the award name
                  </Typography>
                )}
                {awardNameM && (
                  <Typography className={classes.red}>
                    Exceeding 1000 character
                  </Typography>
                )}

                <TextField
                  variant="outlined"
                  label="Award Description"
                  multiline
                  fullWidth
                  rows={2}
                  value={adescription}
                  onChange={(e) => setAdescription(e.target.value)}
                  inputProps={{
                    ...register("awardDescription", {
                      required: true,
                      pattern: /[a-zA-Z]/,
                    }),
                  }}
                />
                {errors.awardDescription && (
                  <Typography className={classes.red}>
                    please enter the award description
                  </Typography>
                )}
                {awardDescriptionM && (
                  <Typography className={classes.red}>
                    Exceeding 3000 character
                  </Typography>
                )}
                <Button
                  type="submit"
                  // onClick={(e) => saveRecomen(e)}
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.submit}
                >
                  Save
                </Button>
              </form>
            </Hidden>
          </div>
        </Paper>
      </div>
    </div>
  );
}

export default withSnackbar(Recommendation);
