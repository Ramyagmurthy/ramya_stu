import React, { useState } from "react";
import {
  Paper,
  TextField,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  Grid,
  Typography,
  Button,
  InputLabel,
  Select,
  MenuItem,
  Card,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";

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
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  formItem: {
    paddingBottom: theme.spacing(5),
    paddingTop: theme.spacing(5),
  },
  formcontrol: {
    maxWidth: "100px",
  },
  form: {
    // border: "2px solid grey",
    margin: "20px 0px 20px 0px",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
}));

export default function Experience(props) {
  const [val, setVal] = useState("");
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [gpa, setGpa] = useState("");
  const [year, setYear] = useState("");
  const [yeare, setYeare] = useState("");
  const [noOfOrganization, setNoOfOrganization] = useState([
    {
      organization: school,
      designation: degree,
    },
  ]);

  const addMoreOrganization = () => {
    setNoOfOrganization([...noOfOrganization, { organizationname: "name" }]);
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
            alignItems: "center",
            paddingBottom: "50px",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">Experience Abroad</Typography>
          <FlightTakeoffIcon
            style={{
              fontSize: "50px",
              marginLeft: "20px",
            }}
          />
        </Grid>
        {noOfOrganization.map((organs, index) => {
          return (  
            <Grid container className={classes.form} key={index}>
              <h5>Organization no : {index + 1}</h5>

              <Grid container item xs={12}>
                <TextField
                  label="Name of the Organisation"
                  fullWidth
                ></TextField>
                <TextField label="Designation" fullWidth></TextField>
                <TextField label="City" fullWidth></TextField>
                <TextField
                  label="Role description"
                  multiline
                  fullWidth
                ></TextField>
                <TextField
                  label="Name of the Organisation"
                  fullWidth
                ></TextField>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel>Start Date</InputLabel>
                    <Select
                      onChange={(e) => setYear(e.target.value)}
                      value={year}
                    >
                      <MenuItem value="2010">2010</MenuItem>
                      <MenuItem value="2011">2011</MenuItem>
                      <MenuItem value="2012">2012</MenuItem>
                      <MenuItem value="2013">2013</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel>End Date</InputLabel>
                    <Select
                      onChange={(e) => setYeare(e.target.value)}
                      value={yeare}
                    >
                      <MenuItem value="2014">2014</MenuItem>
                      <MenuItem value="2015">2015</MenuItem>
                      <MenuItem value="2016">2016</MenuItem>
                      <MenuItem value="2017">2017</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
        <Grid
          style={{
            paddingTop: "50px",
            display: "flex",
            justifyContent: "flex-end",
          }}
          item
          xs={12}
        >
          <Tooltip title="click to add more organizations">
            <IconButton onClick={addMoreOrganization}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid xs={12} style={{ marginTop: "50px" }}>
          <Button variant="contained" color="primary" fullWidth>
            Save
          </Button>
        </Grid>
      </Paper>
    </div>
  );
}
