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
import CancelIcon from '@material-ui/icons/Cancel';
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
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(100),
    marginRight: "auto",
    marginLeft: "auto",
    paddingTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  paperarea: {
    padding: theme.spacing(10),
    paddingTop: theme.spacing(5),
    borderRadius: theme.spacing(2),
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

  const [awardName, setAwardName] = useState("");
  const [awardDescription, setAwardDescription] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [modalmsg, setModalmsg] = useState("");
  const [modalvariation, setModalvariation] = useState("success");

  const [show, setShow] = useState(true);
  const [showEdit, setShowEdit] = useState(true);
  const [index2, setIndex2] = useState(null);

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

  const saveRecomen = () => {
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

  }

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
  return (
    <div className={classes.root}>
      <SimpleModal
        //openModal={openModal}
        setOpenModal={setOpenModal}
        modalmsg={modalmsg}
        modalvariation={modalvariation}
        setModalvariation={setModalvariation}
      />
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
                return (<>
                  <Card className={classes.ccard} raised key={index}>
                    {/* <Typography>Award No : {index + 1}</Typography> */}
                    <div className={classes.addEditDelete}>
                      <Typography variant="h6">{reco.name}</Typography>
                      <div>
                        <Tooltip title="Edit">
                          <IconButton   onClick={()=>{
                                      setAwardName(reco.name); 
                                      setAwardDescription(reco.description); 
                                      setIndex2(index); 
                                      setShowEdit(false); 
                                      }}>
                            <EditIcon/>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton onClick={() => {deleteTheItem(reco)}}>
                            <DeleteIcon  />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                    <Typography>{reco.description}</Typography>
                  </Card>
                  {index=== index2 &&  <Hidden xsUp={showEdit}>
                 <form className={classes.body} onSubmit={handleSubmit(() => saveRecomen2(reco))}>
                 <IconButton onClick={()=>{setShowEdit(true); setIndex2(index)}}>
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
                  
                    <TextField
                      variant="outlined"
                      label="Award Description "
                      type="email"
                      multiline
                      fullWidth
                      rows={2}
                      value={awardDescription}
                      onChange={(e) => setAwardDescription(e.target.value)}
                      inputProps={{
                        ...register("awardDescription", { required: true }),
                      }}
                    />
                    {errors.awardDescription && (
                      <Typography className={classes.red}>
                        please enter the award description
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
                </Hidden>}</>
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
          <IconButton onClick={()=>{setShow(true)}} style={{marginLeft:"90%"}}>
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
                  ...register("awardName", { required: true ,pattern: /[a-zA-Z]/}),
                }}
              />
              {errors.awardName && (
                <Typography className={classes.red}>
                  please enter the award name
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
                  ...register("awardDescription", { required: true, pattern: /[a-zA-Z]/ }),
                }}
              />
              {errors.awardDescription && (
                <Typography className={classes.red}>
                  please enter the award description
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
  );
}

export default withSnackbar(Recommendation);
