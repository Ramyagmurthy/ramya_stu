import React, { useState, useContext, useEffect, useRef } from "react";
import Nav from "../Nav";
import SideFilter from "./Discover/SideFilter";
import DiscoverBody from "./Discover/DiscoverBody";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Hidden,
  IconButton,
} from "@material-ui/core";
import axios from "axios";
import { LoginContext } from "../../Context/LoginContext";
import SimpleModal from "../atoms/Modal";
import Footer from "../comps/Footer";
import { withSnackbar } from "notistack";
import FilterListIcon from "@material-ui/icons/FilterList";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

function Discover({ handleChange, ...props }) {
  const logindetails = useContext(LoginContext);
  const baseUrl = process.env.REACT_APP_URL;

  useEffect(() => {
    handleChange("a", 3);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    getScholarships(body, 1);
    logindetails.masterData.cityDtoList.forEach((element) => {
      Object.assign(element, { checked: false });
    });
    logindetails.masterData.countryDtoList.forEach((element) => {
      Object.assign(element, { checked: false });
    });
    logindetails.masterData.genderDtoList.forEach((element) => {
      Object.assign(element, { checked: false });
    });
    logindetails.masterData.studyFieldDtoList.forEach((element) => {
      Object.assign(element, { checked: false });
    });
    getRecomendations();
  }, []);

  const styles = useStyles();
  const myRef = useRef(null);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);

  const [scholatshiptype, setScholarshiptype] = useState("All-type");
  const [scholarshipbasis, setScholarshipbasis] = useState("All-base");
  const [recomendationList, setRecomendationList] = useState([]);
  const [displayScholarships, setDisplayScholarships] = useState(true);

  const [cityDtoList, setCityDtoList] = useState(
    logindetails.masterData.cityDtoList
  );

  const [countryDtoList, setCountryDtoList] = useState(
    logindetails.masterData.countryDtoList
  );

  const scholarshiptypeChange = (e) => {
    setScholarshiptype(e.target.value);
    let val = e.target.value;
    if (val == "Full") {
      let newbody = Object.assign(body, {
        scholarshipTypeList: [
          {
            name: "FUll",
            scholarshipTypeId: 1,
          },
        ],
      });
      setBody(newbody);
      getScholarships(newbody, 1);
    } else if (val == "Partial") {
      let newbody = Object.assign(body, {
        scholarshipTypeList: [
          {
            name: "Partial",
            scholarshipTypeId: 2,
          },
        ],
      });
      setBody(newbody);
      getScholarships(newbody, 1);
      // console.log(newbody);
    } else {
      let newbody = Object.assign(body, {
        scholarshipTypeList: null,
      });
      setBody(newbody);
      getScholarships(newbody, 1);
    }
  };

  const scholarshipBasisChange = (e) => {
    setScholarshipbasis(e.target.value);
    let val = e.target.value;
    if (val == "Merit") {
      const newbody = Object.assign(body, {
        scholarshipBasisList: [
          {
            scholarshipBasisId: 1,
            name: "Merit-Based",
          },
        ],
      });
      setBody(newbody);
      getScholarships(newbody, 1);
      // console.log(newbody);
    } else if (val == "Need") {
      const newbody = Object.assign(body, {
        scholarshipBasisList: [
          {
            scholarshipBasisId: 2,
            name: "Need-based",
          },
        ],
      });
      setBody(newbody);
      getScholarships(newbody, 1);
      // console.log(newbody);
    } else {
      const newbody = Object.assign(body, {
        scholarshipBasisList: null,
      });
      setBody(newbody);
      getScholarships(newbody, 1);
      // console.log(newbody);
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const [modalmsg, setModalmsg] = useState("");
  const [modalvariation, setModalvariation] = useState("success");

  const [searchword, setSearchWord] = useState("");

  const [body, setBody] = useState({});

  /// clear all fileds

  const clearAllFields = () => {
    getScholarships(null, 1);
    setsliderValue([20000, 1500000]);
    setsliderValueMonths([6, 36]);
    genderBox.forEach((element) => {
      Object.assign(element, { checked: false });
    });
    checkBoxes.forEach((element) => {
      Object.assign(element, { checked: false });
    });
    setChipsArr([]);
    setGenderChipsArr([]);
    setScholarshipbasis("All-base");
    setScholarshiptype("All-type");
    cityDtoList.forEach((element) => {
      Object.assign(element, { checked: false });
    });
    countryDtoList.forEach((element) => {
      Object.assign(element, { checked: false });
    });
    setcityChipsArr([]);
    setcountryChipsArr([]);
    setLastDate("");
    setPage(1);
    setSearchWord("");
    // console.log("from clear all city--", cityDtoList);
    // console.log("from clear all city--", countryDtoList);
  };

  //////// side filter

  const [slidervalue, setsliderValue] = useState([20000, 1500000]);
  const [slidervalueMonths, setsliderValueMonths] = useState([6, 36]);

  const [chipsArr, setChipsArr] = useState([]);
  const [genderchipsArr, setGenderChipsArr] = useState([]);
  const [citychipsArr, setcityChipsArr] = useState([]);
  const [countrychipsArr, setcountryChipsArr] = useState([]);

  const [lastDate, setLastDate] = useState("");

  // for chips

  const handleDeleteStudyField = (chipToDelete) => () => {
    setChipsArr((chips) => chipsArr.filter((chip) => chip !== chipToDelete));
    const values = checkBoxes.filter((filter) => filter.name !== chipToDelete);
    setCheckBoxes([...values, { name: chipToDelete, checked: false }]);
    studyFieldDtoChange([...values, { name: chipToDelete, checked: false }]);
  };

  const handleDeletegender = (chipToDelete) => () => {
    setGenderChipsArr((chips) =>
      genderchipsArr.filter((chip) => chip !== chipToDelete)
    );
    const values = genderBox.filter((filter) => filter.name !== chipToDelete);
    setGenderBox([...values, { name: chipToDelete, checked: false }]);
    GenderDtochange([...values, { name: chipToDelete, checked: false }]);
  };

  const handleCityChipsDelete = (chipToDelete) => () => {
    setcityChipsArr((chips) =>
      citychipsArr.filter((chip) => chip !== chipToDelete)
    );
    const values = cityDtoList.filter((filter) => filter.name !== chipToDelete);
    setCityDtoList([...values, { name: chipToDelete, checked: false }]);
    handleCitySelection([...values, { name: chipToDelete, checked: false }]);
  };

  const handleCountryChipsDelete = (chipToDelete) => () => {
    setcountryChipsArr((chips) =>
      countrychipsArr.filter((chip) => chip !== chipToDelete)
    );
    const values = countryDtoList.filter(
      (filter) => filter.name !== chipToDelete
    );
    setCountryDtoList([...values, { name: chipToDelete, checked: false }]);
    handleCountrySelection([...values, { name: chipToDelete, checked: false }]);
  };

  /// for check boxes

  const [checkBoxes, setCheckBoxes] = useState(
    logindetails.masterData.studyFieldDtoList
  );

  const [genderBox, setGenderBox] = useState(
    logindetails.masterData.genderDtoList
  );
  // console.log("from gender list ", logindetails.masterData.genderDtoList);

  const sliderchange = (event, newValue) => {
    setsliderValue(newValue);
    const newbody = Object.assign({}, body);
    newbody["minAmount"] = newValue[0];
    newbody["maxAmount"] = newValue[1];
    setBody(newbody);
    // console.log(newbody);
    getScholarships(newbody, 1);
  };

  const sliderchangeMonths = (event, newValue) => {
    setsliderValueMonths(newValue);
    const newbody = Object.assign({}, body);
    newbody["minDurationInMonths"] = newValue[0];
    newbody["maxDurationInMonths"] = newValue[1];
    setBody(newbody);
    // console.log(newbody);
    getScholarships(newbody, 1);
  };

  const handleCheckbox = (value, checkboxi, index) => {
    // console.log(value, checkboxi, index);
    if (value == true) {
      setChipsArr([...chipsArr, checkboxi.name]);
    } else {
      const removed = chipsArr.filter((item) => item !== checkboxi.name);
      setChipsArr(removed);
    }
    const values = [...checkBoxes];
    values[index].checked = !values[index].checked;
    setCheckBoxes(values);
    studyFieldDtoChange(values);
  };

  const handleCheckboxGender = (value, checkboxi, index) => {
    // console.log(value, checkboxi, index);
    if (value == true) {
      setGenderChipsArr([...genderchipsArr, checkboxi.name]);
    } else {
      const removed = genderchipsArr.filter((item) => item !== checkboxi.name);
      setGenderChipsArr(removed);
    }
    const values = [...genderBox];
    values[index].checked = !values[index].checked;
    setGenderBox(values);
    GenderDtochange(values);
  };

  const handleCityChange = (value, checkboxi, index) => {
    // console.log(value, checkboxi, index);
    if (value == true) {
      setcityChipsArr([...citychipsArr, checkboxi.name]);
    } else {
      const removed = citychipsArr.filter((item) => item !== checkboxi.name);
      setcityChipsArr(removed);
    }
    const values = [...cityDtoList];
    values[index].checked = !values[index].checked;
    setCityDtoList(values);
    handleCitySelection(values);
  };

  const handleCountryChange = (value, checkboxi, index) => {
    // console.log(value, checkboxi, index);
    if (value == true) {
      setcountryChipsArr([...countrychipsArr, checkboxi.name]);
    } else {
      const removed = countrychipsArr.filter((item) => item !== checkboxi.name);
      setcountryChipsArr(removed);
    }
    const values = [...countryDtoList];
    values[index].checked = !values[index].checked;
    setCountryDtoList(values);
    handleCountrySelection(values);
  };
  const LastDateChange = (e) => {
    setLastDate(e.target.value);
    if (e.target.value != "") {
      const newbody = Object.assign({}, body);
      newbody["lastDateToApply"] = e.target.value;
      setBody(newbody);
      // console.log(newbody);
      getScholarships(newbody, 1);
    }
  };

  const studyFieldDtoChange = (values) => {
    const generListtemporary = values.filter((item) => item.checked !== false);
    const newbody = Object.assign({}, body);
    newbody["studyFieldList"] = generListtemporary;
    setBody(newbody);
    // console.log(newbody);
    getScholarships(newbody, 1);
  };

  const GenderDtochange = (values) => {
    const generListtemporary = values.filter((item) => item.checked !== false);
    const newbody = Object.assign({}, body);
    newbody["genderList"] = generListtemporary;
    setBody(newbody);
    // console.log(newbody);
    getScholarships(newbody, 1);
  };

  // city check

  const handleCitySelection = (values) => {
    const citylisttemp = values.filter((item) => item.checked !== false);
    const newbody = Object.assign({}, body);
    newbody["cityList"] = citylisttemp;
    setBody(newbody);
    // console.log(newbody);
    getScholarships(newbody, 1);
  };

  const handleCountrySelection = (values) => {
    const countrylisttemp = values.filter((item) => item.checked !== false);
    const newbody = Object.assign({}, body);
    newbody["countryList"] = countrylisttemp;
    setBody(newbody);
    getScholarships(newbody, 1);
  };

  const sideFilter = {
    slidervalue,
    setsliderValue,
    chipsArr,
    setChipsArr,
    handleDeleteStudyField,
    checkBoxes,
    setCheckBoxes,
    sliderchange,
    handleCheckbox,
    slidervalueMonths,
    setsliderValueMonths,
    sliderchangeMonths,
    genderBox,
    setGenderBox,
    handleCheckboxGender,
    genderBox,
    genderchipsArr,
    handleDeletegender,
    LastDateChange,
    clearAllFields,
    scholatshiptype,
    setScholarshiptype,
    scholarshiptypeChange,
    scholarshipbasis,
    setScholarshipbasis,
    scholarshipBasisChange,
    cityDtoList,
    handleCityChange,
    citychipsArr,
    handleCityChipsDelete,
    countryDtoList,
    handleCountryChange,
    countrychipsArr,
    handleCountryChipsDelete,
    lastDate,
  };

  /// side filter ends here

  /// Discover Body logic starts here

  const [displaycard, setDisplaycard] = useState([]);
  const [loader, setLoader] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const handlePageChange = (event, value) => {
    setPage(value);

    const newbody = Object.assign({}, body);
    newbody["pageNumber"] = value;
    setBody(newbody);
    // console.log(newbody);

    getScholarships(body, value);
    // console.log(value);
    // scrollToRef(myRef);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const searchFieldChange = (e) => {
    setSearchWord(e.target.value);
  };

  const getScholarships = (custombody, value) => {
    // console.log("custombody",custombody);
    const filterBody = {
      pageNumber: value,
      sortingOrderDirection: "asc",
      totalRecordPerPage: 10,
      scholarshipFilterDto: custombody,
      userId: logindetails.user,
    };
    const config = {
      method: "post",
      url: `${baseUrl}/scholarship/get-open-scholarships`,
      headers: {
        "Content-Type": "application/json",
      },
      data: filterBody,
    };
    // console.log(filterBody);
    axios(config)
      .then((res) => {
        if (res.data.body.scholarshipList != null) {
          setDisplaycard([...res.data.body.scholarshipList]);
          // console.log("from disocver----#", res.data);
          setNoOfPages(res.data.body.totalPages);
          setLoader(true);
        } else {
          setDisplaycard("");
          setNoOfPages(1);
          // console.log("from disocver----#", res.data, filterBody);
          setLoader(true);
          setNoResults(true);
          // setOpenModal(true);
          // setModalmsg("No more Schoilarships to show !!");
          // setModalvariation("warning");
          props.enqueueSnackbar("No more Schoilarships to show !!", {
            variant: "warning",
          });
        }
      })
      .catch((err) => {
        setLoader(true);
        setNoResults(true);
        setOpenModal(true);
        setModalmsg("Scholarships  request failed !!");
        setModalvariation("error");
        // props.enqueueSnackbar("Scholarships request failed !!", {
        //   variant: "error",
        // });
        console.log(err);
      });
  };

  const getRecomendations = () => {
    const body = {
      pageNumber: 1,
      sortingOrderDirection: "asc",
      studentId: logindetails.userData.studentId,
      totalRecordPerPage: 10,
      userId: logindetails.user,
    };
    const config = {
      method: "post",
      url: `${baseUrl}/scholarship/get-recommended-scholarship`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };
    // console.log(filterBody);
    axios(config)
      .then((res) => {
        if (res.data.body.scholarshipList != null) {
          //console.log("from reco----#", res.data);
          setRecomendationList(res.data.body.scholarshipList);
          // setOpenModal(true);
          // setModalmsg(
          //   `you have ${res.data.body.scholarshipList.length} Recommendations !!`
          // );
          // setModalvariation("info");
          props.enqueueSnackbar(
            `you have ${res.data.body.scholarshipList.length} Recommendations !!`,
            {
              variant: "info",
            }
          );
        } else {
          //console.log("from reco----#", res.data);
        }
      })
      .catch((err) => {
        setOpenModal(true);
        setModalmsg("Recomendations request failed !!");
        setModalvariation("error");
      });
  };

  const handleSearch = () => {
    setLoader(false);
    let newbody = Object.assign({}, body);
    newbody["scholarshipName"] = searchword == "" ? null : searchword;
    setBody(newbody);
    getScholarships(newbody, 1);
  };
  const DisplayScholarshipsList = () => {
    setDisplayScholarships(!displayScholarships);
  };

  const [sidefilterDisplay, setSidefilterDisplay] = useState(false);

  return (
    <>
      {/* <Nav /> */}
      <div className={styles.root}>
        <SimpleModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          modalmsg={modalmsg}
          modalvariation={modalvariation}
          setModalvariation={setModalvariation}
        />
        {/* <Hidden smUp>
          <div>
            <IconButton
              onClick={() => setSidefilterDisplay(!sidefilterDisplay)}
            >
              {sidefilterDisplay ? <p>hide filter</p> : <p>show filter</p>}
              <FilterListIcon />
            </IconButton>
          </div>
        </Hidden> */}
        <div className={styles.body}>
          <Hidden mdDown>
            <div className={styles.sidefilter}>
              <SideFilter filter={sideFilter} />
            </div>
          </Hidden>
          <DiscoverBody
            displaycard={displaycard}
            myRef={myRef}
            page={page}
            noOfPages={noOfPages}
            handlePageChange={handlePageChange}
            searchword={searchword}
            // setsearchword={setSearchWord}
            handleSearch={handleSearch}
            searchFieldChange={searchFieldChange}
            loader={loader}
            noResults={noResults}
            recomendationList={recomendationList}
            displayScholarships={displayScholarships}
            DisplayScholarshipsList={DisplayScholarshipsList}
          />
        </div>
      </div>
      <div className={styles.mobileFilter}>
        <Accordion style={{ width: "100%", backgroundColor: "rgba(0,0,0,0)" }}>
          <AccordionSummary>
            <IconButton
              style={{ backgroundColor: "#191d49" }}
              onClick={() => setSidefilterDisplay(!sidefilterDisplay)}
            >
              <FilterListIcon style={{ fontSize: "40px", color: "white" }} />
            </IconButton>
          </AccordionSummary>
          <AccordionDetails>
            <SideFilter filter={sideFilter} />
          </AccordionDetails>
        </Accordion>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default withSnackbar(Discover);

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f1f2f5",
    height: "auto",
    width: "100%",
  },
  body: {
    // backgroundColor: "#f1f2f5",
    maxWidth: "1350px",
    width: "100%",
    marginRight: "auto",
    marginLeft: "auto",
    display: "flex",
    justifyContent: "space-between",
  },
  mobileFilter: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      position: "fixed",
      bottom: "0",
    },
  },
}));
