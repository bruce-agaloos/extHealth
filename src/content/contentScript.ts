import { initialScroll, startTimer, getHealthTipState } from "../utils";
import { stopTimer } from "../utils/timer";
import { TwitterTheme } from '../utils/xAutoDetect/types';
import { getXTheme, extractTweetBody, createBtnElement, createOverlayElement, createSpinnerElement } from '../utils/xAutoDetect/dom';
import { allKeywords } from './health_keywords';
import { nanoid } from 'nanoid';
import { getXAutoDetectState } from "../utils/storage";
import { healthClaimDetection } from '../utils/claim_detection';
import './css/spinner.css';
import { useEffect } from "react";
const TIMER_DURATION = { minutes: 0, seconds: 5 };

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
        } else {
            console.warn("State is not a boolean:", state);
        }
    }

    if (message.xAutoDetect !== undefined) {
        const xAutoDetect = message.xAutoDetect;
        if (typeof xAutoDetect === 'boolean') {
            if (xAutoDetect) {
                console.log("X Auto Detect is enabled");
                enableDetectNewTweets();
            } else {
                console.log("X Auto Detect is disabled");
                disableDetectNewTweets();
            }
        } else {
            console.warn("X Auto Detect is not a boolean:", xAutoDetect);
        }
    }


    if (message.category !== undefined && message.id !== undefined) {
        const category = message.category;
        const id = message.id;
        if (typeof category === 'boolean') {
            if (category) {
                console.log(`Category ${id} is enabled`);
            } else {
                console.log(`Category ${id} is disabled`);
            }
        } else {
            console.warn(`Category ${id} is not a boolean:`, category);
        }
    }
});


/**
 * 
 * 
 * 

 const LIMIT = 100; // replace with your limit

document.addEventListener('contextmenu', function(event) {
    let selectedText = window.getSelection().toString();
    if (selectedText.length > LIMIT) {
        event.preventDefault();
    }
});
 */

// context menu limiter it disable the context menu if the selected text is more than 100 characters

// const LIMIT = 100; // replace with your limit

// document.addEventListener('contextmenu', function (event) {
//     let selectedText = window.getSelection().toString();
//     if (selectedText.length > LIMIT) {
//         event.preventDefault();
//     }
// });

const enableHealthTips = (): void => {
    // startTimer(TIMER_DURATION.minutes, TIMER_DURATION.seconds);
};

const disableHealthTips = (): void => {
    // stopTimer();
};


// fact check function
// const factCheck = async (text: string): Promise<void> => {
//     let isFactCheckLoading = false;
//     chrome.runtime.sendMessage({ message: "factCheck", text: text }, (response) => {
//         console.log('Response from background script:', response);
//         if (response === "false") {
//             console.log("Fact check failed");
            
//         }
//     });
    
// }

const factCheck = async (text: string): Promise<any> => {
    let isFactCheckLoading = false;
    chrome.runtime.sendMessage({ message: "factCheck", text: text }, (response) => {
        console.log('Response from background script:', response);
        if (response === "false") {
            console.log("Fact check failed");
            
        }
    });
    return isFactCheckLoading;
    
}

