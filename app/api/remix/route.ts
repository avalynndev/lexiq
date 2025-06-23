import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { and, eq, sql } from "drizzle-orm";
import { prompt, remixedPrompts } from "@/schema";
import { revalidateTag } from "next/cache";
import { getPromptById, createPrompt } from "@/lib/queries";

export async function POST(request: NextRequest) {
  const { promptId, model, models } = await request.json();
  const session = await getSession(request);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!promptId) {
    return NextResponse.json(
      { error: "Prompt ID is required" },
      { status: 400 },
    );
  }

  const userId = session.user.id;

  try {
    // Check if user already remixed this prompt (by original promptId)
    const existingRemix = await db.query.remixedPrompts.findFirst({
      where: and(
        eq(remixedPrompts.userId, userId),
        eq(remixedPrompts.promptId, promptId),
      ),
    });

    if (existingRemix) {
      // Unremix the prompt
      await db
        .delete(remixedPrompts)
        .where(eq(remixedPrompts.id, existingRemix.id));
      await db
        .update(prompt)
        .set({ remixes: sql`${prompt.remixes} - 1` })
        .where(eq(prompt.id, promptId));

      // Revalidate cache
      revalidateTag("prompts");
      revalidateTag("trending");
      revalidateTag("remixed");

      return NextResponse.json({ message: "Prompt unremixed successfully" });
    } else {
      // Fetch the original prompt
      const originalPrompt = await getPromptById(promptId);
      if (!originalPrompt) {
        return NextResponse.json(
          { error: "Prompt not found" },
          { status: 404 },
        );
      }

      // Create a new prompt for the user (clone)
      const newPrompt = await createPrompt({
        title: originalPrompt.title,
        description: originalPrompt.description,
        prompt: originalPrompt.prompt,
        model: model || originalPrompt.model,
        category: originalPrompt.category,
        tags: originalPrompt.tags || [],
        solves: originalPrompt.solves || undefined,
        models:
          Array.isArray(models) && models.length > 0
            ? models
            : originalPrompt.models || [originalPrompt.model],
        authorId: userId,
        isPublic: true,
      });

      // Add a remixedPrompts record for the new prompt
      await db.insert(remixedPrompts).values({
        id: crypto.randomUUID(),
        userId,
        promptId: newPrompt.id,
      });

      // Increment remixes on the original prompt
      await db
        .update(prompt)
        .set({ remixes: sql`${prompt.remixes} + 1` })
        .where(eq(prompt.id, promptId));

      // Revalidate cache
      revalidateTag("prompts");
      revalidateTag("trending");
      revalidateTag("remixed");

      return NextResponse.json({
        message: "Prompt remixed successfully",
        newPromptId: newPrompt.id,
      });
    }
  } catch (error) {
    console.error("Error remixing prompt:", error);
    return NextResponse.json(
      { error: "Failed to remix prompt" },
      { status: 500 },
    );
  }
}
