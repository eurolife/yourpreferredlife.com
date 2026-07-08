import { lemonCatalogProducts } from "./lemonProducts.generated";
import { productOverrides } from "./productOverrides";

export type ProductCategory = "audio" | "book";

export type LemonCatalogProduct = {
  slug: string;
  title: string;
  description: string;
  priceCents: number;
  currency: "GBP";
  lemonSqueezy: {
    productId: string;
    variantId: string;
    buyNowUrl?: string;
    thumbUrl?: string;
    largeThumbUrl?: string;
    productStatus?: string;
    variantStatus?: string;
    testMode?: boolean;
  };
};

export type ProductOverride = {
  category?: ProductCategory;
  type?: string;
  image?: string;
  featured?: boolean;
  sortOrder?: number;
  shortTitle?: string;
};

export type Product = LemonCatalogProduct & {
  category: ProductCategory;
  type: string;
  image: string;
  featured: boolean;
  sortOrder: number;
  shortTitle?: string;
};

const defaultProductImages: Record<ProductCategory, string> = {
  audio: "/images/home/audio-morning.png",
  book: "/images/home/book-reality.png",
};

function inferCategory(product: LemonCatalogProduct): ProductCategory {
  const searchable = `${product.title} ${product.description}`.toLowerCase();
  const audioTerms = ["audio", "meditation", "affirmation", "sleep", "recalibration", "session"];

  return audioTerms.some((term) => searchable.includes(term)) ? "audio" : "book";
}

function toProduct(product: LemonCatalogProduct, index: number): Product {
  const override: ProductOverride = productOverrides[product.slug] ?? {};
  const category: ProductCategory = override.category ?? inferCategory(product);

  return {
    ...product,
    category,
    type: override.type ?? (category === "audio" ? "Audio Session" : "PDF Book"),
    image: override.image ?? product.lemonSqueezy.largeThumbUrl ?? product.lemonSqueezy.thumbUrl ?? defaultProductImages[category],
    featured: override.featured ?? true,
    sortOrder: override.sortOrder ?? (index + 1) * 10,
    shortTitle: override.shortTitle,
  };
}

export const products = lemonCatalogProducts.map(toProduct);

export function formatPrice(product: Pick<Product, "currency" | "priceCents">) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: product.currency,
  }).format(product.priceCents / 100);
}

export function getProductsByCategory(category: ProductCategory) {
  return products
    .filter((product) => product.category === category)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getFeaturedProductsByCategory(category: ProductCategory) {
  return getProductsByCategory(category).filter((product) => product.featured);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
