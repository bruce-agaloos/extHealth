import React, {useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import CustomAccordion from './CustomAccordion';
import Evidence from './Evidence'; 

import "./css/factCheckingBody.css";

import {healthClaimDetection} from '../../../utils/claim_detection';



const FactCheckingSection: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);


  const [facts, setFacts] = useState([]);

  useEffect(() => {
    // Retrieve the stored data using Chrome Storage API
    chrome.storage.local.get(['extHealthFacts'], function(result) {
        if (result.extHealthFacts) {
            // Use the 'result' array directly from the storage
            setFacts(result.extHealthFacts.result);
        }
    });

    // Set up an event listener for changes in the storage
    const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }, areaName: string) => {
        if (areaName === 'local' && changes.extHealthFacts) {
            setFacts(changes.extHealthFacts.newValue.result);
        }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    // Clean up the event listener on component unmount
    return () => {
        chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  const handleChange =
  (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const autoResizeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = 'auto'; // Reset the height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const newFacts = [...facts];
    newFacts[index].hypothesis = e.target.value;
    setFacts(newFacts);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, index: number) => {
    e.preventDefault();
    const hypothesis = facts[index].hypothesis;
    
    const isHealthClaim = healthClaimDetection(hypothesis);
    if (!isHealthClaim) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'error.png',
        title: 'Error',
        message: 'The current query is not an health claim. Please make sure it is',
        priority: 2
      });
      return;
    }
    // Send the updated fact to the background script
    chrome.runtime.sendMessage({ type: 'UPDATE_FACT', hypothesis }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error:', chrome.runtime.lastError.message);
      } else {
        const updatedFacts = [...facts];
        updatedFacts[index].premises = response;
        chrome.storage.local.set({ extHealthFacts: { result: updatedFacts } }, () => {
          if (chrome.runtime.lastError) {
            console.error('Error updating local storage:', chrome.runtime.lastError.message);
          } else {
            console.log('Local storage updated successfully', updatedFacts);
            setFacts(updatedFacts); // Update the state with the new facts
          }
        });
      }
    });
  };

  const addNewFacts = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const textarea = form.querySelector('textarea') as HTMLTextAreaElement;
      const fact = textarea.value;
  
      // Send a message to the background script
      chrome.runtime.sendMessage({ message: 'factCheck', text: fact }, (response) => {
          console.log('Response from background script:', response);
      });
  };
  
  
  const accordionStates = ['entailment', 'contradiction', 'neutral'];

  const stateMappings = {
    entailment: "Supported",
    contradiction: "Disputed",
    neutral: "Neutral"
  };

  return (
    <div>
      <form action="" id={`form_add_facts`} onSubmit={(e) => addNewFacts(e)}>
        <textarea 
          onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => autoResizeTextarea(e)}
          placeholder='Enter a health claim here...'
        />
        <button type="submit">+</button>
      </form>
      {Array.isArray(facts) && facts.length > 0 ? (
        facts.map((fact, index) => (
          <div key={index}>
            <form action="" id={`form-${index}`} onSubmit={(e) => handleSubmit(e, index)}>
            <textarea 
              value={fact.hypothesis} 
              onChange={(e) => handleInputChange(e, index)}
              onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => autoResizeTextarea(e)}
            />
            </form>
            {accordionStates.map((state) => {
              const relatedPremises = fact.premises.filter(premise => premise.relationship.toLowerCase() === state.toLowerCase());
              const count = relatedPremises.length;
            
              return count > 0 && (
                <CustomAccordion
                  key={`${index}-${state}`}
                  title={`${stateMappings[state]}`} 
                  count={`${count}`}
                  expanded={expanded === `${index}-${state}`}
                  onChange={handleChange(`${index}-${state}`)}
                >
                  {relatedPremises.map((premise, idx) => (
                    <Evidence key={`${index}-${state}-${idx}`} idx={idx} premise={premise} />
                  ))}
                </CustomAccordion>
              );
            })}
          </div>
        ))
      ) : (
        <div>whoa look at the emptiness</div>
      )}
    </div>
  );
};

export default FactCheckingSection;
