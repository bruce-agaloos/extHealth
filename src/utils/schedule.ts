const popupHTML = `
<div id="customPopup" style="position: fixed; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: none; justify-content: center; align-items: center; z-index: 1000;">
    <div id="popupContent" style="background-color: white; padding: 20px; border-radius: 5px; color: black;">
        <p>hatdog para sayo</p>
        <button id="closePopupButton" style="color: black;">Close</button>
    </div>
</div>`;

function togglePopup(show: boolean): void {
    let popup = document.getElementById('customPopup');
    if (!popup && show) {
        document.body.insertAdjacentHTML('beforeend', popupHTML);
        popup = document.getElementById('customPopup');
        document.getElementById('closePopupButton')?.addEventListener('click', () => togglePopup(false));
    }
    if (popup) {
        popup.style.display = show ? 'flex' : 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => togglePopup(false));

export const startTimer = (duration: number): void => {
    let remainingTime = duration;
    console.log("Countdown started for", duration, "seconds");

    const countdownInterval = setInterval(() => {
        remainingTime--;
        console.log(`${remainingTime} seconds remaining`);

        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            console.log("Countdown finished");
            togglePopup(true); 
            startTimer(duration);  // Reset the countdown
        }
    }, 1000);
};

