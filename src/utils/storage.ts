import { LocalStorage } from "./types";

const setPopupState = (extensionEnabled: boolean): Promise<void> => {
  return new Promise<void>((resolve) => {
    const vals: LocalStorage = {
      extensionEnabled,
    };
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
};

const setCategoryState = (id: number, enabled: boolean): Promise<void> => {
  return new Promise<void>((resolve) => {
    const key = `id${id}Enabled`;
    const vals: Record<string, boolean> = {
      [key]: enabled,
    };
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
};

const getPopupState = (): Promise<boolean> => {
    return new Promise((resolve) => {
      chrome.storage.local.get("extensionEnabled", (result) => {
        const state = result.extensionEnabled;
        resolve(state);
      });
    });
  };

const getCategoryState = (id: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const key = `id${id}Enabled`;
    chrome.storage.local.get(key, (result) => {
      const category = result[key];
      resolve(category);
    });
  });
};

let Carr=[];

function logLocalStorageValues() {
    const keys: string[] = [
        'id15Enabled',
        'id16Enabled',
        'id18Enabled',
        'id19Enabled',
        'id20Enabled',
        'id21Enabled',
        'id23Enabled',
        'id24Enabled',
        'id28Enabled',
        'id29Enabled'
    ];

    chrome.storage.local.get(keys, (result) => {
        const valuesArray: Array<{ key: string, value: any }> = [];
        
        keys.forEach(key => {
            if (result[key] !== undefined) {
                Carr.push({ key: key, value: result[key] });
            } else {
                Carr.push({ key: key, value: 'not found' });
            }
        });
    
        console.log(Carr);
    });
}


export { setPopupState, getPopupState, setCategoryState, getCategoryState, logLocalStorageValues, Carr };
