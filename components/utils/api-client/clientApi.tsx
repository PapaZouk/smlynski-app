import { getConfig } from "../config.ts";
import { getCachedData, setCachedData } from "../cache/cache.ts";
import { Feedback } from "./types/Feedback.ts";
import { Project } from "./types/Project.ts";

export async function getAllProjects() {
  const cacheKey = "projectsCache_01";
  const cachedData = await getCachedData(cacheKey, 3600000);

  if (cachedData) {
    return cachedData;
  }

  const { url, token } = getConfig();
  const response = await fetch(`${url}/projects`, {
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  const data = await response.json();
  setCachedData<Project>(cacheKey, data);

  return data;
}

export async function getAllFeedbacks() {
  const cacheKey = "feedbacksCache_01";
  const cachedData = await getCachedData(cacheKey, 3600000);

  if (cachedData) {
    return cachedData;
  }

  const { url, token } = getConfig();
  const response = await fetch(`${url}/feedbacks`, {
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch feedbacks");
  }

  const data = await response.json();
  setCachedData<Feedback>(cacheKey, data);

  return data;
}

export async function getAllOffers(cacheTimeout?: number) {
  const cacheKey = "offersCache_01";
  const cachedData = await getCachedData(cacheKey, cacheTimeout ?? 3600000);

  if (cachedData) {
    return cachedData;
  }

  const { url, token } = getConfig();
  const response = await fetch(`${url}/offers`, {
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch offers");
  }

  const data = await response.json();
  setCachedData(cacheKey, data);

  return data;
}
