// Api Stuffs here
import {
    sendTextToServer
} from "../utils/api_fight_misinfo";



// Listen for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'factCheck') {
        const query = request.buttonValue;
        sendTextToServer(query);
        return true;  // Indicate that response will be sent asynchronously
    }
});

// sample notification
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'playNotification') {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon.png',
            title: 'New Email',
            message: 'You have a new email.',
            priority: 2
          });
        
          
    }
});