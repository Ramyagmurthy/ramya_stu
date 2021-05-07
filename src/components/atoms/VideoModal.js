import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "auto",
    maxWidth: "80%",
    maxHeight: "100vh",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    margin: "auto",
  },
  videoplayer: {
    maxHeight: "600px",
    width: "auto",
    [theme.breakpoints.down("md")]: {
      maxHeight: "500px",
    },
    [theme.breakpoints.down("md")]: {
      maxHeight: "200px",
    },
  },
}));

export default function SimpleModal({
  videopen,
  setVidOpen,
  handleOpenVideo,
  videoSrc,
  setVideoSrc,
}) {
  const classes = useStyles();

  const handleCloseVideo = () => {
    setVidOpen(false);
    setVideoSrc("");
  };

  const body = (
    <div className={classes.paper}>
      <video
        src={videoSrc}
        autoPlay={true}
        controls={true}
        loop={true}
        className={classes.videoplayer}
      />
    </div>
  );

  return (
    <Modal
      open={videopen}
      onClose={handleCloseVideo}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {body}
    </Modal>
  );
}
