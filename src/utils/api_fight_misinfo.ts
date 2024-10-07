import { API_ENDPOINT } from './endpoint';
import { setFactCheckWholeLoad, setSingleFactCheckLoad } from './pop_up_storage/storage';
import { getFactCheckMode } from './pop_up_storage/storage';
import { addFactCheckHistory, searchHistory } from './pop_up_storage/history';
/**
 * Sends the tweet content to the detoX API for hate speech detection.
 * @param content - The text content of the tweet to be sent for hate speech detection.
 * @returns 1 if the text is identified as hate speech, otherwise 0.
 */
const factCheckWithGenerateQueries = async (content: string) => {
    try {
        // Retrieve factCheckMode from storage
        const { factCheckMode } = await getFactCheckMode() as { factCheckMode: string };

        // If mode is offline, return early
        if (factCheckMode === 'offline') {
            return { result: searchHistory(content) };
        }

        // Encode the content to ensure it's safe to include in a URL
        await setFactCheckWholeLoad(true);
        const encodedContent = encodeURIComponent(content);
        const extraEndpoint = "/factCheck";
        const response = await fetch(`${API_ENDPOINT}${extraEndpoint}?content=${encodedContent}&mode=${factCheckMode}`);
        const data = await response.json();
        await addFactCheckHistory(content, data.result);
        return data;
    } catch (error) {
        // console.error('Error in factCheckWithGenerateQueries:', error);
        return { result: "Network error" }; // Re-throw the error after logging it
    } finally {
        await setFactCheckWholeLoad(false);
    }
};

const factCheckWithoutGenerateQueries = async (content: string) => {
    try {
        // Retrieve factCheckMode from storage
        const { factCheckMode } = await getFactCheckMode() as { factCheckMode: string };

        // If mode is offline, return early
        if (factCheckMode === 'offline') {
            return { result: "Offline mode not available in this feature" };
        }

        await setSingleFactCheckLoad(true);
        const encodedContent = encodeURIComponent(content);
        const extraEndpoint = "/factCheckWithoutQueries";
        const response = await fetch(`${API_ENDPOINT}${extraEndpoint}?content=${encodedContent}&mode=${factCheckMode}`);
        const data = await response.json();
        return data;
    } catch (error) {
        // console.error('Error in factCheckWithoutGenerateQueries:', error);
        return { result: "Network error" };
    } finally {
        await setSingleFactCheckLoad(false);
    }
};

export { factCheckWithGenerateQueries, factCheckWithoutGenerateQueries };