import React, { useEffect, useState } from "react";
import { getInterval, setInterval, getHealthTipState } from "./../../../utils/storage";

const Interval: React.FC<{}> = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [initialInterval, setInitialInterval] = useState<number | null>(null);
    const [healthTipsEnabled, setHealthTipsEnabled] = useState<boolean>(false);

    useEffect(() => {
        getInterval().then((interval) => {
            setInputValue(interval.toString());
            setInitialInterval(interval);
        }).catch((error) => {
            // console.error('Error retrieving interval:', error);
        });

        getHealthTipState().then((enabled) => {
            setHealthTipsEnabled(enabled);
        }).catch((error) => {
            // console.error('Error retrieving health tips state:', error);
        });
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0) {
            setInputValue(e.target.value);

            setInterval(value)
        } else {
            setInputValue("1");
        }
    };

    return (
        <div>
            {!healthTipsEnabled ?
                <div className="alertBox">
                    <p className="alert bold">
                        Reminder is Disabled
                    </p></div> : null}
            <div className="containerSummary less2">
                <div className="gaps">
                    <div className="input-form">
                        <input
                            type="number"
                            value={inputValue}
                            onChange={handleInputChange}
                            min="1"
                            // disabled={healthTipsEnabled}
                        />
                    </div>
                    <p id="popupSummary" className="popupSummary">
                        minute/s
                    </p>
                </div>
            </div>
                <p id="tipsTimeInterval" className="tipsTimeInterval">
                    Timer will restart upon change if health reminder is active.
                </p>
        </div>

    );
};

export default Interval;