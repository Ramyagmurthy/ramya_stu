import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Close } from "@material-ui/icons";
import { IconButton, Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "auto",
    maxWidth: "80%",
    maxHeight: "100vh",
    backgroundColor: "transparent",
    // boxShadow: theme.shadows[5],
    // margin: "auto",
  },
  videoplayer: {
    maxHeight: "600px",
    width: "auto",
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
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          paddingBottom: "20px",
          paddingRight: "20px",
        }}
      >
        <Tooltip title="close">
          <IconButton
            onClick={handleCloseVideo}
            style={{
              backgroundColor: "rgba(255,255,255,0.8)",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Close />
          </IconButton>
        </Tooltip>
      </div>
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
