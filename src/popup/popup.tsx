import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";

import { getExtensionState } from "./../utils/storage";
import { sendExtensionStateToContentScript, } from "../utils/general";
import { Toggle } from "./components";

const Popup: React.FC<{}> = () => {
    const [extensionState, setExtensionState] = useState<boolean | null>(false);
    
    useEffect(() => {
        getExtensionState().then((state) => {
            setExtensionState(state);
        });

    }, []);

    const handleExtensionState = (newState: boolean): void => {
        setExtensionState(newState);
        sendExtensionStateToContentScript(newState);
    };
    return (
        <div className="popupContainer">
            <div id="popupContent" className="popupContent">
                <div className="board">
                    <div className="TitleLogo">
                        <img src="icon.png" alt="Logo" className="logo" />
                        <h2 id="popupTitle" className="popupTitle">
                            extHealth <span className="forc">for Chrome</span>
                        </h2>

                    </div>
                </div>
                <div className="containerSummary">
                    <p id="popupSummary" className="popupSummary">
                        Health Reminder is <span>enabled</span> for X <span>by default.</span>
                    </p>
                    <Toggle
                        isOn={extensionState}
                        onChange={handleExtensionState}
                    />
                </div>
                <div className="containerSummary">
                    <p id="popupSummary" className="popupSummary">
                        Health Reminder is <span>enabled</span> for Facebook <span className="boldSummary">by default.</span>
                    </p>
                    {/* <Toggle
                        isOn={extensionState}
                        onChange={handleExtensionState}
                    /> */}
                </div>
                <div className="containerSummary">
                    <p id="popupSummary" className="popupSummary">
                        Check Button is <span>enabled</span> for X <span>by default.</span>
                    </p>
                    {/* <Toggle
                        isOn={extensionState}
                        onChange={handleExtensionState}
                    /> */}
                </div>
                <div className="containerSummary">
                    <p id="popupSummary" className="popupSummary">
                        Check Button is <span>enabled</span> for Facebook <span className="boldSummary">by default.</span>
                    </p>
                    {/* <Toggle
                        isOn={extensionState}
                        onChange={handleExtensionState}
                    /> */}
                </div>
            </div>
        </div>

    );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<Popup />);