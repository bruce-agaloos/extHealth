import React, { useState,  useEffect, useRef  } from 'react';
import './css/default.css'; // Assuming styles are defined here

import FactCheckingSection from "../factcheck/FactCheckingSection"


const Layout = () => {
    const [activeOption, setActiveOption] = useState('factChecking');

  
    useEffect(() => {
      chrome.storage.local.get(['isFactCheckLoading', 'isSingleFactCheckLoading'], (result) => {
        const isFactCheckLoading = result.isFactCheckLoading === true;
        const isSingleFactCheckLoading = result.isSingleFactCheckLoading === true;

        const loaderElement = document.querySelector('.loader');

        if (loaderElement) {
            if (isFactCheckLoading || isSingleFactCheckLoading) {
                loaderElement.classList.add('loading');
            }
        }
      });
      const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }) => {
          if (changes.isFactCheckLoading || changes.isSingleFactCheckLoading) {
              chrome.storage.local.get(['isFactCheckLoading', 'isSingleFactCheckLoading'], (result) => {
                  const isFactCheckLoading = result.isFactCheckLoading === true;
                  const isSingleFactCheckLoading = result.isSingleFactCheckLoading === true;
          
                  const loaderElement = document.querySelector('.loader');
          
                  if (loaderElement) {
                      if (isFactCheckLoading || isSingleFactCheckLoading) {
                          loaderElement.classList.add('loading');
                      } else {
                          loaderElement.classList.remove('loading');
                      }
                  }
              });
          }
      };
  
      chrome.storage.onChanged.addListener(handleStorageChange);
  
      // Cleanup event listener on component unmount
      return () => {
          chrome.storage.onChanged.removeListener(handleStorageChange);
      };
  }, []);
  
    const handleOptionClick = (optionId) => {
      setActiveOption(optionId);
    };
  
    return (
      <div id="grid">
        <header className="board">
          <div className="TitleLogo">
            <img src="icon.png" alt="Logo" className="logo" />
            <h2 id="popupTitle" className="popupTitle">
              eXtHealth <span className="forc">for Chrome</span>
            </h2>
            <span className="loader"></span>
          </div>
        </header>
        <section id="body">
          <div id="factChecking" className='selectedOption appearLeft'>
            <FactCheckingSection/>
          </div>
        </section>
      </div>
    );
  };
  
  export default Layout;