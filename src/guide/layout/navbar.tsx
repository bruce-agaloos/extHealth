import React from "react";

const Navbar = () => {
  
    return (
      <nav>
        <div id="icon">
          <img src="icon.png" alt="eXtHealth Icon" />
          <span>eXtHealth</span>
        </div>
        <ul>
          <li>
            <a href="#setup">Set up</a>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#faqs">FAQs</a>
          </li>
          <li>
            <a href="#">Get eXtHealth</a>
          </li>
        </ul>
      </nav>
    );
  };
  
export default Navbar;