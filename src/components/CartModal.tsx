import { useCart } from "@/contexts/CartContext";
import { redirectToCheckout } from "@/lib/checkout";
import { QuantitySelector } from "./QuantitySelector";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, totalPrice, updateQuantity, removeFromCart } = useCart();

  if (!isOpen) return null;

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;
    await redirectToCheckout(items);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close cart"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <span className="text-6xl mb-4">🛒</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-500">
                Add some items to get started!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-lg p-4 space-y-3"
                >
                  {/* Product Info */}
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-md flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">👕</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Size: <span className="font-medium">{item.size}</span>
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-600">Color:</span>
                        <div
                          className="w-4 h-4 rounded-full border-2 border-gray-300"
                          style={{ backgroundColor: item.color.hexCode }}
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {item.color.name}
                        </span>
                      </div>
                      <p className="text-lg font-bold text-red-600 mt-2">
                        {formatPrice(item.priceAtAdd)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between">
                    <QuantitySelector
                      quantity={item.quantity}
                      onQuantityChange={(qty) => updateQuantity(item.id, qty)}
                      min={0}
                    />
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6 space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between text-xl font-bold">
              <span className="text-gray-900">Total:</span>
              <span className="text-red-600">{formatPrice(totalPrice)}</span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-red-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
            >
              Proceed to Checkout
            </button>

            {/* Security Notice */}
            <p className="text-xs text-gray-500 text-center">
              🔒 Secure checkout powered by Stripe
            </p>
          </div>
        )}
      </div>
    </>
  );
}
