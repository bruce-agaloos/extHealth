export let contentString;

const BASE_URL = "http://localhost:3000";
const condition = "pertussis";

// Use the base URL to construct the URL for the news fetch
const newsBaseURL = new URL("/news", BASE_URL);
newsBaseURL.searchParams.append("condition", condition);

fetch(newsBaseURL.toString())
  .then(response => response.json())
  .then(articles => {
    if (articles.length > 0) {
      const articleUrl = articles[0].url;

      // Use the base URL to construct the URL for the scrape request
      const scrapeBaseURL = new URL("/scrape", BASE_URL);

      return fetch(scrapeBaseURL.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ articleUrl, condition }),
      });
    }
    throw new Error("No articles found");
  })
  .then(response => response.json())
  .then(data => {
    try {
      // Check if data.content is already an object
      if (typeof data.content === "object") {
        contentString = data.content;
      } else if (typeof data.content === "string") {
        // Attempt to parse it as JSON only if it's a string
        contentString = JSON.parse(data.content);
      } else {
        throw new Error("Unexpected data type for contentString");
      }
    } catch (error) {
      console.error("Error processing contentString:", error);
      throw error; // Rethrow or handle as needed
    }
    console.log(contentString); // contentString is now an object or the original object
  })
  .catch(error => console.error("Error:", error));