import { useEffect, useState } from "react";

export type CampaignProgress = {
  raisedCents: number;
  goalCents: number;
  offlineCents: number;
  stripeCents: number;
  asOf: string | null;
  loading: boolean;
  error: string | null;
};

type ApiResponse = {
  raised_cents: number;
  goal_cents: number;
  offline_cents: number;
  stripe_cents: number;
  as_of: string | null;
  error?: string;
};

const FALLBACK: CampaignProgress = {
  raisedCents: 0,
  goalCents: 30_000_000,
  offlineCents: 0,
  stripeCents: 0,
  asOf: null,
  loading: true,
  error: null,
};

export function useCampaignProgress(): CampaignProgress {
  const [state, setState] = useState<CampaignProgress>(FALLBACK);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/campaign-progress")
      .then((r) => r.json() as Promise<ApiResponse>)
      .then((data) => {
        if (cancelled) return;
        setState({
          raisedCents: data.raised_cents,
          goalCents: data.goal_cents,
          offlineCents: data.offline_cents,
          stripeCents: data.stripe_cents,
          asOf: data.as_of,
          loading: false,
          error: data.error ?? null,
        });
      })
      .catch((err) => {
        if (cancelled) return;
        setState((prev) => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : "Unknown error",
        }));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

// Format a cents value as a compact dollar string: 36000 -> "$360", 3600000 -> "$36K".
export function formatCompactDollars(cents: number): string {
  const dollars = Math.round(cents / 100);
  if (dollars >= 1_000_000) {
    const v = dollars / 1_000_000;
    return `$${v >= 10 ? Math.round(v) : v.toFixed(1)}M`;
  }
  if (dollars >= 1_000) {
    const v = dollars / 1_000;
    return `$${v >= 10 ? Math.round(v) : v.toFixed(1).replace(/\.0$/, "")}K`;
  }
  return `$${dollars.toLocaleString("en-US")}`;
}

export function clampPercent(raisedCents: number, goalCents: number): number {
  if (goalCents <= 0) return 0;
  return Math.min(100, Math.max(0, (raisedCents / goalCents) * 100));
}
