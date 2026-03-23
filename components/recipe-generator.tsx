"use client";

import { useState } from "react";

type RecipeResponse = {
  title: string;
  description: string;
  prepMinutes: number;
  cookMinutes: number;
  servings: number;
  ingredientsUsed: string[];
  missingIngredients: string[];
  steps: string[];
  wasteSavingTip: string;
};

export function RecipeGenerator() {
  const [mode, setMode] = useState("expiring-soon");
  const [cuisine, setCuisine] = useState("");
  const [mealType, setMealType] = useState("dinner");
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<RecipeResponse | null>(null);

  async function generate() {
    setLoading(true);
    setRecipe(null);

    try {
      const res = await fetch("/api/recipes/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, cuisine, mealType }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate recipe");
      }

      const data = await res.json();
      setRecipe(data.recipe);
    } catch (error) {
      console.error(error);
      alert("Could not generate recipe.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-3 rounded-[2rem] border border-white/10 bg-panel p-4 md:grid-cols-3">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
        >
          <option value="expiring-soon">Expiring Soon Mode</option>
          <option value="pantry-only">Pantry Only</option>
          <option value="pantry-first">Pantry First</option>
        </select>

        <input
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          placeholder="Cuisine (optional)"
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
        />

        <select
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>
      </div>

      <button
        onClick={generate}
        disabled={loading}
        className="rounded-2xl bg-gold px-5 py-3 font-semibold text-black shadow-gold disabled:opacity-60"
      >
        {loading ? "Generating..." : "Generate Recipe"}
      </button>

      {recipe ? (
        <div className="rounded-[2rem] border border-white/10 bg-panel p-6">
          <h2 className="text-2xl font-bold">{recipe.title}</h2>
          <p className="mt-2 text-zinc-400">{recipe.description}</p>

          <div className="mt-4 flex flex-wrap gap-2 text-sm text-zinc-300">
            <span className="rounded-full border border-white/10 px-3 py-1">
              Prep {recipe.prepMinutes} min
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1">
              Cook {recipe.cookMinutes} min
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1">
              Serves {recipe.servings}
            </span>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-semibold">Ingredients Used</h3>
              <ul className="space-y-2 text-zinc-300">
                {recipe.ingredientsUsed.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold">Missing Ingredients</h3>
              <ul className="space-y-2 text-zinc-300">
                {recipe.missingIngredients?.length ? (
                  recipe.missingIngredients.map((item, i) => <li key={i}>• {item}</li>)
                ) : (
                  <li>• None</li>
                )}
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-semibold">Steps</h3>
            <ol className="space-y-3 text-zinc-300">
              {recipe.steps.map((step, i) => (
                <li key={i}>
                  {i + 1}. {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
            Waste-saving tip: {recipe.wasteSavingTip}
          </div>
        </div>
      ) : null}
    </div>
  );
}
