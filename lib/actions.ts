"use server";

import {
  getAllPrompts,
  getTrendingPrompts,
  getUserPrompts,
  getStarredPrompts,
  getRemixedPrompts,
  hasUserStarredPrompt,
  hasUserRemixedPrompt,
  type PromptWithAuthor,
} from "./queries";
import { db } from "@/db";
import { prompt as promptSchema, user as userSchema } from "@/schema";
import { eq, and, desc } from "drizzle-orm";

export type { PromptWithAuthor };

export async function fetchAllPrompts(
  userId?: string,
): Promise<PromptWithAuthor[]> {
  try {
    if (!userId) {
      return await getAllPrompts();
    }
    // Get all public prompts
    const publicPrompts = await getAllPrompts();
    // Get all private prompts owned by the user
    const userPrivatePrompts = await db.query.prompt.findMany({
      where: (fields, { eq, and }) =>
        and(eq(fields.authorId, userId), eq(fields.isPublic, false)),
      with: {
        author: true,
      },
    });
    // Map userPrivatePrompts to PromptWithAuthor shape if needed
    // (Assume fields match, but ensure author shape is correct)
    const mappedUserPrivatePrompts = userPrivatePrompts.map((p) => ({
      ...p,
      author: p.author
        ? {
            username: p.author.username ?? null,
            displayUsername: p.author.displayUsername ?? null,
            image: p.author.image ?? null,
          }
        : { username: null, displayUsername: null, image: null },
    }));
    // Merge and deduplicate by id
    const allPrompts = [
      ...publicPrompts,
      ...mappedUserPrivatePrompts.filter(
        (p) => !publicPrompts.some((pub) => pub.id === p.id),
      ),
    ];
    return allPrompts;
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
  userId: string,
): Promise<PromptWithAuthor[]> {
  try {
    return await getUserPrompts(userId);
  } catch (error) {
    console.error("Error fetching user prompts:", error);
    return [];
  }
}

export async function fetchStarredPrompts(
  userId: string,
): Promise<PromptWithAuthor[]> {
  try {
    return await getStarredPrompts(userId);
  } catch (error) {
    console.error("Error fetching starred prompts:", error);
    return [];
  }
}

export async function fetchRemixedPrompts(
  userId: string,
): Promise<PromptWithAuthor[]> {
  try {
    return await getRemixedPrompts(userId);
  } catch (error) {
    console.error("Error fetching remixed prompts:", error);
    return [];
  }
}

export async function checkUserStarredPrompt(
  userId: string,
  promptId: string,
): Promise<boolean> {
  try {
    return await hasUserStarredPrompt(userId, promptId);
  } catch (error) {
    console.error("Error checking if user starred prompt:", error);
    return false;
  }
}

export async function checkUserRemixedPrompt(
  userId: string,
  promptId: string,
): Promise<boolean> {
  try {
    return await hasUserRemixedPrompt(userId, promptId);
  } catch (error) {
    console.error("Error checking if user remixed prompt:", error);
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
      eq(promptSchema.isPublic, true),
    ),
    orderBy: [desc(promptSchema.createdOn)],
    with: {
      author: true,
    },
  });

  const userWithStats = {
    ...user,
    stars: prompts.reduce((acc, p) => acc + p.stars, 0),
    remixes: prompts.reduce((acc, p) => acc + p.remixes, 0),
  };

  return { user: userWithStats, prompts };
}
