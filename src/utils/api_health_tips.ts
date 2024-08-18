import { API_ENDPOINT } from "./endpoint";
import { Carr } from "./storage";
export let contentString;


const categories = [15, 16, 18, 19, 20, 21, 23, 24, 28, 29];

function getRandomCategory() {
  const enabledCategories = categories.filter(id => {
    const key = `id${id}Enabled`;
    const storedValue = localStorage.getItem(key);
    return storedValue === 'true';
  });

  if (enabledCategories.length === 0) {
    console.error('No enabled categories available.');
    return null;
  }

  const randomIndex = Math.floor(Math.random() * enabledCategories.length);
  return enabledCategories[randomIndex];
}



export async function getHealthTips() {
  let param = getRandomCategory();

  const response = await fetch(
    `http://localhost:8000/health_tips?param=${param}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log(data);
  return data;
}

// Example usage