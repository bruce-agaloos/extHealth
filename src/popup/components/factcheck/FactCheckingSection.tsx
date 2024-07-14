import React, {useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import CustomAccordion from './CustomAccordion';
import Evidence from './Evidence'; 

const FactCheckingSection: React.FC = () => {
  const [expanded, setExpanded] = useState<number | false>(false);


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
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      {facts.map((fact, index) => (
        <CustomAccordion
          key={index}
          title={fact.hypothesis}
          expanded={expanded === index}
          onChange={handleChange(index)}
        >
          {fact.premises.map((premise, idx) => (
            <Evidence idx={idx} premise={premise} />
          ))}
        </CustomAccordion>
      ))}
    </div>
  );
};

export default FactCheckingSection;
