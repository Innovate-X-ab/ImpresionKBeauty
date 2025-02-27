//src/components/layout/FeaturedProducts.tsx

'use client';

import Link from "next/link";

export default function FeaturedProducts() {
  return (
    <>
      {/* Featured Collections */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 bg-white">
          {/* Decorative heading */}
          <div className="relative flex flex-col items-center mb-16">
            <span className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">Discover</span>
            <h2 className="text-3xl text-black font-light mb-4 relative">
              Featured Collections
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-black"></span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Skincare', image: '/images/placeholder-600x800.jpg', description: 'Discover radiant skin' },
              { title: 'Makeup', image: '/images/placeholder-400x400.jpg', description: 'Enhance your beauty' },
              { title: 'New Arrivals', image: '/images/placeholder-600x800.jpg', description: 'Latest innovations' }
            ].map((collection, index) => (
              <Link href={`/collections/${collection.title.toLowerCase()}`} key={index} className="group">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={collection.image} 
                    alt={collection.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
                    <h3 className="text-white text-2xl font-light tracking-wider mb-2">{collection.title}</h3>
                    <p className="text-white/80 text-sm tracking-wider transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {collection.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Decorative heading */}
          <div className="relative flex flex-col items-center mb-16">
            <span className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">Shop Now</span>
            <h2 className="text-3xl text-black font-light mb-4 relative">
              Bestsellers
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-black"></span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { name: 'Advanced Snail Mucin', price: 29.99 },
              { name: 'Hydrating Toner', price: 24.99 },
              { name: 'Vitamin C Serum', price: 34.99 },
              { name: 'Clay Mask', price: 19.99 }
            ].map((product, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative aspect-square overflow-hidden mb-4 bg-white">
                  <img 
                    src="/images/placeholder-400x400.jpg"
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <h4 className="text-sm font-medium mb-1 transition-colors duration-300 group-hover:text-gray-700">
                  {product.name}
                </h4>
                <p className="text-sm text-gray-500">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}