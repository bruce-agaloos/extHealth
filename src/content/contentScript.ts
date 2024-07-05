import { startTimer } from '../utils';
import { stopTimer } from '../utils/schedule';

import { sendTextToServer } from "../utils/api_fight_misinfo";
import {
    fight_misinfo_inject
} from "../utils/fight_misinfo_inject";


console.log("contentScript loaded");


let isTrue = false;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.toggleState !== undefined) {
        console.log("Toggle state is now:", request.toggleState);
        if (request.toggleState === true) {
       
            startTimer(5, true);
        }
        if (request.toggleState === false) {
            console.log("Timer stopped");
            stopTimer();
        }
    }
});




// This is for sending and receiving fact checking
let button = document.createElement('button');
button.textContent = 'Check this health out';
button.value = 'Polio is not deadly';

// Set CSS properties to position the button at the corner
button.style.position = 'fixed';
button.style.bottom = '20px';
button.style.right = '20px';

// Add an event listener to the button
button.addEventListener('click', async function() {
    // Send a message to the background script with the button value
    let response = await sendTextToServer(button.value);
    fight_misinfo_inject(response);
});

// Append the button to the body
document.body.appendChild(button);
