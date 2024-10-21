import React, { useEffect, useState } from 'react';
import TextAreaWithCounter from './TextAreaWithCounter';
import CustomAccordion from './CustomAccordion';
import Evidence from './Evidence';
import { Fact, FactCheckMode } from './../../utils/pop_up_storage/types';
import { getFactCheckMode } from './../../utils/pop_up_storage/storage';

interface FactListProps {
  facts: Fact[];
  focusedIndex: number;
  expanded: string | false;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, index: number) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => void;
  handleAccordionChange: (key: string, index: number, state: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => void;
}

const FactList: React.FC<FactListProps> = ({
  facts,
  focusedIndex,
  expanded,
  handleSubmit,
  handleInputChange,
  handleAccordionChange
}) => {
  const [mode, setMode] = useState<string>('');
  const accordionStates = ['entailment', 'contradiction', 'neutral'];

  const stateMappings = {
    entailment: "Supported",
    contradiction: "Disputed",
    neutral: "Neutral"
  };

  // mode change listener
  useEffect(() => {
    // Fetch the initial mode from storage
    getFactCheckMode().then((result) => {
      const data = result as FactCheckMode; // Type assertion
      if (data.factCheckMode) {
        setMode(data.factCheckMode);
      }
    }).catch((error) => {
      console.error('Error retrieving factCheckMode from storage:', error);
    });

    // Set up an event listener for changes in the storage
    const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }, areaName: string) => {
      if (areaName === 'local' && changes.factCheckMode) {
        const newMode = changes.factCheckMode.newValue as string;
        setMode(newMode);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    // Clean up the event listener on component unmount
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  const renderAccordions = (fact: Fact, index: number) => {
    if (mode === 'google') {
      return accordionStates.map((state) => {
        const relatedPremises = fact.premises.filter(premise => premise.relationship.toLowerCase() === state.toLowerCase());
        const count = relatedPremises.length;

        return count > 0 && (
          <CustomAccordion
            key={`${index}-${state}`}
            title={`${stateMappings[state]}`} 
            count={`${count}`}
            expanded={expanded === `${index}-${state}`}
            onChange={handleAccordionChange(`${index}-${state}`, index, state)}
            mode={mode} 
          >
            {relatedPremises.map((premise, idx) => (
              <Evidence key={`${index}-${state}-${idx}`} idx={idx} premise={premise} />
            ))}
          </CustomAccordion>
        );
      });
    }     else {
      // For offline or onlineDatabase mode
      const stateCounts = fact.premises.reduce((acc, premise) => {
        const state = premise.relationship.toLowerCase();
        acc[state] = (acc[state] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number });
    
      const maxState = Object.keys(stateCounts).reduce((a, b) => stateCounts[a] > stateCounts[b] ? a : (stateCounts[a] === stateCounts[b] ? 'neutral' : b), 'neutral');
    
      const totalCount = Object.values(stateCounts).reduce((sum, count) => sum + count, 0);
    
      return (
        <CustomAccordion
          key={`${index}-${maxState}`}
          title={`${stateMappings[maxState]}`} 
          count={`${totalCount}`}
          expanded={expanded === `${index}-${maxState}`}
          onChange={handleAccordionChange(`${index}-${maxState}`, index, maxState)}
          mode={mode} 
        >
          {fact.premises.map((premise, idx) => (
            <Evidence key={`${index}-${maxState}-${idx}`} idx={idx} premise={premise} />
          ))}
        </CustomAccordion>
      );
    }
  };

  return (
    <div>
      {Array.isArray(facts) && facts.length > 0 ? (
        facts.map((fact, index) => (
          <div key={index}>
            <form action="" id={`form-${index}`} onSubmit={(e) => handleSubmit(e, index)}>
              <TextAreaWithCounter 
                value={fact.hypothesis} 
                onChange={(e) => handleInputChange(e, index)}
                className={focusedIndex === index ? 'textarea-focused' : 'textarea-unfocused'}
                onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    (e.target as HTMLTextAreaElement).form?.requestSubmit();
                  }
                }}
              />
            </form>
            {fact.premises.filter(premise => accordionStates.includes(premise.relationship.toLowerCase())).length === 0 ? (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '20px',
                color: 'gray',
                marginBottom: '30px'
              }}>
                <span>Sorry, no results found for this query</span>
                <img src="sad-emoji.gif" alt=":(" height="30px" width="30px"/>
              </div>
            ) : (
              renderAccordions(fact, index)
            )}
          </div>
        ))
      ) : (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '20px',
          color: 'gray',
          marginTop: '30px',
          marginBottom: '30px'
        }}>
          Want to try fact checking something?
        </div>
      )}
    </div>
  );
};

export default FactList;