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
import upload from "../../../../assets/img/upload.png";

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(100),
    marginRight: "auto",
    marginLeft: "auto",
    paddingTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "100%",
      padding: theme.spacing(5, 1, 1, 1),
    },
  },
  paperarea: {
    padding: theme.spacing(10),
    paddingTop: theme.spacing(5),
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2, 2, 5, 2),
    },
  },
  submit: {
    borderRadius: theme.spacing(2),
  },
  icons_div: {
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  tools: {
    display: "flex",
  },
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
        // console.log(res.data.body.documentDetailsList);
        let isCvAlready = false;
        for (let i = 0; i < documents.length; i++) {
          if (documents[i].documentTypeDto.documentTypeId === 3)
            isCvAlready = true;
        }

        if (isCvAlready) setShowCv(false);
        else setShowCv(true);
        // console.log(res.data);
        // console.log(isCvAlready);
      })
      .catch((err) => console.log(err));
  };

  const addDocuments = (file, b, c) => {
    // console.log("2")

    //console.log(logindetails.masterData.documentDetailsList);
    //console.log(file);
    // let documents = documentList;
    // let isCvAlready = false;
    // for (let i = 0; i < documents.length; i++) {
    //   if (
    //     documents[i].documentTypeDto.documentTypeId === 3 &&
    //     savingDocId === 3
    //   )
    //     isCvAlready = true;
    // }
    // alert(b);
    let formdata = new FormData();

    const documentUploadDto = {
      userId: logindetails.userData.userId,
      studentId: logindetails.userData.studentId,
      documentTypeId: b,
    };

    formdata.append(
      "documentUploadDto",
      new Blob([JSON.stringify(documentUploadDto)], {
        type: "application/json",
      })
    );
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
        // console.log(response.data);
        setChanges(true);
        setOpenModal(true);
        setModalmsg("document added for cv");
        getUserInfo(logindetails.userData.userId);
      })
      .catch(function (error) {
        console.log(error);
      });

    // if (!isCvAlready) {
    //   if (savingDocId === 3)
    //     if (file.name.includes(".doc") || file.name.includes(".pdf")) {
    //       let formdata = new FormData();

    //       const documentUploadDto =
    //       {userId:logindetails.userData.userId,
    //       studentId:logindetails.userData.studentId,
    //       documentTypeId:savingDocId
    //       }
    //       // formdata.append("documentTypeId", documentUploadDto);
    //       // formdata.append("userId", logindetails.userData.userId);
    //       // formdata.append("studentId", logindetails.userData.studentId);
    //       // formdata.append("documentId", 0);
    //       // formdata.append("documentTypeId", savingDocId);
    //       // formdata.append("operationType", "U");

    //       formData.append('documentUploadDto', new Blob([JSON.stringify(documentUploadDto)], {
    //         type: "application/json"
    //     }));
    //       formdata.append("file", file);

    //       let config = {
    //         method: "post",
    //         url: `${baseUrl}/student/save-document-details`,
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //         data: formdata,
    //       };

    //       axios(config)
    //         .then(function (response) {
    //           // console.log(response.data);
    //           setChanges(true);
    //           setOpenModal(true);
    //           setModalmsg("document added for cv");
    //           getUserInfo(logindetails.userData.userId);
    //         })
    //         .catch(function (error) {
    //           console.log(error);
    //         });
    //     } else {
    //       setOpenModal(true);
    //       setModalmsg(" you can apply only .doc or pdf for cv");
    //       setModalvariation("error");
    //     }
    //   if (savingDocId === 1)
    //     if (
    //       file.name.includes(".doc") ||
    //       file.name.includes(".pdf") ||
    //       file.name.includes(".jpg") ||
    //       file.name.includes(".jpeg") ||
    //       file.name.includes(".png") ||
    //       file.name.includes(".svg")
    //     ) {
    //       let formdata = new FormData();
    //       // formdata.append("userId", logindetails.userData.userId);
    //       // formdata.append("studentId", logindetails.userData.studentId);
    //       // formdata.append("documentId", 0);
    //       // formdata.append("documentTypeId", savingDocId);
    //       // formdata.append("operationType", "U");
    //       const documentUploadDto =
    //       {userId:logindetails.userData.userId,
    //       studentId:logindetails.userData.studentId,
    //       documentTypeId:savingDocId
    //       }
    //       formdata.append("documentUploadDto", documentUploadDto);
    //       formdata.append("file", file);

    //       let config = {
    //         method: "post",
    //         url: `${baseUrl}/student/save-document-details`,
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //         data: formdata,
    //       };

    //       axios(config)
    //         .then(function (response) {
    //           // console.log(response.data);
    //           setChanges(true);
    //           setOpenModal(true);
    //           setModalmsg("document added for transcript");
    //           getUserInfo(logindetails.userData.userId);
    //         })
    //         .catch(function (error) {
    //           console.log(error);
    //         });
    //     } else {
    //       setOpenModal(true);
    //       setModalmsg(
    //         " you can apply only .doc or pdf  or jpg or jpeg or png or svg for transcript"
    //       );
    //       setModalvariation("error");
    //     }

    //   if (savingDocId === 2)
    //     if (
    //       file.name.includes(".doc") ||
    //       file.name.includes(".pdf") ||
    //       file.name.includes(".jpg") ||
    //       file.name.includes(".jpeg") ||
    //       file.name.includes(".png") ||
    //       file.name.includes(".svg") ||
    //       file.name.includes(".csv") ||
    //       file.name.includes(".xls")
    //     ) {
    //       let formdata = new FormData();
    //       // formdata.append("userId", logindetails.userData.userId);
    //       // formdata.append("studentId", logindetails.userData.studentId);
    //       // formdata.append("documentId", 0);
    //       // formdata.append("documentTypeId", savingDocId);
    //       // formdata.append("operationType", "U");
    //       const documentUploadDto =
    //       {userId:logindetails.userData.userId,
    //       studentId:logindetails.userData.studentId,
    //       documentTypeId:savingDocId
    //       }
    //       formdata.append("documentUploadDto", documentUploadDto);
    //       formdata.append("file", file);

    //       let config = {
    //         method: "post",
    //         url: `${baseUrl}/student/save-document-details`,
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //         data: formdata,
    //       };

    //       axios(config)
    //         .then(function (response) {
    //           // console.log(response.data);
    //           setChanges(true);
    //           setOpenModal(true);
    //           setModalmsg("document added for financial");
    //           getUserInfo(logindetails.userData.userId);
    //         })
    //         .catch(function (error) {
    //           console.log(error);
    //         });
    //     } else {
    //       setOpenModal(true);
    //       setModalmsg(
    //         " you can apply only .doc or pdf  or jpg or jpeg or png or svg or csv or xls for financial"
    //       );
    //       setModalvariation("error");
    //     }
    // } else {
    //   setOpenModal(true);
    //   setModalmsg(" you can apply only one cv");
    //   setModalvariation("error");
    //   //alert(" you an only apply one cv");
    // }
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
    // console.log("0")

    setSavingDocId(b);
    //console.log(logindetails.userData.userId);
    if (e.target.files[0] != null) {
      // console.log("1")
      addDocuments(e.target.files[0], b, c);
    }
  };
  return (
    <div>
      <SimpleModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalmsg={modalmsg}
        modalvariation={modalvariation}
        setModalvariation={setModalvariation}
      />

      <div className="bio__buttons">
        <div className="cancel__btn" type="button">
          CANCEL
        </div>
        <div className="save__btn " type="button">
          SAVE DETAILS
        </div>
      </div>

      <div className="bio__container bg_blue p-3 mt-2 br_5">
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
          <div className="upload__video">Documents</div>
          <PrintIcon
            style={{
              fontSize: "50px",
              marginLeft: "20px",
            }}
          />
        </Grid>
        {files.map((file, index) => {
          console.log("file", file);
          return (
            <>
              <div className="card col-lg-12 mt-3">
                <div className="row justify-content-center mt-3">
                  <div className="upload__video mt-2">
                    {index + 1} .
                    {file.label ? file.label : file.documentTypeDto.label}
                  </div>
                </div>
                <p className="text_light mx-auto d-block">
                  Click On The Upload Button To Upload Document Answer
                </p>
                {file.documentTypeName ? (
                  <>
                    {index === 0 && (
                      <Typography
                        variant="h7"
                        className="text_light mx-auto d-block"
                      >
                        (only .doc .pdf .jpg .jpeg .png .svg)
                      </Typography>
                    )}
                    {index === 1 && (
                      <Typography
                        variant="h7"
                        className="text_light mx-auto d-block"
                      >
                        (only .doc .pdf .jpg .jpeg .png .svg .csv .xls)
                      </Typography>
                    )}
                    {index === 2 && (
                      <Typography
                        variant="h7"
                        className="text_light mx-auto d-block"
                      >
                        (only .doc .pdf)
                      </Typography>
                    )}
                  </>
                ) : null}
                <div className="upload-btn-wrapper mx-auto d-block mt-3 mb-5">
                  <label htmlFor={file.documentTypeName}>
                    <div className="upload__button" type="button">
                      <img src={upload} className="upload__icon" /> UPLOAD
                    </div>
                  </label>
                  <input
                    id={file.documentTypeName}
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      addfiles(e, index + 1, file.documentTypeName);
                    }}
                  />
                </div>
                <div className="mx-auto d-block">
                  {documentList &&
                    documentList.map((doc) => (
                      <>
                        {doc.documentTypeDto.documentTypeId === index + 1 && (
                          <div className={classes.toolview}>
                            {doc.documentTypeDto.documentTypeName}
                            <div className={classes.tools}>
                              <a href={doc.filePathAndName} target="_blank">
                                <Tooltip title="View">
                                  <IconButton style={{ border: 0, outline: 0 }}>
                                    <VisibilityIcon />
                                  </IconButton>
                                </Tooltip>
                              </a>
                              <Tooltip title="Delete">
                                <IconButton
                                  onClick={() => {
                                    deleteDocument(doc.documentId);
                                  }}
                                  style={{ border: 0, outline: 0 }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </div>
                        )}
                      </>
                    ))}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
