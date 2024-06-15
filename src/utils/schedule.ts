const popupHTML = `
<div id="customPopup" style="position: fixed; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: none; justify-content: center; align-items: center; z-index: 1000;">
    <div id="popupContent" style="background-color: white; padding: 20px; border-radius: 5px; color: black;">
        <p>hatdog para sayo</p>
        <button id="closePopupButton" style="color: black;">Close</button>
    </div>
</div>`;

function showPopup(): void {
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    const popup = document.getElementById('customPopup');
    if (popup) {
        popup.style.display = 'flex';
    }

    const closeButton = document.getElementById('closePopupButton');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            if (popup) {
                popup.style.display = 'none';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const closePopup = (): void => {
        const popup = document.getElementById('customPopup');
        if (popup) {
            popup.style.display = 'none';
        } else {
            console.error('Element with ID "customPopup" not found.');
        }
    };

    // Assuming you want to close the popup as soon as the DOM is ready
    closePopup();
});

export const startTimer = (duration: number): void => {
    let remainingTime = duration;
    console.log("Countdown started for", duration, "seconds");

    const countdownInterval = setInterval(() => {
        remainingTime--;
        console.log(`${remainingTime} seconds remaining`);

        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            console.log("Countdown finished");
            // This will show a popup when the countdown finishes
            showPopup();
            startTimer(duration);  // Reset the countdown
        }
    }, 1000); // 1000 milliseconds = 1 second
};