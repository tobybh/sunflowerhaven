# Sunflower Haven

Marketing and donation site for **Sunflower Haven**, a transitional-housing nonprofit in Chesterton, IN.

Live at: https://sunflower-haven.vercel.app

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- React Router v7
- Deployed on Vercel (static frontend + serverless functions in `/api`)

## Local development

```bash
npm install
npm run dev          # Vite dev server (frontend only)
npx vercel dev       # Vite + /api serverless functions
```

`npm run dev` alone will not run the `/api` functions. Use `vercel dev` for full-stack local testing (donation flow, campaign progress endpoint).

## Environment variables

Copy `.env.example` to `.env` and fill in real values for local development. In production, these are configured in the Vercel dashboard → Settings → Environment Variables.

| Variable | Required | Purpose |
|---|---|---|
| `STRIPE_SECRET_KEY` | yes | Stripe API key (`sk_test_…` for sandbox, `sk_live_…` for production). Used by `/api/create-checkout-session` and `/api/campaign-progress`. |
| `CAMPAIGN_SHEET_URL` | no | Override the published Google Sheet CSV URL used for offline-donations + goal. Defaults to the shared campaign sheet if unset. |

## Project layout

```
api/                          Vercel serverless functions
  create-checkout-session.ts    Creates a Stripe Checkout Session for a chosen amount/frequency
  campaign-progress.ts          Sums the campaign sheet + live Stripe donations
public/                       Static assets (logos, favicons)
src/
  app/
    App.tsx, routes.tsx        Router entry
    components/                Layout, Logo, page components
    lib/                       React hooks (e.g. useCampaignProgress)
  styles/                      Tailwind + brand tokens
vercel.json                   SPA rewrite so React Router owns non-/api URLs
```

## Third-party integrations

| Service | What it's for | Where it's wired |
|---|---|---|
| **Stripe** | Donation processing | `/api/create-checkout-session.ts`, Donate page |
| **Formspree** | Contact form inbox | `Contact.tsx` (endpoint `xqeozlqe`) |
| **Google Sheets** | Campaign totals (published-to-web CSV) | `/api/campaign-progress.ts` |

Each service is owned by whoever created its account — swap credentials there when transferring ownership.

## Deploy

```bash
npm run build
npx vercel --prod
```

If the repo is connected to Vercel through Git integration, every push to `main` auto-deploys.
