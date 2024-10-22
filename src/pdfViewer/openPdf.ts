const openPdf = (page: string, search: string) => {
  let url = chrome.runtime.getURL("pdfviewer.html");

  // Validate the page parameter
  const isValidPageNumber = (value: string) => !isNaN(Number(value));
  const isValidPageString = (value: string) => /^page=\d+$/.test(value);

  if (isValidPageNumber(page)) {
    page = `page=${page}`;
  }

  if (isValidPageString(page)) {
    url = `${url}#${page}&search=${search}`;
  } else {
    // Optionally, you can set a default page or handle the error as needed
    url = `${url}#page=1&search=${search}`;
  }

  chrome.tabs.create({ url });
};

export default openPdf;