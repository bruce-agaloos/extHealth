import React, {useEffect, useState, useRef } from 'react';
import FactList from './FactList';

import "./css/factCheckingBody.css";

import TextAreaWithCounter from './TextAreaWithCounter';

import {healthClaimDetection} from '../../utils/claim_detection';
import {getFromStorage} from "../../utils/storage"
import {checkForKeywords } from "./../../utils/xAutoDetect/dom";
import getErrorMessage from '../../utils/errorMessage/errorMessage';

const FactCheckingSection: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [newFact, setNewFact] = useState('');
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [focusedState, setFocusedState] = useState<string | null>(null);

  const [facts, setFacts] = useState<any[]>([]); 

  const scrollableDivRef = useRef<HTMLDivElement>(null);

  // updating new facts
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

  const handleAccordionChange =
  (panel: string, index: number, accordionState: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
    if(isExpanded){
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


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const newFacts = [...facts];
    newFacts[index].hypothesis = e.target.value;
    setFacts(newFacts);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, index: number) => {
    e.preventDefault();
    const hypothesis = facts[index].hypothesis;
    const maxLength = 256;
    let error;
    if (hypothesis.trim().length > maxLength || hypothesis.trim().length === 0) {
      error = getErrorMessage('characterLimit');
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'error.png',
        title: error.title,
        message: error.message,
        priority: 2
      });
      return;
    }

    const isMatch = checkForKeywords(hypothesis);
    if (!isMatch) {
        error = getErrorMessage('keywordNotSupported');
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'error.png',
            title: error.title,
            message: error.message,
            priority: 2
        });
        return;
    }

    const isHealthClaim = healthClaimDetection(hypothesis);
    if (!isHealthClaim) {
      let error_value = await getFromStorage(['healthClaimResult']);
      if (error_value != "yes" || error_value != "no") {
          error = getErrorMessage('dailyLimit');
          chrome.notifications.create({
              type: 'basic',
              iconUrl: 'error.png',
              title: error.title,
              message: error.message,
              priority: 2
          });
          return;
      }
      error = getErrorMessage('healthNotDetected');
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'error.png',
        title: error.title,
        message: error.message,
        priority: 2
      });
      return;
    }
    // Send the updated fact to the background script
    chrome.runtime.sendMessage({ type: 'UPDATE_FACT', hypothesis }, (response) => {
      if (chrome.runtime.lastError) {
        // console.error('Error:', chrome.runtime.lastError.message);
      } else if (response === undefined || response === null) {
        // console.error('Error: Background script encountered an error and returned no response.');
      } else {
        const updatedFacts = [...facts];
        updatedFacts[index].premises = response;
        chrome.storage.local.set({ extHealthFacts: { result: updatedFacts } }, () => {
          if (chrome.runtime.lastError) {
            // console.error('Error updating local storage:', chrome.runtime.lastError.message);
          } else {
            // console.log('Local storage updated successfully', updatedFacts);
            setFacts(updatedFacts); // Update the state with the new facts
          }
        });
      }
    });
  };

  const addNewFacts = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const fact = newFact;
      let error;

      const maxLength = 256;
      if (fact.trim().length > maxLength || fact.trim().length === 0) {
        error = getErrorMessage('characterLimit');
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'error.png',
          title: error.title,
          message: error.message,
          priority: 2
        });
        return;
      }

      const isMatch = checkForKeywords(fact);
      if (!isMatch) {
          error = getErrorMessage('keywordNotSupported');
          chrome.notifications.create({
              type: 'basic',
              iconUrl: 'error.png',
              title: error.title,
              message: error.message,
              priority: 2
          });
          return;
      }
      // Send a message to the background script
      chrome.runtime.sendMessage({ message: 'factCheck', text: fact }, (response) => {
          // console.log('Response from background script:', response);
      });
  };
  
  // loading
  useEffect(() => {
    chrome.storage.local.get(['isFactCheckLoading', 'isSingleFactCheckLoading'], (result) => {
      const isFactCheckLoading = result.isFactCheckLoading === true;
      const isSingleFactCheckLoading = result.isSingleFactCheckLoading === true;

      const loaderElement = document.querySelector('.loader');
      const buttonElement = document.querySelector('.add_fact_button');
      if (loaderElement) {
          if (isFactCheckLoading || isSingleFactCheckLoading) {
              loaderElement.classList.add('loading');
              buttonElement.classList.add('loading');
          }
      }
    });
    const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }) => {
        if (changes.isFactCheckLoading || changes.isSingleFactCheckLoading) {
            chrome.storage.local.get(['isFactCheckLoading', 'isSingleFactCheckLoading'], (result) => {
                const isFactCheckLoading = result.isFactCheckLoading === true;
                const isSingleFactCheckLoading = result.isSingleFactCheckLoading === true;
        
                const loaderElement = document.querySelector('.loader');
                const buttonElement = document.querySelector('.add_fact_button');
        
                if (loaderElement) {
                    if (isFactCheckLoading || isSingleFactCheckLoading) {
                        loaderElement.classList.add('loading');
                        buttonElement.classList.add('loading');
                    } else {
                        loaderElement.classList.remove('loading');
                        buttonElement.classList.remove('loading');
                    }
                }
            });
        }
    };
    chrome.storage.onChanged.addListener(handleStorageChange);
    // Cleanup event listener on component unmount
    return () => {
        chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const scrollableDiv = scrollableDivRef.current;
    if (scrollableDiv && scrollableDiv.lastElementChild) {
      // Scroll the last child element into view
      scrollableDiv.lastElementChild.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  

  return (
    <div ref={scrollableDivRef}>
      <form action="" id={`form_add_facts`} onSubmit={(e) => addNewFacts(e)}>
        <TextAreaWithCounter
          value={newFact}
          onChange={(e) => setNewFact(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              (e.target as HTMLTextAreaElement).form?.requestSubmit();
            }
          }}
        />
        <button type="submit" className='add_fact_button'>+</button>
        <span className="loader"></span>
      </form>
      <FactList
        facts={facts}
        focusedIndex={focusedIndex}
        expanded={expanded}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        handleAccordionChange={handleAccordionChange}
      />
    </div>
  );
};

export default FactCheckingSection;
