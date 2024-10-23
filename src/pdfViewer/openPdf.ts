const openPdf = (page: string, search: string) => {
  let url = chrome.runtime.getURL("pdfviewer.html");

  // Validate the page parameter
  const isValidPageNumber = (value: string) => !isNaN(Number(value));
  const isValidPageString = (value: string) => /^page=\d+$/.test(value);

  if (isValidPageNumber(page)) {
    page = `page=${page}`;
  }

  if (isValidPageString(page)) {
    // Check if the search string contains a colon
    const colonIndex = search.indexOf(':');
    if (colonIndex !== -1) {
      // Extract the substring before the colon
      search = search.substring(0, colonIndex).trim();
    }

    url = `${url}#${page}&title=${encodeURIComponent(search)}`;
  } else {
    // Optionally, you can set a default page or handle the error as needed
    url = `${url}#page=1&title=${encodeURIComponent(search)}`;
  }

  chrome.tabs.create({ url });
};

export default openPdf;