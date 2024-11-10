import React, { useEffect, useState } from "react";
import { getInterval, setInterval, getHealthTipState, getDuration, setDuration } from "./../../../utils/storage";

const Interval: React.FC<{}> = () => {
    const [intervalValue, setIntervalValue] = useState<string>('');
    const [durationValue, setDurationValue] = useState<string>('');
    const [initialInterval, setInitialInterval] = useState<number | null>(null);
    const [healthTipsEnabled, setHealthTipsEnabled] = useState<boolean>(false);
    const [initialDuration, setInitialDuration] = useState<number | null>(null);

    useEffect(() => {
        getInterval().then((interval) => {
            setIntervalValue(interval.toString());
            setInitialInterval(interval);
        }).catch((error) => {
            // console.error('Error retrieving interval:', error);
        });

        getHealthTipState().then((enabled) => {
            setHealthTipsEnabled(enabled);
        }).catch((error) => {
            // console.error('Error retrieving health tips state:', error);
        });

        getDuration().then((duration) => {
            if (duration) {
                setDurationValue(duration.toString());
                setInitialDuration(duration);
            }
        }).catch((error) => {
            // console.error('Error retrieving duration:', error);
        });
    }, []);

    const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0) {
            setIntervalValue(e.target.value);
            setInterval(value);
        } else {
            setIntervalValue("1");
        }
    };

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0) {
            setDurationValue(e.target.value);
            setDuration(value);

            // Send the new duration to the background script
            chrome.runtime.sendMessage({ action: 'setDuration', duration: value }, (response) => {
                if (response.success) {
                    console.log('Duration updated successfully');
                } else {
                    console.error('Failed to update duration');
                }
            });
        } else {
            setDurationValue("1");
        }
    };

    return (
        <div>
            <div className="cont">
                <div className="">
                    <div className="gaps">
                        <div className="input-form">
                            <input
                                type="number"
                                value={intervalValue}
                                onChange={handleIntervalChange}
                                min="1"
                            // disabled={healthTipsEnabled}
                            />
                        </div>
                        <p id="popupSummary" className="popupSummary">
                            interval minute/s
                        </p>
                    </div>
                </div>
                <div className="">
                    <div className="gaps">
                        <div className="input-form">
                            <input
                                type="number"
                                value={durationValue}
                                onChange={handleDurationChange}
                                min="1"
                            />
                        </div>
                        <p id="popupSummary" className="popupSummary">
                            popup duration minute/s
                        </p>
                    </div>
                </div>
            </div>

            {/* {healthTipsEnabled ? 
                <p id="tipsTimeInterval" className="tipsTimeInterval">
                Timer will restart upon change if health reminder is active.
                </p>
            : null} */}
        </div>
    );
};

export default Interval;