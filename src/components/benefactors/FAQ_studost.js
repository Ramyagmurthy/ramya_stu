import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
    backgroundColor: "inherit",
  },
  heading: {
    fontSize: theme.typography.pxToRem(21),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function FAQ_Benefactor({handleChange1}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  let handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(()=> {
    handleChange1("a", 3);
  }, []);

  return (
    <div className={classes.root}>
        {/* first FAQ */}
      <AppBar 
        position="static" 
        style={{marginBottom: "2%",marginTop: "4%"}}
      >
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            FAQs
          </Typography>
        </Toolbar>
      </AppBar>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">
            1. Will I be paid back? What financial model are you following?{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography varaint="srOnly">
            We are currently exploring different financial models including
            scholarships and grants, income sharing agreements, soft loans and
            loans at market rate. Your preferences and insights on the same
            would be taken into account and an appropriate funding mechanism
            will be selected.
          </Typography>
        </AccordionDetails>
      </Accordion>
      {/* second FAQ */}
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="h6">
            2. What kinds of students are you targeting?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography varaint="srOnly">
            We hope to onboard bright students from diverse socio-economic and
            academic backgrounds who can achieve greater success through higher
            education.
          </Typography>
        </AccordionDetails>
      </Accordion>
      {/* third FAQ */}
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="h6">
            3. How will the fund be disbursed should I decide to contribute?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography varaint="srOnly">
            Based on your selected funding mechanism, and the student's payment
            timelines, we will work with you to transfer the funds to your
            chosen student's bank accounts.
          </Typography>
        </AccordionDetails>
      </Accordion>
      {/* fourth FAQ */}
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="h6">
            4. WIll this donation be eligible under Section 80G?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography varaint="srOnly">
            You may receive a certificate to indicate donation under 80G should
            you require it.
          </Typography>
        </AccordionDetails>
      </Accordion>
      {/* fifth FAQ */}
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="h6">
            5. Will the Studost team review student applications?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography varaint="srOnly">
            Our team provides end-to-end guidance to help you launch funds to
            attract the best talent. We recommend fund amounts, application
            requirements and student demographics to target based on your claose
            interaction with aspiring students. Should you require it, we can
            help you put together a panel of experts to review the applications
            you receive.
          </Typography>
        </AccordionDetails>
      </Accordion>
      {/* sixth FAQ */}
      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="h6">
            6. Will my collaboration with Studost be publicized?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography varaint="srOnly">
            Should you want to receive recognition for your efforts, we would be
            happy to include your name and contribution in our marketing
            collateral and PR efforts.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
