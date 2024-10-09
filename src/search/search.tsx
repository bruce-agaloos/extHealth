import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { SearchResult, ResultItem } from './types';
import Item from './layout/item';
import Summary from './layout/summary';
import NoResults from './layout/components/noResults';
import Logo from './layout/components/logo';
import Spinner from './layout/components/spinner'; // Import the spinner component
import './layout/css/layout.css';
import './layout/css/normalize.css';
import './layout/css/searchBar.css';
import './layout/css/accordionAndEvidence.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { API_ENDPOINT } from './../utils/endpoint';

const Search: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedItem, setSelectedItem] = useState<ResultItem | null>(null);
    const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
    const [noInternet, setNoInternet] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [initialMessage, setInitialMessage] = useState<string>("Try searching");

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setNoInternet(false);
        setLoading(true);
        setInitialMessage("");
        const backendEndpoint = `${API_ENDPOINT}/searchPastQueries?content=${encodeURIComponent(searchQuery)}`;
        try {
            const response = await fetch(backendEndpoint, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data: SearchResult = await response.json();
            if (!Array.isArray(data.result)) {
                data.result = []; // or handle the error appropriately
            }
            setSearchResults(data);
        } catch (error) {
            setNoInternet(true);
            console.error("Error fetching search results:", error);
        } finally {
            setLoading(false);
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
                <Logo />
            </div>
            <form id="searchBox" onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <button type="submit">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </form>
            <div id="searchItems">
                {loading ? (
                    <Spinner />
                ) : noInternet ? (
                    <NoResults message="Network error" />
                ) : searchResults ? (
                    searchResults.result.length === 0 ? (
                        <NoResults message="Sorry there seems to be no similar query" />
                    ) : (
                        searchResults.result.map((item, index) => (
                            <Item key={index} data={item} onClick={handleItemClick} />
                        ))
                    )
                ) : (
                    <div className="initial-message">{initialMessage}</div>
                )}
            </div>
            {selectedItem && (
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