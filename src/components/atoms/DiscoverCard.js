import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { Button } from "@material-ui/core";
import { LoginContext } from "../../Context/LoginContext";
import axios from "axios";
import SimpleModal from "./Modal";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { TramRounded } from "@material-ui/icons";

export default function DiscoverCard({ values }) {
  const classes = useStyles();
  // const [value, setvalue] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalmsg, setModalmsg] = useState("");
  const [modalvariation, setModalvariation] = useState("success");

  const logindetails = useContext(LoginContext);
  const baseUrl = process.env.REACT_APP_URL;

  return (
    <div className={classes.root}>
      <SimpleModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalmsg={modalmsg}
      />
      <Card style={{ borderRadius: "16px" }} className={classes.main_card}>
        <Accordion>
          <div className={classes.details}>
            <CardMedia
              className={classes.cover}
              image={values.scholarshipImagePath}
              title={values.scholarshipName}
            />
            <CardContent className={classes.content}>
              <div className={classes.middle__summary}>
                <Typography className={classes.heading__card}>
                  {values.scholarshipName}
                </Typography>
                <Typography color="textSecondary" className={classes.heading2}>
                  {values.scholarshipAim}
                </Typography>
                <Typography
                  variant="subtitle1"
                  className={classes.heading__smaller}
                  color="textSecondary"
                >
                  <b>Duration :</b> {values.durationInYears} years
                  {" " + values.durationInMonths} months
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  className={classes.heading__smaller}
                >
                  <b>Type :</b>
                  {values.scholarshipTypeDto
                    ? values.scholarshipTypeDto.name
                      ? values.scholarshipTypeDto.name
                      : "no-type"
                    : null}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  className={classes.heading__smaller}
                >
                  <b>Studost :</b> {values.benefactorName}
                </Typography>
              </div>

              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                expandIcon={<ExpandMoreIcon className={classes.expanIcon} />}
              >
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  className={classes.amount}
                >
                  <b>Fund Amount : Rs {values.amount}</b>
                </Typography>
              </AccordionSummary>
            </CardContent>
          </div>
          <AccordionDetails>
            <div style={{ width: "100%" }}>
              <div className={classes.details__accordian}>
                <Typography className={classes.details__title}>
                  Status
                </Typography>

                <Typography>: {values.scholarshipStatusDto.name}</Typography>
              </div>
              <div className={classes.details__accordian}>
                <Typography className={classes.details__title}>
                  Studost
                </Typography>

                <Typography className={classes.details__value}>
                  : {values.benefactorName}
                </Typography>
              </div>
              <div className={classes.details__accordian}>
                <Typography className={classes.details__title}>
                  Scholarships
                </Typography>

                <Typography className={classes.details__value}>
                  : {values.numberOfScholarshipsAvailable}
                </Typography>
              </div>
              <div className={classes.details__accordian}>
                <Typography className={classes.details__title}>For</Typography>
                {values.genderDtoSet ? (
                  values.genderDtoSet.map((opt, i) => (
                    <Typography key={i}>
                      {i === 0 ? ": " : ""} {opt.name}{" "}
                      {i !== values.genderDtoSet.length - 1 ? "," : "."}
                    </Typography>
                  ))
                ) : (
                  <Typography>All</Typography>
                )}
              </div>
              <div className={classes.details__accordian}>
                <Typography className={classes.details__title}>
                  Cities
                </Typography>
                {values.cityDtoSet
                  ? values.cityDtoSet.map((opt, i) => (
                      <Typography style={{ marginLeft: "10px" }} key={i}>
                        {i === 0 ? ": " : ""} {opt.name}{" "}
                        {i !== values.cityDtoSet.length - 1 ? "," : "."}
                      </Typography>
                    ))
                  : null}
              </div>
              <div className={classes.details__accordian}>
                <Typography className={classes.details__title}>
                  Countries
                </Typography>
                {values.countryDtoSet
                  ? values.countryDtoSet.map((opt, i) => (
                      <Typography key={i}>
                        {i === 0 ? ": " : ""} {opt.name}{" "}
                        {i !== values.countryDtoSet.length - 1 ? "," : "."}
                      </Typography>
                    ))
                  : null}
              </div>

              <div className={classes.details__accordian}>
                <Typography className={classes.details__title}>
                  Institutes
                </Typography>
                {values.institutionDtoSet
                  ? values.institutionDtoSet.map((opt, i) => (
                      <Typography key={i} className={classes.details__value}>
                        {i === 0 ? ": " : ""} {opt.name}{" "}
                        {i !== values.institutionDtoSet.length - 1 ? "," : "."}
                      </Typography>
                    ))
                  : null}
              </div>
              <div
                className={classes.details__accordian}
                style={{ display: "none" }}
              >
                <Typography className={classes.details__title}>
                  Rounds
                </Typography>
                {values.selectionProcessRoundSet ? (
                  values.selectionProcessRoundSet.map((opt, i) => (
                    <Typography key={i}>
                      {i === 0 ? ": " : ""} {opt.name}{" "}
                      {i !== values.selectionProcessRoundSet.length - 1
                        ? ","
                        : "."}
                    </Typography>
                  ))
                ) : (
                  <Typography>Any</Typography>
                )}
              </div>
              <div className={classes.details__accordian}>
                <Typography className={classes.details__title}>
                  Study Field
                </Typography>
                {values.studyFieldDtoSet ? (
                  values.studyFieldDtoSet.map((opt, i) => (
                    <Typography key={i} className={classes.details__value}>
                      {i === 0 ? ": " : ""} {opt.name}{" "}
                      {i !== values.studyFieldDtoSet.length - 1 ? "," : "."}
                    </Typography>
                  ))
                ) : (
                  <Typography>Any</Typography>
                )}
              </div>

              <div className={classes.details__accordian}>
                <Typography className={classes.details__title}>
                  Ideal Candidate
                </Typography>

                <Typography className={classes.details__value}>
                  : {values.scholarshipIdealCandidateDescription}
                </Typography>
              </div>
              <div className={classes.details__accordian}>
                <Typography className={classes.details__title}>
                  Creation Date
                </Typography>

                <Typography className={classes.details__value}>
                  : {values.scholarshipCreationDate}
                </Typography>
              </div>
              <div className={classes.details__accordian}>
                <Typography className={classes.details__title}>
                  Last Date
                </Typography>

                <Typography className={classes.details__value}>
                  : {values.lastDateToApply}
                </Typography>
              </div>
            </div>
          </AccordionDetails>

          <Link
            style={{
              textDecoration: "none",
            }}
            to={{
              pathname: `/homecontrol/discover/${values.scholarshipId}`,
              state: values,
            }}
          >
            <div className={classes.button_container}>
              <Button
                variant="contained"
                color="primary"
                className={classes.apply__button}
                disabled={!values.canApplyFlag}
              >
                {values.canApplyFlag ? <>Apply</> : <> Already Applied</>}
              </Button>
            </div>
          </Link>
        </Accordion>
      </Card>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0, 2, 0),
    borderRadius: theme.spacing(2),
    width: "100%",
  },
  details: {
    display: "flex",
    //flexDirection: "column",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },

  content: {
    width: "100%",
    display: "flex",
    // border: "2px solid red",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  cover: {
    width: 320,
    height: 180,
    // cover: "fit",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  amount: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    // fontSize: theme.typography.pxToRem(12),
    // fontWeight: theme.typography.fontWeightRegular,
  },
  expanIcon: {
    fontSize: "40px",
  },
  heading__smaller: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightRegular,
  },
  heading__card: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
  heading2: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  details__accordian: {
    display: "flex",
    marginTop: "10px",
    backgroundColor: "#f1f2f5",
    paddingBottom: "5px",
    paddingTop: "5px",
    borderRadius: "8px",
    overflow: "cliped",
    width: "100%",
    paddingLeft: "16px",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  details__title: {
    minWidth: "150px",
    fontWeight: "bold",
    [theme.breakpoints.down("md")]: {
      minWidth: "0px",
    },
  },
  apply__button: {
    margin: theme.spacing(2),
  },
  button_container: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
  main_card: {
    [theme.breakpoints.down("md")]: {
      width: "90%",
      border: "2px solid grey",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  details__value: {
    [theme.breakpoints.down("md")]: {
      width: "auto",
    },
  },
  middle__summary: {
    maxWidth: "60%",
    [theme.breakpoints.down("md")]: {
      maxWidth: "100%",
    },
  },
}));
