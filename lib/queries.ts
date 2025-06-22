import { db } from "@/db";
import { prompt, user, starredPrompts, forkedPrompts } from "@/schema";
import { eq, desc, asc, and } from "drizzle-orm";
import { unstable_cache } from "next/cache";

// Ensure this only runs on the server
if (typeof window !== "undefined") {
  throw new Error("Database queries can only be called from server-side code");
}

export type PromptWithAuthor = {
  id: string;
  title: string;
  description: string;
  prompt: string;
  model: string;
  category: string;
  stars: number;
  forks: number;
  views: number;
  isPublic: boolean;
  lastUpdated: Date;
  createdOn: Date;
  tags: string[] | null;
  solves: string | null;
  models: string[] | null;
  author: {
    username: string | null;
    displayUsername: string | null;
    image: string | null;
  };
};

// Cached version of getAllPrompts with 30 second revalidation
export const getAllPrompts = unstable_cache(
  async (): Promise<PromptWithAuthor[]> => {
    const prompts = await db
      .select({
        id: prompt.id,
        title: prompt.title,
        description: prompt.description,
        prompt: prompt.prompt,
        model: prompt.model,
        category: prompt.category,
        stars: prompt.stars,
        forks: prompt.forks,
        views: prompt.views,
        isPublic: prompt.isPublic,
        lastUpdated: prompt.lastUpdated,
        createdOn: prompt.createdOn,
        tags: prompt.tags,
        solves: prompt.solves,
        models: prompt.models,
        author: {
          username: user.username,
          displayUsername: user.displayUsername,
          image: user.image,
        },
      })
      .from(prompt)
      .leftJoin(user, eq(prompt.authorId, user.id))
      .where(eq(prompt.isPublic, true))
      .orderBy(desc(prompt.createdOn));

    return prompts.map((p) => ({
      ...p,
      author: p.author ?? {
        username: null,
        displayUsername: null,
        image: null,
      },
    }));
  },
  ["all-prompts"],
  {
    revalidate: 30, // 30 seconds
    tags: ["prompts"],
  }
);

// Cached version of getTrendingPrompts with 60 second revalidation
export const getTrendingPrompts = unstable_cache(
  async (): Promise<PromptWithAuthor[]> => {
    const prompts = await db
      .select({
        id: prompt.id,
        title: prompt.title,
        description: prompt.description,
        prompt: prompt.prompt,
        model: prompt.model,
        category: prompt.category,
        stars: prompt.stars,
        forks: prompt.forks,
        views: prompt.views,
        isPublic: prompt.isPublic,
        lastUpdated: prompt.lastUpdated,
        createdOn: prompt.createdOn,
        tags: prompt.tags,
        solves: prompt.solves,
        models: prompt.models,
        author: {
          username: user.username,
          displayUsername: user.displayUsername,
          image: user.image,
        },
      })
      .from(prompt)
      .leftJoin(user, eq(prompt.authorId, user.id))
      .where(eq(prompt.isPublic, true))
      .orderBy(desc(prompt.stars), desc(prompt.forks))
      .limit(6);

    return prompts.map((p) => ({
      ...p,
      author: p.author ?? {
        username: null,
        displayUsername: null,
        image: null,
      },
    }));
  },
  ["trending-prompts"],
  {
    revalidate: 60, // 60 seconds
    tags: ["prompts", "trending"],
  }
);

// Cached version of getUserPrompts with 10 second revalidation
export const getUserPrompts = unstable_cache(
  async (userId: string): Promise<PromptWithAuthor[]> => {
    const prompts = await db
      .select({
        id: prompt.id,
        title: prompt.title,
        description: prompt.description,
        prompt: prompt.prompt,
        model: prompt.model,
        category: prompt.category,
        stars: prompt.stars,
        forks: prompt.forks,
        views: prompt.views,
        isPublic: prompt.isPublic,
        lastUpdated: prompt.lastUpdated,
        createdOn: prompt.createdOn,
        tags: prompt.tags,
        solves: prompt.solves,
        models: prompt.models,
        author: {
          username: user.username,
          displayUsername: user.displayUsername,
          image: user.image,
        },
      })
      .from(prompt)
      .leftJoin(user, eq(prompt.authorId, user.id))
      .where(eq(prompt.authorId, userId))
      .orderBy(desc(prompt.lastUpdated));

    return prompts.map((p) => ({
      ...p,
      author: p.author ?? {
        username: null,
        displayUsername: null,
        image: null,
      },
    }));
  },
  ["user-prompts"],
  {
    revalidate: 10, // 10 seconds
    tags: ["prompts", "user"],
  }
);

