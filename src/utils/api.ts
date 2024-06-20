export let contentString;

// const BASE_URL = "http://localhost:3000";

// // Use the base URL to construct the URL for the news fetch
// const newsBaseURL = new URL("/news", BASE_URL);

// fetch(newsBaseURL.toString())
//   .then((response) => response.json())
//   .then((articles) => {
//     if (articles.length > 0) {
//       // Collect all article URLs
//       const articleUrls = articles.map(article => article.url);

//       // Use the base URL to construct the URL for the scrape request
//       const scrapeBaseURL = new URL("/scrape", BASE_URL);

//       // Send all URLs to the `/scrape` endpoint in a single request
//       return fetch(scrapeBaseURL.toString(), {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ articleUrls }), // Send the array of URLs
//       });
//     }
//     throw new Error("No articles found");
//   })
//   .then((response) => response.json())
//   .then((data) => {
//     // Process the scraped content for all URLs
//     console.log(data); // Assuming `data` contains the results for all URLs
//   })
//   .catch((error) => console.error("Error:", error));

export function fetchAndScrapeData() {
  // Construct the URL for the `/fetchAndScrape` endpoint
  const url = 'http://localhost:3000/fetchAndScrape';

  // Make a GET request to the endpoint
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Process the fetched data
      console.log('Fetched data:', data);
      // Here you can update your UI with the fetched data
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
    });
}

// Call the function to fetch data


