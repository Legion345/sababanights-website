import { useData } from "@/contexts/DataContext";
import { ProductCard } from "./ProductCard";

export function Shop() {
  const { products } = useData();

  return (
    <section id="shop" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-red-900 mb-4">
            Sababa Nights Shop 👕
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Show your love for Israeli folk dancing with our exclusive merchandise.
            All items are made-to-order just for you!
          </p>
        </div>

        {/* Made-to-Order Notice Banner */}
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-12">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">ℹ️</span>
            <div>
              <h3 className="font-semibold text-red-900 mb-2">
                Made-to-Order Products
              </h3>
              <p className="text-sm text-red-800">
                Each item is custom-made after you order. Please allow 7-10 business
                days for production and shipping. Due to the custom nature of these
                products, we cannot accept returns or exchanges. If you have questions
                about sizing or colors, please contact us before ordering!
              </p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Products coming soon! Check back later.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
