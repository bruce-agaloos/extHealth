import { initialScroll, getHealthTipState,  getXAutoDetectState, setHealthTipsEnabled  } from "../utils";
import { TwitterTheme } from '../utils/xAutoDetect/types';
import { getXTheme, extractTweetBody, createBtnElement, createOverlayElement, checkForKeywords } from '../utils/xAutoDetect/dom';
import allKeywords from './../utils/health_keywords';
import { nanoid } from 'nanoid';
import { healthClaimDetection } from '../utils/claim_detection';
import { checkHighlyDisputedClaim } from '../utils/xAutoDetect/api';
import './css/spinner.css';
import './css/tooltip.css';

const setInitialExtensionState = async (): Promise<void> => {
    const isHealthTipsEnabled = await getHealthTipState();
    if (isHealthTipsEnabled) {
        enableHealthTips();
    } else {
        disableHealthTips();
    }

    /**
     * Check if X Auto Detect is enabled
     * If enabled, start detecting new tweets
     * If disabled, stop detecting new tweets
     * @author -0-
     */
    const isXAutoDetectEnabled = await getXAutoDetectState();
    if (isXAutoDetectEnabled) {
        enableDetectNewTweets();
    } else {
        disableDetectNewTweets();
    }
};

setInitialExtensionState();

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.state !== undefined) {
        const state = message.state;
        if (typeof state === 'boolean') {
            if (state) {
                enableHealthTips();
            } else {
                disableHealthTips();
            }
            sendResponse({ message: "Health Tips is set" });
        } else {
            console.warn("State is not a boolean:", state);
        }
    }

    if (message.xAutoDetect !== undefined) {
        const xAutoDetect = message.xAutoDetect;
        if (typeof xAutoDetect === 'boolean') {
            if (xAutoDetect) {
                enableDetectNewTweets();
            } else {
                disableDetectNewTweets();
            }
            sendResponse({ message: "X Auto Detect is set" });
        } else {
            console.warn("X Auto Detect is not a boolean:", xAutoDetect);
        }
    }

    if (message.action === "stopTimer") {
        disableHealthTips();
    }

    if (message.category !== undefined && message.id !== undefined) {
        const category = message.category;
        const id = message.id;
        if (typeof category === 'boolean') {
            if (category) {
                // console.log(`Category ${id} is enabled`);
            } else {
                // console.log(`Category ${id} is disabled`);
            }
            sendResponse({ message: "Category was changed" });
        } else {
            console.warn(`Category ${id} is not a boolean:`, category);
        }
    }
});

chrome.storage.onChanged.addListener(async (changes, areaName) => {
    if (areaName === 'local' && changes.interval) {
        const isHealthTipsEnabled = await getHealthTipState();
        if (isHealthTipsEnabled) {
            chrome.runtime.sendMessage({ action: "stopTimer" });
            chrome.runtime.sendMessage({ action: "startTimer" });
        }
    }
});

const enableHealthTips = (): void => {
    chrome.runtime.sendMessage({ action: "startTimer" });
};

const disableHealthTips = (): void => {
    chrome.runtime.sendMessage({ action: "stopTimer" });
};

// Add event listeners for enabling and disabling health tips
document.addEventListener('enableHealthTips', () => {
    setHealthTipsEnabled(true).then(() => {
        enableHealthTips();
    }).catch((error) => {
        console.error('Error enabling health tips:', error);
    });
});

document.addEventListener('disableHealthTips', () => {
    setHealthTipsEnabled(false).then(() => {
        disableHealthTips();
    }).catch((error) => {
        console.error('Error disabling health tips:', error);
    });
});

// fact check function
const factCheck = async (text: string): Promise<void> => {
    chrome.runtime.sendMessage({ message: "factCheck", text: text });
};

