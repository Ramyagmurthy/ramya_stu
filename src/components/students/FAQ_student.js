import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Nav from "./../Nav";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    marginLeft: "10%",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(5, 2, 5, 2),
      width: "100%",
      marginLeft: "0%",
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    //color: theme.palette.text.secondary,
  },
  header: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2",
    },
  },
  deatails: {
    fontSize: "0.8",
  },
}));

export default function FAQ_Students({ handleChange }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChangeAccordian = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    handleChange("a", 4);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      {/* <Nav/> */}
      <div className={classes.root}>
        {/* first FAQ */}
        <AppBar
          position="static"
          style={{ marginBottom: "2%", marginTop: "4%" }}
        >
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit">
              FAQs
            </Typography>
          </Toolbar>
        </AppBar>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChangeAccordian("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className="faq__mini">
              1. Do I have to pay a benefactors back?{" "}
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="faq__mini__text">
              We offer benefactors the options to provide scholarships or
              grants, soft loans, loans at market rates, and engage in income
              sharing agreements. Based on the selected mechanism by the
              benefactor, you will be required to repay your fund and will
              receive a timeline and guidelines on doing so.
            </div>
          </AccordionDetails>
        </Accordion>
        {/* second FAQ */}
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChangeAccordian("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <div className="faq__mini">2. Who are these benefactors?</div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="faq__mini__text">
              Benetafctors are high net worth individuals, industry leaders,
              philanthropists and other individuals who want to support the
              cause of accessible education by creating funds on our platform.
            </div>
          </AccordionDetails>
        </Accordion>
        {/* third FAQ */}
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChangeAccordian("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <div className="faq__mini">3. What can I use the fund for?</div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="faq__mini__text">
              Funds can be used to fully or partially fund your higher
              education-undergraduate, masters or PhD programs both in India and
              Abroad.
            </div>
          </AccordionDetails>
        </Accordion>
        {/* fourth FAQ */}
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChangeAccordian("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <div className="faq__mini">4. Who reviews my application?</div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="faq__mini__text">
              Your application is reviewed by the benefactor/their team. We
              provide benefactors guidelines and support on reviewing
              applications should they require it.
            </div>
          </AccordionDetails>
        </Accordion>
        {/* fifth FAQ */}
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChangeAccordian("panel5")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <div className="faq__mini">
              5. How will I receive the fund if I have been selected?
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="faq__mini__text">
              Once you have been selected, you will receive a timeline on when
              you can expect the fund amount to be transferred. Working in
              tandem with you and your studost, we will ensure that funds are
              deposited into your account ahead of external payments you have to
              make.
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
