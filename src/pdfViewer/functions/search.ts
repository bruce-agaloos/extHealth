const searchPdf = (term: string): number[] => {
    const pdfViewer = document.querySelector('#pdfViewer');
    if (!pdfViewer || !term) return []; // Check if the element exists and if the term is provided

    // Remove previous highlights
    const existingMarks = pdfViewer.querySelectorAll('mark.searchedClass');
    existingMarks.forEach((mark) => {
        const parent = mark.parentNode;
        if (parent) {
            // Create a text node with the original text content of the mark
            const textContent = mark.textContent || '';
            const fragment = document.createDocumentFragment();
            fragment.appendChild(document.createTextNode(textContent));
            parent.replaceChild(fragment, mark);
            const originalText = parent.textContent || '';
            parent.textContent = originalText; 
        }
    });

    // Escape the search term for use in the regex
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedTerm})`, 'gi'); // 'g' for global, 'i' for case insensitive

    const highlightedIndices: number[] = []; // To store the indices of highlighted terms

    // Function to highlight search term and track indices
    const highlightText = (text: string, index: number) => {
        const newText = text.replace(regex, (match) => {
            highlightedIndices.push(index); // Store index of the highlighted term
            return `<mark class="searchedClass">${match}</mark>`;
        });
        return newText;
    };

    // Iterate through child nodes and update text
    const walk = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            // Replace text in text nodes
            const newText = highlightText(node.textContent || '', highlightedIndices.length);
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

    return highlightedIndices; // Return the indices of highlighted terms
};




const navigateUp = () => {
    // Implement the navigation up functionality
    return;
};

const navigateDown = () => {
    // Implement the navigation down functionality
    return;
};

const highlightCurrentResult = (index: number) => {
    const pdfViewer = document.querySelector('#pdfViewer');
    const marks = pdfViewer.querySelectorAll('mark.searchedClass');

    // Clear previous highlights
    marks.forEach(mark => {
        mark.classList.remove('active'); // Assuming you have an 'active' class for highlighting
    });

    // Highlight the current result
    if (marks[index]) {
        marks[index].classList.add('active'); // Add an 'active' class to the current result
        marks[index].scrollIntoView({ behavior: 'smooth', block: 'center' }); // Scroll to the highlighted term
    }
};


export {
    searchPdf,
    navigateUp,
    navigateDown,
    highlightCurrentResult
};