const searchKeywordAndCreateOverlay = async (tweetBody: string, tweet: HTMLDivElement) => {
    /** 
     * This will return an array of matched keywords
     * if the keyword is found in the tweet body
     * 
    */
    const isMatch = checkForKeywords(tweetBody);

    if (!isMatch) {
        return;
    }
    // call api claim detection
    const isHealthClaim = await healthClaimDetection(tweetBody);
    if (!isHealthClaim) {
        return;
    }
    /**
     * If isMatch is true and the overlay is not yet created
     * create an overlay element and append it to the tweet
     */
    let isOverlayCreated = false;
    if (!isOverlayCreated) {

        // Define the JSON object
        const claimData = [
            {
                claim: "Covid-19 is non-communicable disease",
                entailment: 3,
                disputed: 5,
                neutral: 2

            },
            {
                claim: "Polio is not deadly to all age bracket",
                entailment: 3,
                disputed: 5,
                neutral: 2
            }
        ];

        const overlayElement = createOverlayElement();
        const overlayId = nanoid();

        const buttonContainer = document.createElement('div');
        buttonContainer.style.width = "35%";
        buttonContainer.style.height = "100%";
        buttonContainer.style.position = "absolute";
        buttonContainer.style.right = "0";
        // buttonContainer.style.backgroundColor = "red";

        const viewBtn = createBtnElement(tweetBody);
        // viewBtn.style.width = "100%";
        viewBtn.style.position = "absolute";
        viewBtn.style.left = "0";

         // Check if the claim is highly disputed
        // const isClaimDisputed = await checkHighlyDisputedClaim(tweetBody);
        // if (isClaimDisputed) {
        //     const img = viewBtn.querySelector('img');
        //     if (img) {
        //         // Change the image source
        //         img.src = chrome.runtime.getURL('warning.png');
        //         img.alt = "Warning Icon";
        //     }

        //     // Tooltip for disputer flagged claim
        //     const tooltip = document.createElement('div');
        //     tooltip.className = 'tooltip';
        //     tooltip.innerText = "This claim is highly disputed. ( You may click the button to check out )";
        //     // viewBtn.title = "This claim is highly disputed. This may not be true. ( You may click the button to check out )";

        //     // Append the tooltip to the button container
        //     buttonContainer.appendChild(tooltip);

        //     // Show the tooltip on hover
        //     viewBtn.addEventListener('mouseenter', () => {
        //         tooltip.classList.add('show-tooltip');
        //     });

        //     // Hide the tooltip on mouse leave
        //     viewBtn.addEventListener('mouseleave', () => {
        //         tooltip.classList.remove('show-tooltip');
        //     });
        // }

        viewBtn.setAttribute("data-overlay-id", overlayId);
        viewBtn.addEventListener("click", () => {

            // Create a spinner, and append it to the button
            let spinner = document.createElement('span');
            spinner.className = "btn-spinner";
            spinner.style.color = "#f5f5f5";
            spinner.style.position = "absolute";
            spinner.style.left = "0";

            viewBtn.appendChild(spinner);

            const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }) => {
                if (changes.isFactCheckLoading || changes.isSingleFactCheckLoading) {
                    chrome.storage.local.get(['isFactCheckLoading', 'isSingleFactCheckLoading'], (result) => {
                        const isFactCheckLoading = result.isFactCheckLoading === true;
                        const isSingleFactCheckLoading = result.isSingleFactCheckLoading === true;

                        // const loaderElement = document.querySelector('.btn-loader');
                        const loaderElement = viewBtn.querySelector('.btn-spinner');
                        loaderElement.classList.add('btn-loading');
                        viewBtn.style.paddingLeft = "35px";
                        viewBtn.style.pointerEvents = "none !important";
                        if (loaderElement) {
                            if (!(isFactCheckLoading || isSingleFactCheckLoading)) {
                                // Remove the class name btn-loading
                                loaderElement.classList.remove('btn-loading');
                                viewBtn.style.padding = "0 5px";
                                viewBtn.style.pointerEvents = "auto";

                                // Remove the spinner
                                if (spinner && viewBtn.contains(spinner)) {
                                    viewBtn.removeChild(spinner);
                                }
                            }
                        }
                    });
                }
            };
            chrome.storage.onChanged.addListener(handleStorageChange);

            factCheck(viewBtn.getAttribute("data-value"));
        });
        buttonContainer.append(viewBtn);
        overlayElement.appendChild(buttonContainer);
        // overlayElement.appendChild(viewBtn);
        // tweet.style.position = "relative";
        // tweet.style.paddingTop = "20px";
        // tweet.style.paddingBottom = "24px";
        tweet.append(overlayElement);
        isOverlayCreated = true;
    }
};

const detectNewTweets = async (): Promise<void> => {
    const theme: TwitterTheme = getXTheme();
    const elements = document.getElementsByClassName(theme);

    for (let index = 0; index < elements.length; index++) {
        const tweet = elements[index] as HTMLDivElement;

        if (tweet.hasAttribute("data-tweet-processed")) {
            continue;
        }

        // const  elements = document.getElementsByClassName('css-175oi2r r-1wbh5a2 r-1habvwh r-16xksha');

        try {
            tweet.setAttribute("data-tweet-processed", "true");

            const tweetBodyWrapper = tweet.querySelectorAll('div.css-175oi2r > div[data-testid="tweetText"]');
            const combinedWrappers = document.createElement('div');

            tweetBodyWrapper.forEach(element => {
                combinedWrappers.appendChild(element.cloneNode(true));
            });

            const tweetBody = extractTweetBody(combinedWrappers);

            if (tweetBody) {
                searchKeywordAndCreateOverlay(tweetBody, tweet);
            }
        } catch (error) {
            // console.error(error);
        }
    }
};

const enableDetectNewTweets = (): void => {
    document.addEventListener('DOMContentLoaded', detectNewTweets);
    window.addEventListener('scroll', detectNewTweets);
    initialScroll();
};

const disableDetectNewTweets = (): void => {
    document.removeEventListener('DOMContentLoaded', detectNewTweets);
    window.removeEventListener('scroll', detectNewTweets);
};