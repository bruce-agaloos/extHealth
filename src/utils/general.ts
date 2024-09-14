/**
 * Sends the extension state to configure the browser extension accordingly
 * @param state - true if extension is enabled, otherwise false
 */
const sendMessageToContentScript = (message: object, callback?: (response: any) => void): void => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        if (activeTab) {
            chrome.tabs.sendMessage(activeTab.id, message, function (response) {
                if (chrome.runtime.lastError) {
                    // console.error("Error sending message:", chrome.runtime.lastError.message);
                    if (callback) {
                        callback(null); // Optionally, you can pass null or an error object to the callback
                    }
                } else {
                    if (callback) {
                        callback(response);
                    }
                }
            });
        }
    });
};


/**
 * Retrieves the currently active tab in the user's browser
 * @returns information about the currently active tab
 */
const getCurrentTab = async () => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
};

/**
 * Scrolls the window vertically. This function is called when the extension is enabled.
 */
const initialScroll = (): void => {
    setTimeout(() => {
        window.scrollBy(0, 1);
    }, 3500);
};

export { getCurrentTab, initialScroll, sendMessageToContentScript };