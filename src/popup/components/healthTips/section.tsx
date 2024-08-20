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
            {healthTipsData.map((tip, idx) => (
                <HealthTips key={idx} idx={idx} health_tips={tip} />
            ))}
        </div>
    );
}

export default HealthTipsSection;