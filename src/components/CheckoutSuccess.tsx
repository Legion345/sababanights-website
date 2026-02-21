import { useEffect } from "react";
import { useCart } from "@/contexts/CartContext";

export function CheckoutSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart when success page loads
    clearCart();
  }, [clearCart]);

  const handleReturnHome = () => {
    // Remove checkout query param and scroll to top
    window.history.replaceState({}, "", window.location.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Order Successful!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your order! You'll receive an email confirmation shortly.
          Your custom t-shirt will be made and shipped within 7-10 business days.
        </p>

        {/* Order Details */}
        <div className="bg-red-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-800">
            <strong>What's next?</strong>
            <br />
            Check your email for order details and tracking information once your
            item ships.
          </p>
        </div>

        {/* Return Home Button */}
        <button
          onClick={handleReturnHome}
          className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
