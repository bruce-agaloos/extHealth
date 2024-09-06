import React, { useEffect, useState } from "react";

import { getCategoryState, setHealthTipState } from "../../../utils/storage";
import { sendMessageToContentScript } from "../../../utils/general";


const Settings: React.FC<{}> = () => {
    return (
        <div id="popupContent" className="popupContent">
            <div>
                <div className="tileHeader">
                    <div className="tileBorder">
                        Health Tips Reminder
                    </div>
                </div>
            </div>
            <div className="sidebar">
                <div className="subTileHeader">Interval:</div>
                <div className="subTileHeader">Topics:</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1>Work in progress Progress...</h1>
            </div>
        </div>
    );
};

export default Settings;