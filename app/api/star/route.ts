import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { and, eq, sql } from "drizzle-orm";
import { prompt, starredPrompts } from "@/schema";
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
    const existingStar = await db.query.starredPrompts.findFirst({
      where: and(
        eq(starredPrompts.userId, userId),
        eq(starredPrompts.promptId, promptId),
      ),
    });

    if (existingStar) {
      // Unstar the prompt
      await db
        .delete(starredPrompts)
        .where(eq(starredPrompts.id, existingStar.id));
      await db
        .update(prompt)
        .set({ stars: sql`${prompt.stars} - 1` })
        .where(eq(prompt.id, promptId));

      // Revalidate cache
      revalidateTag("prompts");
      revalidateTag("trending");
      revalidateTag("starred");

      return NextResponse.json({ message: "Prompt unstarred successfully" });
    } else {
      // Star the prompt
      await db.insert(starredPrompts).values({
        id: crypto.randomUUID(),
        userId,
        promptId,
      });
      await db
        .update(prompt)
        .set({ stars: sql`${prompt.stars} + 1` })
        .where(eq(prompt.id, promptId));

      // Revalidate cache
      revalidateTag("prompts");
      revalidateTag("trending");
      revalidateTag("starred");

      return NextResponse.json({ message: "Prompt starred successfully" });
    }
  } catch (error) {
    console.error("Error starring prompt:", error);
    return NextResponse.json(
      { error: "Failed to star prompt" },
      { status: 500 },
    );
  }
}
