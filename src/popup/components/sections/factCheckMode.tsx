import React, { useState, useEffect } from 'react';
import FactRadio from './../toggles/factRadio';
import { getFromStorage } from './../../../utils/storage';

interface factModeData {
    factCheckMode: string;
  }

const FactCheckMode: React.FC = () => {
    const [selectedMode, setSelectedMode] = useState<string>('offline');

    useEffect(() => {
        // Fetch the initial mode from storage
        getFromStorage('factCheckMode').then((result) => {
            const mode = result as factModeData;
            console.log('Retrieved mode from storage:', mode);
            if (mode.factCheckMode) {
                setSelectedMode(mode.factCheckMode);
            }
        }).catch((error) => {
            console.error('Error retrieving mode from storage:', error);
        });
    }, []);

    const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMode = event.target.value;
        setSelectedMode(newMode);

        // Send a message to the background script
        chrome.runtime.sendMessage({ mode: newMode }, (response) => {
            console.log('Background script response:', response);
        });
    };

    return (
        <div>
            <FactRadio
                label="Offline Mode"
                value="offline"
                checked={selectedMode === 'offline'}
                onChange={handleModeChange}
            />
            <FactRadio
                label="Online Database Mode"
                value="onlineDatabase"
                checked={selectedMode === 'onlineDatabase'}
                onChange={handleModeChange}
            />
            <FactRadio
                label="Google Mode"
                value="google"
                checked={selectedMode === 'google'}
                onChange={handleModeChange}
            />
        </div>
    );
};

export default FactCheckMode;