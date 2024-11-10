import React, { useState, useEffect } from 'react';
import { Home, Interval, Topics, HealthTips, FactCheckMode, Others, Danger } from "./../components/sections";
import { getHealthTipState } from "./../../utils/storage";

const Layout = () => {
    const [healthTipsData, setHealthTipsData] = useState<any[]>([]);
    const [activeSection, setActiveSection] = useState('home');
    const [activeContent, setActiveContent] = useState<string>('interval');
    const [previousContent, setPreviousContent] = useState<string>('');
    const [rotateClockwise, setRotateClockwise] = useState(false);
    const [rotateCounterclockwise, setRotateCounterclockwise] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [popupHeight] = useState(250);
    const [healthTipsEnabled, setHealthTipsEnabled] = useState<boolean>(false);

    useEffect(() => {
        getHealthTipState().then((enabled) => {
            setHealthTipsEnabled(enabled);
        }).catch((error) => {
            // console.error('Error retrieving health tips state:', error);
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
            }, 350);
        } else {
            setFadeOut(true);
            setTimeout(() => {
                setActiveSection('settings');
                setFadeOut(false);
            }, 350);
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
            }, 350);
        } else {
            setFadeOut(true);
            setTimeout(() => {
                setActiveSection('history');
                setFadeOut(false);
            }, 350);
        }
        setRotateCounterclockwise(!rotateCounterclockwise);
        setRotateClockwise(false);
    };

    const handleSidebarClick = (content: string) => {
        setPreviousContent(activeContent);
        setActiveContent(content);
    };

    const handleTitleClick = () => {
        setActiveSection('home');
        setFadeOut(true);
        setTimeout(() => {
            setFadeOut(false);
        }, 350);
    };

    const getFadeInClass = () => {
        const possibleContent = ['interval', 'topics', 'fact-mode', 'others', 'danger'];
        if (possibleContent.indexOf(previousContent) < possibleContent.indexOf(activeContent)) {
            return 'fade-in-top';
        } else if (possibleContent.indexOf(previousContent) > possibleContent.indexOf(activeContent)) {
            return 'fade-in-bottom';
        }
    };

    return (
        <div id="grid" className="no-select">
            <header className="board">
                <div className="TitleLogo">
                    <img src="iconGreen.png" alt="Logo" className="logo" onClick={handleTitleClick} />
                    <h2 id="popupTitle" className="popupTitle" onClick={handleTitleClick}>
                        extHealth <span className="forc" onClick={handleTitleClick}>for Chrome</span>
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
                                    <div className="text">
                                        It seems you don't have any health tips for now
                                    </div>
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
                                <div className={`sidebar ${fadeOut ? 'fade-out-left' : 'fade-in-left'}`} style={{overflow:"auto"}}>
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
                                    <div
                                        className={`subTileHeader ${activeContent === 'fact-mode' ? 'active' : ''}`}
                                        onClick={() => handleSidebarClick('fact-mode')}
                                    >
                                        Fact Mode
                                    </div>
                                    {/* <div
                                        className={`subTileHeader ${activeContent === 'others' ? 'active' : ''}`}
                                        onClick={() => handleSidebarClick('others')}
                                    >
                                        Others
                                    </div> */}
                                    <div
                                        className={`subTileHeader ${activeContent === 'danger' ? 'active' : ''}`}
                                        onClick={() => handleSidebarClick('danger')}
                                    >
                                        Danger
                                    </div>
                                </div>
                                <div className={`mainContent ${fadeOut ? 'fade-out-right' : 'fade-in-right'}`}>
                                    {(activeContent === 'interval') && (
                                        <div className="tileHeader">
                                            <div className="tileBorder">
                                                Health Tips Reminder
                                            </div>
                                        </div>
                                    )}
                                    {(activeContent === 'topics') && (
                                        <div className="tileHeader">
                                            <div className="tileBorder" style={{ marginLeft: "11.5px" }}>
                                                Health Tips Reminder
                                            </div>
                                        </div>
                                    )}
                                    {(activeContent === 'fact-mode') && (
                                        <div className="tileHeader">
                                            <div className="tileBorder">
                                                Fact Check Mode
                                            </div>
                                        </div>
                                    )}
                                    {(activeContent === 'others') && (
                                        <div className="tileHeader">
                                            <div className="tileBorder">
                                                Others
                                            </div>
                                        </div>
                                    )}
                                    {activeContent === 'interval' &&
                                        (<div className={`interval ${fadeOut ? '' : 'fade-in-top'}`}>
                                            <Interval /></div>)}
                                    {activeContent === 'topics' && (
                                        <div
                                            className={`topics ${fadeOut ? '' : getFadeInClass()}`}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <Topics />
                                        </div>
                                    )}
                                    {activeContent === 'fact-mode' && (
                                        <div
                                            className={`fact-mode ${fadeOut ? '' : getFadeInClass()}`}
                                        
                                        >
                                            <FactCheckMode />
                                            
                                        </div>
                                    )}
                                    {activeContent === 'others' && (
                                        <div
                                            className={`others ${fadeOut ? '' : getFadeInClass()}`}
                                        
                                        >
                                            <Others />
                                            
                                        </div>
                                    )}
                                    {activeContent === 'danger' &&
                                        (<div className={`danger ${fadeOut ? '' : 'fade-in-bottom'}`}>
                                            <Danger />
                                        </div>)}

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