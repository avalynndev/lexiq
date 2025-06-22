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
import { db } from "@/db";
import { prompt as promptSchema, user as userSchema } from "@/schema";
import { eq, and, desc } from "drizzle-orm";

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

export async function getUserProfile(username: string) {
  const user = await db.query.user.findFirst({
    where: eq(userSchema.username, username),
  });

  if (!user) {
    return { user: null, prompts: [] };
  }

  const prompts = await db.query.prompt.findMany({
    where: and(
      eq(promptSchema.authorId, user.id),
      eq(promptSchema.isPublic, true)
    ),
    orderBy: [desc(promptSchema.createdOn)],
    with: {
      author: true,
    },
  });

  const userWithStats = {
    ...user,
    stars: prompts.reduce((acc, p) => acc + p.stars, 0),
    forks: prompts.reduce((acc, p) => acc + p.forks, 0),
  };

  return { user: userWithStats, prompts };
}
