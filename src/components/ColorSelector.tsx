interface ProductColor {
  name: string;
  hexCode: string;
}

interface ColorSelectorProps {
  colors: ProductColor[];
  selectedColor: ProductColor | null;
  onColorChange: (color: ProductColor) => void;
}

export function ColorSelector({ colors, selectedColor, onColorChange }: ColorSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Color
      </label>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => onColorChange(color)}
            className={`group relative w-10 h-10 rounded-full transition-all ${
              selectedColor?.name === color.name
                ? "ring-4 ring-red-600 ring-offset-2"
                : "ring-2 ring-gray-300 hover:ring-red-500"
            }`}
            title={color.name}
            style={{ backgroundColor: color.hexCode }}
          >
            {/* Tooltip */}
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {color.name}
            </span>

            {/* Checkmark for white color visibility */}
            {selectedColor?.name === color.name && color.hexCode === "#ffffff" && (
              <span className="absolute inset-0 flex items-center justify-center text-red-600 text-lg">
                ✓
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
