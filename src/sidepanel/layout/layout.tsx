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
              <img src="icon.png" alt="Logo" className="logo" />
              <h2 id="popupTitle" className="popupTitle">
                Fact Checking
              </h2>
            </div>
            <span onClick={() => chrome.tabs.create({ url: chrome.runtime.getURL('guide.html') })}>
              <FontAwesomeIcon icon={faCircleQuestion} /> <span>How to use?</span>
            </span>
          </div>
        </header>
        <section id="tooltip">
          <div>
            <p>
              <img src="info_white.png" alt="" height={'20px'} width={'20px'} />
              The <strong>model</strong> used to determine the "supporting," "disputed," and "neutral" is not <strong>100%</strong> correct. Please use your own judgement when reading the fact-checking results.
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