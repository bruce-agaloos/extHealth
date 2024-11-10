import { LocalStorage } from "./types";
import { setExtHealthFacts, setFactCheckMode } from "./pop_up_storage/storage";
import { resetFactCheckHistory } from "./pop_up_storage/history";

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

const setHealthTipsEnabled = async (enabled: boolean): Promise<void> => {
  await setHealthTipState(enabled);
  if (!enabled) {
    // Broadcast a message to all tabs to stop the timer
    chrome.runtime.sendMessage({ action: "stopTimer" });
  }
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

function getAllHealthTips(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["healthTips"], (result) => {
      let healthTips = result.healthTips || [];
      resolve(healthTips);
    });
  });
}

function getLatestHealthTip(): Promise<any> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["healthTips"], (result) => {
      let healthTips = result.healthTips || [];
      let latestHealthTip = healthTips.length > 0 ? healthTips[0] : null;
      resolve(latestHealthTip);
    });
  });
}

function getFromStorage(keys, timeout = 3000) {
  return Promise.race([
    new Promise((resolve, reject) => {
      chrome.storage.local.get(keys, function (result) {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result);
        }
      });
    }),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeout))
  ]);
}

function getInterval(): Promise<number> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["interval"], (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result["interval"] || 0); // Default to 0 if the key does not exist
      }
    });
  });
}

function setInterval(value: number): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ ['interval']: value }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
}

function getDuration(): Promise<number> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["duration"], (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result["duration"] || 0); // Default to 0 if the key does not exist
      }
    });
  });
}

function setDuration(value: number): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ ['duration']: value }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
}


const getRemainingTime = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["remainingTime"], (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result["remainingTime"] || 0); // Default to 0 if the key does not exist
      }
    });
  });
};
function setRemainingTime(value: number): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ ['remainingTime']: value }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
}

function setInStorage(data: { [key: string]: any }): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    chrome.storage.local.set(data, function () {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
}

const setTOS = (tosAccepted: boolean): Promise<void> => {
  return setInStorage({ tosAccepted });
};

const getTOS = (): Promise<{ tosAccepted: boolean }> => {
  return getFromStorage('tosAccepted') as Promise<{ tosAccepted: boolean }>;
};


const setDefaultInstalled = async (): Promise<void> => {
  try {
    setXAutoDetectState(true);
    setHealthTipState(true);
    const interval = 5;
    const duration =1;
    setDuration(duration);
    setInterval(interval);
    setRemainingTime(interval*60);
    const categories = [15, 16, 18, 19, 20, 21, 23, 24, 28, 29];
    categories.forEach((category) => {
      setCategoryState(category, true);
    });
    setExtHealthFacts([]);
    setFactCheckMode('google');
    resetFactCheckHistory();
  } catch (error) {
    console.error('Error setting default installed state:', error);
  }
};

export {
  setXAutoDetectState,
  getXAutoDetectState,
  setHealthTipState,
  setHealthTipsEnabled,
  getHealthTipState,
  setCategoryState,
  getCategoryState,
  categoryStorageValue,
  setDefaultInstalled,
  storeHealthTipResponse,
  getAllHealthTips,
  getLatestHealthTip,
  getFromStorage,
  setInStorage,
  getInterval,
  setDuration,
  getDuration,
  getRemainingTime,
  setRemainingTime,
  setInterval,
  setTOS,
  getTOS,
};
