// Api Stuffs here
import {
    factCheckWithGenerateQueries, factCheckWithoutGenerateQueries
} from "../utils/api_fight_misinfo";

import { healthClaimDetection } from '../utils/claim_detection';
import { getHealthTipState, setDefaultInstalled, getLatestHealthTip } from '../utils/storage';
import { sendImageToServer } from "../utils/dom-extractor/api";
import {getHealthTips} from "../utils/api_health_tips"
import {setFactCheckWholeLoad, setSingleFactCheckLoad, isFactCheckLoading} from "../utils/pop_up_storage/storage"
import {getFromStorage, setInStorage} from "../utils/storage"
import {HealthFactsStorage} from "../utils/pop_up_storage/types"

import { allKeywords } from '../utils/keywords/health_keywords';

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
        if (info.selectionText) {
            const text = info.selectionText;
            const isMatch = allKeywords
                .some(keyword => new RegExp(`(?:^|[\\s.,;?!()\\[\\]{}])${keyword}(?:[\\s.,;?!()\\[\\]{}]|$)`, 'i').test(text));
            if (!isMatch) {
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: 'error.png',
                    title: 'Keyword Error',
                    message: 'The current selected text does not include any of the health keywords for this extension. Please select a text that includes health keywords to fact check.',
                    priority: 2
                });
                return;
            }

            const isHealthClaim = await healthClaimDetection(text);
            if (!isHealthClaim) {
                let error_value = await getFromStorage(['healthClaimResult']);
                if (error_value != "yes" || error_value != "no") {
                    chrome.notifications.create({
                        type: 'basic',
                        iconUrl: 'error.png',
                        title: 'Daily Limit Reached',
                        message: 'I am sorry, but you have reached the daily limit or there is an error on the server. Please try again later.',
                        priority: 2
                    });
                    return;
                }
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: 'error.png',
                    title: 'Health Claim error',
                    message: 'The text selected is not a health claim. Please select a health claim text to fact check.',
                    priority: 2
                });
                return;
            }
            factCheck(text).then(data => {
            }).catch(error => {
                console.error(error);
            });
        } 
        // else if (info.srcUrl) {
        //     const url = info.srcUrl;
        //     console.log("URL:", url);

        //     const text = await sendImageToServer(url);
        //     console.log("Extracted: ", text);
        //     const isHealthClaim = await healthClaimDetection(text);
        //     if (!isHealthClaim) {
        //         chrome.notifications.create({
        //             type: 'basic',
        //             iconUrl: 'error.png',
        //             title: 'Error',
        //             message: 'The image selected does not contain a health claim. Please select an image containing a health claim to fact check.',
        //             priority: 2
        //         });
        //         return;
        //     }
        //     factCheck(text).then(data => {
        //     }).catch(error => {
        //         console.error(error);
        //     });
        // }
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
    const characterLimit = 50;
    if (text.trim().length > characterLimit || text.trim().length === 0) {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'error.png', // Path to your notification icon
            title: 'Character Limit Exceeded',
            message: `The text does not meet the character limit, it might produce inaccurate results.`,
        });

        return;
    }
    let response = await factCheckWithoutGenerateQueries(text);
    if (!Array.isArray(response)) {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'warning.png',
            title: 'eXtHealth Error',
            message: response.result,
            priority: 2
        });
        return [];
    };
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
    const characterLimit = 50;
    if (text.trim().length > characterLimit || text.trim().length === 0) {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'error.png', // Path to your notification icon
            title: 'Character Limit Exceeded',
            message: `The text does not meet the character limit, it might produce inaccurate results.`,
        });
        return;
    }

    let response = await factCheckWithGenerateQueries(text);

    if (!Array.isArray(response.result)) {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'warning.png',
            title: 'eXtHealth Error',
            message: response.result,
            priority: 2
        });
        return;
    }

    try {
        let result = await getFromStorage(['extHealthFacts']) as HealthFactsStorage;
        let currentData = result.extHealthFacts ? result.extHealthFacts.result : [];

        response.result.forEach(newItem => {
            currentData = currentData.filter(item => item.hypothesis !== newItem.hypothesis);
            currentData.unshift(newItem);
        });

        if (currentData.length > 6) {
            currentData = currentData.slice(0, 6);
        }

        await setInStorage({ extHealthFacts: { result: currentData } });

    } catch (error) {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'warning.png',
            title: 'eXtHealth Error',
            message: 'Error in Accessing Storage',
            priority: 2
        });
        return;
    }
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