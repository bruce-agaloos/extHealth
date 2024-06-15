import { startTimer } from '../utils';
import { stopTimer } from '../utils/schedule';


console.log("contentScript loaded");

let isTrue = false;
// Inside your content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.toggleState !== undefined) {
        console.log("Toggle state is now:", request.toggleState);
        // Handle the toggle state change here
        if (request.toggleState === true) {
          
            startTimer(5, true);
        }
        if (request.toggleState === false) {
            console.log("Timer stopped");
            stopTimer();
        }
    }
});




