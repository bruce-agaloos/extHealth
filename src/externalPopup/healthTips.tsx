import React, { useEffect, useRef, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
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
    const [duration, setDuration] = useState<number>(0);
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (healthCardRef.current) {
            const height = healthCardRef.current.offsetHeight;
            setHeight(height);
            chrome.runtime.sendMessage({ action: 'healthCardHeight', height });
        }

        // Fetch the duration from local storage
        chrome.storage.local.get(['duration'], function(result) {
            if (result.duration) {
                setDuration(result.duration);
                setRemainingTime(result.duration * 60); // Convert minutes to seconds
            }
        });
    }, []);

    useEffect(() => {
        if (remainingTime > 0) {
            intervalIdRef.current = setInterval(() => {
                setRemainingTime((prevTime) => prevTime - 1);
            }, 1000);
        }

        return () => {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
            }
        };
    }, [remainingTime]);

    useEffect(() => {
        if (remainingTime <= 0 && intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            window.close(); // Close the popup when the timer reaches zero
        }
    }, [remainingTime]);

    const firstSentence = getFirstSentence(health_tips.content);
    const theRestSentence = getSecondSentenceAndRest(health_tips.content);

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return (
                <div className="health-card" ref={healthCardRef}>
            {/* Header Icons */}
            <div className="header-icons">
                <div className="logo-container">
                    <img src="iconGreen.png" alt="Logo" className="logo" />
                    <span className="icon">Reminders</span>
                </div>
                {duration > 0 && (
                    <div className="timer-container">
                        <CircularProgressbar
                            value={remainingTime}
                            maxValue={duration * 60}
                            text={`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
                            styles={buildStyles({
                                textColor: '#000',
                                pathColor: '#74DDCA', // Change the circle color here
                                trailColor: '#d6d6d6',
                            })}
                        />
                    </div>
                )}
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