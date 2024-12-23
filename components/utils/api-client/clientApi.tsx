import { getConfig } from "../config.ts";
import { getCachedData, setCachedData } from "../cache/cache.ts";
import { Feedback } from "./types/Feedback.ts";
import { Project } from "./types/Project.ts";

export async function getAllProjects(cacheTimeout?: string|undefined) {
  const cacheKey = "projectsCache_01";
  const cachedData = await getCachedData(cacheKey, cacheTimeout ?? '3600000');

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

export async function getAllFeedbacks(cacheTimeout?: string|undefined) {
  const cacheKey = "feedbacksCache_01";
  const cachedData = await getCachedData(cacheKey, cacheTimeout ?? '3600000');

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

export async function getAllOffers(cacheTimeout?: string|undefined) {
  const cacheKey = "offersCache_01";
  const cachedData = await getCachedData(cacheKey, cacheTimeout ?? '3600000');

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

export async function getProjectById(id: string, cacheTimeout?: string|undefined) {
  const cacheKey = `projectCache_${id}`;
  const cachedData = await getCachedData(cacheKey, cacheTimeout ?? '3600000');

  if (cachedData) {
    return cachedData;
  }

  const { url, token } = getConfig();
  const response = await fetch(`${url}/project/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }

  const data = await response.json();
  setCachedData(cacheKey, data);

  return data;
}
