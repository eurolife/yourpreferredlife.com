# yourpreferredlife.com

Astro site for Your Preferred Life with Tailwind CSS, Markdown-powered blog content, and a server-side Lemon Squeezy checkout integration.

## Getting Started

```bash
npm install
npm run dev
```

Create a `.env` file from `.env.example` and add your Lemon Squeezy API key and store ID before using the checkout endpoint.

## Blog Posts

Add Markdown files to `src/content/blog`. Each post should include:

```md
---
title: "Post title"
description: "Short summary"
pubDate: 2026-07-07
---
```

## Lemon Squeezy

Lemon Squeezy is the source of truth for sellable product data: names, descriptions, prices, product IDs and variant IDs.

Sync Lemon Squeezy products into the local generated catalog with:

```bash
pnpm sync:products
```

The sync command reads `LEMON_SQUEEZY_API_KEY` and `LEMON_SQUEEZY_STORE_ID` from `.env` or your shell environment, fetches Lemon Squeezy products and variants, and rewrites `src/lib/lemonProducts.generated.ts`.

Do not edit `src/lib/lemonProducts.generated.ts` directly. For site-only presentation metadata, edit `src/lib/productOverrides.ts`. That file controls category, type label, image, featured status, sort order and optional short titles.

The practical workflow is:

1. Add or edit the product in Lemon Squeezy.
2. Run `pnpm sync:products`.
3. Add or adjust a small entry in `src/lib/productOverrides.ts` only if the site needs presentation metadata for that product.

The homepage and `/api/products` both read from `src/lib/products.ts`, which combines the generated Lemon Squeezy catalog with local overrides.

The server endpoint at `src/pages/api/create-checkout.ts` creates a checkout from a product slug:

```js
await fetch("/api/create-checkout", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ productSlug: "morning-mindset-reprogramming" }),
});
```

It still accepts a raw `variantId` for low-level testing, but product pages should prefer `productSlug`.

Keep `LEMON_SQUEEZY_API_KEY` server-only. Never expose it in client-side code.
