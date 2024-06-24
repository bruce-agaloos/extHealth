export let contentString;

function fetchCondition() {
  const url = 'http://localhost:5000/get_condition';
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data); 
      const method = 'lex-rank'; 
      const language = 'english'; 
      const sentenceCount = 3; 
      const inputType = 'URL'; 
      const inputText = data.url; 
      summarizeText(method, language, sentenceCount, inputType, inputText)
        .then(summary => {
          data.summary = summary; 
          console.log('Data with Summary:', data); 
        })
        .catch(error => console.error('Error summarizing text:', error));
    })
    .catch(error => console.error('Error fetching data:', error));
}

function summarizeText(
  method: string, 
  language: string, 
  sentenceCount: number, 
  inputType: string, 
  inputText: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const apiUrl = 'http://localhost:5000/summarize';
    const data = {
      data: [method, language, sentenceCount, inputType, inputText]
    };
    
    fetch(apiUrl, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(data) 
    })
      .then(response => response.text()) 
      .then(summary => {
        console.log('Summary:', summary);
        contentString = summary;
        resolve(summary); 
      })
      .catch(error => {
        console.error('Error:', error);
        reject(error);
      });
  });
}
fetchCondition();

