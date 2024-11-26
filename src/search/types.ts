// types.ts
export interface Premise {
    premise: string;
    relationship: string;
    url: string;
    title: string;
    date: string;
    confidence_level: number;
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