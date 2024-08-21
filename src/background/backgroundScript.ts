// Api Stuffs here
import {
    factCheckWithGenerateQueries, factCheckWithoutGenerateQueries
} from "../utils/api_fight_misinfo";

import { healthClaimDetection } from '../utils/claim_detection';
import { getHealthTipState, setDefaultInstalled, getLatestHealthTip } from '../utils/storage';
import { sendImageToServer } from "../utils/dom-extractor/api";
import {getHealthTips} from "../utils/api_health_tips"
import {setFactCheckWholeLoad, setSingleFactCheckLoad, isFactCheckLoading} from "../utils/pop_up_storage/storage"

let activeTabId: number | undefined;
let activeWindowId: number | undefined;

chrome.windows.onFocusChanged.addListener(async (windowId) => {
    const currentWindow = await chrome.windows.getCurrent();
    if (currentWindow.id !== chrome.windows.WINDOW_ID_NONE && currentWindow.id !== -1) {
        activeWindowId = currentWindow.id;
        return;
    }
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        activeWindowId = undefined;
    }
});
chrome.tabs.onActivated.addListener((activeInfo) => {
    activeTabId = activeInfo.tabId;
});


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
    setFactCheckWholeLoad(false);
    setSingleFactCheckLoad(false);
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
        contexts: ["selection", "image"]
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
        if (info.selectionText) {
            const text = info.selectionText;
            const isHealthClaim = await healthClaimDetection(text);
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
            }).catch(error => {
                console.error(error);
            });
        } else if (info.srcUrl) {
            const url = info.srcUrl;
            console.log("URL:", url);

            const text = await sendImageToServer(url);
            console.log("Extracted: ", text);
            const isHealthClaim = await healthClaimDetection(text);
            if (!isHealthClaim) {
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: 'error.png',
                    title: 'Error',
                    message: 'The image selected does not contain a health claim. Please select an image containing a health claim to fact check.',
                    priority: 2
                });
                return;
            }
            factCheck(text).then(data => {
            }).catch(error => {
                console.error(error);
            });
        }
    }
});

function createHealthReminderAlarm() {
    chrome.alarms.get('healthReminder', (alarm) => {
        if (!alarm) {
            console.log('Creating healthReminder alarm');
            chrome.alarms.create('healthReminder', { periodInMinutes: 60 * 2 });
        } else {
            console.log('healthReminder alarm already exists');
        }
    });
}


// fact checking function
async function updateFactCheck(text) {
    let loading = await isFactCheckLoading();
    if (loading) {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'warning.png',
            title: 'Error',
            message: 'Please wait for the current fact check to finish before starting a new one.',
            priority: 2
        });
        return;
    }
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
                chrome.windows.update(activeWindowId, { focused: true }, (window) => {
                    chrome.tabs.update(activeTabId, { active: true })
                });
                chrome.action.openPopup();
            }
        });
    });
    return response;
}


async function factCheck(text) {
    let loading = await isFactCheckLoading();
    if (loading) {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'warning.png',
            title: 'Error',
            message: 'Please wait for the current fact check to finish before starting a new one.',
            priority: 2
        });
        return;
    }
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
        chrome.notifications.onClicked.addListener(async (id) => {
            if (id === notificationId) {
                console.log(activeWindowId);
                chrome.windows.update(activeWindowId, { focused: true }, (window) => {
                    chrome.tabs.update(activeTabId, { active: true })
                });
                chrome.action.openPopup();
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
    const state = await getHealthTipState();
    if (state === undefined || state === false) {
        return;
    }
    await getHealthTips();
    const content = await getLatestHealthTip();
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: content.title,
        message: content.content,
        priority: 2
    });
}