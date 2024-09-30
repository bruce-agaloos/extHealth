// Label.tsx
import React from 'react';

interface LabelProps {
    value: number;
}

const Label: React.FC<LabelProps> = ({ value }) => {
    let text;
    if (value === 1) {
        text = "Mostly Supporting";
    } else if (value === -1) {
        text = "Mostly Disputing";
    } else {
        text = "";
    }

    return <span>{text}</span>;
};

export default Label;