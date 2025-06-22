import { NextRequest, NextResponse } from "next/server";
import { createPrompt } from "@/lib/queries";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      prompt,
      model,
      category,
      tags,
      solves,
      models,
      authorId,
    } = body;

    // Validate required fields
    if (!title || !description || !prompt || !model || !category || !authorId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newPrompt = await createPrompt({
      title,
      description,
      prompt,
      model,
      category,
      tags,
      solves,
      models,
      authorId,
    });

    // Revalidate cache
    revalidateTag("prompts");
    revalidateTag("trending");
    revalidateTag("user");

    return NextResponse.json(newPrompt, { status: 201 });
  } catch (error) {
    console.error("Error creating prompt:", error);
    return NextResponse.json(
      { error: "Failed to create prompt" },
      { status: 500 },
    );
  }
}
