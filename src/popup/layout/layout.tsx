import React, { useState, useEffect } from 'react'; 
import { Home, Interval, Topics } from "../components/sections";

const Layout = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [activeContent, setActiveContent] = useState<string>('interval');
    const [rotateClockwise, setRotateClockwise] = useState(false);
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
            },350);
        } else {
            setActiveSection('settings');
            setPopupHeight(200); 
        }
        setRotateClockwise(!rotateClockwise);
    };

    const handleSidebarClick = (content: string) => {
        setTimeout(() => {
            setActiveContent(content);
        },);
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
                    <div className={`setHead ${fadeOut ? 'fade-out-bottom' : 'fade-in-bottom'}`}>
                        <h4 className="settingsTitle">Settings</h4>
                    </div>
                )}
            </header>
            <section id="body">
                <div className="popupContent" style={{ height: `${popupHeight}px` }}>
                    {activeSection === 'home' &&  (<div className={`interval ${fadeOut ? 'fade-out' : 'fade-in'}`}><Home /></div>)}
                    {activeSection === 'settings' && (
                        <div id="popupContent" className="popupContent" style={{ height: `${popupHeight}px` }}>
                            <div className="sidebar-items">
                                <div className={`sidebar ${fadeOut ? 'fade-out-left' : 'fade-in-left'}`}>
                                    <div
                                        className={`subTileHeader ${activeContent === 'interval' ? 'active' : ''}`}
                                        onClick={() => handleSidebarClick('interval')}
                                    >
                                        Interval
                                    </div>
                                    <div
                                        className={`subTileHeader ${activeContent === 'topics' ? 'active' : ''}`}
                                        onClick={() => handleSidebarClick('topics')}
                                    >
                                        Topics
                                    </div>
                                </div>
                                <div className={`mainContent ${fadeOut ? 'fade-out-right' : 'fade-in-right'}`}>
                                    <div className="tileHeader">
                                        <div className="tileBorder">
                                            Health Tips Reminder
                                        </div>
                                    </div>
                                    {activeContent === 'interval' &&
                                        (<div className={`interval ${fadeOut ? '' : 'fade-in-top'}`}><Interval /></div>)}
                                    {activeContent === 'topics' && (
                                        <div
                                            className={`topics ${fadeOut ? '' : 'fade-in-bottom'}`}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <Topics />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Layout;