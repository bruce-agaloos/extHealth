// summarizing/giving news
import { startTimer } from "../utils";
import { stopTimer } from "../utils/schedule";
import { getPopupState, getCategoryState } from "../utils";

// detecting tweets
import { sampleDomKeywordExtractor, sampleHello, sampleOCR, sampleTranslation } from './sampleScript';
import { TweetBodyWrapper, TwitterTheme } from '../utils/dom-extractor/types';
import { getXTheme, createBtnElement, createOverlayElement } from '../utils/dom-extractor/dom';
import { allKeywords } from './health_keywords';
import { nanoid } from 'nanoid';


const TIMER_DURATION = 1;

const setInitialExtensionState = async (): Promise<void> => {
    const isExtensionEnabled = await getPopupState();
    if (isExtensionEnabled) {
        enablePopup();
    } else {
        disablePopup();
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



const initialScroll = (): void => {
    setTimeout(() => {
        window.scrollBy(0, 1);
    }, 3500);
};

const extractTweetBody = (tweetBodyWrapper: TweetBodyWrapper): string => {
    try {
        let text = "";
        const chileNodes = tweetBodyWrapper.childNodes;

        chileNodes.forEach((child) => {
            if (child.nodeType === Node.TEXT_NODE) {
                text += child.textContent.replace(/\n/g, "");
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                text += extractTweetBody(child);
            }
        });

        const extractedHashtags = text.replace(/(^|\s)(#)+/g, "$1 ");
        let maskedUsernames = extractedHashtags.replace(
            /@\w+\b/g,
            "[USERNAME]"
        )

        const urlRegex = /https?:\/\/\S+/g;
        const urls = maskedUsernames.match(urlRegex);
        if (urls) {
            urls.forEach((url) => {
                maskedUsernames = maskedUsernames.replace(url, "[URL]");
            });
        }

        return maskedUsernames;
    } catch (error) {
        return " ";
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
                
                let isOverlayCreated = false;
                if (isMatch && !isOverlayCreated) {
                    // const overlayElement = document.createElement("div");
                    // overlayElement.style.position = "absolute";
                    // overlayElement.style.top = "0";
                    // overlayElement.style.left = "0";
                    // overlayElement.style.width = "100%";
                    // // overlayElement.style.width = "auto";
                    // overlayElement.style.height = "100%";
                    // // overlayElement.style.backgroundColor = "#1D9BF0";
                    // // overlayElement.style.opacity = ".5";
                    // overlayElement.style.pointerEvents = "none";

                    // overlayElement.style.display = "flex";
                    // overlayElement.style.flexDirection = "column";
                    // overlayElement.style.alignItems = "center";
                    // overlayElement.style.justifyContent = "center";
                    const overlayElement = createOverlayElement(tweet);
                    const overlayId = nanoid();
                    const viewBtn = createBtnElement(tweetBody);

                    // viewBtn.style.pointerEvents = "auto";
                    // viewBtn.style.transformOrigin = "left";
                    // viewBtn.style.transform = "scaleX(0)";
                    // viewBtn.style.transition = "transform 0.3s ease-in-out";
                    viewBtn.setAttribute("data-overlay-id", overlayId);
                    viewBtn.addEventListener("click", () => {
                        factCheck(viewBtn.getAttribute("data-value"));
                    });

                    // viewBtn.addEventListener('mouseover', () => {
                    //     viewBtn.style.transform = "scaleX(1)";
                    // });

                    // viewBtn.addEventListener('mouseout', () => {
                    //     viewBtn.style.transform = "scaleX(0)";
                    // });


                    overlayElement.appendChild(viewBtn);
                    tweet.append(overlayElement);
                    isOverlayCreated = true;
                }

            }
        } catch (error) {
            console.error(error);
        }
    }
    // domExtractor();
}

const detectNewFb = async (): Promise<void> => {


    // const theme: TwitterTheme = getXTheme();
    const theme = 'div.x1lliihq';
    const elements = document.getElementsByClassName(theme);
    // const elements = document.querySelectorAll(theme);
    // const filtered_elements = Array.from(elements).filter(element => element.className === 'x1lliihq');

    for (let index = 0; index < elements.length; index++) {
        const post = elements[index] as HTMLDivElement;
    
        try {

            const postBodyWrapper = post.querySelectorAll('div[dir="auto"]');

        } catch (error) {
            console.error('Error:', error);
        }
    }

    // for (let index = 0; index < elements.length; index++) {
    //     const tweet = elements[index] as HTMLDivElement;

    //     if (tweet.hasAttribute("data-tweet-processed")) {
    //         continue;
    //     }


    //     // const  elements = document.getElementsByClassName('css-175oi2r r-1wbh5a2 r-1habvwh r-16xksha');

    //     try {
    //         tweet.setAttribute("data-tweet-processed", "true");

    //         const tweetBodyWrapper = tweet.querySelectorAll('div[dir="auto"]');
    //         // const tweetBodyWrapper = tweet.querySelectorAll('div.css-146c3p1');

    //         // console.log('TweetBodyWrapper');
    //         // console.log(tweetBodyWrapper);
    //         const combinedWrappers = document.createElement('div');

    //         tweetBodyWrapper.forEach(element => {
    //             combinedWrappers.appendChild(element.cloneNode(true));
    //         });

    //         const tweetBody = extractTweetBody(combinedWrappers);
    //         console.log(tweetBody); 

    //         if (tweetBody) {
    //             const keyword_extraction_result = extractKeywords(tweetBody)
    //             console.log(keyword_extraction_result);

    //             // Search And Match
    //             keyword_extraction_result.forEach(extracted_keyword => {
    //                 const matches = allKeywords.some(keyword => extracted_keyword.toLocaleLowerCase().includes(keyword.toLowerCase()));
    //                 if (matches) {
    //                     console.log(`Found: ${extracted_keyword}}`);
    //                 }
    //             });

    //         }
    //         // console.log('Combined Wrappers');
    //         // console.log(combinedWrappers);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // domExtractor();
}

const enableDetectNewTweets = (): void => {
    document.addEventListener('DOMContentLoaded', detectNewTweets);
    window.addEventListener('scroll', detectNewTweets);
    initialScroll();

}

const disableDetectNewTweets = (): void => {
    document.removeEventListener('DOMContentLoaded', detectNewTweets);
    window.removeEventListener('scroll', detectNewTweets);
}
enableDetectNewTweets();
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {


    if (request.scene1 !== undefined) {
        if (request.scene1 === true) {
            detectNewTweets();
            detectNewFb();
            enableDetectNewTweets();
        } else {
            // disableDetectNewTweets();
        }


    }


    if (request.isDomExtractorChecked !== undefined) {
        if (request.isDomExtractorChecked) {
            sampleDomKeywordExtractor();
        } else {
        }
    }

    if (request.transFeat !== undefined) {
        if (request.transFeat) {
            sampleTranslation();
        }
    }

    if (request.ocrFeat !== undefined) {
        sampleOCR();

    }

    if (request.toggleState !== undefined) {

        if (request.toggleState) {
            sampleHello();
        }
    }


});

