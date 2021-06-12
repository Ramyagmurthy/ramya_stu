import React, { useContext, useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Typography,
  IconButton,
  Tooltip,
  CardMedia,
  Card,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import VideocamIcon from "@material-ui/icons/Videocam";
import axios from "axios";
import { LoginContext } from "../../../../Context/LoginContext";
import SimpleModal from "../../../../components/atoms/Modal";
import { withSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(100),
    marginRight: "auto",
    marginLeft: "auto",
    paddingTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginLeft: "0px",
      marginRight: "0px",
      paddingTop: theme.spacing(5),
    },
  },
  paperarea: {
    padding: theme.spacing(10),
    paddingTop: theme.spacing(5),
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
      paddingTop: theme.spacing(5),
    },
  },
  submit: {
    borderRadius: theme.spacing(2),
  },
}));

function Recommendation(props) {
  const logindetails = useContext(LoginContext);
  const [openModal, setOpenModal] = useState(false);
  const [modalmsg, setModalmsg] = useState("");

  const [src, setSrc] = useState(
    logindetails.userData.videoProfileObjectUri
      ? logindetails.userData.videoProfileObjectUri
      : "https://www.youtube.com/embed/Xr8p17TKPc4"
  );

  const baseUrl = process.env.REACT_APP_URL;
  // const baseUrl = "http://studost.devkraft.in/studost/api"

  // console.log("from video", logindetails.userData.videoProfileObjectUri);

  const addVideo = (e) => {
    console.log(e.size);

    if (e.size < 5242880) {
      if (
        !e.name.includes(".doc") &&
        !e.name.includes(".pdf") &&
        !e.name.includes(".jpg") &&
        !e.name.includes(".jpeg") &&
        !e.name.includes(".png") &&
        !e.name.includes(".svg") &&
        !e.name.includes(".csv") &&
        !e.name.includes(".xls")
      ) {
        let formdataV = new FormData();
        formdataV.append("file", e);
        formdataV.append("userId", logindetails.userData.userId);
        formdataV.append("operationType", "U");

        let configV = {
          method: "post",
          url: `${baseUrl}/student/upload-user-video-profile`,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formdataV,
        };

        axios(configV)
          .then((response) => {
            // console.log(JSON.stringify(response.data));
            setSrc(response.data.body.videoProfileObjectUri);
            // setOpenModal(true);
            setModalmsg(response.data.message);
            props.enqueueSnackbar("Successfully Saved", {
              variant: "success",
            });
          })
          .catch((error) => {
            console.log(error);
            props.enqueueSnackbar("Something went wrong", {
              variant: "error",
            });
          });
      } else {
        props.enqueueSnackbar("video only", {
          variant: "error",
        });
      }
    } else {
      props.enqueueSnackbar("less than 5MB only", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    getUserInfo(logindetails.userData.userId);
  }, []);

  const getUserInfo = (id) => {
    axios
      .get(baseUrl + `/student/load-student-profile-data?userId=${id}`)
      .then((res) => setSrc(res.data.body.videoProfileObjectUri))
      .catch((err) => console.log(err));
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paperarea}>
        <Grid
          container
          xs={12}
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "50px",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Video</Typography>
          <VideocamIcon
            style={{
              fontSize: "50px",
              marginLeft: "20px",
            }}
          />
        </Grid>
        <Grid
          container
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            // paddingBottom: "60px",
          }}
        >
          <Tooltip title="Tap to Add or Change">
            <IconButton
              style={{
                // padding: "10px",
                width: "90px",
              }}
            >
              <label htmlFor="vidoe-file">
                <VideoCallIcon
                  style={{
                    fontSize: "50px",
                  }}
                />
              </label>

              <input
                type="file"
                id="vidoe-file"
                style={{ display: "none" }}
                onChange={(e) => addVideo(e.target.files[0])}
              ></input>
            </IconButton>
          </Tooltip>
          <label>(File Size Should be Less Then 5MB)</label>
        </Grid>
        {/* <Card>
          <CardMedia component="video" autoPlay src={src}></CardMedia>
        </Card> */}
        <iframe
          width="100%"
          height="315"
          src={src}
          //   frameborder="0"
          //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Paper>
    </div>
  );
}
export default withSnackbar(Recommendation);
