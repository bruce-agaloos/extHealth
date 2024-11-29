import React, { useState,  useEffect, useRef  } from 'react';
import './css/default.css'; // Assuming styles are defined here

import FactCheckingSection from "../factcheck/FactCheckingSection"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'; 

const Layout = () => {
  
    return (
      <div id="grid">
        <header className="board">
          <div className="TitleLogo">
            <div>
              <img src="iconGreen.png" alt="Logo" className="logo" />
              <h2 id="popupTitle" className="popupTitle">
                Fact Checking
              </h2>
            </div>
            <span onClick={() => chrome.tabs.create({ url: chrome.runtime.getURL('guide.html') })}>
              <span style={{fontFamily: "Times New Roman"}}>How to use {" "}</span> <FontAwesomeIcon icon={faCircleQuestion} /> 
            </span>
          </div>
        </header>
        <section id="tooltip">
          <div>
            <p>
              <img src="info_white.png" alt="" height={'15px'} width={'15px'} />
              <strong>Disclaimer:</strong> This system’s results are not 100% accurate and are for informational purposes only. Always consult a medical professional for advice or treatment. The system also does not discredit evidence sources.
            </p>
          </div>
        </section>
        <section id="body">
          <div id="factChecking" className='appearLeft'>
            <FactCheckingSection/>
          </div>
        </section>
      </div>
    );
  };
  
  export default Layout;