import type { IncomingMessage, ServerResponse } from "node:http";
import Stripe from "stripe";

const DEFAULT_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS2Px5jdK9yo8WJBrNyVsvPcujAWS8Rr1TfpVp1Z8SoMXfD4rPdOmBndNb3mM-BozQWcQ-L7HSjk8Kd/pub?output=csv";

const SHEET_URL = process.env.CAMPAIGN_SHEET_URL ?? DEFAULT_SHEET_URL;

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export default async function handler(
  _req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  res.setHeader("content-type", "application/json");
  // Cache on Vercel's edge for 60s (with revalidate); browsers get a fresh value each visit.
  res.setHeader(
    "cache-control",
    "public, s-maxage=60, stale-while-revalidate=300",
  );

  try {
    const [sheet, stripeCents] = await Promise.all([
      fetchSheet(),
      fetchStripeTotalCents(),
    ]);

    const offlineCents = sheet.offlineCents;
    const totalCents = offlineCents + stripeCents;

    res.statusCode = 200;
    res.end(
      JSON.stringify({
        raised_cents: totalCents,
        goal_cents: sheet.goalCents,
        offline_cents: offlineCents,
        stripe_cents: stripeCents,
        as_of: sheet.asOf,
      }),
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("campaign-progress error:", message);
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        raised_cents: 0,
        goal_cents: 30_000_000, // $300,000 fallback so UI still renders sensibly
        offline_cents: 0,
        stripe_cents: 0,
        as_of: null,
        error: message,
      }),
    );
  }
}

type SheetResult = {
  goalCents: number;
  offlineCents: number;
  asOf: string | null;
};

async function fetchSheet(): Promise<SheetResult> {
  const response = await fetch(SHEET_URL, {
    headers: { accept: "text/csv" },
  });
  if (!response.ok) {
    throw new Error(`Sheet fetch failed: ${response.status}`);
  }
  const csv = await response.text();
  return parseSheet(csv);
}

// Parses our campaign sheet CSV. Expected shape (header + values row), columns
// labelled goal, offline_raised, as_of in any order. Leading/blank columns OK.
export function parseSheet(csv: string): SheetResult {
  const rows = csv
    .split(/\r?\n/)
    .map((line) => parseCsvLine(line))
    .filter((cols) => cols.some((c) => c.trim() !== ""));

  if (rows.length < 2) {
    return { goalCents: 30_000_000, offlineCents: 0, asOf: null };
  }

  // Find the header row (one that contains 'goal' literal)
  const headerIdx = rows.findIndex((row) =>
    row.some((c) => c.trim().toLowerCase() === "goal"),
  );
  if (headerIdx === -1) {
    return { goalCents: 30_000_000, offlineCents: 0, asOf: null };
  }

  const header = rows[headerIdx].map((c) => c.trim().toLowerCase());
  const valueRow = rows[headerIdx + 1] ?? [];

  const get = (key: string): string => {
    const idx = header.indexOf(key);
    return idx === -1 ? "" : (valueRow[idx] ?? "").trim();
  };

  return {
    goalCents: parseUsdToCents(get("goal"), 30_000_000),
    offlineCents: parseUsdToCents(get("offline_raised"), 0),
    asOf: get("as_of") || null,
  };
}

function parseCsvLine(line: string): string[] {
  // Minimal CSV parse: handles quoted fields with commas + escaped quotes.
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cur += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      out.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}

function parseUsdToCents(value: string, fallback: number): number {
  if (!value) return fallback;
  const cleaned = value.replace(/[^0-9.\-]/g, "");
  if (!cleaned) return fallback;
  const n = Number.parseFloat(cleaned);
  if (!Number.isFinite(n)) return fallback;
  return Math.round(n * 100);
}

async function fetchStripeTotalCents(): Promise<number> {
  if (!stripe) return 0;
  try {
    let total = 0;
    // Iterate all succeeded charges. Stripe auto-pages with `for await`.
    for await (const charge of stripe.charges.list({ limit: 100 })) {
      if (
        charge.status === "succeeded" &&
        !charge.refunded &&
        charge.paid &&
        charge.currency === "usd"
      ) {
        // Subtract any partial refunds.
        const net = (charge.amount ?? 0) - (charge.amount_refunded ?? 0);
        if (net > 0) total += net;
      }
    }
    return total;
  } catch (err) {
    console.error("Stripe total fetch failed:", err);
    return 0;
  }
}
