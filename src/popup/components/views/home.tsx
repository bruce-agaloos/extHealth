import React, { useState, useEffect, useRef } from 'react';
import { Toggle, XAutoDetectToggle } from "./../toggles";
import { getHealthTipState, getXAutoDetectState } from "./../../../utils/storage";
import { sendMessageToContentScript, } from "./../../../utils/general";

const Home = () => {
    const [healthTipState, setHealthTipState] = useState<boolean | null>(false);
    const [xAutoDetectState, setXAutoDetectState] = useState<boolean | null>(false);

    useEffect(() => {
        getHealthTipState().then((state) => {
            setHealthTipState(state);
        });

        getXAutoDetectState().then((state) => {
            setXAutoDetectState(state);
        });

    },);

    const handleHealtTipState = (newStatee: boolean): void => {
        setHealthTipState(newStatee);
        sendMessageToContentScript({ state: newStatee }, (response) => {
            console.log('Received response for extension state:', response);
        });
    };

    const handleXAutoDetectState = (newState: boolean): void => {
        setXAutoDetectState(newState);
        sendMessageToContentScript({ xAutoDetect: newState }, (response) => {
            console.log('Received response for xAutoDetect state:', response);
        });
    }

    const handleButtonClick = () => {
        chrome.runtime.sendMessage({ action: 'openSidePanel' });
    };
    return (
        <div>
            <div className="popupContainer">
                <div id="popupContent" className="popupContent">
                    <div className="containerSummary">
                        <p id="popupSummary" className="popupSummary">
                            Health Tips Reminder
                        </p>
                        <Toggle
                            isOn={healthTipState}
                            onChange={handleHealtTipState}
                        />
                    </div>
                    <div className="containerSummary">
                        <p id="popupSummary" className="popupSummary">
                            FactChecking
                        </p>
                        <XAutoDetectToggle
                            isOn={xAutoDetectState}
                            onChange={handleXAutoDetectState}
                        />
                    </div>
                    <div className="containerSummary">
                       
                        <div className="buttonContainer">
                            <button className="roundedButton" onClick={handleButtonClick}>
                                <span className="buttonText">Open FactChecking sine panel</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Home;

