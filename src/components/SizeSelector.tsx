interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

export function SizeSelector({ sizes, selectedSize, onSizeChange }: SizeSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Size
      </label>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`px-4 py-2 border-2 rounded-md font-medium transition-all ${
              selectedSize === size
                ? "border-red-600 bg-red-50 text-red-900"
                : "border-gray-300 hover:border-red-500 text-gray-700"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
