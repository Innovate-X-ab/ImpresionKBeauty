// src/components/layout/FeaturedProducts.tsx
export default function FeaturedProducts() {
    const products = [
      {
        id: 1,
        name: "COSRX Advanced Snail Mucin",
        brand: "COSRX",
        price: 21.99,
        image: "/api/placeholder/300/300"
      },
      // Add more sample products
    ];
  
    return (
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 space-y-1">
                  <p className="text-sm text-gray-500">{product.brand}</p>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="font-semibold">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }