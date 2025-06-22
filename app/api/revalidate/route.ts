import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const { tag } = await request.json();

    if (!tag) {
      return NextResponse.json({ error: "Tag is required" }, { status: 400 });
    }

    // Revalidate the specified tag
    revalidateTag(tag);

    return NextResponse.json({
      message: `Cache revalidated for tag: ${tag}`,
      revalidated: true,
    });
  } catch (error) {
    console.error("Error revalidating cache:", error);
    return NextResponse.json(
      { error: "Failed to revalidate cache" },
      { status: 500 },
    );
  }
}
