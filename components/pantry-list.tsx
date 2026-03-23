import { getFreshnessState, toneClasses } from "@/lib/freshness";

type PantryItem = {
  id: string;
  name: string;
  quantity: number | null;
  unit: string | null;
  category: string | null;
  expiresAt: string | Date | null;
  notes: string | null;
};

export function PantryList({ items }: { items: PantryItem[] }) {
  if (!items.length) {
    return (
      <div className="rounded-[2rem] border border-dashed border-white/10 bg-panel p-8 text-center text-zinc-400">
        No pantry items yet. Add ingredients to start generating recipes.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => {
        const freshness = getFreshnessState(item.expiresAt);

        return (
          <div
            key={item.id}
            className="rounded-[2rem] border border-white/10 bg-panel p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <div className="mt-1 text-sm text-zinc-400">
                  {item.quantity ?? "—"} {item.unit ?? ""}
                  {item.category ? ` • ${item.category}` : ""}
                </div>
              </div>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${toneClasses(
                  freshness.tone
                )}`}
              >
                {freshness.label}
              </span>
            </div>

            <div className="mt-4 text-sm text-zinc-400">
              {item.expiresAt
                ? `Expires ${new Date(item.expiresAt).toLocaleDateString()}${
                    typeof freshness.daysLeft === "number"
                      ? ` • ${freshness.daysLeft} day(s) left`
                      : ""
                  }`
                : "No expiry date set"}
            </div>

            {item.notes ? (
              <p className="mt-3 text-sm text-zinc-300">{item.notes}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
