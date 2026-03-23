# Smart Pantry AI — Polished MVP

A production-style starter repo for an AI ingredient-based recipe planner and visual shelf-life tracker.

## Included
- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Clerk auth
- Prisma + PostgreSQL schema
- Pantry CRUD API
- Freshness tracking
- AI recipe generation route
- Polished landing page and dashboard UI

## Setup

Install dependencies:

```bash
npm install
```

Copy environment variables:

```bash
cp .env.example .env
```

Add your database, Clerk, and OpenAI keys.

Run Prisma migration:

```bash
npx prisma migrate dev --name init
```

Start dev server:

```bash
npm run dev
```

## Core loop
1. Sign in
2. Add pantry items
3. View freshness states
4. Generate recipes from pantry ingredients

## Best next upgrades
- Stripe billing and Pro gating
- Saved recipes page
- Edit/delete pantry controls in the UI
- Weekly meal planner
- Grocery list generator
