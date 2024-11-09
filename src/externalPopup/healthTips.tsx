import React, { useEffect, useRef, useState } from 'react';
import "./css/healthTips.css";

interface HealthTipsProps {
    idx: number;
    health_tips: {
        title: string;
        link: string;
        content: string;
        LastUpdated: string;
    };
}

const getFirstSentence = (text: string) => {
    const sentenceEnd = text.search(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\!)\s/);
    return sentenceEnd !== -1 ? text.slice(0, sentenceEnd + 1).trim() : text;
}

const getSecondSentenceAndRest = (text: string) => {
    const sentenceEnd = text.search(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\!)\s/);
    return sentenceEnd !== -1 ? text.slice(sentenceEnd + 1).trim() : "";
}

const HealthTips: React.FC<HealthTipsProps> = ({ idx, health_tips }) => {
    const healthCardRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | null>(null);

    useEffect(() => {
        if (healthCardRef.current) {
            const height = healthCardRef.current.offsetHeight;
            setHeight(height);
            chrome.runtime.sendMessage({ action: 'healthCardHeight', height });
        }
    }, []);

    const firstSentence = getFirstSentence(health_tips.content);
    const theRestSentence = getSecondSentenceAndRest(health_tips.content);

    return (
        <div className="health-card" ref={healthCardRef}>
            {/* Header Icons */}
            <div className="header-icons">
                <div className="logo-container">
                    <img src="iconGreen.png" alt="Logo" className="logo" />
                    <span className="icon">Reminders</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="content">
                <h2 className="title">{health_tips.title}</h2>
                <div className="date-container">
                    <p className="datess">{health_tips.LastUpdated}</p>
                    <span className="last-updated">last updated</span>
                </div>
                <p className="body-text">
                    {firstSentence}
                </p>
                <p className="body-text">
                    {theRestSentence}
                </p>
                <a className="url" href={health_tips.link} target="_blank" rel="noopener noreferrer">
                    read more
                </a>
            </div>
        </div>
    );
}

export default HealthTips;