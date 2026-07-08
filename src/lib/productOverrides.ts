import type { ProductOverride } from './products';

// Site-only metadata keyed by the product slug generated from Lemon Squeezy.
// Product names, descriptions, prices and Lemon Squeezy IDs come from Lemon Squeezy.
export const productOverrides: Record<string, ProductOverride> = {
  'manifest-wealth-and-success-5088fda5-c0ab-4aba-bb59-7d721c148245': {
    category: 'audio',
    type: 'Audio Session',
    image: '/images/home/audio-morning.png',
    featured: true,
    sortOrder: 10,
  },
};
