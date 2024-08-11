// summarizing/giving news
import { initialScroll, startTimer } from "../utils";
import { stopTimer } from "../utils/schedule";
import { getPopupState, getCategoryState } from "../utils";

// detecting tweets
import { sampleDomKeywordExtractor, sampleHello, sampleOCR, sampleTranslation } from './sampleScript';
import { TwitterTheme } from '../utils/dom-extractor/types';
import { getXTheme, extractTweetBody, createBtnElement, createOverlayElement } from '../utils/dom-extractor/dom';
import { allKeywords } from './health_keywords';
import { nanoid } from 'nanoid';
import { getXAutoDetectState } from "../utils/storage";


const TIMER_DURATION = 1;

const setInitialExtensionState = async (): Promise<void> => {
    const isExtensionEnabled = await getPopupState();
    if (isExtensionEnabled) {
        enablePopup();
    } else {
        disablePopup();
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

// const setInitialCategoryState = async (): Promise<void> => {
//   const isCategoryEnabled = await getCategoryState(15);
//   if (isCategoryEnabled) {
//     console.log("Category is enabled");
//   } else {
//     console.log("Category is disabled");
//   }
// }
// setInitialCategoryState();

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.state !== undefined) {
        const state = message.state;
        if (typeof state === 'boolean') {
            if (state) {
                enablePopup();
            } else {
                disablePopup();
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

const enablePopup = (): void => {
    startTimer(TIMER_DURATION);
};

const disablePopup = (): void => {
    stopTimer();
};



// fact check function
const factCheck = async (text: string): Promise<void> => {
    chrome.runtime.sendMessage({ message: "factCheck", text: text });
}

const searchKeywordAndCreateOverlay = (tweetBody: String, tweet: HTMLDivElement) => {
    /** 
     * This will return an array of matched keywords
     * if the keyword is found in the tweet body
     * 
    */
    const match = allKeywords
        .map(keyword => tweetBody.toLowerCase().includes(keyword.toLowerCase()) ? keyword : null)
        .filter(keyword => keyword !== null);

    /**
     * This will return a boolean value
     * if match length is greater than 0
     */
    const isMatch = match.length > 0;

    console.log("Matched Keywords:", match);
    console.log("Is there a match?", isMatch);

    /**
     * If isMatch is true and the overlay is not yet created
     * create an overlay element and append it to the tweet
     */
    let isOverlayCreated = false;
    if (isMatch && !isOverlayCreated) {

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

        viewBtn.setAttribute("data-overlay-id", overlayId);
        viewBtn.addEventListener("click", () => {
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


            /*
            
            
            example:
            keyword to get = "ako si aries"
            text to analyze = ["ako", "si", "aries"]
            
            combine all the text to analyze
            text to analyze = "ako si aries"
            
            for loop
            - keyword to get first word match any word on the text to analyze?(literall na ==, though case insensitive)
            - if true, check ung pangalawang keyword to get compare sa kasunod na word ng text to analyze; and so on, and so forth
            - tapos tuloy tuloy na yon
            
            */

            if (tweetBody) {
                console.log("Tweet:", tweetBody);
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
