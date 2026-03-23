import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const clerkUser = await currentUser();

    if (!userId || !clerkUser?.emailAddresses[0]?.emailAddress) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let profile = await db.userProfile.findUnique({
      where: { clerkUserId: userId },
    });

    if (!profile) {
      profile = await db.userProfile.create({
        data: {
          clerkUserId: userId,
          email: clerkUser.emailAddresses[0].emailAddress,
        },
      });
    }

    const body = await req.json();

    if (!body.name || typeof body.name !== "string") {
      return NextResponse.json(
        { error: "Ingredient name is required" },
        { status: 400 }
      );
    }

    const item = await db.pantryItem.create({
      data: {
        userId: profile.id,
        name: body.name.trim(),
        quantity: typeof body.quantity === "number" ? body.quantity : null,
        unit: body.unit || null,
        category: body.category || null,
        expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
        notes: body.notes || null,
      },
    });

    return NextResponse.json({ item });
  } catch (error) {
    console.error("POST /api/pantry error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await db.userProfile.findUnique({
      where: { clerkUserId: userId },
    });

    if (!profile) {
      return NextResponse.json({ items: [] });
    }

    const items = await db.pantryItem.findMany({
      where: { userId: profile.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ items });
  } catch (error) {
    console.error("GET /api/pantry error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
