import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { and, eq, sql } from "drizzle-orm";
import { prompt, forkedPrompts } from "@/schema";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const { promptId } = await request.json();
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
    const existingFork = await db.query.forkedPrompts.findFirst({
      where: and(
        eq(forkedPrompts.userId, userId),
        eq(forkedPrompts.promptId, promptId),
      ),
    });

    if (existingFork) {
      // Unfork the prompt
      await db
        .delete(forkedPrompts)
        .where(eq(forkedPrompts.id, existingFork.id));
      await db
        .update(prompt)
        .set({ forks: sql`${prompt.forks} - 1` })
        .where(eq(prompt.id, promptId));

      // Revalidate cache
      revalidateTag("prompts");
      revalidateTag("trending");
      revalidateTag("forked");

      return NextResponse.json({ message: "Prompt unforked successfully" });
    } else {
      // Fork the prompt
      await db.insert(forkedPrompts).values({
        id: crypto.randomUUID(),
        userId,
        promptId,
      });
      await db
        .update(prompt)
        .set({ forks: sql`${prompt.forks} + 1` })
        .where(eq(prompt.id, promptId));

      // Revalidate cache
      revalidateTag("prompts");
      revalidateTag("trending");
      revalidateTag("forked");

      return NextResponse.json({ message: "Prompt forked successfully" });
    }
  } catch (error) {
    console.error("Error forking prompt:", error);
    return NextResponse.json(
      { error: "Failed to fork prompt" },
      { status: 500 },
    );
  }
}
