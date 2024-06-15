const popupHTML = `
<div id="customPopup" style="position: fixed; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: none; justify-content: center; align-items: center; z-index: 1000;">
    <div id="popupContent" style="background-color: white; padding: 20px; border-radius: 5px; color: black;">
        <p>hatdog para sayo</p>
        <button id="closePopupButton" style="color: black;">Close</button>
    </div>
</div>`;


function togglePopup(show: boolean): void {
  let popup = document.getElementById("customPopup");
  if (!popup && show) {
    document.body.insertAdjacentHTML("beforeend", popupHTML);
    popup = document.getElementById("customPopup");
    document.getElementById("closePopupButton")?.addEventListener("click", () => togglePopup(false));
  }
  popup!.style.display = show ? "flex" : "none";
}

// Initialize the popup with hidden state
document.addEventListener("DOMContentLoaded", () => togglePopup(false));

// Flag to control the timer's execution
let timerActive = true;

// Variable to store the interval ID
let timerIntervalId: NodeJS.Timeout | null = null;

const startTimer = (duration: number, repeat: boolean = true): NodeJS.Timeout => {
  let remainingTime = duration;
  let timerActive = true;
  console.log(`Countdown started for ${duration} seconds`);

  // Clear any existing timer before starting a new one
  if (timerIntervalId !== null) {
    clearInterval(timerIntervalId);
  }

  timerIntervalId = setInterval(() => {
    remainingTime--;
    console.log(`Time remaining: ${remainingTime} seconds`);
    if (remainingTime <= 0) {
      clearInterval(timerIntervalId as NodeJS.Timeout);
      console.log("Countdown finished");
      togglePopup(true);
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