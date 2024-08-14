import { PopUpStorage } from "./types";

const setFactCheckWholeLoad = (isFactCheckLoading: boolean): Promise<void> => {
    return new Promise<void>((resolve) => {
      const vals: PopUpStorage = {
        isFactCheckLoading,
      };
      chrome.storage.local.set(vals, () => {
        resolve();
      });
    });
};

const setSingleFactCheckLoad = (isSingleFactCheckLoading: boolean): Promise<void> => {
    return new Promise<void>((resolve) => {
      const vals: PopUpStorage = {
        isSingleFactCheckLoading,
      };
      chrome.storage.local.set(vals, () => {
        resolve();
      });
    });
};

const getFactCheckWholeLoad = (): Promise<boolean> => {
    return new Promise((resolve) => {
      chrome.storage.local.get("isFactCheckLoading", (result) => {
        const state = result.isFactCheckLoading;
        resolve(state);
      });
    });
}

const getSingleFactCheckLoad = (): Promise<boolean> => {
    return new Promise((resolve) => {
      chrome.storage.local.get("isSingleFactCheckLoading", (result) => {
        const state = result.isSingleFactCheckLoading;
        resolve(state);
      });
    });
}

const isFactCheckLoading = async (): Promise<boolean> => {
    const [wholeLoad, singleLoad] = await Promise.all([getFactCheckWholeLoad(), getSingleFactCheckLoad()]);
    return wholeLoad || singleLoad;
}

export { setFactCheckWholeLoad, setSingleFactCheckLoad, getFactCheckWholeLoad, getSingleFactCheckLoad, isFactCheckLoading }