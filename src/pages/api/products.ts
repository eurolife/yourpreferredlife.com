import type { APIRoute } from "astro";
import { formatPrice, products } from "../../lib/products";

export const GET: APIRoute = async () => {
  return Response.json({
    products: products.map((product) => ({
      slug: product.slug,
      title: product.title,
      category: product.category,
      type: product.type,
      description: product.description,
      priceCents: product.priceCents,
      price: formatPrice(product),
      image: product.image,
      featured: product.featured,
      sortOrder: product.sortOrder,
      configuredForCheckout: Boolean(product.lemonSqueezy.variantId),
    })),
  });
};
