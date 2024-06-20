import { togglePopup } from "./togglePopup";
import { contentString } from "./api";

document.addEventListener("DOMContentLoaded", () => togglePopup(false));

let timerActive = true;

let timerIntervalId: NodeJS.Timeout | null = null;

const startTimer = (
  duration: number,
  repeat: boolean = true
): NodeJS.Timeout => {
  let remainingTime = duration;
  console.log(`Countdown started for ${duration} seconds`);

  if (timerIntervalId !== null) {
    clearInterval(timerIntervalId);
  }

  timerIntervalId = setInterval(() => {
    remainingTime--;
    console.log(`Time remaining: ${remainingTime} seconds`);
    if (remainingTime <= 0) {
      clearInterval(timerIntervalId as NodeJS.Timeout);
      console.log("Countdown finished");

      togglePopup(true, contentString);
      if (repeat && timerActive) {
        startTimer(duration, true);
      } else {
        timerIntervalId = null;
      }
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
  console.log("Timer stopped and future timers are prevented.");
};

export { startTimer, stopTimer };
