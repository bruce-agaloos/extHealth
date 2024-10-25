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
    // const [searchText, setSearchText] = useState<string>(search);
    const [zoomLevel, setZoomLevel] = useState<number>(zoom);

    

    // useEffect(() => {
    //     setSearchText(search);
    //     if (search) {
    //         findFirstOccurrence(search);
    //     }
    // }, [search]);

    useEffect(() => {
        setZoomLevel(zoom);
    }, [zoom]);
    

    const textRenderer = useCallback(
        (textItem: { str: string }) => {
            const { str } = textItem;
            console.log(pdfTitle);
            return highlightPattern(str, pdfTitle);
        },
        [pdfTitle]
    );

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    // const findFirstOccurrence = async (term: string) => {
    //     try {
    //         const loadingTask = pdfjs.getDocument(pdfPath);
    //         const pdfDocument = await loadingTask.promise; // Await the promise to get the PDFDocumentProxy
    //         for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    //             const page = await pdfDocument.getPage(pageNum); // Call getPage on the PDFDocumentProxy
    //             const textContent = await page.getTextContent();
    //             const textItems = textContent.items.map((item: any) => item.str).join(' ');
    //             if (textItems.toLowerCase().includes(term.toLowerCase())) {
    //                 setCurrentPage(pageNum);
    //                 break;
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error finding first occurrence:', error);
    //     }
    // };

    const renderPages = () => {
        const pages = [];
        const startingPage = initialPageNumber;
        const pagesToRender = Math.min(5, numPages - startingPage + 1);
        if (startingPage <= 0) {
            setCurrentPage(1);
        }
        for (let i = 0; i < pagesToRender; i++) {
            pages.push(
                <div key={`pageParent_${startingPage + i}`} style={{ position: 'relative' }}>
                    <span
                        key={`pageCounter_${startingPage + i}`}
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
                        {startingPage + i + " of " + numPages}
                    </span>
                    <Page
                        key={`page_${startingPage + i}`}
                        pageNumber={startingPage + i}
                        customTextRenderer={textRenderer}
                        scale={zoomLevel}
                    />
                </div>
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