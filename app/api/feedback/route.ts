import { db } from "@/db";
import { feedback } from "@/schema";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

// doing this cuz i have no money to run resend :(

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await db.insert(feedback).values({
      id: randomUUID(),
      type: body.type,
      name: body.name,
      url: body.url,
      issue: body.issue,
      reason: body.reason,
      logs: body.logs,
      message: body.message,
      email: body.email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[FEEDBACK_POST_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
