import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { user, prompt as promptSchema } from "@/schema";
import { eq, desc } from "drizzle-orm";
import { getUserPrompts } from "@/lib/queries";

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const foundUser = await db.query.user.findFirst({
      where: eq(user.username, params.username),
      with: {
        starredPrompts: true,
        forkedPrompts: true,
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
      forks: foundUser.forkedPrompts.length,
    };

    return NextResponse.json({ user: userWithStats, prompts });
  } catch (error) {
    console.error(`Error fetching user ${params.username}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}
