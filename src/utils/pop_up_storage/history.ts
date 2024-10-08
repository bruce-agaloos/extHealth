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

  // Retrieve current history and account for the nested structure
  const rootHistory = await getFromStorage(storageKey) as { factCheckHistory?: { [key: string]: FactCheckHistory[] } };
  const currentHistory = rootHistory?.factCheckHistory || {};

  const newEntry: FactCheckHistory = {
    bigquery,
    mode: factCheckMode,
    result: resultObj.result
  };

  // Prepare an updated history, removing any existing entries with the same bigquery
  const updatedModeHistory = (currentHistory[factCheckMode] || [])
    .filter((entry: FactCheckHistory) => entry.bigquery !== bigquery) // Remove duplicates
    .slice(-99) // Keep only the last 99 entries (to allow adding a new one)
    .concat(newEntry); // Add the new entry

  // Ensure the history does not exceed 100 entries
  if (updatedModeHistory.length > 100) {
    updatedModeHistory.splice(0, updatedModeHistory.length - 100); // Keep only the last 100 entries
  }

  // Reconstruct the full nested history object, without unnecessary nesting
  const updatedHistory = {
    factCheckHistory: {
      [factCheckMode]: updatedModeHistory // Directly assign the updated mode history
    }
  };

  // Merge with any existing history
  const mergedHistory = {
    ...currentHistory,
    ...updatedHistory.factCheckHistory // This avoids the nesting issue
  };

  // Save updated history back to storage
  return setInStorage({ [storageKey]: mergedHistory });
};



// Function to search the fact check history by bigquery and return only the topmost result array
const searchHistory = async (bigquery: string): Promise<Fact[] | string> => {
  const storageKey = 'factCheckHistory';

  // Retrieve the root history and log for debugging
  const rootHistory = await getFromStorage(storageKey) as { factCheckHistory?: { [key: string]: FactCheckHistory[] } };
  console.log("Full root history retrieved from storage:", rootHistory);

  // Access factCheckHistory and flatten entries across all modes
  const currentHistory = rootHistory?.factCheckHistory || {};
  const allEntries = Object.values(currentHistory).flat();

  // Filter for entries that match bigquery and extract results
  const matchingEntry = allEntries.find((entry: FactCheckHistory) => entry.bigquery === bigquery);
  const result = matchingEntry ? matchingEntry.result : undefined;

  console.log("Filtered result:", result);

  // Return the result or a message if none found
  if (!result) {
    return "Found no results in offline or history";
  }

  return result;
};



export {
  resetFactCheckHistory,
  addFactCheckHistory,
  searchHistory
};