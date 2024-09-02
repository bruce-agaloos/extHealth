import React, { useState,  useEffect, useRef  } from 'react';
import './css/default.css'; // Assuming styles are defined here

import HealthTipsSection from "../components/healthTips/section"
import Settings from "../components/settings/section"


const Layout = () => {
    const [activeOption, setActiveOption] = useState('healthReminders');
  
    const options = [
      { id: 'healthReminders', name: 'Health Reminders', imgSrc: 'iconReminder.png', altText: 'reminderLogo' },
      { id: 'settings', name: 'Settings', imgSrc: 'iconSettings.png', altText: 'settingsLogo' },
    ];

    const previousActiveOptionRef = useRef(activeOption);
  
    useEffect(() => {
        const appearClasses = ['appearRight', 'appearLeft'];
        const disappearClasses = ['disappearRight', 'disappearLeft'];
        const activeElement = document.querySelector(`#${activeOption}`);
        const previousActiveElement = document.querySelector(`#${previousActiveOptionRef.current}`);
    
        if (activeElement === previousActiveElement) return;
    
        const currentIndex = options.findIndex(option => option.id === activeOption);
        const previousIndex = options.findIndex(option => option.id === previousActiveElement?.id);
    
        if (previousActiveElement) {
            // Remove all appear classes before adding disappear classes
            appearClasses.forEach(cls => previousActiveElement.classList.remove(cls));
    
            const disappearClass = currentIndex > previousIndex ? disappearClasses[0] : disappearClasses[1];
            previousActiveElement.classList.remove('selectedOption');
            previousActiveElement.classList.add(disappearClass);
    
            // Use a timeout to remove the disappear class and add hidden class after the animation completes
            setTimeout(() => {
                previousActiveElement.classList.remove(disappearClass);
                previousActiveElement.classList.add('hidden');
            }, 500); // Adjust this timing to match your animation duration
        }
    
        if (activeElement) {
            // Remove hidden and any lingering disappear classes before adding appear classes
            activeElement.classList.remove('hidden');
            disappearClasses.forEach(cls => activeElement.classList.remove(cls));
    
            const appearClass = currentIndex > previousIndex ? appearClasses[0] : appearClasses[1];
            activeElement.classList.add('selectedOption', appearClass);
        }
    
        previousActiveOptionRef.current = activeOption;
    }, [activeOption, options]);
  
  
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
          </div>
        </header>
        <section id="options">
          <ul>
            {options.map((option) => (
              <li key={option.id} className={activeOption === option.id ? 'activeOption' : ''} onClick={() => handleOptionClick(option.id)}>
                {option.name}
                <img src={option.imgSrc} alt={option.altText} style={{ height: '1rem', width: '1rem' }} />
              </li>
            ))}
          </ul>
        </section>
        <section id="body">
          <div id="healthReminders" className={`${activeOption === 'healthReminders' ? 'selectedOption' : ''} appearLeft`}>
            <HealthTipsSection/>
          </div>
          <div id="settings" className={`${activeOption === 'settings' ? 'selectedOption' : ''} ${activeOption !== 'settings' ? 'disappearLeft' : ''}`}>
            <Settings/>
          </div>
        </section>
        <a
          id="userGuide"
          onClick={() => chrome.tabs.create({ url: chrome.runtime.getURL('guide.html') })}
        >
          How To Use?
        </a>
      </div>
    );
  };
  
  export default Layout;