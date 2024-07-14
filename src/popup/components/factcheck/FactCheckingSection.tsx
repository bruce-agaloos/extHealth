import React, {useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import CustomAccordion from './CustomAccordion';
import Evidence from './Evidence'; 

import "./css/factCheckingBody.css";

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
  }, []);

  const handleChange =
  (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const accordionStates = ['entailment', 'contradiction', 'neutral'];

  const stateMappings = {
    entailment: "Supported",
    contradiction: "Disputed",
    neutral: "Unsure but related"
  };

  return (
    <div>
      {facts.map((fact, index) => (
        <div key={index}>
          <h2>{fact.hypothesis}</h2>
          {accordionStates.map((state) => {
            const relatedPremises = fact.premises.filter(premise => premise.relationship.toLowerCase() === state.toLowerCase());
            return relatedPremises.length > 0 && (
              <CustomAccordion
                key={state}
                title={`${stateMappings[state]}`} // Capitalize the state
                expanded={expanded === `${index}-${state}`}
                onChange={handleChange(`${index}-${state}`)}
              >
                {relatedPremises.map((premise, idx) => (
                  <Evidence idx={idx} premise={premise} />
                ))}
              </CustomAccordion>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default FactCheckingSection;