const searchKeywordAndCreateOverlay = async (tweetBody: string, tweet: HTMLDivElement) => {
    /** 
     * This will return an array of matched keywords
     * if the keyword is found in the tweet body
     * 
    */
    const isMatch = allKeywords
        .some(keyword => new RegExp(`(?:^|[\\s.,;?!()\\[\\]{}])${keyword}(?:[\\s.,;?!()\\[\\]{}]|$)`, 'i').test(tweetBody));

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

        // Style the spinner
        // let css = document.createElement('style');
        // css.type = 'text/css';
        // css.innerHTML = `
        // .spinner {
        //     border: 16px solid #f3f3f3;
        //     border-top: 16px solid #3498db;
        //     border-radius: 50%;
        //     width: 120px;
        //     height: 120px;
        //     animation: spin 2s linear infinite;
        //     position: absolute;
        //     top: 50%;
        //     left: 50%;
        //     transform: translate(-50%, -50%);
        // }

        // @keyframes spin {
        //     0% { transform: rotate(0deg); }
        //     100% { transform: rotate(360deg); }
        // }
        // `;
        // document.head.appendChild(css);

        

        const overlayElement = createOverlayElement();
        const overlayId = nanoid();

        const buttonContainer = document.createElement('div');
        buttonContainer.style.width = "35%";
        buttonContainer.style.height = "100%";
        buttonContainer.style.position = "absolute";
        buttonContainer.style.right = "0";
        // buttonContainer.style.backgroundColor = "red";

        // const my_spinner = createSpinnerElement();
        let my_spinner = document.createElement('span');
        // my_spinner = document.querySelector('.loader');
        my_spinner.className = "btn-loader";
        my_spinner.classList.add(overlayId);
        // const my_spinner = document.querySelector('.loader');
        // my_spinner.className = 'loader';


        const viewBtn = createBtnElement(tweetBody);
        // viewBtn.style.width = "100%";
        viewBtn.style.position = "absolute";
        viewBtn.style.left = "0";
        viewBtn.append(my_spinner);

        // Store original state of the viewBtn
        const originalInnerHTML = viewBtn.innerHTML;
        const originalTextContent = viewBtn.textContent;



        viewBtn.setAttribute("data-overlay-id", overlayId);
        viewBtn.addEventListener("click", () => {

            // Get the image element inside the viewBtn
            const img = viewBtn.querySelector('img');
            
            // Store the original src of the image
            const originalImgSrc = img.src;

            // Set the src of the image to the URL of the spinner image
            // img.src = null;

            // Create a spinner and change the text of the viewBtn
            // const spinner = document.createElement('div');
            // spinner.className = 'spinner';
            // viewBtn.innerHTML = '';
            // viewBtn.textContent = 'Fact Checking...';
            // viewBtn.appendChild(spinner);
            // spinner.style.display = 'block';
        


            let spinner = viewBtn.querySelector('.' + overlayId);
            if (spinner) {
                spinner.classList.add('btn-loading');
            }

            const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }) => {
                if (changes.isFactCheckLoading || changes.isSingleFactCheckLoading) {
                    chrome.storage.local.get(['isFactCheckLoading', 'isSingleFactCheckLoading'], (result) => {
                        const isFactCheckLoading = result.isFactCheckLoading === true;
                        const isSingleFactCheckLoading = result.isSingleFactCheckLoading === true;
            
                        // const loaderElement = document.querySelector('.btn-loader');
                        const loaderElement = viewBtn.querySelector('.' + overlayId);
            
                        if (loaderElement) {
                            if (isFactCheckLoading || isSingleFactCheckLoading) {
                                loaderElement.classList.add('btn-loading');
                            } else {
                                loaderElement.classList.remove('btn-loading');
                            }
                        }
                    });
                }
            };
            
            chrome.storage.onChanged.addListener(handleStorageChange);

            
            
            // spinner.classList.add('loading');
            // my_spinner.classList.add('loading');
            // viewBtn.append(my_spinner);
            // Call the factcheck function
            factCheck(viewBtn.getAttribute("data-value")).then((result) => {
                // Hide the spinner when the factcheck is done
                // spinner.style.display = 'none';
                // viewBtn.innerHTML = originalInnerHTML;
                // viewBtn.textContent = originalTextContent;
                // spinner.style.display = 'none';
                // img.src = originalImgSrc;
                // my_spinner.classList.remove('loading');
                // spinner.classList.remove('loading');
                
            });
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




// // Use the useEffect hook to update the loader based on the isFactCheckLoading and isSingleFactCheckLoading values
// useEffect(() => {
//     const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }) => {
//         if (changes.isFactCheckLoading || changes.isSingleFactCheckLoading) {
//             chrome.storage.local.get(['isFactCheckLoading', 'isSingleFactCheckLoading'], (result) => {
//                 const isFactCheckLoading = result.isFactCheckLoading === true;
//                 const isSingleFactCheckLoading = result.isSingleFactCheckLoading === true;

//                 const loaderElement = document.querySelector('.loader');

//                 if (loaderElement) {
//                     if (isFactCheckLoading || isSingleFactCheckLoading) {
//                         loaderElement.classList.add('loading');
//                     } else {
//                         loaderElement.classList.remove('loading');
//                     }
//                 }
//             });
//         }
//     };

//     chrome.storage.onChanged.addListener(handleStorageChange);

//     // Cleanup event listener on component unmount
//     return () => {
//         chrome.storage.onChanged.removeListener(handleStorageChange);
//     };
// }, []);

// Add a listener to the chrome.storage.onChanged event




// Remember to remove the listener when it's no longer needed
// chrome.storage.onChanged.removeListener(handleStorageChange);

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
            console.error(error);
        }
    }
}


const enableDetectNewTweets = (): void => {
    document.addEventListener('DOMContentLoaded', detectNewTweets);
    window.addEventListener('scroll', detectNewTweets);
    initialScroll();

}

const disableDetectNewTweets = (): void => {
    document.removeEventListener('DOMContentLoaded', detectNewTweets);
    window.removeEventListener('scroll', detectNewTweets);
    console.log("X Auto Detect is currently disabled");
}
