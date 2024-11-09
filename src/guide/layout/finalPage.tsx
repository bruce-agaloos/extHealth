import * as React from "react";
import { Link } from "react-router-dom";
import "./css/finalPage.css";

export default function FinalPage() {
  const getDetailedLink = () => {
    return chrome.runtime.getURL("documentation.html");
  }
  return (
    <div id="finalPage">
      <iframe
        src="https://drive.google.com/file/d/1YtmLUZ122GDmpNyxQmvzUhUp8CUE21Ge/preview"
        width="640"
        height="480"
        allow="autoplay"
      ></iframe>
      <div>
        <p>
          If you skip, make sure to watch our Video Demo for a quick overview of
          eXtHealth’s features and instructions on how to use them.
        </p>
        <div style={{
          display: "flex",
          justifyContent: "space-evenly",
          gap: "10px",
          width: "100%",
        }}>
          <Link to={`/`} className="primary-button">
            Go back to the start
          </Link>
          <a href={getDetailedLink()} className="skip-button-2">
            View detailed documentation
          </a>
        </div>
      </div>
    </div>
  );
}
