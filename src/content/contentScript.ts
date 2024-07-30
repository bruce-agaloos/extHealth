import { startTimer } from "../utils";
import { stopTimer } from "../utils/schedule";
import { getPopupState, getCategoryState } from "../utils";

const TIMER_DURATION = 1 ; 

const setInitialExtensionState = async (): Promise<void> => {
  const isExtensionEnabled = await getPopupState();
  if (isExtensionEnabled) {
    enablePopup();
  } else {
    disablePopup();
  }
};
setInitialExtensionState();

// const setInitialCategoryState = async (): Promise<void> => {
//   const isCategoryEnabled = await getCategoryState(15);
//   if (isCategoryEnabled) {
//     console.log("Category is enabled");
//   } else {
//     console.log("Category is disabled");
//   }
// }
// setInitialCategoryState();

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.state !== undefined) {
    const state = message.state;
    if (typeof state === 'boolean') {
      if (state) {
        enablePopup();
      } else {
        disablePopup();
      }
    } else {
      console.warn("State is not a boolean:", state);
    }
  }

  if (message.category !== undefined && message.id !== undefined) {
      const category = message.category;
      const id = message.id;
      if (typeof category === 'boolean') {
          if (category) {
              console.log(`Category ${id} is enabled`);
          } else {
              console.log(`Category ${id} is disabled`);
          }
      } else {
          console.warn(`Category ${id} is not a boolean:`, category);
      }
  }
});

const enablePopup = (): void => {
    startTimer(TIMER_DURATION);
};

const disablePopup = (): void => {
    stopTimer();
};

