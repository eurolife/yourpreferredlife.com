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

The server endpoint at `src/pages/api/create-checkout.ts` creates a checkout for a Lemon Squeezy variant ID. Call it with:

```js
await fetch("/api/create-checkout", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ variantId: "123456" }),
});
```

Keep `LEMON_SQUEEZY_API_KEY` server-only. Never expose it in client-side code.
