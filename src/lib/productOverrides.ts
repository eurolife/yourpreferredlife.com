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
  'deep-sleep-recalibration': {
    category: 'audio',
    type: 'Audio Session',
    image: '/images/home/audio-sleep.png',
    featured: true,
    sortOrder: 20,
  },
  'i-am-worthy-affirmations': {
    category: 'audio',
    type: 'Audio Session',
    image: '/images/home/audio-worthy.png',
    featured: true,
    sortOrder: 30,
  },
  'release-and-let-go-meditation': {
    category: 'audio',
    type: 'Audio Session',
    image: '/images/home/audio-release.png',
    featured: true,
    sortOrder: 40,
  },
  'the-reality-shift': {
    category: 'book',
    type: 'PDF Book',
    image: '/images/home/book-reality.png',
    featured: true,
    sortOrder: 50,
  },
  'journal-your-way-to-clarity': {
    category: 'book',
    type: 'PDF Book',
    image: '/images/home/book-clarity.png',
    featured: true,
    sortOrder: 60,
  },
  'manifest-with-intention': {
    category: 'book',
    type: 'PDF Book',
    image: '/images/home/book-manifest.png',
    featured: true,
    sortOrder: 70,
  },
  'daily-alignment-journal': {
    category: 'book',
    type: 'PDF Book',
    image: '/images/home/book-alignment.png',
    featured: true,
    sortOrder: 80,
  },
};
