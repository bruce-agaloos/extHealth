import React, { useEffect, useState } from 'react';
import HealthTips from './healthTips';
import "./css/healthTips.css";
import {getAllHealthTips} from '../../../utils/storage';

// placeholder for local storage(change)
const HealthTipsSection: React.FC = () => {
    const [healthTipsData, setHealthTipsData] = useState<any[]>([]);

    useEffect(() => {
        // Function to fetch initial health tips data
        const fetchHealthTips = async () => {
            chrome.storage.local.get(['healthTips'], function(result) {
                if (result.healthTips) {
                    setHealthTipsData(result.healthTips);
                }
            });
        };

        // Fetch initial data
        fetchHealthTips();

        // Listener for changes in chrome storage
        const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }, areaName: string) => {
            if (areaName === 'local' && changes.healthTips) {
                setHealthTipsData(changes.healthTips.newValue);
            }
        };

        chrome.storage.onChanged.addListener(handleStorageChange);

        // Cleanup listener on component unmount
        return () => {
            chrome.storage.onChanged.removeListener(handleStorageChange);
        };
    }, []);

    return (
        <div>
            {healthTipsData.length === 0 ? (
                <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '20px',
                    color: 'gray',
                    marginTop: '30px',
                    marginBottom: '30px',
                    textAlign: 'center',
                  }}
                >It seems you dont have any health tips for now, just keep waiting</div>
            ) : (
                healthTipsData.map((tip, idx) => (
                <HealthTips key={idx} idx={idx} health_tips={tip} />
                ))
            )}
        </div>
    );
}

export default HealthTipsSection;