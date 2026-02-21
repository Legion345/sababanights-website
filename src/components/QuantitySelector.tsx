interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Quantity
      </label>
      <div className="flex items-center space-x-3">
        <button
          onClick={handleDecrease}
          disabled={quantity <= min}
          className={`w-10 h-10 rounded-md font-bold text-lg transition-colors ${
            quantity <= min
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-red-100 text-red-900 hover:bg-red-200"
          }`}
        >
          -
        </button>
        <span className="text-xl font-semibold text-gray-900 min-w-[3rem] text-center">
          {quantity}
        </span>
        <button
          onClick={handleIncrease}
          disabled={quantity >= max}
          className={`w-10 h-10 rounded-md font-bold text-lg transition-colors ${
            quantity >= max
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-red-100 text-red-900 hover:bg-red-200"
          }`}
        >
          +
        </button>
      </div>
    </div>
  );
}