// Cached version of getStarredPrompts with 10 second revalidation
export const getStarredPrompts = unstable_cache(
  async (userId: string): Promise<PromptWithAuthor[]> => {
    const results = await db
      .select({
        id: prompt.id,
        title: prompt.title,
        description: prompt.description,
        prompt: prompt.prompt,
        model: prompt.model,
        category: prompt.category,
        stars: prompt.stars,
        forks: prompt.forks,
        views: prompt.views,
        isPublic: prompt.isPublic,
        lastUpdated: prompt.lastUpdated,
        createdOn: prompt.createdOn,
        tags: prompt.tags,
        solves: prompt.solves,
        models: prompt.models,
        author: {
          username: user.username,
          displayUsername: user.displayUsername,
          image: user.image,
        },
      })
      .from(starredPrompts)
      .leftJoin(prompt, eq(starredPrompts.promptId, prompt.id))
      .leftJoin(user, eq(prompt.authorId, user.id))
      .where(eq(starredPrompts.userId, userId))
      .orderBy(desc(prompt.stars));

    return results
      .filter((p) => p.id) // Filter out any potential null prompts from a broken join
      .map((p) => ({
        ...p,
        author: p.author ?? {
          username: null,
          displayUsername: null,
          image: null,
        },
      })) as PromptWithAuthor[];
  },
  ["starred-prompts"],
  {
    revalidate: 10, // 10 seconds
    tags: ["prompts", "starred"],
  }
);

// Cached version of getForkedPrompts with 10 second revalidation
export const getForkedPrompts = unstable_cache(
  async (userId: string): Promise<PromptWithAuthor[]> => {
    const results = await db
      .select({
        id: prompt.id,
        title: prompt.title,
        description: prompt.description,
        prompt: prompt.prompt,
        model: prompt.model,
        category: prompt.category,
        stars: prompt.stars,
        forks: prompt.forks,
        views: prompt.views,
        isPublic: prompt.isPublic,
        lastUpdated: prompt.lastUpdated,
        createdOn: prompt.createdOn,
        tags: prompt.tags,
        solves: prompt.solves,
        models: prompt.models,
        author: {
          username: user.username,
          displayUsername: user.displayUsername,
          image: user.image,
        },
      })
      .from(forkedPrompts)
      .leftJoin(prompt, eq(forkedPrompts.promptId, prompt.id))
      .leftJoin(user, eq(prompt.authorId, user.id))
      .where(eq(forkedPrompts.userId, userId))
      .orderBy(desc(prompt.forks));

    return results
      .filter((p) => p.id) // Filter out any potential null prompts from a broken join
      .map((p) => ({
        ...p,
        author: p.author ?? {
          username: null,
          displayUsername: null,
          image: null,
        },
      })) as PromptWithAuthor[];
  },
  ["forked-prompts"],
  {
    revalidate: 10, // 10 seconds
    tags: ["prompts", "forked"],
  }
);

// Non-cached functions for real-time data
export async function hasUserStarredPrompt(
  userId: string,
  promptId: string
): Promise<boolean> {
  const result = await db.query.starredPrompts.findFirst({
    where: and(
      eq(starredPrompts.userId, userId),
      eq(starredPrompts.promptId, promptId)
    ),
  });
  return !!result;
}

export async function hasUserForkedPrompt(
  userId: string,
  promptId: string
): Promise<boolean> {
  const result = await db.query.forkedPrompts.findFirst({
    where: and(
      eq(forkedPrompts.userId, userId),
      eq(forkedPrompts.promptId, promptId)
    ),
  });
  return !!result;
}

export async function createPrompt(data: {
  title: string;
  description: string;
  prompt: string;
  model: string;
  category: string;
  tags?: string[];
  solves?: string;
  models?: string[];
  authorId: string;
  isPublic?: boolean;
}) {
  const newPrompt = await db
    .insert(prompt)
    .values({
      id: crypto.randomUUID(),
      ...data,
      tags: data.tags || [],
      models: data.models || [data.model],
    })
    .returning();

  return newPrompt[0];
}
