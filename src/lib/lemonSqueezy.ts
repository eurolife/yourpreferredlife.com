const API_BASE_URL = "https://api.lemonsqueezy.com/v1";

type JsonApiResource<TType extends string, TAttributes> = {
  type: TType;
  id: string;
  attributes: TAttributes;
};

type JsonApiResponse<TType extends string, TAttributes> = {
  data: JsonApiResource<TType, TAttributes>;
};

type JsonApiListResponse<TType extends string, TAttributes> = {
  data: JsonApiResource<TType, TAttributes>[];
};

type CheckoutAttributes = {
  url: string;
  store_id: number;
  variant_id: number;
  custom_price?: number;
  test_mode: boolean;
};

type CheckoutOptions = Record<string, unknown>;
type CheckoutData = Record<string, unknown>;
type ProductOptions = Record<string, unknown>;

export type LemonSqueezyProductAttributes = {
  store_id: number;
  name: string;
  slug: string;
  description: string;
  status: "draft" | "published";
  price: number;
  price_formatted: string;
  buy_now_url: string;
  test_mode: boolean;
};

export type LemonSqueezyVariantAttributes = {
  product_id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  status: "pending" | "draft" | "published";
  test_mode: boolean;
};

export type CreateCheckoutInput = {
  variantId: string;
  storeId?: string;
  customPrice?: number;
  productOptions?: ProductOptions;
  checkoutOptions?: CheckoutOptions;
  checkoutData?: CheckoutData;
  testMode?: boolean;
  expiresAt?: string | null;
};

function getApiKey() {
  const apiKey = import.meta.env.LEMON_SQUEEZY_API_KEY;

  if (!apiKey) {
    throw new Error("Missing LEMON_SQUEEZY_API_KEY.");
  }

  return apiKey;
}

function getStoreId(storeId?: string) {
  const resolvedStoreId = storeId ?? import.meta.env.LEMON_SQUEEZY_STORE_ID;

  if (!resolvedStoreId) {
    throw new Error("Missing LEMON_SQUEEZY_STORE_ID.");
  }

  return resolvedStoreId;
}

export async function lemonSqueezyRequest<T>(path: string, init: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${getApiKey()}`,
      ...init.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Lemon Squeezy API error ${response.status}: ${errorText}`);
  }

  return response.json() as Promise<T>;
}

export function createCheckout(input: CreateCheckoutInput) {
  const storeId = getStoreId(input.storeId);

  return lemonSqueezyRequest<JsonApiResponse<"checkouts", CheckoutAttributes>>("/checkouts", {
    method: "POST",
    body: JSON.stringify({
      data: {
        type: "checkouts",
        attributes: {
          custom_price: input.customPrice,
          product_options: {
            enabled_variants: [Number(input.variantId)],
            ...input.productOptions,
          },
          checkout_options: input.checkoutOptions,
          checkout_data: input.checkoutData,
          expires_at: input.expiresAt,
          test_mode: input.testMode,
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: storeId,
            },
          },
          variant: {
            data: {
              type: "variants",
              id: input.variantId,
            },
          },
        },
      },
    }),
  });
}

export function listProducts(storeId?: string) {
  const resolvedStoreId = storeId ?? import.meta.env.LEMON_SQUEEZY_STORE_ID;
  const query = resolvedStoreId ? `?filter[store_id]=${encodeURIComponent(resolvedStoreId)}` : "";

  return lemonSqueezyRequest<JsonApiListResponse<"products", LemonSqueezyProductAttributes>>(
    `/products${query}`,
  );
}

export function listVariants(productId?: string) {
  const query = productId ? `?filter[product_id]=${encodeURIComponent(productId)}` : "";

  return lemonSqueezyRequest<JsonApiListResponse<"variants", LemonSqueezyVariantAttributes>>(
    `/variants${query}`,
  );
}
