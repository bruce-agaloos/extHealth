import * as React from "react";
import { Link } from "react-router-dom";
import "./css/startPage.css";
import openPdf from "../../pdfViewer/openPdf";
export default function StartPage() {

  return (
    <div id="startPage">
      <div>
        <h1>
        Thank You for Installing 
        eXtHealth!
        </h1>
        <p>
        Installing our extension helps you stay well-informed.  Let eXtHealth guide you with trusted health information and fact-checking right from your browser on X.
        </p>
        <div className="groupLink">
          <Link to="/guide.html/pages/1" className="primary-button">Get Started</Link>
          <Link to="/guide.html/finalPage" className="skip-button">Skip Tutorial</Link>
          <button onClick={() => openPdf("","")}>open pdf</button>
        </div>
      </div>
      <img src="iconBig.png" alt="" />
    </div>
  );
}
