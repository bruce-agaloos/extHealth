import { API_ENDPOINT } from './endpoint';
import { setXAutoDetectState } from "../utils/storage";

const healthClaimDetection = async (content: string) => {
    const encodedContent = encodeURIComponent(content);
    const extraEndpoint = "/claimDetection"
    const response = await fetch(`${API_ENDPOINT}${extraEndpoint}?content=${encodedContent}`);
    const data = await response.json();
    chrome.storage.local.set({ healthClaimResult: data.result });
    if (data.result.toLowerCase() === "error" || data.result.toLowerCase() === "daily limit reached") {
        setXAutoDetectState(false);
    }
    return data.result === "yes";
};

export { healthClaimDetection };