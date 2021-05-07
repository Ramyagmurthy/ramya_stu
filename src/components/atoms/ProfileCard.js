import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Hidden, Icon } from "@material-ui/core";
import Container from "@material-ui/core/Container/Container";
import { InputLabel, Input } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(10),
      marginLeft: theme.spacing(5),
     width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
      justifyContent: "center",
    }
  },
  media: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  heading__text: {
    textAlign: "center",
    fontSize: "20px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
      width: "100%",
    },
  },
}));

export default function ProfileCard({ heading, avatar }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} title={heading}>
          <Icon
            component={avatar}
            className={classes.icon}
            style={{ width: "80%", height: "100%" }}
          />
        </CardMedia>
        <Typography gutterBottom className={classes.heading__text}>
          {heading}
        </Typography>
      </CardActionArea>
    </Card>
  );
}
