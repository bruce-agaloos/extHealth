import React, { useEffect, useState } from "react";
import TextAreaWithCounter from "./TextAreaWithCounter";
import CustomAccordion from "./CustomAccordion";
import Evidence from "./Evidence";
import { Fact, FactCheckMode, Premise } from "./../../utils/pop_up_storage/types";
import { getFactCheckMode } from "./../../utils/pop_up_storage/storage";
import LoadingModal from "./LoadingModal";
import ThresholdComponent from "./FactOrFake";
import {determineLabel} from "./functions/FactFakeReview";
import InterpretationComponent from "./Interpretation";

interface FactListProps {
  facts: Fact[];
  focusedIndex: number;
  expanded: string | false;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, index: number) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => void;
  handleAccordionChange: (
    key: string,
    index: number,
    state: string
  ) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => void;
}

const FactList: React.FC<FactListProps> = ({
  facts,
  focusedIndex,
  expanded,
  handleSubmit,
  handleInputChange,
  handleAccordionChange,
}) => {
  const [mode, setMode] = useState<string>("");
  const accordionStates = ["entailment", "contradiction", "neutral"];

  const stateMappings = {
    entailment: "Supported",
    contradiction: "Disputed",
    neutral: "Neutral",
  };

  // mode change listener
  useEffect(() => {
    // Fetch the initial mode from storage
    getFactCheckMode()
      .then((result) => {
        const data = result as FactCheckMode; // Type assertion
        if (data.factCheckMode) {
          setMode(data.factCheckMode);
        }
      })
      .catch((error) => {
        console.error("Error retrieving factCheckMode from storage:", error);
      });

    // Set up an event listener for changes in the storage
    const handleStorageChange = (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: string
    ) => {
      if (areaName === "local" && changes.factCheckMode) {
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
    if (mode === "google") {
      // Step 1: Group premises by relationship
      const groupedPremises = fact.premises.reduce((acc, premise) => {
        const relationship = premise.relationship.toLowerCase();
        if (!acc[relationship]) acc[relationship] = [];
        acc[relationship].push(premise);
        return acc;
      }, {} as Record<string, Premise[]>);
  
      // Step 2: Sort each group by confidence_level in descending order
      Object.values(groupedPremises).forEach((premises) =>
        premises.sort((a, b) => b.confidence_level - a.confidence_level)
      );
  
      // Step 3: Define the custom order of relationships
      const customOrder = ["entailment", "contradiction", "neutral"];
  
      // Step 4: Sort groupedPremises by the custom order
      const sortedGroups = Object.entries(groupedPremises).sort(
        ([relationshipA], [relationshipB]) =>
          customOrder.indexOf(relationshipA) - customOrder.indexOf(relationshipB)
      );
  
      // Step 5: Render accordions for each group
      return sortedGroups.map(([relationship, premises]) => (
        premises.length > 0 && (
          <CustomAccordion
            key={`${index}-${relationship}`}
            title={`${stateMappings[relationship]}`}
            count={`${premises.length}`}
            expanded={expanded === `${index}-${relationship}`}
            onChange={handleAccordionChange(
              `${index}-${relationship}`,
              index,
              relationship
            )}
            mode={mode}
          >
            {premises.map((premise, idx) => (
              <Evidence
                key={`${index}-${relationship}-${idx}`}
                idx={idx}
                premise={premise}
              />
            ))}
          </CustomAccordion>
        )
      ));
    } else {
      // Step 1: Categorize premises
      const highConfidenceEntailment = fact.premises.filter(
        (premise) =>
          premise.relationship.toLowerCase() === "entailment" &&
          premise.confidence_level >= 0.75
      );
  
      const highConfidenceContradiction = fact.premises.filter(
        (premise) =>
          premise.relationship.toLowerCase() === "contradiction" &&
          premise.confidence_level >= 0.75
      );
  
      const remainingPremises = fact.premises.filter(
        (premise) =>
          !(
            (premise.relationship.toLowerCase() === "entailment" &&
              premise.confidence_level >= 0.75) ||
            (premise.relationship.toLowerCase() === "contradiction" &&
              premise.confidence_level >= 0.75)
          )
      );
  
      // Step 2: Combine and sort the categories
      const sortedPremises = [
        ...highConfidenceEntailment,
        ...highConfidenceContradiction,
        ...remainingPremises.sort((a, b) => b.confidence_level - a.confidence_level),
      ];
  
      // Step 3: Count the number of premises for each state
      const stateCounts = sortedPremises.reduce((acc, premise) => {
        const state = premise.relationship.toLowerCase();
        acc[state] = (acc[state] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number });
  
      // Step 4: Determine the most frequent state
      const maxState = Object.keys(stateCounts).reduce(
        (a, b) =>
          stateCounts[a] > stateCounts[b]
            ? a
            : stateCounts[a] === stateCounts[b]
            ? "neutral"
            : b,
        "neutral"
      );
  
      // Step 5: Render sorted premises in a single accordion
      return (
        <CustomAccordion
          key={`${index}-${maxState}`}
          title={`${stateMappings[maxState]}`}
          count={`${fact.premises.length}`}
          expanded={expanded === `${index}-${maxState}`}
          onChange={handleAccordionChange(
            `${index}-${maxState}`,
            index,
            maxState
          )}
          mode={mode}
        >
          {sortedPremises.map((premise, idx) => (
            <Evidence
              key={`${index}-${maxState}-${idx}`}
              idx={idx}
              premise={premise}
            />
          ))}
        </CustomAccordion>
      );
    }
  };
  
  

  return (
    <div
      style={
        Array.isArray(facts) && facts.length > 0
          ? {}
          : {
              display: "flex",
              flexDirection: "column-reverse",
            }
      }
    >
      <LoadingModal />
      {Array.isArray(facts) && facts.length > 0 ? (
        facts.map((fact, index) => (
          <div key={index}>
            <form
              action=""
              id={`form-${index}`}
              onSubmit={(e) => handleSubmit(e, index)}
              style={{ position: "relative" }}
            >
              <ThresholdComponent
                premiseHypothesisPair={fact}
                style={{
                  position: "absolute",
                  zIndex: 1,
                  top: "22%", // Center vertically
                  right: "10px",
                  transform: "translateY(-30%)", // Adjust for exact centering
                  backgroundColor: "transparent", // Transparent background
                }}
              />
              <TextAreaWithCounter
                value={fact.hypothesis}
                onChange={(e) => handleInputChange(e, index)}
                className={
                  focusedIndex === index
                    ? "textarea-focused"
                    : "textarea-unfocused"
                }
                label = {determineLabel(fact)}
                onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    (e.target as HTMLTextAreaElement).form?.requestSubmit();
                  }
                }}
              />
            <InterpretationComponent label={determineLabel(fact)}/>
            </form>
            {fact.premises.filter((premise) =>
              accordionStates.includes(premise.relationship.toLowerCase())
            ).length === 0 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "20px",
                  color: "gray",
                  marginBottom: "30px",
                }}
              >
                <span>Sorry, no results found for this query</span>
                <img src="sad-emoji.gif" alt=":(" height="30px" width="30px" />
              </div>
            ) : (
              renderAccordions(fact, index)
            )}
          </div>
        ))
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "gray",
            marginTop: "30px",
            marginBottom: "30px",
            fontFamily: "Roboto Flex",
          }}
        >
          Want to try fact checking something?
        </div>
      )}
    </div>
  );
};

export default FactList;
