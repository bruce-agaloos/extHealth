import * as React from "react";
import { Link } from "react-router-dom";
import "./css/finalPage.css";

export default function FinalPage() {
  
  return (
    <div id="finalPage">
      <video controls>
        <source src="guide.mp4" type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
      <div>
        <p>
          If you skip, make sure to watch our Video Demo for a quick overview of eXtHealth’s features and instructions on how to use them.
        </p>
        <Link to={`/guide.html`} className="primary-button">Finish</Link>
      </div>
    </div>
  );
}
