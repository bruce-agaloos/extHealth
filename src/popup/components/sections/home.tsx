import React, { useState, useEffect, useRef } from "react";
import { XHealthTips, XAutoDetectToggle } from "./../toggles";
import {
  getHealthTipState,
  getXAutoDetectState,
} from "./../../../utils/storage";
import { sendMessageToContentScript } from "./../../../utils/general";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import "./../../css/linkHomeBelow.css";

const Home = () => {
  const [healthTipState, setHealthTipState] = useState<boolean | null>(false);
  const [xAutoDetectState, setXAutoDetectState] = useState<boolean | null>(
    false
  );

  useEffect(() => {
    getHealthTipState().then((state) => {
      setHealthTipState(state);
    });

    getXAutoDetectState().then((state) => {
      setXAutoDetectState(state);
    });
  });

  const handleHealtTipState = (newStatee: boolean): void => {
    setHealthTipState(newStatee);
    sendMessageToContentScript({ state: newStatee }, (response) => {
      // console.log('Received response for extension state:', response);
    });
  };

  const handleXAutoDetectState = (newState: boolean): void => {
    setXAutoDetectState(newState);
    sendMessageToContentScript({ xAutoDetect: newState }, (response) => {
      // console.log('Received response for xAutoDetect state:', response);
    });
  };

  const handleButtonClick = () => {
    chrome.runtime.sendMessage({ action: "openSidePanel" });
  };
  return (
    <div>
      <div className="popupContainer">
        <div id="popupContent" className="popupContent">
          <div className="containerSummary" style={{ paddingTop: "10px" }}>
            <p id="popupSummary" className="popupSummary">
              Health Tips Reminder
            </p>
            <XHealthTips isOn={healthTipState} onChange={handleHealtTipState} />
          </div>
          <div className="containerSummary">
            <p id="popupSummary" className="popupSummary">
              X Auto Detect
            </p>
            <XAutoDetectToggle
              isOn={xAutoDetectState}
              onChange={handleXAutoDetectState}
            />
          </div>

          <div className="buttonContainer">
            <button className="roundedButton" onClick={handleButtonClick}>
              <span className="buttonText">Fact Check Sidebar</span>
            </button>
          </div>
          <div className="linkHomeBelow">
            <a href="guide.html" target="_blank">
              How to use {"  "}
              <FontAwesomeIcon icon={faQuestionCircle} />
            </a>
            <a href="documentation.html" target="_blank">
              View Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
