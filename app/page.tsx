import Link from "next/link";
import { Sparkles, Refrigerator, Clock3, ChefHat } from "lucide-react";

const features = [
  {
    icon: Refrigerator,
    title: "Pantry tracking",
    description: "Store ingredients, quantities, categories, and expiry dates in one clean dashboard.",
  },
  {
    icon: Clock3,
    title: "Shelf-life intelligence",
    description: "See what is fresh, urgent, or expiring soon with an at-a-glance visual system.",
  },
  {
    icon: ChefHat,
    title: "AI recipe generation",
    description: "Generate practical recipes from the food you already have instead of buying more.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-16">
        <header className="flex items-center justify-between rounded-[2rem] border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
          <div>
            <div className="text-lg font-semibold">Smart Pantry AI</div>
            <div className="text-sm text-zinc-400">
              AI meal planning meets visual food freshness tracking.
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href="/sign-in"
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300"
            >
              Sign in
            </Link>
            <Link
              href="/dashboard"
              className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-black shadow-gold"
            >
              Launch App
            </Link>
          </div>
        </header>

        <section className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1 text-sm text-emerald-300">
              <Sparkles className="h-4 w-4" />
              Save money. Waste less. Cook faster.
            </div>

            <h1 className="max-w-2xl text-5xl font-bold leading-tight md:text-6xl">
              Turn your pantry into an AI chef and stop wasting groceries.
            </h1>

            <p className="mt-5 max-w-xl text-lg text-zinc-400">
              Track freshness, use expiring food first, and generate meal ideas from
              ingredients you already own.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="rounded-full bg-gold px-6 py-3 font-semibold text-black shadow-gold"
              >
                Start Free
              </Link>
              <a
                href="#features"
                className="rounded-full border border-white/10 px-6 py-3 text-zinc-200"
              >
                See Features
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur">
            <div className="mb-4 text-sm text-zinc-400">Dashboard Preview</div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-panel p-4">
                <div className="text-sm text-zinc-400">Pantry Items</div>
                <div className="mt-2 text-3xl font-bold">24</div>
              </div>

              <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/10 p-4">
                <div className="text-sm text-yellow-200">Expiring Soon</div>
                <div className="mt-2 text-3xl font-bold text-yellow-100">5</div>
              </div>

              <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-4 sm:col-span-2">
                <div className="text-sm text-emerald-200">Tonight's AI Suggestion</div>
                <div className="mt-2 text-xl font-semibold">
                  Garlic lemon chicken rice skillet
                </div>
                <div className="mt-2 text-sm text-emerald-100/80">
                  Uses chicken, rice, garlic, carrots, and spinach before they expire.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-panel">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 text-zinc-400">{feature.description}</p>
              </div>
            );
          })}
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center">
          <h2 className="text-3xl font-bold">The core loop is simple</h2>
          <p className="mx-auto mt-3 max-w-2xl text-zinc-400">
            Add ingredients, see what needs to be used first, then generate recipes
            that help you cook smarter with less waste.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-panel p-5">
              <div className="text-sm uppercase tracking-wide text-zinc-500">Step 1</div>
              <div className="mt-2 text-lg font-semibold">Add pantry items</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-panel p-5">
              <div className="text-sm uppercase tracking-wide text-zinc-500">Step 2</div>
              <div className="mt-2 text-lg font-semibold">Watch freshness update</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-panel p-5">
              <div className="text-sm uppercase tracking-wide text-zinc-500">Step 3</div>
              <div className="mt-2 text-lg font-semibold">Generate the best next meal</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
