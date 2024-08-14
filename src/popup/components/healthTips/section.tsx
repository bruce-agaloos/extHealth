import React from 'react';
import HealthTips from './healthTips';
import "./css/healthTips.css";

// placeholder for local storage(change)
const healthTipsData = [
    {
        title: "Stay Hydrated",
        url: "https://example.com/stay-hydrated",
        summary: "Drinking water is essential for maintaining good health. Make sure to drink at least 8 glasses of water a day."
    },
    {
        title: "Exercise Regularly",
        url: "https://example.com/exercise-regularly",
        summary: "Regular exercise helps to improve cardiovascular health and overall fitness. Aim for at least 30 minutes of exercise daily."
    }
];

const HealthTipsSection: React.FC = () => {
    return (
        <div>
            {healthTipsData.map((tip, idx) => (
                <HealthTips idx={idx} health_tips={tip} />
            ))}
        </div>
    );
}

export default HealthTipsSection;