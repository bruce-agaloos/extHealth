// Summary.tsx
import React from 'react';
import { ResultItem } from '../types';

interface SummaryProps {
    data: ResultItem | null;
}

const Summary: React.FC<SummaryProps> = ({ data }) => {
    if (!data) {
        return <div>Select an item to see the summary.</div>;
    }

    const entailmentCount = data.premises.filter(premise => premise.relationship === 'entailment').length;
    const contradictionCount = data.premises.filter(premise => premise.relationship === 'contradiction').length;
    const neutralCount = data.premises.filter(premise => premise.relationship === 'neutral').length;

    return (
        <div>
            <h3>Summary:</h3>
            <ul>
                <li>Entailment: {entailmentCount}</li>
                <li>Contradiction: {contradictionCount}</li>
                <li>Neutral: {neutralCount}</li>
            </ul>
        </div>
    );
};

export default Summary;