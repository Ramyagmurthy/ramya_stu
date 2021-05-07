import React from "react";
import {
  Accordion,
  Paper,
  TextField,
  Typography,
  AccordionSummary,
  AccordionDetails,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Chip from "@material-ui/core/Chip";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const SideFilter = ({ filter }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={2} className={classes.paperarea}>
        <div className={classes.header}>
          <Typography className={classes.side__header}> Filters</Typography>
          <Typography
            onClick={filter.clearAllFields}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Clear All
          </Typography>
        </div>
        <div className={classes.middle}>
          {filter.chipsArr
            ? filter.chipsArr.map((data, index) => {
                let icon;

                return (
                  <li key={index}>
                    <Chip
                      icon={icon}
                      label={data}
                      onDelete={filter.handleDeleteStudyField(data)}
                      className={classes.chip}
                    />
                  </li>
                );
              })
            : null}
          <div className={classes.middle}>
            {filter.genderchipsArr
              ? filter.genderchipsArr.map((data, index) => {
                  let icon;

                  return (
                    <li key={index}>
                      <Chip
                        icon={icon}
                        label={data}
                        onDelete={filter.handleDeletegender(data)}
                        className={classes.chip}
                      />
                    </li>
                  );
                })
              : null}
          </div>
          <div className={classes.middle}>
            {filter.citychipsArr
              ? filter.citychipsArr.map((data, index) => {
                  let icon;

                  return (
                    <li key={index}>
                      <Chip
                        icon={icon}
                        label={data}
                        onDelete={filter.handleCityChipsDelete(data)}
                        className={classes.chip}
                      />
                    </li>
                  );
                })
              : null}
          </div>
          <div className={classes.middle}>
            {filter.countrychipsArr
              ? filter.countrychipsArr.map((data, index) => {
                  let icon;

                  return (
                    <li key={index}>
                      <Chip
                        icon={icon}
                        label={data}
                        onDelete={filter.handleCountryChipsDelete(data)}
                        className={classes.chip}
                      />
                    </li>
                  );
                })
              : null}
          </div>
        </div>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <FormLabel component="legend">Filter</FormLabel>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <div
                className={classes.priceSlider}
                style={{ marginRight: "20px" }}
              >
                <Typography id="range-slider" gutterBottom>
                  Scholarship Amount in RS
                </Typography>
                <Slider
                  value={filter.slidervalue}
                  onChange={filter.sliderchange}
                  // valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  max={1500000}
                  min={20000}
                />
                <div className={classes.slider__points}>
                  <div>{filter.slidervalue[0]}</div>
                  <div>{filter.slidervalue[1]}</div>
                </div>
              </div>
              <div className={classes.radioGroups}>
                <FormLabel
                  component="legend"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  Type
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="gender1"
                  value={filter.scholatshiptype}
                  onChange={filter.scholarshiptypeChange}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      // flexDirection: "column",
                    }}
                  >
                    <FormControlLabel
                      value="Full"
                      control={<Radio />}
                      label="Full"
                    />
                    <FormControlLabel
                      value="Partial"
                      control={<Radio />}
                      label="Partial"
                    />
                    <FormControlLabel
                      value="All-type"
                      control={<Radio />}
                      label="All"
                    />
                  </div>
                </RadioGroup>
              </div>
              <div className={classes.radioGroups}>
                <FormLabel
                  component="legend"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  Based on
                </FormLabel>

                <RadioGroup
                  aria-label="basis"
                  name="gender1"
                  value={filter.scholarshipbasis}
                  onChange={filter.scholarshipBasisChange}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      // flexDirection: "column",
                    }}
                  >
                    <FormControlLabel
                      value="Merit"
                      control={<Radio />}
                      label="Merit"
                    />
                    <FormControlLabel
                      value="Need"
                      control={<Radio />}
                      label="Need"
                    />
                    <FormControlLabel
                      value="All-base"
                      control={<Radio />}
                      label="All"
                    />
                  </div>
                </RadioGroup>
              </div>

              <div
                className={classes.priceSlider}
                style={{ marginRight: "20px" }}
              >
                <Typography
                  id="range-slider"
                  gutterBottom
                  style={{ textAlign: "center" }}
                >
                  Scholarship Duration in Months
                </Typography>
                <Slider
                  value={filter.slidervalueMonths}
                  onChange={filter.sliderchangeMonths}
                  // valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  max={36}
                  min={6}
                />
                <div className={classes.slider__points}>
                  <div>{filter.slidervalueMonths[0]}</div>
                  <div>{filter.slidervalueMonths[1]}</div>
                </div>
              </div>
              <div className={classes.dateBox}>
                <TextField
                  id="outlined-number"
                  label="Last Date to apply"
                  type="date"
                  value={filter.lastDate}
                  onChange={filter.LastDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
              </div>
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <FormLabel component="legend">Filter by Study Field</FormLabel>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {filter.checkBoxes.map((checkBoxi, index) => {
                if (checkBoxi.name != "All") {
                  return (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={
                            checkBoxi.checked ? checkBoxi.checked : false
                          }
                          onChange={(e, v) =>
                            filter.handleCheckbox(v, checkBoxi, index)
                          }
                        />
                      }
                      label={checkBoxi.name}
                    />
                  );
                }
              })}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <FormLabel component="legend">Filter by Gender</FormLabel>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {filter.genderBox.map((checkBoxi, index) => {
                if (checkBoxi.name != "All") {
                  return (
                    <FormControlLabel
                      key={index}
                      onChange={(e, v) =>
                        filter.handleCheckboxGender(v, checkBoxi, index)
                      }
                      className={classes.checkbox__filter}
                      control={
                        <Checkbox
                          checked={
                            checkBoxi.checked ? checkBoxi.checked : false
                          }
                        />
                      }
                      label={checkBoxi.name}
                    />
                  );
                }
              })}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <FormLabel component="legend">Filter by City</FormLabel>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup style={{ height: "200px", overflowX: "scroll" }}>
              {filter.cityDtoList.map((checkBoxi, index) => {
                if (checkBoxi.name != "All") {
                  return (
                    <FormControlLabel
                      key={index}
                      // onChange={(e, v) => console.log(v)}
                      onChange={(e, v) =>
                        filter.handleCityChange(v, checkBoxi, index)
                      }
                      className={classes.checkbox__filter}
                      control={
                        <Checkbox
                          checked={
                            checkBoxi.checked ? checkBoxi.checked : false
                          }
                        />
                      }
                      label={checkBoxi.name}
                    />
                  );
                }
              })}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <FormLabel component="legend">Filter by Country</FormLabel>
          </AccordionSummary>
          <AccordionDetails style={{ height: "200px", overflow: "scroll" }}>
            <FormGroup>
              {filter.countryDtoList.map((checkBoxi, index) => {
                if (checkBoxi.name != "All") {
                  return (
                    <FormControlLabel
                      key={index}
                      checked={checkBoxi.checked}
                      // onChange={(e, v) => console.log(v)}
                      onChange={(e, v) =>
                        filter.handleCountryChange(v, checkBoxi, index)
                      }
                      className={classes.checkbox__filter}
                      control={
                        <Checkbox
                          checked={
                            checkBoxi.checked ? checkBoxi.checked : false
                          }
                        />
                      }
                      label={checkBoxi.name}
                    />
                  );
                }
              })}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </div>
  );
};

export default SideFilter;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "auto",
    // padding: theme.spacing(0, 2, 0, 8),
    paddingRight: "10px",
  },
  paperarea: {
    minHeight: "100vh",
    maxWidth: theme.spacing(30),
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  header: {
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "space-between",
  },
  side__header: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
  middle: {
    minHeight: theme.spacing(10),
    display: "flex",
    // justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0, 0.5, 0, 0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5, 0.5, 0.5, 0.5),
  },
  priceSlider: {
    padding: theme.spacing(3),
  },
  dateBox: {
    padding: theme.spacing(0, 2, 1, 2),
    width: "100%",
  },
  slider__points: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  heading__smaller: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightRegular,
  },
  radioGroups: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  checkbox__filter: {
    // color: "red",
    // fontSize: theme.typography.pxToRem(12),
    // fontWeight: theme.typography.fontWeightRegular,
  },
}));
