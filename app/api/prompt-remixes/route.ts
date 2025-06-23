import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { prompt } from "@/schema";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const promptId = searchParams.get("promptId");

  if (!promptId) {
    return NextResponse.json(
      { error: "Prompt ID is required" },
      { status: 400 },
    );
  }

  try {
    const result = await db.query.prompt.findFirst({
      where: (fields, { eq }) => eq(fields.id, promptId),
    });
    if (!result) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
    }
    return NextResponse.json({ remixes: result.remixes });
  } catch (error) {
    console.error("Error fetching prompt remixes:", error);
    return NextResponse.json(
      { error: "Failed to fetch prompt remixes" },
      { status: 500 },
    );
  }
}
