import { startTimer } from "../utils";
import { stopTimer } from "../utils/schedule";
import { getExtensionState } from "../utils";

const TIMER_DURATION = 5; 

const setInitialExtensionState = async (): Promise<void> => {
  const isExtensionEnabled = await getExtensionState();
  if (isExtensionEnabled) {
    enableExtension();
  } else {
    disableExtension();
  }
};
setInitialExtensionState();

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.state !== undefined) {
    const state = message.state;
    if (state) {
      enableExtension();
    } else {
      disableExtension();
    }
  }
});

const enableExtension = (): void => {
    startTimer(TIMER_DURATION);
};

const disableExtension = (): void => {
    stopTimer();
};