import React from 'react';

interface HealthTipsProps {
    idx : number;
    health_tips: {
        title: string;
        url: string;
        summary: string;
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

const HealthTips: React.FC<HealthTipsProps> = ({idx, health_tips }) => {
    const firstSentence = getFirstSentence(health_tips.summary);
    const theRestSentence = getSecondSentenceAndRest(health_tips.summary);
    return (
        <div key={idx} className="tips">
            <h2 className = "title">
                {health_tips.title}
            </h2>
            <div className='summary'>
                <h2 className = "summary-title">
                    {firstSentence}
                </h2>
                <p className='summary-subtext'>
                    {theRestSentence}
                </p>
            </div>
            <div className='link'>
                <a href={health_tips.url} target="_blank" rel="noopener noreferrer">
                    Read More
                </a>
            </div>
        </div>
    );
}

export default HealthTips;