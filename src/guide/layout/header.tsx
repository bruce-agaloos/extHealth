import React from "react";

import './css/header.css';

const Header = () => {
  return (
    <header id="thankyou">
      <div>
        <h1>
          Thank You for Installing 
          eXtHealth!
        </h1>
        <p>
          Installing our extension helps you stay well-informed.  Let eXtHealth guide you with trusted health information and fact-checking right from your browser on X.
        </p>
      </div>
      <img src="guide.png" alt="eXtHealth Guide" />
    </header>
  );
};

export default Header;