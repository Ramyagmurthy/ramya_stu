import React, { useState, useEffect, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Nav from "../../Nav";
import Footer from "../Footer";
import ProfileTab from "./ProfileTab";

export default function Profile({ handleChange }) {
  useEffect(() => {
    handleChange("a", 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div>
      <ProfileTab />
    </div>
  );
}
