"use server";

import {
  getAllPrompts,
  getTrendingPrompts,
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
