"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  onCreated?: () => void;
};

export function PantryForm({ onCreated }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [category, setCategory] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/pantry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          quantity: quantity ? Number(quantity) : null,
          unit: unit || null,
          category: category || null,
          expiresAt: expiresAt || null,
          notes: notes || null,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create pantry item");
      }

      setName("");
      setQuantity("");
      setUnit("");
      setCategory("");
      setExpiresAt("");
      setNotes("");
      onCreated?.();
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Could not add pantry item.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 rounded-[2rem] border border-white/10 bg-panel p-4 md:grid-cols-2"
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ingredient name"
        className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
        required
      />
      <input
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
        className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
      />
      <input
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        placeholder="Unit (g, cups, pcs)"
        className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
      />
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
      />
      <input
        value={expiresAt}
        onChange={(e) => setExpiresAt(e.target.value)}
        type="date"
        className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
      />
      <input
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes"
        className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
      />
      <button
        disabled={loading}
        className="rounded-2xl bg-gold px-4 py-3 font-semibold text-black disabled:opacity-60 md:col-span-2"
      >
        {loading ? "Adding..." : "Add Pantry Item"}
      </button>
    </form>
  );
}
