import { LocalStorage } from "./types";

const setHealthTipState = (HealthTipsEnabled: boolean): Promise<void> => {
  return new Promise<void>((resolve) => {
    const vals: LocalStorage = {
      HealthTipsEnabled,
    };
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
};

const setXAutoDetectState = (xAutoDetectEnabled: boolean): Promise<void> => {
  return new Promise<void>((resolve) => {
    const vals: LocalStorage = {
      xAutoDetectEnabled,
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

const getHealthTipState = (): Promise<boolean> => {
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

const getXAutoDetectState = (): Promise<boolean> => {
    return new Promise((resolve) => {
      chrome.storage.local.get("xAutoDetectEnabled", (result) => {
        const state = result.xAutoDetectEnabled;
        resolve(state);
      });
    });
};


const Carr: Array<{ key: string, value: any }> = [];
const booleanKeys: Array<{ key: string, value: boolean }> = [];

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
        Carr.length = 0; // Clear the array before updating
        booleanKeys.length = 0; // Clear the booleanKeys array before updating
        
        keys.forEach(key => {
            if (result[key] !== undefined) {
                Carr.push({ key: key, value: result[key] });
                if (typeof result[key] === 'boolean') {
                    booleanKeys.push({ key: key, value: result[key] });
                }
            } else {
                Carr.push({ key: key, value: 'not found' });
            }
        });

        console.log(Carr);
        // console.log(booleanKeys);
    });
}







const setDefaultInstalled = () => {
  setXAutoDetectState(true);
  setHealthTipState(true);
  const categories = [15,16,18,19,20,21,23,24,28,29];
  categories.forEach(category => {
    setCategoryState(category, true);
  });
}



export { 
  setXAutoDetectState,
  getXAutoDetectState,
  setHealthTipState, 
  getHealthTipState, 
  setCategoryState, 
  getCategoryState, 
  logLocalStorageValues, 
  setDefaultInstalled,
  Carr,
  booleanKeys};
