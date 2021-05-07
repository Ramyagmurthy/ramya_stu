import React from "react";
import { Card, makeStyles } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export default function CarouselSlide(props) {
  const { backgroundColor, title, videoUrl } = props.content;

  const useStyles = makeStyles((theme) => ({
    root: {
      borderRadius: theme.spacing(2),
      margin: "16px",
      [theme.breakpoints.down("sm")]: {
        margin: "0px",
      },
    },
    media: {
      height: "auto",
      maxHeight: "500px",
      width: "650px",
      background: "linear-gradient(305deg, #FE6B8B 30%, #FF8E53 90%)",
      [theme.breakpoints.down("sm")]: {
        // maxWidth: "450px",
        height: "auto",
        maxHeight: "650px",
        width: "325px",
      },
    },
  }));

  const classes = useStyles();

  return (
    <Card className={classes.root} raised>
      <CardMedia
        className={classes.media}
        gutterBottom
        component="video"
        alt="Student Story"
        style={{ maxHeight: "500px" }}
        controls
        autoPlay
        loop
        muted
        src={videoUrl}
      />
    </Card>
  );
}
