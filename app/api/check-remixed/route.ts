import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { hasUserRemixedPrompt } from "@/lib/queries";

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
    const isRemixed = await hasUserRemixedPrompt(session.user.id, promptId);
    return NextResponse.json({ isRemixed });
  } catch (error) {
    console.error("Error checking remixed status:", error);
    return NextResponse.json(
      { error: "Failed to check remixed status" },
      { status: 500 },
    );
  }
}
