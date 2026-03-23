export type FreshnessTone = "green" | "yellow" | "red" | "neutral";

export function getFreshnessState(expiresAt?: string | Date | null) {
  if (!expiresAt) {
    return {
      label: "unknown",
      tone: "neutral" as FreshnessTone,
      daysLeft: null as number | null,
    };
  }

  const now = new Date();
  const expiry = new Date(expiresAt);
  const diffMs = expiry.getTime() - now.getTime();
  const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (daysLeft < 0) {
    return { label: "expired", tone: "red" as FreshnessTone, daysLeft };
  }

  if (daysLeft <= 2) {
    return { label: "urgent", tone: "red" as FreshnessTone, daysLeft };
  }

  if (daysLeft <= 5) {
    return { label: "expiring soon", tone: "yellow" as FreshnessTone, daysLeft };
  }

  return { label: "fresh", tone: "green" as FreshnessTone, daysLeft };
}

export function toneClasses(tone: FreshnessTone) {
  switch (tone) {
    case "green":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
    case "yellow":
      return "border-yellow-500/30 bg-yellow-500/10 text-yellow-200";
    case "red":
      return "border-red-500/30 bg-red-500/10 text-red-300";
    default:
      return "border-white/10 bg-white/5 text-zinc-300";
  }
}
