// to simulate the locale storage of fact checking

const sampleFact = {
    result: [
      {
        hypothesis: 'polio is deadly',
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
        hypothesis: 'polio ',
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
        hypothesis: '32',
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

  export default sampleFact;