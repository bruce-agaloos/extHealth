import React, { useCallback, useState, useEffect } from 'react';
import { Document, Page, Outline, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const options = {
    cMapUrl: '/cmaps/',
};

interface PdfViewerProps {
    pdfPath: string; // Path to the PDF file
    initialPage?: number; // Optional: Starting page
    title?: string; // Optional: Search term
    search?: string; 
    zoom: number; // Zoom level
}

function highlightPattern(text: string, pattern:string) {
    const regex = new RegExp(pattern, 'gi');
    return text.replace(pattern, (value) => `<mark>${value}</mark>`);
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfPath, initialPage = 5, title='', search='', zoom=1.0 }) => {
    const [numPages, setNumPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(initialPage);
    const [searchText, setSearchText] = useState<string>(search);
    const [searchTitle, setSearchTitle] = useState<string>(title);
    const [zoomLevel, setZoomLevel] = useState<number>(zoom);

    useEffect(() => {
        setSearchText(search);
    }, [search]);

    useEffect(() => {
        setZoomLevel(zoom);
    }, [zoom]);


    const textRenderer = useCallback(
        (textItem) => highlightPattern(textItem.str, searchTitle),
        [searchTitle]
    );
    
    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    // Render pages from the current page up to the next four pages
    const renderPages = () => {
        const pages = []; // Create an empty array to hold the <Page /> components
        const pagesToRender = Math.min(5, numPages - currentPage + 1); // Calculate how many pages to render
        
        if (currentPage <= 0) {
            setCurrentPage(1);
        }

        if (currentPage != 1){
            pages.push(
                <div key={`pageParent_1`} style= {{position: "relative"}}>
                    <span 
                    key={`pageCounter_1`}
                    style={{
                        zIndex: 25,
                        position: "absolute",
                        top: "0",
                        right: "0",
                        backgroundColor: "green",
                        color: "white",
                        padding: "5px",
                        borderRadius: "0px 0px 0px 5px"
                    }}>
                        {1 + " of " + numPages}
                    </span>
                    <Page
                        key={`page_1`}
                        pageNumber={1}
                        customTextRenderer={textRenderer}
                        scale={zoomLevel}
                    />
                </div>
            );
        }

        for (let i = 0; i < pagesToRender; i++) {
            pages.push(
                <div key={`pageParent_${currentPage + i}`} style= {{position: "relative"}}>
                    <span
                    key={`pageCounter_${currentPage + i}`}
                    style={{
                        zIndex: 25,
                        position: "absolute",
                        top: "0",
                        right: "0",
                        backgroundColor: "green",
                        color: "white",
                        padding: "5px",
                        borderRadius: "0px 0px 0px 5px"
                    }}>
                        {currentPage + i + " of " + numPages}
                    </span>
                    <Page
                        key={`page_${currentPage + i}`}
                        pageNumber={currentPage + i}
                        customTextRenderer={textRenderer}
                        scale={zoomLevel}
                    />
                </div>
            );
        }
    
        return pages; // Return the array of <Page /> components
    };

    return (
        <div style={{ textAlign: 'center', margin: '20px' }}>
            <Document
                className="pdf-body"
                options={options}
                onLoadSuccess={onDocumentLoadSuccess}
                file={pdfPath}
            >
                {renderPages()}
            </Document>
        </div>
    );
};

export default PdfViewer;
