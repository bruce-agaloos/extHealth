// Api Stuffs here
import {
    factCheckWithGenerateQueries, factCheckWithoutGenerateQueries
} from "../utils/api_fight_misinfo";

import {healthClaimDetection} from '../utils/claim_detection';
import {setDefaultInstalled} from '../utils/storage';

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'factCheck') {
        factCheck(request.text);
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'UPDATE_FACT') {
        updateFactCheck(request.hypothesis).then(response => {
            sendResponse(response);
        }).catch(error => {
            console.error('Error:', error);
            sendResponse({ error: error.message });
        });
        return true;
    }
});

// notification for health reminders
// Set an alarm to trigger every hour
chrome.runtime.onInstalled.addListener(() => {
    createHealthReminderAlarm();
    setDefaultInstalled();
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'healthReminder') {
        checkAndNotify();
    }
});

chrome.runtime.onStartup.addListener(() => {
    createHealthReminderAlarm();
    checkAndNotify();
});


// For Browser Window Right Click Context Menu
// Add Remove to avoid duplicates creation of context menu
chrome.contextMenus.remove("extHealth", () => {

    // Ignore if there's an error when removing the context menu item
    if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
    }

    chrome.contextMenus.create({
        id: "extHealth",
        title: "Check Health Information",
        contexts: ["selection"]
    }, function () {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
        } else {
            console.log("Context Menu item created successfully!");
        }
    });
});


 // Add a listener for the context menu click event
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "extHealth") {
        const text = info.selectionText;
        const isHealthClaim = await healthClaimDetection(text) ;
        console.log(isHealthClaim);
        if (!isHealthClaim) {
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'error.png',
                title: 'Error',
                message: 'The text selected is not a health claim. Please select a health claim text to fact check.',
                priority: 2
            });
            return;
        }
        factCheck(text).then(data => {
            console.log(data);
        }).catch(error => {
            console.error(error);
        });
    }
});

function createHealthReminderAlarm() {
    chrome.alarms.get('healthReminder', (alarm) => {
        if (!alarm) {
            console.log('Creating healthReminder alarm');
            chrome.alarms.create('healthReminder', { periodInMinutes: 60 });
        } else {
            console.log('healthReminder alarm already exists');
        }
    });
}


// fact checking function
async function updateFactCheck(text) {
    let response = await factCheckWithoutGenerateQueries(text);
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Fact Check Ready!!',
        message: "Your request has been processed. Please check out the results in the extension popup.",
        priority: 2
    }, (notificationId) => {
        // Add a click event listener for the notification
        chrome.notifications.onClicked.addListener((id) => {
            if (id === notificationId) {
                console.log('Notification clicked');
                chrome.action.openPopup();
            }
        });
    });
    return response;
}


async function factCheck(text) {
    let response = await factCheckWithGenerateQueries(text);
    chrome.storage.local.set({ extHealthFacts: response });
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Fact Check Ready!!',
        message: "Your request has been processed. Please check out the results in the extension popup.",
        priority: 2
    }, (notificationId) => {
        // Add a click event listener for the notification
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                // Send a message to the content script to open the popup
                chrome.tabs.sendMessage(tabs[0].id, { action: 'openPopup' });
            }
        });
    });
}



// For health reminders
function checkAndNotify() {
    const now = Date.now();
    chrome.storage.local.get(['lastNotificationTime'], (result) => {
        const lastNotificationTime = result.lastNotificationTime || 0;
        const time = 60 * 60 * 1000 * 2;
        // const tenSeconds = 10 * 1000;

        if (now - lastNotificationTime >= time) {
            showNotification();
            chrome.storage.local.set({ lastNotificationTime: now });
        }
    });
}

// Show the notification
async function showNotification() {

    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Health Reminder',
        message: 'Here is your health reminder for this hour!',
        priority: 2
    });
}