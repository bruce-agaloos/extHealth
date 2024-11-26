import { openDB } from "idb";
import { Fact } from "./types";
import lunr from 'lunr';

interface FactCheckHistory {
  bigquery: string;
  mode: string;
  result: Fact[];
}
interface FactWithId extends Fact {
  id: number;
}
const DATABASE_NAME = "FactCheckDB";
const FACTS_STORE = "facts";
const HISTORY_STORE = "factCheckHistory";

// Initialize or open the database
const getDB = async () => {
  return openDB(DATABASE_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(FACTS_STORE)) {
        db.createObjectStore(FACTS_STORE, {
          keyPath: "id", // Use auto-increment for unique IDs
          autoIncrement: true,
        });
      }
      if (!db.objectStoreNames.contains(HISTORY_STORE)) {
        db.createObjectStore(HISTORY_STORE, {
          keyPath: "bigquery", // Use bigquery as the key for histories
        });
      }
    },
  });
};

// 1. Indexing a fact
export const indexFact = async (fact: Omit<FactWithId, "id">): Promise<number> => {
  const db = await getDB();
  const id = await db.add(FACTS_STORE, fact) as number;
  return id; // Return the auto-incremented ID
};

// 2. Indexing fact-check history
export const indexFactCheckHistory = async (
  history: FactCheckHistory,
): Promise<void> => {
  const db = await getDB();

  // Index facts and collect their generated IDs
  const factIds = await Promise.all(history.result.map((fact) => indexFact(fact)));

  const toBeStored = {
    bigquery: history.bigquery,
    mode: history.mode,
    result: factIds,
  }

  // Store the fact-check history
  await db.put(HISTORY_STORE, toBeStored);
};

// 3. Reset the index
export const resetIndex = async (): Promise<void> => {
  const db = await getDB();
  // Ensure object stores exist before attempting to clear
  if (db.objectStoreNames.contains(FACTS_STORE)) {
    await db.clear(FACTS_STORE);
  }
  if (db.objectStoreNames.contains(HISTORY_STORE)) {
    await db.clear(HISTORY_STORE);
  }
};

// 4. Search for specific fact-check history (case-insensitive match)
export const searchFactCheckHistory = async (
  bigquery: string
): Promise<Fact[] | string> => {
  const db = await getDB();
  const tx = db.transaction(HISTORY_STORE, "readonly");
  const store = tx.objectStore(HISTORY_STORE);

  // Fetch all history records
  const allHistories = await store.getAll();

  // Find the history that matches the bigquery string (case-insensitive)
  const matchedHistory = allHistories.find(
    (history) => history.bigquery.toLowerCase() === bigquery.toLowerCase()
  );

  if (matchedHistory) {
    // Retrieve the facts associated with the matched history's result (IDs)
    const factTx = db.transaction(FACTS_STORE, "readonly");
    const factStore = factTx.objectStore(FACTS_STORE);
    
    // Fetch facts using the fact IDs
    const facts = await Promise.all(
      matchedHistory.result.map((factId: number) => factStore.get(factId))
    );

    return facts; // Return the corresponding facts
  }

  return "Found no result"; // Return null if no history was found
};


// 5. BM25 search on facts
export const lunrSearchFacts = async (query: string): Promise<Fact[]> => {
  const db = await getDB();
  const tx = db.transaction(FACTS_STORE, "readonly");
  const store = tx.objectStore(FACTS_STORE);

  // Fetch all facts
  const facts: Fact[] = await store.getAll();

  // Create a Lunr index
  const idx = lunr(function () {
    this.ref('id'); // Reference field for each fact (could be fact.id or another unique identifier)
    this.field('combinedText'); // Text field to search in

    facts.forEach((fact, index) => {
      // Combine the hypothesis and premises into a single searchable text field
      const combinedText = [fact.hypothesis, ...fact.premises.map((p) => p.premise)].join(" ");
      
      this.add({
        id: index,
        combinedText: combinedText.toLowerCase(),
      });
    });
  });

  // Search using the query
  const results = idx.search(query.toLowerCase());

  // Return the matching facts based on the search results
  const matchedFacts = results.map((result) => facts[result.ref]);
  
  return matchedFacts;
};