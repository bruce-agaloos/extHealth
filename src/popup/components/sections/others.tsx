import React, { useState, useEffect } from "react";
import { Link } from "@mui/material";

import "./../../css/others.css";

const Others: React.FC = () => {
  return (
    <div className="link-container">
      <ul>
        <li>
          <Link
            href="guide.html"
            underline="hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            Introductory Page
          </Link>
        </li>
        <li>
          <Link
            href="documentation.html"
            underline="hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            Detailed Documentation
          </Link>
        </li>
        <li>
          <Link
            href="TermsAndPrivacy.html"
            underline="hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Use, Privacy Policy, and License
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Others;
