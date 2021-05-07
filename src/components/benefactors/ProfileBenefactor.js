import React, { useState, useEffect, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Footer from "../students/Footer";
import BTabLinks from "./BTabLinks";

export default function ProfileBenefactor({ value }) {
  return (
    <div>
      <BTabLinks linkvalue={value} />
      {/* <Footer /> */}
    </div>
  );
}
