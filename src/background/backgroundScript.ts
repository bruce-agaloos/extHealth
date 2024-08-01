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


// For Browser Window Right Click Context Menu
chrome.contextMenus.create({
    id: "extHealth",
    title: "Check Health Information",
    contexts: ["selection", "image"]
}, function() {
    if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
    } else {
        console.log("Context Menu item created successfully!");
    }
}
);

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "extHealth") {
        // const query = info.selectionText;
        // sendTextToServer(query);
        console.log("Clicked on context menu item");
        console.log(info);

        if (info.selectionText) {
            console.log("The selected text:", info.selectionText);
        } else if (info.srcUrl) {
            console.log("The URL of selected image:", info.srcUrl)
        }
    }
});