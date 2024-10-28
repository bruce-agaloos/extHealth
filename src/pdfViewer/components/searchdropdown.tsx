import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './SearchDropdown.css'; // Import the CSS file for styling
import  {searchPdf, highlightCurrentResult} from './../functions/search'; 


const SearchDropdown: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [searchResults, setSearchResults] = useState<number[]>([]); // Store indexes of search results
    const [currentIndex, setCurrentIndex] = useState<number>(-1);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);
        const results = searchPdf(term); // Highlight the search term in the PDF
        setSearchResults(results);
        setCurrentIndex(-1);
    };

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };

    const handleRerendering = () => {
        const isThereSearchResult = document.querySelector('mark.searchedClass');
        if (!isThereSearchResult){
            const term = searchTerm;
            const results = searchPdf(term); // Highlight the search term in the PDF
            setSearchResults(results);
            setCurrentIndex(-1);
        };
    };

    const onNavigateUp = () => {
        handleRerendering();
        if (searchResults.length === 0) return; // Do nothing if no results
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : searchResults.length - 1)); // Navigate up
        highlightCurrentResult((currentIndex - 1 + searchResults.length) % searchResults.length); // Highlight new result
    };

    const onNavigateDown = () => {
        handleRerendering();
        if (searchResults.length === 0) return; // Do nothing if no results
        setCurrentIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : 0)); // Navigate down
        highlightCurrentResult((currentIndex + 1) % searchResults.length); // Highlight new result
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onNavigateDown();
        }
    }



    return (
        <div className="search-container">
            <button id="search" onClick={toggleDropdown} className="search-button">
                <FontAwesomeIcon icon={faSearch} />
            </button>
            {isDropdownVisible && (
                <div id="search-dropdown" className="search-dropdown">
                    <div className="search-input-container">
                        <input
                            type="text"
                            placeholder="Find in document..."
                            value={searchTerm}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            aria-label="Search term"
                            className="search-input"
                        />
                        <button onClick={onNavigateUp} className="nav-button">
                            <FontAwesomeIcon icon={faArrowUp} />
                        </button>
                        <button onClick={onNavigateDown} className="nav-button">
                            <FontAwesomeIcon icon={faArrowDown} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchDropdown;