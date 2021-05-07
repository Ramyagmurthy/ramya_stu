import React from "react";
import { makeStyles, fade, createMuiTheme } from "@material-ui/core/styles";
import {
  Button,
  Divider,
  Fade,
  Hidden,
  InputBase,
  Tooltip,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DiscoverCard from "../../atoms/DiscoverCard";
import Pagination from "@material-ui/lab/Pagination";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../../../assets/assets1/css/main.css";

const DiscoverBody = ({
  displaycard,
  myRef,
  page,
  handlePageChange,
  noOfPages,
  searchword,
  searchFieldChange,
  handleSearch,
  loader,
  noResults,
  recomendationList,
  displayScholarships,
  DisplayScholarshipsList,
}) => {
  const classes = useStyles();
  const theme = createMuiTheme();
  return (
    <div className={classes.root}>
      <div className={classes.main__head}>
        <Typography variant="h4">Discover Funds</Typography>
        <div className={classes.search__unit}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={searchword}
              onChange={searchFieldChange}
            />
          </div>
          <Tooltip title="Search">
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </Tooltip>
        </div>
      </div>
      <div style={{ width: "99%" }}>
        <Accordion fullWidth onChange={DisplayScholarshipsList} className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className={classes.expanIcon} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div ref={myRef} className={classes.summaryAccordian}>
              <div className={classes.heading}>
                <Typography className={classes.heading__accordian}>
                  Recomended for you
                </Typography>
                {/* <Typography className={classes.heading__smaller}>
                  Based on your profile and search history
                </Typography> */}
              </div>
              <div className={classes.recommendations}>
                <Typography className={classes.number}>
                  {recomendationList ? recomendationList.length : 0}
                </Typography>
                <div style={{display:"flex",flexDirection:"column"}}>
                <Typography>Funds Recommendations</Typography>
                <Typography className={classes.heading__smaller}>
                  Based on your profile and search history
                </Typography>
                </div>
              </div>
            </div>
          </AccordionSummary>
          <Divider />
          <AccordionDetails id="dis_result">
            <div className={classes.main}>
              {recomendationList
                ? recomendationList.map((recomendations, i) => {
                    return (
                      <DiscoverCard
                        values={recomendations}
                        key={i * Math.random() * 1000}
                      />
                    );
                  })
                : null}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      {loader ? (
        displaycard &&
        displaycard.map((card, i) => {
          return (
            <div
              key={i * Math.random() * 1000}
              style={
                displayScholarships ? { display: "block" } : { display: "none" }
              }
            >
              <Fade in={true} disableStrictModeCompat={true}>
                <DiscoverCard values={card} key={i * Math.random() * 1000} />
              </Fade>
            </div>
          );
        })
      ) : (
        <div className={classes.loader}>
          {" "}
          <CircularProgress />
        </div>
      )}
      {noResults && !displaycard && (
        <div className={classes.notFound}>
          <Typography variant="h5">Result Not Found</Typography>
        </div>
      )}
      <Hidden xsUp={noOfPages === 1 ? true : false}>
        <div className={classes.pages}>
          <Pagination
            count={noOfPages}
            page={page}
            onChange={handlePageChange}
            style={
              displayScholarships ? { display: "block" } : { display: "none" }
            }
          />
        </div>
      </Hidden>
    </div>
  );
};

export default DiscoverBody;

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: theme.spacing(120),
    flexGrow: "1",
  },
  main__head: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    padding: theme.spacing(1, 5, 2, 5),
    width: "99%",
  },
  search__unit: {
    display: "flex",
    paddingTop: theme.spacing(2),
    width: "99%",
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    maxWidth: "90%",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    // "&:hover": {
    //   backgroundColor: fade(theme.palette.common.white, 0.25),
    // },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "80%",
    //  [theme.breakpoints.up("sm")]: {
    //    marginLeft: theme.spacing(3),
    //   width: "60%",
    //  },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  heading: {
    padding: theme.spacing(0, 4, 0, 4),
  },
  heading__accordian: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
  heading__smaller: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightRegular,
  },
  expanIcon: {
    fontSize: "40px",
    color: theme.palette.primary.main,
  },
  number: {
    padding: theme.spacing(2, 3, 2, 3),
    backgroundColor: theme.palette.primary.main,
    color: "white",
    borderRadius: "50%",
    margin: theme.spacing(0, 2, 0, 2),
  },
  summaryAccordian: {
    display: "flex",
    alignItems: "center",
    // border: "2px solid pink",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  recommendations: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // border: "2px solid red",
    marginRight: "auto",
    marginLeft: "auto",
  },
  main: {
    height: "auto",
    padding: theme.spacing(2),
    backgroundColor: "#f1f2f5",
    width: "100%",
    border: "2px solid black",
  },
  pages: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(4, 0),
  },
  loader: {
    width: "auto",
    height: "auto",
    margin: theme.spacing(20, 0, 0, 60),
    padding: "10px",
    position: "relative",
  },
  notFound: {
    width: "auto",
    height: "auto",
    margin: theme.spacing(20, 0, 0, 55),
    padding: "10px",
    position: "relative",
  },
  accordion: {
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  }
  
}));
