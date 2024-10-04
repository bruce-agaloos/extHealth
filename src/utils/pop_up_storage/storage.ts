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

export { 
  setFactCheckWholeLoad,
  setSingleFactCheckLoad,
  getFactCheckWholeLoad,
  getSingleFactCheckLoad,
  isFactCheckLoading,
  setFactCheckMode,
  getFactCheckMode,
  setExtHealthFacts,
  getExtHealthFacts
};