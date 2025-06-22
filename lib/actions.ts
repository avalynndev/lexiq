"use server";

import {
  getAllPrompts,
  getTrendingPrompts,
  getUserPrompts,
  getStarredPrompts,
  getForkedPrompts,
  hasUserStarredPrompt,
  hasUserForkedPrompt,
  type PromptWithAuthor,
} from "./queries";

export type { PromptWithAuthor };

export async function fetchAllPrompts(): Promise<PromptWithAuthor[]> {
  try {
    return await getAllPrompts();
  } catch (error) {
    console.error("Error fetching all prompts:", error);
    return [];
  }
}

export async function fetchTrendingPrompts(): Promise<PromptWithAuthor[]> {
  try {
    return await getTrendingPrompts();
  } catch (error) {
    console.error("Error fetching trending prompts:", error);
    return [];
  }
}

export async function fetchUserPrompts(
  userId: string
): Promise<PromptWithAuthor[]> {
  try {
    return await getUserPrompts(userId);
  } catch (error) {
    console.error("Error fetching user prompts:", error);
    return [];
  }
}

export async function fetchStarredPrompts(
  userId: string
): Promise<PromptWithAuthor[]> {
  try {
    return await getStarredPrompts(userId);
  } catch (error) {
    console.error("Error fetching starred prompts:", error);
    return [];
  }
}

export async function fetchForkedPrompts(
  userId: string
): Promise<PromptWithAuthor[]> {
  try {
    return await getForkedPrompts(userId);
  } catch (error) {
    console.error("Error fetching forked prompts:", error);
    return [];
  }
}

export async function checkUserStarredPrompt(
  userId: string,
  promptId: string
): Promise<boolean> {
  try {
    return await hasUserStarredPrompt(userId, promptId);
  } catch (error) {
    console.error("Error checking if user starred prompt:", error);
    return false;
  }
}

export async function checkUserForkedPrompt(
  userId: string,
  promptId: string
): Promise<boolean> {
  try {
    return await hasUserForkedPrompt(userId, promptId);
  } catch (error) {
    console.error("Error checking if user forked prompt:", error);
    return false;
  }
}
