import { API_ENDPOINT } from "./endpoint";
import { categoryStorageValue, storeHealthTipResponse } from "./storage";
export let contentString;

const categories = [15, 16, 18, 19, 20, 21, 23, 24, 28, 29];

async function getRandomCategory(): Promise<number | null> {
  const enabledCategories = await categoryStorageValue();

  if (enabledCategories.length === 0) {
    // console.error("No enabled categories available.");
    return null;
  }

  const randomIndex = Math.floor(Math.random() * enabledCategories.length);
  const chosenCategory = enabledCategories[randomIndex];

  if (chosenCategory === 20) {
    categories.push(109);
  }

  const originalCategories = [15, 16, 18, 19, 20, 21, 23, 24, 28, 29];
  categories.length = 0;
  categories.push(...originalCategories);

  return chosenCategory;
}

export async function getHealthTips() {
  let param = await getRandomCategory();
  const finalendpoint = API_ENDPOINT + "/health_tips?param=" + param;
  const response = await fetch(
    finalendpoint,
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

  // debug (remove later)
  // console.log(data);

  storeHealthTipResponse(data);

  return data;
}
