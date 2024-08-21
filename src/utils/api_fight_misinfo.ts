import { API_ENDPOINT } from './endpoint';
import {setFactCheckWholeLoad, setSingleFactCheckLoad} from './pop_up_storage/storage';
/**
 * Sends the tweet content to the detoX API for hate speech detection.
 * @param content - The text content of the tweet to be sent for hate speech detection.
 * @returns 1 if the text is identified as hate speech, otherwise 0.
 */
const factCheckWithGenerateQueries = async (content: string) => {
    // Encode the content to ensure it's safe to include in a URL
    await setFactCheckWholeLoad(true);
    const encodedContent = encodeURIComponent(content);
    const extraEndpoint = "/factCheck"
    const response = await fetch(`${API_ENDPOINT}${extraEndpoint}?content=${encodedContent}`);
    const data = await response.json();
    await setFactCheckWholeLoad(false);
    return data;
};

const factCheckWithoutGenerateQueries = async (content: string) => {
    await setSingleFactCheckLoad(true);
    const encodedContent = encodeURIComponent(content);
    const extraEndpoint = "/factCheckWithoutQueries"
    const response = await fetch(`${API_ENDPOINT}${extraEndpoint}?content=${encodedContent}`);
    const data = await response.json();
    await setSingleFactCheckLoad(false);
    return data;
};


export { factCheckWithGenerateQueries, factCheckWithoutGenerateQueries };