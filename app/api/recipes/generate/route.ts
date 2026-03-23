import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getFreshnessState } from "@/lib/freshness";
import { generateRecipeJson } from "@/lib/openai";

export async function POST(req: Request) {
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

    const body = await req.json();

    const items = await db.pantryItem.findMany({
      where: { userId: profile.id },
    });

    const ingredients = items.map((item) => item.name);

    const expiringSoon = items
      .filter((item) => {
        const state = getFreshnessState(item.expiresAt);
        return state.label === "urgent" || state.label === "expiring soon";
      })
      .map((item) => item.name);

    if (!ingredients.length) {
      return NextResponse.json(
        { error: "No pantry ingredients found" },
        { status: 400 }
      );
    }

    const recipe = await generateRecipeJson({
      ingredients,
      expiringSoon,
      cuisine: body.cuisine,
      mealType: body.mealType,
      pantryOnly: body.mode === "pantry-only",
    });

    return NextResponse.json({ recipe });
  } catch (error) {
    console.error("POST /api/recipes/generate error", error);
    return NextResponse.json({ error: "Recipe generation failed" }, { status: 500 });
  }
}
