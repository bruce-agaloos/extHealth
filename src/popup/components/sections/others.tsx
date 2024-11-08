import React, { useState, useEffect } from "react";
import { Link } from "@mui/material";

import "./../../css/others.css";

const Others: React.FC = () => {
  return (
    <div className="link-container">
      <Link
        href="documentation.html"
        underline="hover"
        target="_blank"
        rel="noopener noreferrer"
      >
        Detailed Documentation
      </Link>
    </div>
  );
};

export default Others;
