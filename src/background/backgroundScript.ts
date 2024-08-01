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
        factCheck(request.text);
    }
});


// For Browser Window Right Click Context Menu
chrome.contextMenus.create({
    id: "extHealth",
    title: "Check Health Information",
    contexts: ["selection"]
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
        factCheck(info.selectionText);
    }
});


async function factCheck(text) {
    console.log("Fact Checking: ", text);
    
    let response = await sendTextToServer(text);
    chrome.storage.local.set({ extHealthFacts: response });
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Fact Check Ready!!',
        message: "Your request has been processed. Please check out the results in the extension popup.",
        priority: 2
        });
}