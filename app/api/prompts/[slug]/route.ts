import { NextRequest, NextResponse } from "next/server";
import { getPromptById } from "@/lib/queries";
import { db } from "@/db";
import { prompt as promptSchema } from "@/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const slug = pathname.split("/").pop();

  try {
    const prompt = await getPromptById(slug as string);

    if (!prompt) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
    }

    return NextResponse.json(prompt);
  } catch (error) {
    console.error("Error fetching prompt:", error);
    return NextResponse.json(
      { error: "Failed to fetch prompt" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const slug = pathname.split("/").pop();

  if (!slug) {
    return NextResponse.json({ error: "Missing prompt id" }, { status: 400 });
  }

  try {
    const deleted = await db
      .delete(promptSchema)
      .where(eq(promptSchema.id, slug))
      .returning();
    if (!deleted.length) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting prompt:", error);
    return NextResponse.json(
      { error: "Failed to delete prompt" },
      { status: 500 }
    );
  }
}
