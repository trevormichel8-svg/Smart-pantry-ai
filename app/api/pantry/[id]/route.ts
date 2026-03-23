import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await db.userProfile.findUnique({
      where: { clerkUserId: userId },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const { id } = await context.params;
    const existing = await db.pantryItem.findUnique({ where: { id } });

    if (!existing || existing.userId !== profile.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const body = await req.json();

    const item = await db.pantryItem.update({
      where: { id },
      data: {
        name: body.name ?? existing.name,
        quantity: body.quantity ?? existing.quantity,
        unit: body.unit ?? existing.unit,
        category: body.category ?? existing.category,
        expiresAt:
          body.expiresAt === null
            ? null
            : body.expiresAt
            ? new Date(body.expiresAt)
            : existing.expiresAt,
        notes: body.notes ?? existing.notes,
      },
    });

    return NextResponse.json({ item });
  } catch (error) {
    console.error("PATCH /api/pantry/[id] error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await db.userProfile.findUnique({
      where: { clerkUserId: userId },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const { id } = await context.params;
    const item = await db.pantryItem.findUnique({ where: { id } });

    if (!item || item.userId !== profile.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await db.pantryItem.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/pantry/[id] error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
