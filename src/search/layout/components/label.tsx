import React from 'react';
import '../css/label.css';

interface LabelProps {
    value: number;
}

const Label: React.FC<LabelProps> = ({ value }) => {
    let text;
    let className = 'label';

    if (value === 1) {
        text = "Mostly Supporting";
        className += ' supporting';
    } else if (value === -1) {
        text = "Mostly Disputing";
        className += ' disputing';
    } else {
        text = "";
    }

    if (!text) {
        return null; // Do not render the label if there is no text
    }

    return <span className={className}>{text}</span>;
};

export default Label;