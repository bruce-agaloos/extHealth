
const keywordExtractor = require('keyword-extractor');

import {nanoid} from 'nanoid';
import fs from 'fs';

// const mylist = fs.readFileSync('./mylist.txt');

const keywordslist = [
    'cancers',
    'heart',
    'diabetes',
    'parkinson\'s',
    'diarrhea',
] 

// const text = "This is a sample text for keyword extraction.";
// const keywords = ['sample', 'keyword', 'extraction'];

// for (const keyword of keywords) {
//   const matches = text.match(keyword);
//   if (matches) {
//     console.log(`Found: ${keyword}`);
//   }
// }

const domExtractor = () => {

    // mylist.array.forEach(element => {
    //     console.log(element);
    // });

    // async function translateText(text, from, to) {
    //     const response = await fetch('https://translate.terraprint.co/translate', {
    //       method: 'POST',
    //       body: JSON.stringify({
    //         q: text,
    //         source: from,
    //         target: to,
    //       }),
    //       headers: { 'Content-Type': 'application/json' },
    //     });
      
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }
      
    //     const data = await response.json();
    //     return data.translatedText;
    //   }
      
    //   translateText('Hello, world!', 'en', 'ja ')
    //     .then(translatedText => console.log(translatedText))
    //     .catch(error => console.error(error));

    let divs = document.querySelectorAll('div.css-175oi2r');

    let filteredDivs = Array.from(divs).filter(div => div.className === 'css-175oi2r');

    filteredDivs.forEach(div => {
        let innerDiv = div.querySelector('div[data-testid="tweetText"]');
        
       
        
        if (innerDiv && !innerDiv.hasAttribute('data-tweet-processed')) {
            innerDiv.setAttribute('data-tweet-processed', 'true');
            let text = innerDiv.innerHTML;
            console.log(innerDiv.innerHTML);
            // console.log(text);

            let extraction_result = keywordExtractor.extract(text, {
                language: "english",
                remove_digits: true,
                return_changed_case: false,
                remove_duplicates: false
            });

            console.log(extraction_result);

            extraction_result.forEach(element => {
                const matches = keywordslist.some(keyword => element.includes(keyword));
                console.log('checking matches: ', matches)
                if (matches) {
                    console.log(`Found: ${element}`);
                }
            });

            // Create a new button element
            let button = document.createElement('button');
            button.innerText = 'My Button';

            // Append the button to the div
            div.appendChild(button);
        }
    });

    // img | classname =  

    // Comment for the mean time
    // let xPics = document.querySelectorAll('div.css-175oi2r');
    // let filterXPics = Array.from(xPics).filter(xPic => xPic.className === 'css-175oi2r');

    // filterXPics.forEach(xpic => {
    //     let imgElement = xpic.querySelector('img');
    //     // imgElement.setAttribute('data-image-processed', 'true');
    //     if (imgElement) {
    //         let src = imgElement.getAttribute('src');
    //         console.log(src);
    //     }
    // });



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

    // let fbdivs = document.querySelectorAll('div.x1lliihq');

    // let fbfilteredDivs = Array.from(fbdivs).filter(div => div.className === 'x1lliihq');

    // fbfilteredDivs.forEach(div => {
    //     let innerDiv = div.querySelector('div[dir="auto"]');
    //     if (innerDiv) {
    //         console.log(innerDiv.innerText);

    //         // Create a new button element
    //         let button = document.createElement('button');
    //         button.innerText = 'My Button';

    //         // Append the button to the div
    //         div.appendChild(button);
    //     }
    // });

};

export {domExtractor};