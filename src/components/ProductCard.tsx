import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { SizeSelector } from "./SizeSelector";
import { ColorSelector } from "./ColorSelector";
import { QuantitySelector } from "./QuantitySelector";

interface ProductColor {
  name: string;
  hexCode: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  stripePriceId: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }

    addToCart(product, selectedSize, selectedColor, quantity);

    // Reset selections after adding to cart
    setSelectedSize("");
    setSelectedColor(null);
    setQuantity(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Product Image */}
      <div className="aspect-square bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
        {product.images[0] && product.images[0] !== "/placeholder-tshirt.jpg" ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center p-8">
            <span className="text-8xl">👕</span>
            <p className="mt-4 text-gray-500 text-sm">Product Image Coming Soon</p>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {formatPrice(product.price)}
          </p>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed">
          {product.description}
        </p>

        {/* Made-to-Order Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
          <p className="text-xs text-yellow-800">
            ⏱️ <strong>Made-to-Order:</strong> Ships in 7-10 business days
          </p>
        </div>

        {/* Size Selection */}
        <SizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSizeChange={setSelectedSize}
        />

        {/* Color Selection */}
        <ColorSelector
          colors={product.colors}
          selectedColor={selectedColor}
          onColorChange={setSelectedColor}
        />

        {/* Quantity Selection */}
        <QuantitySelector
          quantity={quantity}
          onQuantityChange={setQuantity}
        />

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
