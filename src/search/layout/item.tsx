// Item.tsx
import React from 'react';
import { ResultItem } from '../types';
import Label from './components/label';

import './css/items.css';

interface ItemProps {
    data: ResultItem;
    onClick: (data: ResultItem) => void;
}

const Item: React.FC<ItemProps> = ({ data, onClick }) => {
    const entailmentCount = data.premises.filter(premise => premise.relationship === 'entailment').length;
    const contradictionCount = data.premises.filter(premise => premise.relationship === 'contradiction').length;
    const neutralCount = data.premises.filter(premise => premise.relationship === 'neutral').length;

    let labelValue = 0;
    if (entailmentCount > contradictionCount && entailmentCount > neutralCount) {
        labelValue = 1;
    } else if (contradictionCount > entailmentCount && contradictionCount > neutralCount) {
        labelValue = -1;
    }

    return (
        <div className="item-container" onClick={() => onClick(data)}>
            <div className="item-button">
                {data.query}
            </div>
            <Label value={labelValue} />
            <p className="item-details">
                <strong>Hypothesis:</strong> {data.hypothesis} <br />
                Entailment: {entailmentCount} | Contradiction: {contradictionCount} | Neutral: {neutralCount}
            </p>
        </div>
    );
};

export default Item;