import React, { useEffect, useState } from 'react';
import PdfViewer from './pdfviewer';
import { createRoot } from "react-dom/client";

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

    return (
        <div>
            <h1>PDF Viewer</h1>
            <PdfViewer pdfPath={pdfPath} initialPage={initialPage} search={initialSearch} />
        </div>
    );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<PdfLayout />);
