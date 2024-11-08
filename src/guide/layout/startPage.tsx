import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/startPage.css";
import TermsOfServiceModal from "./../../termsAndPrivacy/forOtherFolders/modal"
export default function StartPage() {


  return (
    <div id="startPage">
      <TermsOfServiceModal/>
      <div>
        <h1>
        Thank You for Installing 
        eXtHealth!
        </h1>
        <p>
        Installing our extension helps you stay well-informed.  Let eXtHealth guide you with trusted health information and fact-checking right from your browser on X.
        </p>
        <div className="groupLink">
          <Link to="/pages/1" className="primary-button">Get Started</Link>
          <Link to="/finalPage" className="skip-button">Skip Tutorial</Link>
        </div>
      </div>
      <img src="iconBigGreen.png" alt="" />
    </div>
  );
}
