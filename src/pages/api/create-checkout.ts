import type { APIRoute } from "astro";
import { createCheckout } from "../../lib/lemonSqueezy";
import { getProductBySlug } from "../../lib/products";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const productSlug = String(body.productSlug ?? "");
    const product = productSlug ? getProductBySlug(productSlug) : undefined;
    const variantId = String(product?.lemonSqueezy.variantId ?? body.variantId ?? "");

    if (productSlug && !product) {
      return Response.json({ error: "Product not found." }, { status: 404 });
    }

    if (!variantId) {
      return Response.json(
        {
          error: product
            ? `Missing Lemon Squeezy variant ID for "${product.title}". Add it in src/lib/products.ts.`
            : "productSlug or variantId is required.",
        },
        { status: 400 },
      );
    }

    const checkout = await createCheckout({
      variantId,
      productOptions: body.productOptions,
      checkoutOptions: body.checkoutOptions,
      checkoutData: body.checkoutData,
      customPrice: body.customPrice,
      testMode: body.testMode,
    });

    return Response.json({
      checkoutUrl: checkout.data.attributes.url,
      checkout,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create checkout.";
    return Response.json({ error: message }, { status: 500 });
  }
};
