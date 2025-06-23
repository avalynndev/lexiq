import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { user, prompt as promptSchema } from "@/schema";
import { eq, desc } from "drizzle-orm";
import { getUserPrompts } from "@/lib/queries";

export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const username = pathname.split("/").pop();
  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 },
    );
  }
  try {
    const foundUser = await db.query.user.findFirst({
      where: eq(user.username, username),
      with: {
        starredPrompts: true,
        remixedPrompts: true,
      },
    });

    if (!foundUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const prompts = await getUserPrompts(foundUser.id);

    const userWithStats = {
      id: foundUser.id,
      name: foundUser.name,
      username: foundUser.username,
      image: foundUser.image,
      stars: foundUser.starredPrompts.length,
      remixes: foundUser.remixedPrompts.length,
    };

    return NextResponse.json({ user: userWithStats, prompts });
  } catch (error) {
    console.error(`Error fetching user ${username}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 },
    );
  }
}
