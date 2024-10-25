import React, { useCallback, useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
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
    zoom: number; // Zoom level
}

function highlightPattern(text: string, pattern: string): string {
    const regex = new RegExp(pattern, 'gi');
    return text.replace(regex, (value) => `<mark class="possibleTitles">${value}</mark>`);
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfPath, initialPage = 1, title = '', zoom = 1.0 }) => {
    const [numPages, setNumPages] = useState<number>(0);
    const initialPageNumber = initialPage;
    const pdfTitle= title;
    const [currentPage, setCurrentPage] = useState<number>(initialPage);
    const [zoomLevel, setZoomLevel] = useState<number>(zoom);

    const scrollToTitle = () => {
        const firstPossibleTitle = document.querySelector<HTMLElement>('mark.possibleTitles');
        if (firstPossibleTitle) {
            firstPossibleTitle.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    useEffect(() => {
        setZoomLevel(zoom);
    }, [zoom]);
    

    const textRenderer = useCallback(
        (textItem: { str: string }) => {
            const { str } = textItem;
            scrollToTitle();
            return highlightPattern(str, pdfTitle);
        },
        [pdfTitle]
    );

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    const getPage = (pageNumber: number, numberOfPages: number) => {
        return <div key={`pageParent_${pageNumber}`} style={{ position: 'relative' }}>
            <span
                key={`pageCounter_${pageNumber}`}
                style={{
                    zIndex: 25,
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    backgroundColor: 'green',
                    color: 'white',
                    padding: '5px',
                    borderRadius: '0px 0px 0px 5px'
                }}>
                {pageNumber + " of " + numberOfPages}
            </span>
            <Page
                key={`page_${pageNumber}`}
                pageNumber={pageNumber}
                customTextRenderer={textRenderer}
                scale={zoomLevel}
            />
        </div>
    };

    const renderPages = () => {
        const pages = [];
        const pageCover = 1;
        const startingPage = initialPageNumber;
        const pagesToRender = Math.min(5, numPages - startingPage + 1);
        if (startingPage <= 0) {
            setCurrentPage(pageCover);
        }
        if(startingPage != pageCover)
        {
            pages.push(
                getPage(pageCover, numPages)
            );
        }
        for (let i = 0; i < pagesToRender; i++) {
            pages.push(
                getPage(startingPage + i, numPages)
            );
        }
        return pages;
    };

    return (
        <div style={{ textAlign: 'center', margin: '20px' }} id="pdfViewer">
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