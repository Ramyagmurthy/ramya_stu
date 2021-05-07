import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: 0,
    height: "300px",
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid item xs={4}>
        {/* <Typography>Footer</Typography> */}
      </Grid>
      <Grid item xs={4}>
        {/* <Typography>Footer</Typography> */}
      </Grid>

      <Grid item xs={4}>
        {/* <Typography>Footer</Typography> */}
      </Grid>
    </div>
  );
}

export default Footer;
