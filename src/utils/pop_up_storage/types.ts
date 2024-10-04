interface PopUpStorage {
    isFactCheckLoading?: boolean;
    isSingleFactCheckLoading?: boolean;
}

interface Premise {
    premise: string; // The actual premise text
    relationship: 'contradiction' | 'entailment' | 'neutral'; // The relationship type
    url: string; // URL related to the premise
    title: string; // Title of the premise
    date:string;
}
  
  // Define the structure of a fact, which contains a hypothesis and an array of premises
interface Fact {
    hypothesis: string; // The hypothesis statement
    premises: Premise[]; // Array of premises related to the hypothesis
}

interface HealthFactsStorage {
  extHealthFacts: {
    result: Fact[];
}};

interface FactCheckMode {
  factCheckMode: string;
}

export { PopUpStorage, HealthFactsStorage, Premise, Fact, FactCheckMode };