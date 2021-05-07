import React, { useContext, useState, useEffect } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  Paper,
  Grid,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Hidden,
  Box,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import PrintIcon from "@material-ui/icons/Print";
import { LoginContext } from "../../../../Context/LoginContext";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import SimpleModal from "../../../../components/atoms/Modal";

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
    borderRadius: theme.spacing(2),
  },
  submit: {
    borderRadius: theme.spacing(2),
  },
  icons_div: {
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  tools: {},
  toolview: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "150px",
  },
}));

export default function Documents() {
  const classes = useStyles();
  const logindetails = useContext(LoginContext);
  const [changes, setChanges] = useState(true);
  const [documentId, setDocumentId] = useState(0);
  const [documentTypeId, setDocumentTypeId] = useState(0);
  const [savingDocId, setSavingDocId] = useState(0);
  const [modalvariation, setModalvariation] = useState("success");

  const [files, setFiles] = useState(
    logindetails.masterData.documentTypeDtoList
  );
  const [newfile, setNewFile] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [modalmsg, setModalmsg] = useState("");
  const [documentList, setDocumentList] = useState(
    logindetails.masterData.documentDetailsList
  );
  const [showCv, setShowCv] = useState(true);

  const addMore = () => {
    setFiles([...files, { name: "", file: "" }]);
  };

  const removeArr = () => {
    // const values = files.pop();
    // // console.log(values);
    // setFiles(values);
  };

  const baseUrl = process.env.REACT_APP_URL;

  useEffect(() => {
    getUserInfo(logindetails.userData.userId);
  }, []);

  const getUserInfo = (id) => {
    axios
      .get(baseUrl + `/student/load-student-profile-data?userId=${id}`)
      .then((res) => {
        setDocumentList(res.data.body.documentDetailsList);
        let documents = res.data.body.documentDetailsList;
        //console.log(res.data.body.documentDetailsList);
        let isCvAlready = false;
        for (let i = 0; i < documents.length; i++) {
          if (documents[i].documentTypeDto.documentTypeId === 3)
            isCvAlready = true;
        }

        if (isCvAlready) setShowCv(false);
        //console.log(res.data);
        //console.log(isCvAlready);
      })
      .catch((err) => console.log(err));
  };

  const addDocuments = (file, b, c) => {
    //console.log(logindetails.masterData.documentDetailsList);
    //console.log(file);
    let documents = documentList;
    let isCvAlready = false;
    for (let i = 0; i < documents.length; i++) {
      if (
        documents[i].documentTypeDto.documentTypeId === 3 &&
        savingDocId === 3
      )
        isCvAlready = true;
    }

    if (!isCvAlready) {
      if (savingDocId === 3)
        if (file.name.includes(".doc") || file.name.includes(".pdf")) {
          let formdata = new FormData();
          formdata.append("userId", logindetails.userData.userId);
          formdata.append("studentId", logindetails.userData.studentId);
          formdata.append("documentId", 0);
          formdata.append("documentTypeId", savingDocId);
          formdata.append("operationType", "U");
          formdata.append("file", file);

          let config = {
            method: "post",
            url: `${baseUrl}/student/save-document-details`,
            headers: {
              "Content-Type": "multipart/form-data",
            },
            data: formdata,
          };

          axios(config)
            .then(function (response) {
              //console.log(response.data);
              setChanges(true);
              setOpenModal(true);
              setModalmsg("document added for cv");
              getUserInfo(logindetails.userData.userId);
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          setOpenModal(true);
          setModalmsg(" you can apply only .doc or pdf for cv");
        }
      if (savingDocId === 1)
        if (
          file.name.includes(".doc") ||
          file.name.includes(".pdf") ||
          file.name.includes(".jpg") ||
          file.name.includes(".jpeg") ||
          file.name.includes(".png") ||
          file.name.includes(".svg")
        ) {
          let formdata = new FormData();
          formdata.append("userId", logindetails.userData.userId);
          formdata.append("studentId", logindetails.userData.studentId);
          formdata.append("documentId", 0);
          formdata.append("documentTypeId", savingDocId);
          formdata.append("operationType", "U");
          formdata.append("file", file);

          let config = {
            method: "post",
            url: `${baseUrl}/student/save-document-details`,
            headers: {
              "Content-Type": "multipart/form-data",
            },
            data: formdata,
          };

          axios(config)
            .then(function (response) {
              //console.log(response.data);
              setChanges(true);
              setOpenModal(true);
              setModalmsg("document added for transcript");
              getUserInfo(logindetails.userData.userId);
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          setOpenModal(true);
          setModalmsg(
            " you can apply only .doc or pdf  or jpg or jpeg or png or svg for transcript"
          );
        }

      if (savingDocId === 2)
        if (
          file.name.includes(".doc") ||
          file.name.includes(".pdf") ||
          file.name.includes(".jpg") ||
          file.name.includes(".jpeg") ||
          file.name.includes(".png") ||
          file.name.includes(".svg") ||
          file.name.includes(".csv") ||
          file.name.includes(".xls")
        ) {
          let formdata = new FormData();
          formdata.append("userId", logindetails.userData.userId);
          formdata.append("studentId", logindetails.userData.studentId);
          formdata.append("documentId", 0);
          formdata.append("documentTypeId", savingDocId);
          formdata.append("operationType", "U");
          formdata.append("file", file);

          let config = {
            method: "post",
            url: `${baseUrl}/student/save-document-details`,
            headers: {
              "Content-Type": "multipart/form-data",
            },
            data: formdata,
          };

          axios(config)
            .then(function (response) {
              //console.log(response.data);
              setChanges(true);
              setOpenModal(true);
              setModalmsg("document added for financial");
              getUserInfo(logindetails.userData.userId);
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          setOpenModal(true);
          setModalmsg(
            " you can apply only .doc or pdf  or jpg or jpeg or png or svg or csv or xls for financial"
          );
        }
    } else {
      setOpenModal(true);
      setModalmsg(" you can apply only one cv");
      //alert(" you an only apply one cv");
    }
  };

  const deleteDocument = (d) => {
    //console.log(d);

    let formdata = new FormData();
    formdata.append("userId", logindetails.userData.userId);

    formdata.append("studentId", logindetails.userData.studentId);

    formdata.append("documentId", parseInt(d));

    let config = {
      method: "delete",
      url: `${baseUrl}/student/delete-student-document`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formdata,
    };

    axios(config)
      .then(function (response) {
        //console.log(response.data);
        setChanges(true);
        setOpenModal(true);
        setModalmsg("document deleted");
        getUserInfo(logindetails.userData.userId);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addfiles = (e, b, c) => {
    //console.log(e.target.files[0], b, c);

    //console.log(logindetails.userData.userId);
    if (e.target.files[0] != null) {
      addDocuments(e.target.files[0], b, c);
    }
  };
  return (
    <div className={classes.root}>
      <SimpleModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalmsg={modalmsg}
        modalvariation={modalvariation}
        setModalvariation={setModalvariation}
      />
      <Paper elevation={3} className={classes.paperarea}>
        <Grid
          container
          xs={12}
          style={{
            display: "flex",
            alignItems: "flex-end",
            paddingBottom: "50px",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">Documents</Typography>

          <PrintIcon
            style={{
              fontSize: "50px",
              marginLeft: "20px",
            }}
          />
        </Grid>
        {files.map((file, index) => {
          return (
            <div key={index}>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  margin: "20px 0 20px 0",
                }}
              >
                <Grid item xs={4}>
                  <Typography>
                    {index + 1} .
                    {file.documentTypeName
                      ? file.documentTypeName
                      : file.documentTypeDto.documentTypeName}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  {(showCv || index !== 2) && (
                    <label htmlFor="btn-upload">
                      <input
                        id="btn-upload"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          addfiles(e, index + 1, file.documentTypeName);
                        }}
                      />
                      <Button
                        className="btn-choose"
                        variant="outlined"
                        component="span"
                        onClick={() => {
                          setSavingDocId(index + 1);
                        }}
                      >
                        Add Files
                      </Button>
                    </label>
                  )}
                  {documentList &&
                    documentList.map((doc) => (
                      <>
                        {doc.documentTypeDto.documentTypeId === index + 1 && (
                          <div className={classes.toolview}>
                            {doc.documentTypeDto.documentTypeName}
                            <div className={classes.tools}>
                              <a href={doc.filePathAndName} target="_blank">
                                <Tooltip title="View">
                                  <IconButton>
                                    <VisibilityIcon />
                                  </IconButton>
                                </Tooltip>
                              </a>
                              <Tooltip title="Delete">
                                <IconButton
                                  onClick={() => {
                                    deleteDocument(doc.documentId);
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </div>
                        )}
                      </>
                    ))}
                </Grid>
                <Grid item xs={4}>
                  {file.documentTypeName ? (
                    <>
                      {index === 0 && (
                        <Typography variant="h7">
                          (only .doc .pdf .jpg .jpeg .png .svg)
                        </Typography>
                      )}
                      {index === 1 && (
                        <Typography variant="h7">
                          (only .doc .pdf .jpg .jpeg .png .svg .csv .xls)
                        </Typography>
                      )}
                      {index === 2 && (
                        <Typography variant="h7">(only .doc .pdf)</Typography>
                      )}
                      {/* <Button variant="outlined" color="primary">
                      View {file.documentTypeName}
                    </Button>
                    { documentList && documentList.map(doc => 
                    
                      
                      <>
                      
                          {doc.documentTypeDto.documentTypeId === (index + 1) && <div
                          ><IconButton
                          onClick={() => {deleteDocument(doc.documentId)}}
                          >
                          <DeleteIcon  />
                        </IconButton></div>}
                      </>

                    
                  )} */}
                    </>
                  ) : null}
                </Grid>
              </Grid>
            </div>
          );
        })}
        {/*  <div
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
        <Tooltip title="add more docs">
            <IconButton onClick={addMore}>
              <AddIcon />
            </IconButton>
          </Tooltip> 
          <Hidden xsUp={true}>
            <Tooltip title="remove extra field">
              <IconButton onClick={removeArr}>
                <RemoveIcon />
              </IconButton>
            </Tooltip>
          </Hidden>
        </div>
         <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "80px" }}
          disabled={changes}
          onClick={addDocuments}
          className={classes.submit}
        >
          Upload
        </Button> */}
      </Paper>
    </div>
  );
}
