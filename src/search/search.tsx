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
import {getFactCheckMode} from './../utils/pop_up_storage/storage';
import {lunrSearchFacts} from './../utils/pop_up_storage/dbHistory';

const Search: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedItem, setSelectedItem] = useState<ResultItem | null>(null);
    const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
    const [noInternet, setNoInternet] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [initialMessage, setInitialMessage] = useState<string>("Try searching");
    const [mode, setMode] = useState<string>("");
    const updateInitialMessage = (mode: string) => {
        setInitialMessage("Try searching");
        if (mode === 'offline') {
            setInitialMessage("This feature on offline shows your history of queries");
        }
    };
    useEffect(() => {
        const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }, areaName: string) => {
            if (changes.factCheckMode) {
                const newMode = changes.factCheckMode.newValue;
                setMode(newMode);
                setSelectedItem(null);
                setSearchResults(null);
                setNoInternet(false);
                setLoading(false);
                updateInitialMessage(newMode);
            }
        };

        chrome.storage.onChanged.addListener(handleStorageChange);

        getFactCheckMode().then((modeObject) => {
            const initialMode = modeObject.factCheckMode;
            setMode(initialMode);
            updateInitialMessage(initialMode);
        });

        return () => {
            chrome.storage.onChanged.removeListener(handleStorageChange);
        };
    }, []);
    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setNoInternet(false);
        setLoading(true);
        setInitialMessage("");
        const modeObject = await getFactCheckMode();
        const mode = modeObject.factCheckMode; 
        if (mode === 'offline') {
            // change
            const facts = await lunrSearchFacts(searchQuery);
            const data: SearchResult  = { result: facts.map(fact => ({ ...fact, query: '', query_vector: [] })) };
            setSearchResults(data);
            console.log(searchResults);
            setLoading(false);
            return;
        }
        const backendEndpoint = `${API_ENDPOINT}/searchPastQueries?content=${encodeURIComponent(searchQuery)}&mode=${encodeURIComponent(mode)}`;
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
            <div id="mode">
                {mode && (
                    <div>
                        <span>
                            <strong>Mode: </strong>
                        </span>
                        {mode === 'offline' && "Offline Mode"}
                        {mode === 'onlineDatabase' && "Online Database Mode"}
                        {mode === 'google' && "Google Mode"}
                    </div>
                )}
            </div>
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