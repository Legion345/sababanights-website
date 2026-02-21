import { getStripe } from "./stripe";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  productId: string;
  product: {
    name: string;
    price: number;
    stripePriceId: string;
  };
  size: string;
  color: {
    name: string;
    hexCode: string;
  };
  quantity: number;
  priceAtAdd: number;
}

export async function redirectToCheckout(cartItems: CartItem[]) {
  try {
    const stripe = await getStripe();

    if (!stripe) {
      toast.error("Payment system unavailable. Please check configuration.");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Build metadata with order details
    const metadata: Record<string, string> = {};
    cartItems.forEach((item, index) => {
      metadata[`item_${index}_product`] = item.product.name;
      metadata[`item_${index}_size`] = item.size;
      metadata[`item_${index}_color`] = item.color.name;
      metadata[`item_${index}_quantity`] = item.quantity.toString();
    });

    // Build line items for Stripe
    const lineItems = cartItems.map((item) => ({
      price: item.product.stripePriceId,
      quantity: item.quantity,
    }));

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      lineItems,
      mode: "payment",
      successUrl: `${window.location.origin}/?checkout=success`,
      cancelUrl: `${window.location.origin}/?checkout=cancelled`,
      shippingAddressCollection: {
        allowedCountries: ["US", "CA"],
      },
      paymentIntentData: {
        metadata,
      },
    });

    if (error) {
      console.error("Stripe checkout error:", error);
      toast.error(error.message || "Failed to redirect to checkout");
    }
  } catch (error) {
    console.error("Checkout error:", error);
    toast.error("An error occurred. Please try again.");
  }
}
