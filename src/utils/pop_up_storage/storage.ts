import { PopUpStorage } from "./types";
import { getFromStorage, setInStorage } from "../storage";
import { FactCheckMode, HealthFactsStorage, Fact } from "./types";

const setFactCheckWholeLoad = (isFactCheckLoading: boolean): Promise<void> => {
  return setInStorage({ isFactCheckLoading });
};

const setSingleFactCheckLoad = (isSingleFactCheckLoading: boolean): Promise<void> => {
  return setInStorage({ isSingleFactCheckLoading });
};

const getFactCheckWholeLoad = (): Promise<boolean> => {
  return getFromStorage('isFactCheckLoading') as Promise<boolean>;
};

const getSingleFactCheckLoad = (): Promise<boolean> => {
  return getFromStorage('isSingleFactCheckLoading') as Promise<boolean>;
};

const isFactCheckLoading = async (): Promise<boolean> => {
  const { isFactCheckLoading } = await getFromStorage('isFactCheckLoading') as { isFactCheckLoading: boolean };
  return isFactCheckLoading;
};

// Function to set the factCheckMode in storage
function setFactCheckMode(mode: string): Promise<void> {
  return setInStorage({ factCheckMode: mode });
}

// Function to get the factCheckMode from storage
function getFactCheckMode(): Promise<FactCheckMode> {
  return getFromStorage('factCheckMode') as Promise<FactCheckMode>;
}

// Function to set the extHealthFacts in storage
function setExtHealthFacts(facts: Fact[]): Promise<void> {
  return setInStorage({ extHealthFacts: { result: facts } });
}

// Function to get the extHealthFacts from storage
function getExtHealthFacts(): Promise<HealthFactsStorage> {
  return getFromStorage('extHealthFacts') as Promise<HealthFactsStorage>;
}

function testingDataFacts(mode: string): Promise<{ result: { hypothesis: string; premises: { premise: string; relationship: string; url: string; title: string; date: string; }[]; }[]; }> {
  let sampleUrl = "www.who.int";
  if (mode !== 'google') {
    sampleUrl = "#page=54";
  }
  const sampleFact = {
    result: [
      {
        hypothesis: 'sample',
        premises: [
          {
            premise: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec odio.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec odio.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec odio.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec odio.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec odio.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec odio.',
            relationship: 'contradiction',
            url: sampleUrl,
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec odio.',
            date: "No published data available",
            confidence_level: 0.9
          },
          {
            premise: '2',
            relationship: 'entailment',
            url: sampleUrl,
            title: 'Some other title',
            date: "",
            confidence_level: 0.2
          },
          {
            premise: '3',
            relationship: 'neutral',
            url: 'https://example.com',
            title: 'Some 123 title',
            date: "",
            confidence_level: 0.4
          },
          {
            premise: '4',
            relationship: 'neutral',
            url: 'https://example.com',
            title: 'Some 333 title',
            date: "",
            confidence_level: 0.1
          },
        ],
      },
      {
        hypothesis: 'sample ',
        premises: [
          {
            premise: '1',
            relationship: 'contradiction',
            url: 'https://example.com',
            title: 'Some title',
            date: "3/4/2021",
            confidence_level: 0.9
          },
          {
            premise: '2',
            relationship: 'entailment',
            url: 'https://example.com',
            title: 'Some title',
            date: "3/4/2121",
            confidence_level: 0.9
          },
          {
            premise: '3',
            relationship: 'neutral',
            url: 'https://example.com',
            title: 'Some title',
            date: "33/3/333",
            confidence_level: 0.9
          },
        ],
      },
      {
        hypothesis: '100000',
        premises: [
          {
            premise: '1',
            relationship: 'contradiction',
            url: sampleUrl,
            title: 'Some title',
            date: "",
            confidence_level: 0.9
          },
          {
            premise: '2',
            relationship: 'entailment',
            url: 'https://example.com',
            title: 'Some title',
            date: "",
            confidence_level: 0.9
          },
          {
            premise: '3',
            relationship: 'neutral',
            url: 'https://example.com',
            title: 'Some title',
            date: "",
            confidence_level: 0.9
          },
        ],
      },
    ],
  };
  return Promise.resolve(sampleFact);
}

export { 
  setFactCheckWholeLoad,
  setSingleFactCheckLoad,
  getFactCheckWholeLoad,
  getSingleFactCheckLoad,
  isFactCheckLoading,
  setFactCheckMode,
  getFactCheckMode,
  setExtHealthFacts,
  getExtHealthFacts,

  // remove after testing
  testingDataFacts
};