import React from 'react';

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
    const firstSentence = getFirstSentence(health_tips.content);
    const theRestSentence = getSecondSentenceAndRest(health_tips.content);
    return (
        <div key={idx} className="tips">
           <div className="content">
                <h2 className="title">{health_tips.title}</h2>
                <p className="date">{health_tips.LastUpdated}</p>
                <p className="body-text">
                    {firstSentence}
                </p>
                <a className="url" href={health_tips.link} target="_blank" rel="noopener noreferrer">
                    read more...
                </a>
            </div>
        </div>
    );
}

export default HealthTips;