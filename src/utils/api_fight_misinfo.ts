import { API_ENDPOINT } from './endpoint';

/**
 * Sends the tweet content to the detoX API for hate speech detection.
 * @param content - The text content of the tweet to be sent for hate speech detection.
 * @returns 1 if the text is identified as hate speech, otherwise 0.
 */
const factCheckWithGenerateQueries = async (content: string) => {
    // Encode the content to ensure it's safe to include in a URL
    const encodedContent = encodeURIComponent(content);
    const extraEndpoint = "/factCheck"
    const response = await fetch(`${API_ENDPOINT}${extraEndpoint}?content=${encodedContent}`);
    const data = await response.json();
    return data;
};

const factCheckWithoutGenerateQueries = async (content: string) => {
    const encodedContent = encodeURIComponent(content);
    const extraEndpoint = "/factCheckWithoutQueries"
    const response = await fetch(`${API_ENDPOINT}${extraEndpoint}?content=${encodedContent}`);
    const data = await response.json();
    return data;
};


export { factCheckWithGenerateQueries, factCheckWithoutGenerateQueries };