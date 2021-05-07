import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: "-25px",
    marginRight: "-25px",
  },

  toolbar: {
    minHeight: 128,
    alignItems: "flex-start",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: "flex-end",
    paddingLeft: theme.spacing(5),
  },
}));

export default function FundsNavbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar__length}>
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h5" noWrap>
            My Funds
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
