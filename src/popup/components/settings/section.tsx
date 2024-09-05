import React, { useEffect, useState } from "react";

import { getCategoryState, getHealthTipState, getXAutoDetectState, setHealthTipState } from "./../../../utils/storage";
import { sendMessageToContentScript, } from "../../../utils/general";
import { Toggle, Category, XAutoDetectToggle } from "../index";

const Settings: React.FC<{}> = () => {
    const [healthTipState, setHealthTipState] = useState<boolean | null>(false);
    const [xAutoDetectState, setXAutoDetectState] = useState<boolean | null>(false);
    const [categoryState, setCategoryState] = useState<{ [key: number]: boolean }>({});
    const ids = [15, 16, 18, 19, 20, 21, 23, 24, 28, 29];

    useEffect(() => {
        getHealthTipState().then((state) => {
            setHealthTipState(state);
        });

        getXAutoDetectState().then((state) => {
            setXAutoDetectState(state);
        });

        const newState: { [key: number]: boolean } = {};

        ids.forEach((id) => {
            getCategoryState(id).then((category) => {
                newState[id] = category;

                if (Object.keys(newState).length === ids.length) {
                    setCategoryState(newState);
                }
            }).catch((error) => {
                console.error(`Failed to fetch category state for id ${id}:`, error);
            });
        });
    }, []);

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

    const handleCategoryState = (id: number, newCategoryState: boolean): void => {
        setCategoryState((prevState) => ({
            ...prevState,
            [id]: newCategoryState,
        }));
        sendMessageToContentScript({ id, category: newCategoryState }, (response) => {
            console.log('Received response for category state:', response);
        });
    };


    return (
        <div className="popupContainer">
            <div id="popupContent" className="popupContent">
                <div className="containerSummary">
                    <p id="popupSummary" className="popupSummary">
                        Auto Detect Health Related Content in X
                    </p>
                    <XAutoDetectToggle
                        isOn={xAutoDetectState}
                        onChange={handleXAutoDetectState}
                    />

                </div>
                <div className="containerSummary">
                    <p id="popupSummary" className="popupSummary">
                        Health Reminder is <span>enabled</span> for X <span>by default.</span>
                    </p>
                    <Toggle
                        isOn={healthTipState}
                        onChange={handleHealtTipState}
                    />
                </div>
                <div className="containerSummary">
                    <p id="popupSummary" className="popupSummary indent">
                        Cancer
                    </p>
                    <Category
                        isOn={categoryState[ids[0]]}
                        onChange={(newState) => handleCategoryState(ids[0], newState)}
                        id={ids[0]}
                        disabled={!healthTipState}
                    />
                </div>
                <div className="containerSummary">
                    <p id="popupSummary" className="popupSummary indent">
                        Diabetes
                    </p>
                    <Category
                        isOn={categoryState[ids[1]]}
                        onChange={(newState) => handleCategoryState(ids[1], newState)}
                        id={ids[1]}
                        disabled={!healthTipState}
                    />
                </div>
                <div className="containerSummary">
                    <p id="popupSummary" className="popupSummary indent">
                        Heart Health
                    </p>
                    <Category
                        isOn={categoryState[ids[2]]}
                        onChange={(newState) => handleCategoryState(ids[2], newState)}
                        id={ids[2]}
                        disabled={!healthTipState}
                    />
                </div>
                <div className="containerSummary">
                    <p id="popupSummary" className="popupSummary indent">
                        HIV
                    </p>
                    <Category
                        isOn={categoryState[ids[3]]}
                        onChange={(newState) => handleCategoryState(ids[3], newState)}
                        id={ids[3]}
                        disabled={!healthTipState}
                    />
                </div>
                <div className="containerSummary">
                    <p id="popupSummary" className="popupSummary indent">
                        Mental Health
                    </p>
                    <Category
                        isOn={categoryState[ids[4]]}
                        onChange={(newState) => handleCategoryState(ids[4], newState)}
                        id={ids[4]}
                        disabled={!healthTipState}
                    />
                </div>
                <div className="containerSummary">
                    <p id="popupSummary" className="popupSummary indent">
                        Nutrition
                    </p>
                    <Category
                        isOn={categoryState[ids[5]]}
                        onChange={(newState) => handleCategoryState(ids[5], newState)}
                        id={ids[5]}
                        disabled={!healthTipState}
                    />
                </div>
                <div className="containerSummary">
                    <p id="popupSummary" className="popupSummary indent">
                        Obesity
                    </p>
                    <Category
                        isOn={categoryState[ids[6]]}
                        onChange={(newState) => handleCategoryState(ids[6], newState)}
                        id={ids[6]}
                        disabled={!healthTipState}
                    />
                </div>
                <div className="containerSummary">
                    <p id="popupSummary" className="popupSummary indent">
                        Physical Activity
                    </p>
                    <Category
                        isOn={categoryState[ids[7]]}
                        onChange={(newState) => handleCategoryState(ids[7], newState)}
                        id={ids[7]}
                        disabled={!healthTipState}
                    />
                </div>
                <div className="containerSummary">
                    <p id="popupSummary" className="popupSummary indent">
                        Sexual Health
                    </p>
                    <Category
                        isOn={categoryState[ids[8]]}
                        onChange={(newState) => handleCategoryState(ids[8], newState)}
                        id={ids[8]}
                        disabled={!healthTipState}
                    />
                </div>
                <div className="containerSummary">
                    <p id="popupSummary" className="popupSummary indent">
                        Vaccines
                    </p>
                    <Category
                        isOn={categoryState[ids[9]]}
                        onChange={(newState) => handleCategoryState(ids[9], newState)}
                        id={ids[9]}
                        disabled={!healthTipState}
                    />
                </div>
            </div>
        </div>

    );
};

export default Settings;
