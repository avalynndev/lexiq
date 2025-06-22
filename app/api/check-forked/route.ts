import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { hasUserForkedPrompt } from "@/lib/queries";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const promptId = searchParams.get("promptId");
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

  try {
    const isForked = await hasUserForkedPrompt(session.user.id, promptId);
    return NextResponse.json({ isForked });
  } catch (error) {
    console.error("Error checking forked status:", error);
    return NextResponse.json(
      { error: "Failed to check forked status" },
      { status: 500 },
    );
  }
}
