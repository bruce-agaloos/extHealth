import { getHealthTips } from ".";

let timerActive = true;
let timerIntervalId: NodeJS.Timeout | null = null;

const startTimer = (
  minutes: number,
  seconds: number,
  repeat: boolean = true
): NodeJS.Timeout => {
  const duration = minutes * 60 + seconds;
  let remainingTime = duration;

  if (timerIntervalId !== null) {
    clearInterval(timerIntervalId);
  }

  timerActive = true;

  timerIntervalId = setInterval(() => {
    remainingTime--;
    const remainingMinutes = Math.floor(remainingTime / 60);
    const remainingSeconds = remainingTime % 60;
    //debug
    //console.log(`Time remaining: ${remainingMinutes} minutes and ${remainingSeconds} seconds`);

      if (remainingTime <= 0) {
      clearInterval(timerIntervalId as NodeJS.Timeout);
      console.log("Countdown finished");
    
      // Use an async function to handle the asynchronous operation
      (async () => {
        try {
          await getHealthTips();
          chrome.runtime.sendMessage({ action: "openPopup" });
        } catch (error) {
          console.error("Error:", error);
        }
    
        if (repeat && timerActive) {
          startTimer(minutes, seconds, true);
        } else {
          timerIntervalId = null;
        }
      })();
    }
  }, 1000);

  return timerIntervalId;
};

const stopTimer = (): void => {
  if (timerIntervalId !== null) {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
  }
  timerActive = false;
  // debug
  // console.log("Timer stopped and future timers are prevented.");
};


export { startTimer, stopTimer };
