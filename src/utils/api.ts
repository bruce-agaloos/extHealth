
interface SmmryApiResponse {
  sm_api_message?: string;
  sm_api_error?: number;
  sm_api_content?: string;
}

export async function Smmry(url: string, apiKey: string): Promise<string> {
  const smmryApiUrl = `https://api.smmry.com/?SM_API_KEY=${apiKey}&SM_URL=${encodeURIComponent(url)}`;

  try {
    const response = await fetch(smmryApiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: SmmryApiResponse = await response.json();
    if (data.sm_api_error) {
      throw new Error(`SMMRY API error: ${data.sm_api_message}`);
    }
    if (!data.sm_api_content) {
      throw new Error('No summary content returned by the API.');
    }
    return data.sm_api_content;
  } catch (error) {
    console.error("Error summarizing article:", error);
    throw error; // Rethrowing the error to be handled or logged by the caller
  }
}

