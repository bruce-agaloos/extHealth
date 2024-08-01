const API_ENDPOINT = "http://127.0.0.1:8000/api/v1/";

/**
 * Sends the tweet content to the detoX API for hate speech detection.
 * @param content - The text content of the tweet to be sent for hate speech detection.
 * @returns 1 if the text is identified as hate speech, otherwise 0.
 */
const factCheckWithGenerateQueries = async (content: string) => {
    // Encode the content to ensure it's safe to include in a URL
    // const encodedContent = encodeURIComponent(content);
    // const extraEndpoint = "factCheck"
    // const response = await fetch(`${API_ENDPOINT}${extraEndpoint}?content=${encodedContent}`);
    // const data = await response.json();
    // return data;
    await new Promise(resolve => setTimeout(resolve, 2000));
    const sampleFact = {
        result: [
          {
            hypothesis: 'sample',
            premises: [
              {
                premise: '1',
                relationship: 'contradiction',
                url: 'https://example.com',
              },
              {
                premise: '2',
                relationship: 'entailment',
                url: 'https://example.com',
              },
              {
                premise: '3',
                relationship: 'neutral',
                url: 'https://example.com',
              },
              {
                premise: '4',
                relationship: 'neutral',
                url: 'https://example.com',
              },
            ],
          },
          {
            hypothesis: 'sample ',
            premises: [
              {
                premise: '1',
                relationship: 'contradiction',
                url: 'https://example.com',
              },
              {
                premise: '2',
                relationship: 'entailment',
                url: 'https://example.com',
              },
              {
                premise: '3',
                relationship: 'neutral',
                url: 'https://example.com',
              },
            ],
          },
          {
            hypothesis: '100000',
            premises: [
              {
                premise: '1',
                relationship: 'contradiction',
                url: 'https://example.com',
              },
              {
                premise: '2',
                relationship: 'entailment',
                url: 'https://example.com',
              },
              {
                premise: '3',
                relationship: 'neutral',
                url: 'https://example.com',
              },
            ],
          },
        ],
      };
    return sampleFact;
};

const factCheckWithoutGenerateQueries = async (query: string) => {
    // const encodedContent = encodeURIComponent(string);
    // const extraEndpoint = "factCheckSingle"
    // const response = await fetch(`${API_ENDPOINT}${extraEndpoint}?content=${encodedContent}`);
    // const data = await response.json();
    // return data;

    await new Promise(resolve => setTimeout(resolve, 2000));
    const samplePremises = [
        {
            premise: '1',
            relationship: 'contradiction',
            url: 'https://example.com',
        },
        {
            premise: '2',
            relationship: 'entailment',
            url: 'https://example.com',
        },
        {
            premise: '3',
            relationship: 'neutral',
            url: 'https://example.com',
        },
        {
            premise: '4',
            relationship: 'neutral',
            url: 'https://example.com',
        },
    ];

    return samplePremises;
};


export { factCheckWithGenerateQueries, factCheckWithoutGenerateQueries };