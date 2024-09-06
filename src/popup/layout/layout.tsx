import React, { useState, useEffect } from 'react';
import './css/default.css'; // Assuming styles are defined here
import { Home, Settings } from "../components/views";

const Layout = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [rotateClockwise, setRotateClockwise] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [popupHeight, setPopupHeight] = useState(200); 

    useEffect(() => {
        console.log("Layout component mounted");
    }, []);

    const handleSettingsClick = () => {
        if (activeSection === 'settings') {
            setFadeOut(true);
            setTimeout(() => {
                setActiveSection('home');
                setFadeOut(false);
                setPopupHeight(200);
            }, 500); 
        } else {
            setActiveSection('settings');
            setPopupHeight(200); // New height when switching to settings
        }
        setRotateClockwise(!rotateClockwise);
    };

    return (
        <div id="grid">
            <header className="board">
                <div className="TitleLogo">
                    <img src="icon.png" alt="Logo" className="logo" />
                    <h2 id="popupTitle" className="popupTitle">
                        extHealth <span className="forc">for Chrome</span>
                    </h2>
                    <img 
                        src="iconSettings.png" 
                        alt="Settings" 
                        className={`settingsIcon ${rotateClockwise ? 'rotate-clockwise' : 'rotate-counterclockwise'}`} 
                        onClick={handleSettingsClick} 
                    />
                </div>
                {activeSection === 'settings' && (
                    <div className="setHead">
                        <h4 className={`settingsTitle ${fadeOut ? 'fade-out' : ''}`}>Settings</h4>
                    </div>
                )}
            </header>
            <section id="body">
                <div className="popupContent" style={{ height: `${popupHeight}px` }}>
                    {activeSection === 'home' && <Home />}
                    {activeSection === 'settings' && <Settings />}
                </div>
            </section>
        </div>
    );
};

export default Layout;