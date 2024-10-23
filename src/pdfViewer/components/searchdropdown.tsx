import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons';

interface SearchDropdownProps {
    onSearchResultsChange: (results: string[], currentIndex: number) => void; // Callback to pass results and index to parent
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ onSearchResultsChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);
        // Perform search logic (dummy example here)
        const results = performSearch(term); // Replace with actual search logic
        setSearchResults(results);
        setCurrentIndex(0); // Reset index when searching
        onSearchResultsChange(results, currentIndex); // Pass results to parent
    };

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };

    const handleNext = () => {
        if (currentIndex < searchResults.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            onSearchResultsChange(searchResults, currentIndex + 1); // Update parent with new index
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
            onSearchResultsChange(searchResults, currentIndex - 1); // Update parent with new index
        }
    };

    const performSearch = (term: string): string[] => {
        // Dummy search logic; replace with actual search from your PDF content
        // Example: return ['term1', 'term2', 'term3'].filter(term => term.includes(term));
        return term ? ['term1', 'term2', 'term3'].filter(item => item.includes(term)) : [];
    };

    return (
        <div>
            <button id="search" onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faSearch} />
            </button>
            {isDropdownVisible && (
                <div id="search-dropdown">
                    <input
                        type="text"
                        placeholder="Find in document..."
                        value={searchTerm}
                        onChange={handleInputChange}
                        aria-label="Search term"
                    />
                    <button onClick={handlePrev} aria-label="Previous occurrence" disabled={currentIndex === 0}>
                        <FontAwesomeIcon icon={faChevronUp} />
                    </button>
                    <button onClick={handleNext} aria-label="Next occurrence" disabled={currentIndex === searchResults.length - 1}>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default SearchDropdown;
