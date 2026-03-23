import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { DashboardShell } from "@/components/dashboard-shell";
import { PantryForm } from "@/components/pantry-form";
import { PantryList } from "@/components/pantry-list";

export default async function PantryPage() {
  const { userId } = await auth();
  const clerkUser = await currentUser();

  if (!userId || !clerkUser?.emailAddresses[0]?.emailAddress) {
    redirect("/sign-in");
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

  const items = await db.pantryItem.findMany({
    where: { userId: profile.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Pantry Manager</h1>
          <p className="mt-2 text-zinc-400">
            Add ingredients, track freshness, and keep your kitchen organized.
          </p>
        </div>

        <PantryForm />
        <PantryList items={items} />
      </div>
    </DashboardShell>
  );
}
