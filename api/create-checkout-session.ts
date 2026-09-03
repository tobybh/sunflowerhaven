import type { IncomingMessage, ServerResponse } from "node:http";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

const MIN_CENTS = 100;
const MAX_CENTS = 100_000_00;

type ReqWithBody = IncomingMessage & { body?: unknown };

export default async function handler(
  req: ReqWithBody,
  res: ServerResponse,
): Promise<void> {
  if (req.method !== "POST") {
    return send(res, 405, { error: "Method not allowed" });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return send(res, 500, { error: "Stripe is not configured on the server." });
  }

  let body: { amount?: number; recurring?: boolean };
  try {
    body = await readJson(req);
  } catch {
    return send(res, 400, { error: "Invalid JSON body." });
  }

  const amountCents = Math.round(Number(body.amount) * 100);
  const recurring = Boolean(body.recurring);

  if (
    !Number.isFinite(amountCents) ||
    amountCents < MIN_CENTS ||
    amountCents > MAX_CENTS
  ) {
    return send(res, 400, {
      error: "Donation must be between $1 and $100,000.",
    });
  }

  const origin = getOrigin(req);
  const successUrl = `${origin}/donate?status=success&session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${origin}/donate?status=cancelled`;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: recurring ? "subscription" : "payment",
      submit_type: recurring ? undefined : "donate",
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: false,
      billing_address_collection: "auto",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amountCents,
            product_data: {
              name: recurring
                ? "Sunflower Haven Monthly Donation"
                : "Sunflower Haven Charitable Contribution",
              description:
                "Supporting transitional housing and services for adults in Chesterton, IN.",
            },
            ...(recurring ? { recurring: { interval: "month" as const } } : {}),
          },
        },
      ],
      metadata: {
        source: "sunflower-haven-website",
        recurring: String(recurring),
      },
    });

    return send(res, 200, { url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Stripe checkout error:", message);
    return send(res, 500, { error: message });
  }
}

function send(res: ServerResponse, status: number, data: unknown): void {
  res.statusCode = status;
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify(data));
}

async function readJson(req: ReqWithBody): Promise<any> {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body);

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function getOrigin(req: IncomingMessage): string {
  const fromHeader = req.headers.origin;
  if (typeof fromHeader === "string" && fromHeader) return fromHeader;
  const host = req.headers.host;
  const proto =
    (req.headers["x-forwarded-proto"] as string | undefined) ?? "https";
  return host ? `${proto}://${host}` : "";
}
