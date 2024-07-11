import { LocalStorage } from "./types";

/**
 * Sets the state of the extension based on whether it is enabled or disabled.
 * @param extensionEnabled - true is extension is enabled, otherwise false
 * @returns  a Promise that resolves once the extension state is set.
 */
const setExtensionState = (extensionEnabled: boolean): Promise<void> => {
    return new Promise<void>((resolve) => {
        const vals: LocalStorage = {
            extensionEnabled,
        };
        chrome.storage.local.set(vals, () => {
            resolve();
        });
    });
};

/**
 * Retrieves the current state of the extension, indicating whether it is enabled or disabled.
 * @returns a Promise that resolves with a boolean value, where true indicates the extension is enabled,
 * and false indicates it is disabled.
 */
const getExtensionState = (): Promise<boolean> => {
    return new Promise((resolve) => {
        chrome.storage.local.get("extensionEnabled", (result) => {
            const state = result.extensionEnabled;
            resolve(state);
        });
    });
};

export { setExtensionState, getExtensionState };