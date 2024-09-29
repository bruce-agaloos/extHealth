// types.ts
export interface Premise {
    premise: string;
    relationship: string;
    url: string;
    title: string;
    date: string;
}

export interface ResultItem {
    hypothesis: string;
    query: string;
    query_vector: number[];
    premises: Premise[];
}

export interface SearchResult {
    result: ResultItem[];
}