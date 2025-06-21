import { db } from "@/db";
import { prompt, user } from "@/schema";
import { eq, desc, asc } from "drizzle-orm";

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

export async function getAllPrompts(): Promise<PromptWithAuthor[]> {
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
    .orderBy(desc(prompt.createdOn));

  return prompts.map((p) => ({
    ...p,
    author: p.author ?? { username: null, displayUsername: null, image: null },
  }));
}

export async function getTrendingPrompts(): Promise<PromptWithAuthor[]> {
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
    .orderBy(desc(prompt.stars), desc(prompt.forks))
    .limit(6);

  return prompts.map((p) => ({
    ...p,
    author: p.author ?? { username: null, displayUsername: null, image: null },
  }));
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
