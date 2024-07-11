import { sendtTweetToTranslateInServer } from "./api";

/**
 * 
*/
const translateText = async (text : string) => {
    let translatedText = "";
    try {
        translatedText = await sendtTweetToTranslateInServer(text);
    } catch (error) {
        console.error("Error translating text:", error);
    }

    return translatedText;
}

export {
    translateText
}