import React, { useEffect, useState } from 'react';
import PdfViewer from './pdfviewer';
import { createRoot } from "react-dom/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";
import { faExpandAlt, faMinus, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

// Function to extract the page number and search term from the URL hash
const getParamsFromUrl = () => {
    const hash = window.location.hash;
    const pageMatch = hash.match(/page=(\d+)/); // Match `#page=number`
    const searchMatch = hash.match(/search=([^&]+)/); // Match `search=somewords`
    
    const page = pageMatch ? parseInt(pageMatch[1], 10) : 1; // Default to page 1 if no match
    const search = searchMatch ? decodeURIComponent(searchMatch[1]) : ''; // Default to empty string if no search term
    
    return { page, search };
};

const PdfLayout: React.FC = () => {
    const pdfPath = "book.pdf";
    // Store the initial page number and search text
    const [{ page: initialPage, search: initialSearch }, setParams] = useState(getParamsFromUrl());
    
    const [search, setSearch] = useState(initialSearch);
    const title = initialSearch ? initialSearch : 'PDF Viewer';
    const [zoom, setZoom] = useState(1.0); // Default zoom level set to 100%
    const [zoomInput, setZoomInput] = useState((zoom * 100).toString() + '%'); // State for input value
    const minZoom = 25;
    const maxZoom = 500;
    // Update the state if the URL hash changes
    useEffect(() => {
        const handleHashChange = () => {
            setParams(getParamsFromUrl());
        };

        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };
    const addZoom = () => {
        if (zoom < maxZoom / 100) {
            const percentage = 0.25;
            setZoom(zoom + percentage);
            setZoomInput(((zoom + percentage) * 100).toFixed(0) + '%');
        }
    };
    const minusZoom = () => {
        if (zoom > minZoom / 100) {
            const percentage = 0.25;
            setZoom(zoom - percentage);
            setZoomInput(((zoom - percentage) * 100).toFixed(0) + '%');
        }
    };

    const handleZoomInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        setZoomInput(value);
    };

    const handleZoomInputBlur = () => {
        updateZoom(zoomInput);
        if (!zoomInput.endsWith('%')) {
            setZoomInput(zoomInput + '%');
        }
    };
    
    const handleZoomInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            updateZoom(zoomInput);
            if (!zoomInput.endsWith('%')) {
                setZoomInput(zoomInput + '%');
            }
        }
    };

    const updateZoom = (value: string) => {
        if (value.endsWith('%')) {
            value = value.slice(0, -1); // Remove the '%' character
        }
        value = value.trim(); // Remove any leading or trailing whitespace
        let intValue = Number(value);
        let belowMin = false;
        let aboveMax = false;
        if (!isNaN(intValue)) {
            if (intValue < minZoom) {
                belowMin = true;
                intValue = minZoom;
            } else if (intValue > maxZoom) {
                aboveMax = true;
                intValue = maxZoom;
            }
            setZoom(intValue / 100); // Convert percentage to decimal
            if (belowMin){
                setZoomInput(minZoom + '%');
            }
            if (aboveMax){
                setZoomInput(maxZoom + '%');
            }
        }
    };

    return (
        <div>
            <nav>
                <h1>{title}</h1>
                <div id="zoom">
                    <div className="pageNumber">
                        <span id="currentPage">1</span>
                        <span>/</span>
                        <span id="totalPages">5</span>
                    </div>
                    <span className="vertical-separator"></span>
                    <span id="zoom-controls">
                        <button id="zoom-out" onClick={minusZoom}>
                            <FontAwesomeIcon icon={faMinus} style={{color:"white"}}/>
                        </button>
                        <input type="text" value={zoomInput} aria-label="Zoom level" 
                        onChange={handleZoomInputChange}
                        onBlur={handleZoomInputBlur}
                        onKeyDown={handleZoomInputKeyDown}/>
                        <button id="zoom-in" onClick={addZoom}>
                            <FontAwesomeIcon icon={faPlus} style={{color:"white"}}/>
                        </button>
                    </span>
                </div>
                <button id="search">
                    <FontAwesomeIcon icon={faSearch}/>
                </button>
            </nav>
            <PdfViewer pdfPath={pdfPath} initialPage={initialPage} search={search} zoom={zoom} />
        </div>
    );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<PdfLayout />);