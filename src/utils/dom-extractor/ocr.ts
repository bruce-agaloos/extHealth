import { sendImageUrl } from "./api"


const ocrExtraction = async (image_url : string) => {
    let decoded_text = "";

    try {
        decoded_text = await sendImageUrl(image_url);
    } catch (error) {
        console.error('Error extracting the image:', error);
    }
    return decoded_text;
}

export {
    ocrExtraction
}