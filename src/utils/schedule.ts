import { getHealthTips } from "../utils";

let timerActive = true;
let timerIntervalId: NodeJS.Timeout | null = null;

/**
 * Starts a countdown timer.
 * 
 * @param {number} duration - The duration of the timer in seconds.
 * @param {boolean} [repeat=true] - Whether the timer should repeat after finishing.
 * @returns {NodeJS.Timeout} - The interval ID of the timer.
 */
const startTimer = (
  duration: number,
  repeat: boolean = true
): NodeJS.Timeout => {
  let remainingTime = duration;
  console.log(`Countdown started for ${duration} seconds`);

  if (timerIntervalId !== null) {
    clearInterval(timerIntervalId);
  }

  timerActive = true;

  timerIntervalId = setInterval(() => {
    remainingTime--;
    console.log(`Time remaining: ${remainingTime} seconds`);
    if (remainingTime <= 0) {
      clearInterval(timerIntervalId as NodeJS.Timeout);
      console.log("Countdown finished");

      getHealthTips()
        .catch((error) => console.error("Error:", error));
      if (repeat && timerActive) {
        startTimer(duration, true);
      } else {
        timerIntervalId = null;
      }
    }
  }, 1000);

  return timerIntervalId;
};

/**
 * Stops the currently running timer and prevents future timers from repeating.
 */
const stopTimer = (): void => {
  if (timerIntervalId !== null) {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
  }
  timerActive = false;
  console.log("Timer stopped and future timers are prevented.");
};

export { startTimer, stopTimer };