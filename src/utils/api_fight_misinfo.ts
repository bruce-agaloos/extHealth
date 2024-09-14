import { API_ENDPOINT } from './endpoint';
import {setFactCheckWholeLoad, setSingleFactCheckLoad} from './pop_up_storage/storage';
/**
 * Sends the tweet content to the detoX API for hate speech detection.
 * @param content - The text content of the tweet to be sent for hate speech detection.
 * @returns 1 if the text is identified as hate speech, otherwise 0.
 */
const factCheckWithGenerateQueries = async (content: string) => {
    try {
        // Encode the content to ensure it's safe to include in a URL
        await setFactCheckWholeLoad(true);
        const encodedContent = encodeURIComponent(content);
        const extraEndpoint = "/factCheck";
        const response = await fetch(`${API_ENDPOINT}${extraEndpoint}?content=${encodedContent}`);
        const data = await response.json();
        return data;
    } catch (error) {
        // console.error('Error in factCheckWithGenerateQueries:', error);
        return {result: "Network error"} ; // Re-throw the error after logging it
    } finally {
        await setFactCheckWholeLoad(false);
    }
};

const factCheckWithoutGenerateQueries = async (content: string) => {
    try {
        await setSingleFactCheckLoad(true);
        const encodedContent = encodeURIComponent(content);
        const extraEndpoint = "/factCheckWithoutQueries";
        const response = await fetch(`${API_ENDPOINT}${extraEndpoint}?content=${encodedContent}`);
        const data = await response.json();
        return data;
    } catch (error) {
        // console.error('Error in factCheckWithoutGenerateQueries:', error);
        return {result: "Network error"}; 
    } finally {
        await setSingleFactCheckLoad(false);
    }
};


export { factCheckWithGenerateQueries, factCheckWithoutGenerateQueries };