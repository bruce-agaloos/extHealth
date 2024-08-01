const extractor = require('keyword-extractor');

const options = {
    language: "english",
    remove_digits: true,
    return_changed_case: true,
    return_chained_words: true,
    return_max_ngrams: 3,
    remove_duplicates: false,
};

const extractKeywords = async (text : string, keywords : string[]) => {
    
    try {
        const extractedKeywords = await extractor.extract(text, options);
        extractedKeywords.forEach(keyword => keywords.push(keyword));
        return true;
    } catch (error) {
        console.error('There is something wrong in keyword extraction: ', error)
    }

    return false
};

export {
    extractKeywords
}