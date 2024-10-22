import React, { useCallback, useState } from 'react';
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
    search?: string; // Optional: Search term
}

function highlightPattern(text, pattern) {
    return text.replace(pattern, (value) => `<mark>${value}</mark>`);
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfPath, initialPage = 5, search }) => {
    const [numPages, setNumPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(initialPage);
    const [searchText, setSearchText] = useState<string>(search);

    const textRenderer = useCallback(
        (textItem) => highlightPattern(textItem.str, searchText),
        [searchText]
    );
    
    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    // Render pages from the current page up to the next four pages
    const renderPages = () => {
        const pages = []; // Create an empty array to hold the <Page /> components
        const pagesToRender = Math.min(5, numPages - currentPage + 1); // Calculate how many pages to render
    
        for (let i = 0; i < pagesToRender; i++) {
            pages.push(
                <div className = "pdf-page" key={`parentPage_${currentPage + i}`}>
                    <Page
                        key={`page_${currentPage + i}`}
                        pageNumber={currentPage + i}
                        customTextRenderer={textRenderer}
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
