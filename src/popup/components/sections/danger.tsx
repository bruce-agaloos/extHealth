import React, { useEffect, useState } from "react";
import { setDefaultInstalled } from "../../../utils/storage";

const Danger: React.FC<{}> = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isCleared, setIsCleared] = useState(false);

    const handleButtonClick = () => {
        setIsPopupVisible(true);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    const handleClearData = () => {
        chrome.storage.local.clear(() => {
            if (chrome.runtime.lastError) {
                console.error('Error clearing local storage:', chrome.runtime.lastError);
            } else {
                setDefaultInstalled();
                setIsPopupVisible(false);
                return setIsCleared(true);
            }
        });
    };
    return (
        <div>
            {isCleared ? (
                <div className="successBox">
                    <p className="textGreen bold">
                        Data cleared successfully
                    </p>
                </div>
            ) : (
                <div className="alertBox">
                    <p className="text red bold">
                        clearing will lose all your data
                    </p>
                </div>
            )}

            <div className="containerSummary less">
                <p id="popupSummary" className="popupSummary indent">
                    LocalStorage
                </p>
                <button className="redRoundedButton" onClick={handleButtonClick}>
                    <span className="buttonText">Clear</span>
                </button>

                {isPopupVisible && (
                    <div className="danger-popup">
                        <div className="danger-popupContent">
                            <button className="closeButton" onClick={handleClosePopup}>×</button>
                            <h4>Are you sure you want to clear your data?</h4>
                            <button className="redRoundedButton" onClick={handleClearData}>Clear</button>
                        </div>
                    </div>
                )}
            </div>

        </div>

    );
};

export default Danger;