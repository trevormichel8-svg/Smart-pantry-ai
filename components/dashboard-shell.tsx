import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, Package2, Sparkles } from "lucide-react";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen px-4 py-4 md:px-6 md:py-6">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[250px_1fr]">
        <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="mb-8">
            <div className="text-lg font-semibold">Smart Pantry AI</div>
            <div className="text-sm text-zinc-400">Your kitchen command center</div>
          </div>

          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm text-zinc-200 hover:bg-white/5"
            >
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </Link>
            <Link
              href="/dashboard/pantry"
              className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm text-zinc-200 hover:bg-white/5"
            >
              <Package2 className="h-4 w-4" />
              Pantry
            </Link>
            <Link
              href="/dashboard/recipes"
              className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm text-zinc-200 hover:bg-white/5"
            >
              <Sparkles className="h-4 w-4" />
              Recipes
            </Link>
          </nav>

          <div className="mt-8 rounded-3xl border border-gold/20 bg-gold/10 p-4">
            <div className="text-sm font-semibold text-gold">Pro Upgrade</div>
            <p className="mt-2 text-sm text-zinc-300">
              Add Stripe and unlock unlimited recipes, planner, and grocery lists.
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="text-sm text-zinc-400">Account</div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </aside>

        <main className="rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
