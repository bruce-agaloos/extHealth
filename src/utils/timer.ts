import { getHealthTips } from ".";
import { getInterval } from "./storage"; // Import the getInterval function

let timerActive = true;
let timerIntervalId: NodeJS.Timeout | null = null;

const startTimer = async (repeat: boolean = true): Promise<NodeJS.Timeout | null> => {
  // Retrieve interval from local storage
  try {
    const interval = await getInterval();
    const duration = interval * 60; // Convert minutes to seconds
    let remainingTime = duration;

    if (timerIntervalId !== null) {
      clearInterval(timerIntervalId);
    }

    timerActive = true;

    timerIntervalId = setInterval(() => {
      remainingTime--;

      if (remainingTime <= 0) {
        clearInterval(timerIntervalId as NodeJS.Timeout);
        (async () => {
          try {
            await getHealthTips();
            chrome.runtime.sendMessage({ action: "openPopup" });
          } catch (error) {
            // console.error("Error:", error);
          }

          if (repeat && timerActive) {
            startTimer(true);
          } else {
            timerIntervalId = null;
          }
        })();
      }
    }, 1000);

    return timerIntervalId;
  } catch (error) {
    // console.error("Error retrieving interval from local storage:", error);
    return null;
  }
};

const stopTimer = (): void => {
  if (timerIntervalId !== null) {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
  }
  timerActive = false;
};


export { startTimer, stopTimer };