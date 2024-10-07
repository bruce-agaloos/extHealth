import { getFactCheckMode } from './storage';
import { setInStorage, getFromStorage } from '../storage';
import { Fact } from './types';

interface FactCheckHistory {
  bigquery: string;
  mode: string;
  result: Fact[];
}

// Function to reset the fact check history
const resetFactCheckHistory = async (): Promise<void> => {
  const { factCheckMode } = await getFactCheckMode();
  return setInStorage({ factCheckHistory: { [factCheckMode]: [] } });
};

// Function to add an entry to the fact check history
const addFactCheckHistory = async (bigquery: string, resultObj: { result: Fact[] }): Promise<void> => {
  const { factCheckMode } = await getFactCheckMode();
  
  // Do not add to history if factCheckMode is offline
  if (factCheckMode === 'offline') {
    return;
  }

  const storageKey = 'factCheckHistory';
  const currentHistory = await getFromStorage(storageKey) as { [key: string]: FactCheckHistory[] };

  const newEntry: FactCheckHistory = {
    bigquery,
    mode: factCheckMode,
    result: resultObj.result
  };

  const updatedHistory = {
    ...currentHistory,
    [factCheckMode]: [...(currentHistory[factCheckMode] || []), newEntry]
  };

  // Ensure the history does not exceed 100 entries
  if (updatedHistory[factCheckMode].length > 100) {
    updatedHistory[factCheckMode] = updatedHistory[factCheckMode].slice(-100);
  }

  return setInStorage({ [storageKey]: updatedHistory });
};

// Function to search the fact check history by bigquery and return only the result array
const searchHistory = async (bigquery: string): Promise<Fact[][] | string> => {
  const { factCheckMode } = await getFactCheckMode();
  const storageKey = 'factCheckHistory';
  const currentHistory = await getFromStorage(storageKey) as { [key: string]: FactCheckHistory[] };

  const results = (currentHistory[factCheckMode] || [])
    .filter(entry => entry.bigquery === bigquery)
    .map(entry => entry.result);

  if (results.length === 0) {
    return "Found no results in offline or history";
  }

  return results;
};

export {
  resetFactCheckHistory,
  addFactCheckHistory,
  searchHistory
};