// Summary.tsx
import React, { useState } from 'react';
import { ResultItem } from '../types';
import Label from './components/label';

import CustomAccordion from '../../sidepanel/factcheck/CustomAccordion';
import Evidence from '../../sidepanel/factcheck/Evidence';

import './css/summary.css';
interface SummaryProps {
    data: ResultItem | null;
}

const accordionStates = ['entailment', 'contradiction', 'neutral'];
const stateMappings = {
    entailment: "Supported",
    contradiction: "Disputed",
    neutral: "Neutral"
};

const Summary: React.FC<SummaryProps> = ({ data }) => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const [focusedState, setFocusedState] = useState<string | null>(null);

    const handleAccordionChange =
        (panel: string, index: number, accordionState: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
            if (isExpanded) {
                setFocusedIndex(prevIndex => {
                    setFocusedState(prevState => {
                        if (prevIndex === index && prevState === accordionState) {
                            return null;
                        } else {
                            return accordionState;
                        }
                    });
                    return prevIndex === index && focusedState === accordionState ? null : index;
                });
            } else {
                setFocusedIndex(null);
                setFocusedState(null);
            }
        };

    if (!data) {
        return (
            <div style={{ color: 'gray', marginBottom: '30px' }}>
                <span>Please select a query first</span>
                <img src="sad-emoji.gif" alt=":(" height="30px" width="30px" />
            </div>
        );
    }
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
        <div className="summary-container">
            <h1>{data.hypothesis}</h1>
            <h2>Query: {data.query}</h2>
            <Label value={labelValue} />
            {accordionStates.map((state, index) => {
                const relatedPremises = data.premises.filter(premise => premise.relationship.toLowerCase() === state.toLowerCase());
                const count = relatedPremises.length;

                return count > 0 && (
                    <CustomAccordion
                        key={`${index}-${state}`}
                        title={`${stateMappings[state]}`}
                        count={`${count}`}
                        expanded={expanded === `${index}-${state}`}
                        onChange={handleAccordionChange(`${index}-${state}`, index, state)}
                    >
                        {relatedPremises.map((premise, idx) => (
                            <Evidence key={`${index}-${state}-${idx}`} idx={idx} premise={premise} />
                        ))}
                    </CustomAccordion>
                );
            })}
        </div>
    );
};

export default Summary;