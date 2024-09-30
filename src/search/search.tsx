import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { SearchResult, ResultItem } from './types';
import Item from './layout/item';
import Summary from './layout/summary';

import './layout/css/layout.css';
import './layout/css/normalize.css';
const sampleData: SearchResult = {
    result: [
        {
            hypothesis: "The quick brown fox jumps over the lazy dog",
            query: "quick brown fox",
            query_vector: [0.1, 0.2, 0.3, 0.4, 0.5],
            premises: [
                {
                    premise: "sample premise 1",
                    relationship: "entailment",
                    url: "https://www.google.com",
                    title: "Google",
                    date: "2021-01-01",
                },
                {
                    premise: "sample premise 2",
                    relationship: "contradiction",
                    url: "https://www.google.com",
                    title: "Google",
                    date: "2021-01-01",
                },
                {
                    premise: "sample premise 3",
                    relationship: "neutral",
                    url: "https://www.google.com",
                    title: "Google",
                    date: "2021-01-01",
                }
            ]
        },
        {
            hypothesis: "The quick Dog fox jumps over the lazy dog",
            query: "quick brown Cat",
            query_vector: [0.1, 0.2, 0.3, 0.4, 0.5],
            premises: [
                {
                    premise: "sample premise 2",
                    relationship: "contradiction",
                    url: "https://www.google.com",
                    title: "Google",
                    date: "2021-01-01",
                }
            ]
        }
    ]
};

const Search: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedItem, setSelectedItem] = useState<ResultItem | null>(null);
    const [searchResults, setSearchResults] = useState<SearchResult | null>(null);

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const backendEndpoint = "https://your-backend-endpoint.com/search";
        try {
            const response = await fetch(backendEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ query: searchQuery })
            });
            const data: SearchResult = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleItemClick = (data: ResultItem) => {
        setSelectedItem(data);
    };

    return (
        <div id="body" className="container">
            <div id="logo">

            </div>
            <form id="searchBox" onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <button type="submit">Search</button>
            </form>
            <div id="searchItems">
                {sampleData?.result.map((item, index) => (
                    <Item key={index} data={item} onClick={handleItemClick} />
                ))}
            </div>
            {sampleData && (
                <div id="summary">
                    <Summary data={selectedItem} />
                </div>
            )}
        </div>
    );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<Search />);
