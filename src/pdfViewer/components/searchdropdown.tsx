import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './SearchDropdown.css'; // Import the CSS file for styling

interface SearchDropdownProps {
    onNavigateUp?: () => void; // Optional callback for navigating up
    onNavigateDown?: () => void; // Optional callback for navigating down
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ onNavigateUp, onNavigateDown }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);
        searchPdf(term); // Highlight the search term in the PDF
    };

    const searchPdf = (term: string) => {
        console.log(term);
        const pdfViewer = document.querySelector('#pdfViewer');
        if (!pdfViewer || !term) return; // Check if the element exists and if the term is provided
    
        // Remove previous highlights
        const existingMarks = pdfViewer.querySelectorAll('mark.searchedClass');
        existingMarks.forEach((mark) => {
            const parent = mark.parentNode;
            if (parent) {
                // Create a text node with the original text content of the mark
                const textContent = mark.textContent || '';
                // Create a document fragment to gather text nodes
                const fragment = document.createDocumentFragment();
                // Create a text node for the content and append it to the fragment
                fragment.appendChild(document.createTextNode(textContent));
                // Replace the mark with the fragment
                parent.replaceChild(fragment, mark);
                const originalText = parent.textContent || '';
                parent.textContent = originalText; // Remove the mark element
            }
        });
    
        // Escape the search term for use in the regex
        const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedTerm})`, 'gi'); // 'g' for global, 'i' for case insensitive
    
        // Function to highlight search term
        const highlightText = (text: string) => {
            return text.replace(regex, '<mark class="searchedClass">$1</mark>');
        };
    
        // Iterate through child nodes and update text
        const walk = (node: Node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                // Replace text in text nodes
                const newText = highlightText(node.textContent || '');
                if (newText !== node.textContent) {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = newText;
    
                    // Insert new highlighted nodes before the original text node
                    while (tempDiv.firstChild) {
                        node.parentNode?.insertBefore(tempDiv.firstChild, node);
                    }
    
                    // Remove the original text node
                    node.parentNode?.removeChild(node);
                }
            } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== 'MARK') {
                // Recursively walk through child nodes
                node.childNodes.forEach(walk);
            }
        };
    
        // Start walking through the pdfViewer element
        pdfViewer.childNodes.forEach(walk);
    };
    
    

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };

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