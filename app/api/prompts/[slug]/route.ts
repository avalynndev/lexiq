import { NextRequest, NextResponse } from "next/server";
import { getPromptById } from "@/lib/queries";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const prompt = await getPromptById(params.slug);

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
