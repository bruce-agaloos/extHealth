const OCR_API_ENDPOINT = "http://127.0.0.1:8000/ocr";
const LIBRETRANSLATE_API_ENDPOINT = "http://127.0.0.1:8000/translate"


/**
 * Sends the tweet content to the detoX API for hate speech detection.
 * @param content - The text content of the tweet to be sent for hate speech detection.
 * @returns 1 if the text is identified as hate speech, otherwise 0.
 */
// const sendTweetToServer = async (content: string) => {
//     const response = await fetch(`${API_ENDPOINT}?content=${content}`);
//     const data = await response.json();
//     return data.result;
// };


/**
 * Sends the text content to the LibreTranslate API for translation.
 * @param text - The text content to be translated.
 * @returns The translated text.
*/
const sendtTweetToTranslateInServer = async (text : string) => {
    const response = await fetch(`${LIBRETRANSLATE_API_ENDPOINT}?text=${text}`)
    const data = await response.json();
    return data.translated_text;
}

/**
 * Sends the image url to the OCR API for text extraction.
 * @param url - The image url to be sent for text extraction.
 * @returns The extracted text.
*/
const sendImageUrl = async (url: string) => {
    const response = await fetch(`${OCR_API_ENDPOINT}?image_url=${url}`);
    const data = await response.json();
    return data.text;
}

export { 
    sendtTweetToTranslateInServer,
    sendImageUrl 
};
