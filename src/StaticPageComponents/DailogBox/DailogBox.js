import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { useHistory, Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
    root: {
      margin: "0px",
    },
    topDialogue: {
        marginLeft: "80%",
        marginBottom: "30%",
        [theme.breakpoints.down("sm")]: {
          marginLeft: "0px",
          marginBottom: "0px",
        }
    }
}));
export default function SimpleDailog({ open3 ,setOpen3}) {
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
        setOpen3(false);
      };
    
      const handleClose2 = () => {
        setOpen2(false);
        setOpen3(false);
      };
    
      const [open1, setOpen] = useState(open3);
      const [open2, setOpen2] = useState(false);
      console.log(open3);

    return(<>
        <Dialog
        className={classes.topDialogue}
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open1}
      >
        <List>
          <Link to="/signin" style={{ textDecoration: "none", color: "grey" }}>
            <ListItem autoFocus button>
              <ListItemText
                style={{ textAlign: "center" }}
                primary={"Existing User ?"}
              />
            </ListItem>
          </Link>
          <ListItem
            autoFocus
            button
            onClick={() => {
              setOpen2(true);
              setOpen(false);
            }}
          >
            <ListItemText
              style={{ color: "grey", textAlign: "center" }}
              primary={"New User?"}
            />
          </ListItem>
        </List>
      </Dialog>

      <Dialog
        className={classes.topDialogue}
        onClose={handleClose2}
        aria-labelledby="simple-dialog-title"
        open={open2}
      >
        <DialogTitle id="simple-dialog-title">Sign Up as a?</DialogTitle>
        <List>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <ListItem autoFocus button>
              <ListItemText style={{ textAlign: "center" }} primary="Student" />
            </ListItem>
          </Link>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <ListItem autoFocus button>
              <ListItemText style={{ textAlign: "center" }} primary="Studost" />
            </ListItem>
          </Link>
        </List>
      </Dialog>
    </>);
}