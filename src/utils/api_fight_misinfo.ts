const API_ENDPOINT = "http://127.0.0.1:8000/api/v1/factCheck";

/**
 * Sends the tweet content to the detoX API for hate speech detection.
 * @param content - The text content of the tweet to be sent for hate speech detection.
 * @returns 1 if the text is identified as hate speech, otherwise 0.
 */
const sendTextToServer = async (content: string) => {
    // Encode the content to ensure it's safe to include in a URL
    const encodedContent = encodeURIComponent(content);
    const response = await fetch(`${API_ENDPOINT}?content=${encodedContent}`);
    const data = await response.json();
    return data;
};

export { sendTextToServer };