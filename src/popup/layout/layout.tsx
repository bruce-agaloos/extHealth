import React, { useState, useEffect } from 'react';
import { Home, Interval, Topics, HealthTips } from "./../components/sections";
import { getHealthTipState } from "./../../utils/storage";
const Layout = () => {
    const [healthTipsData, setHealthTipsData] = useState<any[]>([]);
    const [activeSection, setActiveSection] = useState('home');
    const [activeContent, setActiveContent] = useState<string>('interval');
    const [rotateClockwise, setRotateClockwise] = useState(false);
    const [rotateCounterclockwise, setRotateCounterclockwise] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [popupHeight, setPopupHeight] = useState(200);
    const [healthTipsEnabled, setHealthTipsEnabled] = useState<boolean>(false);

    useEffect(() => {
        getHealthTipState().then((enabled) => {
            setHealthTipsEnabled(enabled);
        }).catch((error) => {
            console.error('Error retrieving health tips state:', error);
        });

        const fetchHealthTips = async () => {
            chrome.storage.local.get(['healthTips'], function (result) {
                if (result.healthTips) {
                    setHealthTipsData(result.healthTips);
                }
            });
        };

        fetchHealthTips();
        const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }, areaName: string) => {
            if (areaName === 'local' && changes.healthTips) {
                setHealthTipsData(changes.healthTips.newValue);
            }
        };

        chrome.storage.onChanged.addListener(handleStorageChange);

        return () => {
            chrome.storage.onChanged.removeListener(handleStorageChange);
        };
    }, []);

    const handleSettingsClick = () => {
        if (activeSection === 'settings') {
            setFadeOut(true);
            setTimeout(() => {
                setActiveSection('home');
                setFadeOut(false);
                setPopupHeight(200);
            }, 350);
        } else {
            setActiveSection('settings');
            setPopupHeight(200);
        }
        setRotateClockwise(!rotateClockwise);
        setRotateCounterclockwise(false);
    };

    const handleHistoryClick = () => {
        if (activeSection === 'history') {
            setFadeOut(true);
            setTimeout(() => {
                setActiveSection('home');
                setFadeOut(false);
                setPopupHeight(200);
            }, 350);
        } else {
            setActiveSection('history');
            setPopupHeight(200);
        }
        setRotateCounterclockwise(!rotateCounterclockwise);
        setRotateClockwise(false);
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

                    <div className="icons">
                        <img
                            src="iconSettings.png"
                            alt="Settings"
                            className={`settingsIcon ${rotateClockwise ? 'rotate-clockwise' : 'rotate-counterclockwise'}`}
                            onClick={handleSettingsClick}
                        />
                        <img
                            src="history.png"
                            alt="History"
                            className={`historyIcon ${rotateCounterclockwise ? 'rotate-clockwise2' : 'rotate-counterclockwise2'}`}
                            onClick={handleHistoryClick}
                        />
                    </div>
                </div>
                {activeSection === 'settings' && (
                    <div className={`setHead ${fadeOut ? 'fade-out-bottom' : 'fade-in-bottom'}`}>
                        <h4 className="settingsTitle">Settings</h4>
                    </div>
                )}
                {activeSection === 'history' && (
                    <div className={`setHead ${fadeOut ? 'fade-out-bottom' : 'fade-in-bottom'}`}>
                        <h4 className="settingsTitle">History</h4>
                    </div>
                )}
            </header>
            <section id="body">
                <div className="popupContent" style={{ height: `${popupHeight}px` }}>
                    {activeSection === 'home' && (<div className={`interval ${fadeOut ? 'fade-out' : 'fade-in'}`}><Home /></div>)}
                    {activeSection === 'history' && (
                        <div
                            className={`mainContent ${fadeOut ? 'fade-out' : 'fade-in'}`}
                            style={{
                                maxHeight: '200px', // Set a fixed height for the div
                                overflowY: 'auto', // Enable vertical scrolling
                            }}
                        >
                            {healthTipsData.length === 0 ? (
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontSize: '20px',
                                        color: 'gray',
                                        marginTop: '30px',
                                        marginBottom: '30px',
                                        textAlign: 'center',
                                    }}
                                >
                                    It seems you don't have any health tips for now, just keep waiting
                                </div>
                            ) : (
                                healthTipsData.map((tip, idx) => (
                                    <HealthTips key={idx} idx={idx} health_tips={tip} />
                                ))
                            )}
                        </div>
                    )}
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
                                        (<div className={`interval ${fadeOut ? '' : 'fade-in-top'}`}>
                                            {healthTipsEnabled ?
                                                <div className="alertBox">
                                                    <p className="alert">
                                                        Reminder is Enabled
                                                    </p></div> : null}<Interval /></div>)}
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