import { startTimer } from '../utils';
import { stopTimer } from '../utils/schedule';
import { fetchAndScrapeData } from '../utils/api';


console.log("contentScript loaded");
fetchAndScrapeData();
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






