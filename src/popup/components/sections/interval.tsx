import React, { useEffect, useState } from "react";
import { getInterval, setInterval, getHealthTipState } from "./../../../utils/storage";

const Interval: React.FC<{}> = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [initialInterval, setInitialInterval] = useState<number | null>(null);
    const [healthTipsEnabled, setHealthTipsEnabled] = useState<boolean>(false);

    useEffect(() => {
        // Retrieve the interval value from storage when the component mounts
        getInterval().then((interval) => {
            setInputValue(interval.toString());
            setInitialInterval(interval); // Store the initial interval value
        }).catch((error) => {
            console.error('Error retrieving interval:', error);
        });

        // Retrieve the health tips enabled state from storage
        getHealthTipState().then((enabled) => {
            setHealthTipsEnabled(enabled);
        }).catch((error) => {
            console.error('Error retrieving health tips state:', error);
        });
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0) {
            setInputValue(e.target.value); // Use the original string value
            // Automatically update the interval in local storage
            setInterval(value).then(() => {
                console.log(`New interval set: ${value} minutes`); // Log the new interval value
                // Send a message to the content script
                chrome.runtime.sendMessage({ type: 'UPDATE_INTERVAL', interval: value }, (response) => {
                    if (chrome.runtime.lastError) {
                        console.error('Error sending message:', chrome.runtime.lastError);
                    } else {
                        console.log('Response from content script:', response);
                    }
                });
            }).catch((error) => {
                console.error('Error setting interval:', error);
            });
        } else {
            setInputValue("1"); // Default to "1" if the value is 0 or negative
        }
    };

    return (
        <div>
            <div className="containerSummary less2">
                <div className="gaps">
                    <div className="input-form">
                        <input
                            type="number"
                            value={inputValue}
                            onChange={handleInputChange}
                            min="1"  // Minimum value set to 1
                            disabled={healthTipsEnabled} // Disable input if healthTipsEnabled is true
                        />
                    </div>
                    <p id="popupSummary" className="popupSummary">
                        minute/s
                    </p>
                </div>
            </div>
        
        </div>

    );
};

export default Interval;