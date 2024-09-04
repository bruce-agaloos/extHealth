import { sendtTweetToTranslateInServer } from "../utils/xAutoDetect/api";
// import { ocrExtraction } from "../utils/xAutoDetect/ocr";
// import { translateText } from "../utils/xAutoDetect/translate";
import { domExtractor } from "./dom-extractor/domExtractor";

const keywordExtractor = require('keyword-extractor');
const text = "A blood test could tell which patients are most likely to develop Parkinson’s disease up to 7 years before the beginning of major symptoms, a new study suggests";
const options = {
    language: "english",
    remove_digits: true,
    return_changed_case: true,
    return_chained_words: true,
    return_max_ngrams: 3,
    remove_duplicates: false,
    remove_stopwords: false,
};

const sampleDomKeywordExtractor = (): void => {
    domExtractor();
    console.log('Extractor');

    const keywords = keywordExtractor.extract(text, options);
    console.log(keywords);
    console.log("List");
    keywords.forEach((keyword) => {
        console.log(keyword);
    });
};

const sampleTranslation = (): void => {

    async function logtraslate() {
        console.log('Translate Mahal to EN');
        let text = "";
        try {
            const trans_text = await sendtTweetToTranslateInServer("Mahal");
            console.log('fetched: ', trans_text);

            // text = trans_text;
        } catch (error) {
            console.error('Error', error);
        }
        return text;
    }
    // const translated_texts = logtraslate();
    //     translated_texts.then((text) => {
    //     console.log(text);
    // });
    // logtraslate();

    // translateText('Mahal Kita').then(translatedText => {
    //     console.log("Translated text: ", translatedText);
    // });

};

const sampleOCR = (): void => {
    const image_url = "https://pbs.twimg.com/media/GQBVJZfbEAInTWJ?format=jpg&name=large";
          


    // console.log(decoded_text);
    // ocrExtraction(image_url).then(extracted_text => {
    //     console.log("extracted text:", extracted_text);
    // });
};

const sampleHello = (): void => {
    let divs = document.querySelectorAll('div.css-175oi2r > div[data-testid=["tweetText"]');

    let filteredDivs = Array.from(divs).filter(div => div.className === 'css-175oi2r');

    filteredDivs.forEach(div => {
        let innerDiv = div.querySelector('div[data-testid="tweetText"]');
        if (innerDiv) {
            console.log(innerDiv.innerHTML);

            // Create a new button element
            let button = document.createElement('button');
            button.innerText = 'My Button';

            // Append the button to the div
            div.appendChild(button);
        }
    });

    // img | classname =  
    let xPics = document.querySelectorAll('div.css-175oi2r');
    let filterXPics = Array.from(xPics).filter(xPic => xPic.className === 'css-175oi2r');

    filterXPics.forEach(xpic => {
        let imgElement = xpic.querySelector('img');
        if (imgElement) {
            let src = imgElement.getAttribute('src');
            console.log(src);
        }
    });



    /*
    
    
          let xPics = document.querySelectorAll('div.css-175oi2r');
let filterXPics = Array.from(xPics).filter(xPic => xPic.className === 'css-175oi2r');

filterXPics.forEach(xpic => {
let imgElement = xpic.querySelector('img');
if (imgElement) {
let src = imgElement.getAttribute('src');
console.log(src);
}
});
    
    
    
    */

    let fbdivs = document.querySelectorAll('div.x1lliihq');

    let fbfilteredDivs = Array.from(fbdivs).filter(div => div.className === 'x1lliihq');

    fbfilteredDivs.forEach(div => {
        let innerDiv = div.querySelector('div[dir="auto"]');
        if (innerDiv) {
            console.log(innerDiv.innerHTML);

            // Create a new button element
            let button = document.createElement('button');
            button.innerText = 'My Button';

            // Append the button to the div
            div.appendChild(button);
        }
    });
};

export {
    sampleDomKeywordExtractor,
    sampleTranslation,
    sampleOCR,
    sampleHello,
}