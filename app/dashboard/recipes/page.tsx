import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard-shell";
import { RecipeGenerator } from "@/components/recipe-generator";

export default async function RecipesPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">AI Recipe Generator</h1>
          <p className="mt-2 text-zinc-400">
            Generate recipes from your pantry and prioritize ingredients that are
            about to expire.
          </p>
        </div>

        <RecipeGenerator />
      </div>
    </DashboardShell>
  );
}
