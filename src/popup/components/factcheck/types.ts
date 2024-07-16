// Define the structure of a single premise
export interface Premise {
    premise: string; // The actual premise text
    relationship: 'contradiction' | 'entailment' | 'neutral'; // The relationship type
    url: string; // URL related to the premise
  }
  
  // Define the structure of a fact, which contains a hypothesis and an array of premises
  export interface Fact {
    hypothesis: string; // The hypothesis statement
    premises: Premise[]; // Array of premises related to the hypothesis
  }
  
  // Define the props for the FactCheckingSection component
  export interface FactCheckingSectionProps {
    facts: Fact[]; // Array of facts to be displayed in the section
  }
  