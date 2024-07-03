export let contentString;

function fetchCondition() {
  const url = 'http://localhost:8000/get_condition';
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data); 
      const method = 'lex-rank'; 
      const language = 'english'; 
      const sentenceCount = '3'; 
      const inputType = 'URL'; 
      const inputText = data.url; 
      summarizeText(method, language, sentenceCount, inputType, inputText)
        .then(summary => {
          data.summary = summary; 
          contentString = data;
          console.log('Data with Summary:', contentString); 
        })
        .catch(error => console.error('Error summarizing text:', error));
    })
    .catch(error => console.error('Error fetching data:', error));
}

function summarizeText(
  method: string, 
  language: string, 
  sentenceCount: string, 
  inputType: string, 
  inputText: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const apiUrl = 'http://localhost:8000/summarize';
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
        resolve(summary); 
      })
      .catch(error => {
        console.error('Error:', error);
        reject(error);
      });
  });
}
fetchCondition();

