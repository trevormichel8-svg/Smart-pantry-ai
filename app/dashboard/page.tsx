import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { DashboardShell } from "@/components/dashboard-shell";
import { getFreshnessState } from "@/lib/freshness";

export default async function DashboardPage() {
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
    orderBy: { expiresAt: "asc" },
  });

  const expiringSoon = items.filter((item) => {
    const state = getFreshnessState(item.expiresAt);
    return state.label === "urgent" || state.label === "expiring soon";
  });

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-zinc-400">
            Track freshness, use expiring food first, and generate dinner ideas fast.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-panel p-5">
            <div className="text-sm text-zinc-400">Total Pantry Items</div>
            <div className="mt-2 text-3xl font-bold">{items.length}</div>
          </div>

          <div className="rounded-[2rem] border border-yellow-500/20 bg-yellow-500/10 p-5">
            <div className="text-sm text-yellow-200">Expiring Soon</div>
            <div className="mt-2 text-3xl font-bold text-yellow-100">
              {expiringSoon.length}
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-500/20 bg-emerald-500/10 p-5">
            <div className="text-sm text-emerald-200">Current Plan</div>
            <div className="mt-2 text-3xl font-bold text-emerald-100">
              {profile.plan}
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-panel p-5">
          <div className="mb-4 text-xl font-semibold">Expiring First</div>

          {expiringSoon.length === 0 ? (
            <p className="text-zinc-400">
              Nothing urgent right now. Your pantry looks good.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {expiringSoon.slice(0, 8).map((item) => (
                <span
                  key={item.id}
                  className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-2 text-sm text-yellow-100"
                >
                  {item.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
