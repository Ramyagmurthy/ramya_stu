import React, { useState, useEffect, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Nav from "../../Nav";
import Footer from "../Footer";
import ProfileTab from "./ProfileTab";

export default function Profile() {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
      }}
    >
      {/* <Nav /> */}
      <ProfileTab />
      {/* <Footer /> */}
    </div>
  );
}
