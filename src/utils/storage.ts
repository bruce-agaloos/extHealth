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
    chrome.storage.local.get("HealthTipsEnabled", (result) => {
      const state = result.HealthTipsEnabled;
      resolve(state);
    });
  });
};

const getCategoryState = (id: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const key = `id${id}Enabled`;
    chrome.storage.local.get(key, (result) => {
      const state = result[key];
      resolve(state);
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

const Carr: Array<{ key: string; value: any }> = [];

function categoryStorageValue(): Promise<number[]> {
  const keys: string[] = [
    "id15Enabled",
    "id16Enabled",
    "id18Enabled",
    "id19Enabled",
    "id20Enabled",
    "id21Enabled",
    "id23Enabled",
    "id24Enabled",
    "id28Enabled",
    "id29Enabled",
  ];

  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (result) => {
      Carr.length = 0;

      const enabledCategories: number[] = [];

      keys.forEach((key) => {
        if (result[key] !== undefined) {
          Carr.push({ key: key, value: result[key] });
          if (typeof result[key] === "boolean" && result[key]) {
            const categoryId = parseInt(
              key.replace("id", "").replace("Enabled", ""),
              10
            );
            enabledCategories.push(categoryId);
          }
        } else {
          Carr.push({ key: key, value: "not found" });
        }
      });
      //debug
      //console.log(Carr);
      resolve(enabledCategories);
    });
  });
}

function storeHealthTipResponse(data: any) {
  chrome.storage.local.get(["healthTips"], (result) => {
    let healthTips = result.healthTips || [];
    healthTips.unshift(data);
    chrome.storage.local.set({ healthTips: healthTips }, () => {
      // debug
      // console.log("API response stored in local storage.");
      // console.log(healthTips);
    });
  });
}

const setDefaultInstalled = () => {
  setXAutoDetectState(true);
  setHealthTipState(true);
  const categories = [15, 16, 18, 19, 20, 21, 23, 24, 28, 29];
  categories.forEach((category) => {
    setCategoryState(category, true);
  });
};

export {
  setXAutoDetectState,
  getXAutoDetectState,
  setHealthTipState,
  getHealthTipState,
  setCategoryState,
  getCategoryState,
  categoryStorageValue,
  setDefaultInstalled,
  storeHealthTipResponse,
};
