import type { APIRoute } from "astro";
import { createCheckout } from "../../lib/lemonSqueezy";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const variantId = String(body.variantId ?? "");

    if (!variantId) {
      return Response.json({ error: "variantId is required." }, { status: 400 });
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
