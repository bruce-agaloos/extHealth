import React, { useState,  useEffect, useRef  } from 'react';
import './css/default.css'; // Assuming styles are defined here

import FactCheckingSection from "../factcheck/FactCheckingSection"


const Layout = () => {
  
    return (
      <div id="grid">
        <header className="board">
          <div className="TitleLogo">
            <img src="icon.png" alt="Logo" className="logo" />
            <h2 id="popupTitle" className="popupTitle">
              eXtHealth <span className="forc">for Chrome</span>
            </h2>
          </div>
        </header>
        <section id="tooltip">
          <div>
            <p>
              <img src="info_white.png" alt="" height={'20px'} width={'20px'} />
              For best results, try simple claims like: "Cancer causes headaches", "Polio is deadly".
            </p>
            <p>Avoid submitting complex/multiple claims like: "Cancer symptoms are headaches, high fever, and hallucinations."</p>
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