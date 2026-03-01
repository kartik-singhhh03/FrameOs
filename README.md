# FrameOS

A SaaS tool for creating beautiful screenshot frames, social post templates, and image exports — with a built-in referral system and Paddle subscription billing.

## Tech Stack

- **Framework** — Next.js 14 (App Router)
- **Auth** — NextAuth.js with Google OAuth
- **Database** — PostgreSQL on Neon
- **ORM** — Prisma 7
- **Payments** — Paddle (via `@paddle/paddle-node-sdk`)
- **Styling** — Tailwind CSS
- **Deployment** — Vercel

## Features

- Screenshot framing with multiple templates (Mac window, browser, Polaroid, social posts, etc.)
- Free and Pro tiers — Pro unlocks watermark-free export, 4K resolution, all templates
- Google sign-in
- Paddle subscription management with webhook handling
- Referral system — both referrer and referee get 1 free month of Pro on first purchase

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy the example below into a `.env.local` file and fill in the values:

```env
# Database (Neon PostgreSQL)
DATABASE_URL=

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Paddle
PADDLE_API_KEY=
PADDLE_WEBHOOK_SECRET=
PADDLE_ENV=sandbox          # or "production"
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=
NEXT_PUBLIC_PADDLE_PRICE_ID=
```

### 3. Push the database schema

```bash
npx prisma db push
npx prisma generate
```

### 4. Run the dev server

```bash
npm run dev
```

## Referral System

- Every new user gets a unique 8-character referral code on sign-up.
- A signed-in user can apply a referral code on the `/pricing` page before checkout.
- When the referred user completes their first purchase (`subscription.activated` webhook), both the referrer and referee receive +1 month of free Pro access.
- Rewards are idempotent — duplicate webhook deliveries grant only one reward.
- Self-referrals are rejected at the API and webhook levels.

## Environment Variables Reference

| Variable | Description |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection string (pooled) |
| `NEXTAUTH_URL` | Full URL of the app (e.g. `https://frameos.app`) |
| `NEXTAUTH_SECRET` | Random secret for NextAuth JWT signing |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `PADDLE_API_KEY` | Paddle server-side API key |
| `PADDLE_WEBHOOK_SECRET` | Paddle webhook signing secret |
| `PADDLE_ENV` | `sandbox` or `production` |
| `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` | Paddle client-side token |
| `NEXT_PUBLIC_PADDLE_PRICE_ID` | Paddle price ID for the Pro plan |

## Deployment

Deploy to Vercel with the environment variables above set in the project settings. Make sure the Paddle webhook endpoint is set to:

```
https://your-domain.com/api/webhook
```

## License

MIT
