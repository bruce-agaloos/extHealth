// Api Stuffs here
import {
    sendTextToServer
} from "../utils/api_fight_misinfo";

import {
    fight_misinfo_inject
} from "../utils/fight_misinfo_inject";

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.message === 'factCheck') {
        let response = await sendTextToServer(request.text);
        // fight_misinfo_inject(response);  // Indicate that response will be sent asynchronously
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