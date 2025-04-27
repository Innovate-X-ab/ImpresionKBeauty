//src/components/layout/FeaturedProducts.tsx

'use client';

import Image from 'next/image';

export default function FeaturedProducts() {
  return (
    <>
     

      {/* Bestsellers Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Decorative heading */}
          <div className="relative flex flex-col items-center mb-10 sm:mb-16">
            <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-gray-400 mb-3 sm:mb-4">Shop Now</span>
            <h2 className="text-2xl sm:text-3xl text-black font-light mb-3 sm:mb-4 relative">
              Bestsellers
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-0.5 bg-black"></span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {[
              {
                name: 'Advanced Snail Mucin',
                price: 29.99,
                image: '/images/products/snail-mucin.jpg',
                brand: 'COSRX',
                rating: 4.8
              },
              {
                name: 'Hydrating Toner',
                price: 24.99,
                image: '/images/products/toner.jpg',
                brand: 'Klairs',
                rating: 4.7
              },
              {
                name: 'Vitamin C Serum',
                price: 34.99,
                image: '/images/products/vitamin-c.jpg',
                brand: 'Some By Mi',
                rating: 4.9
              },
              {
                name: 'Clay Mask',
                price: 19.99,
                image: '/images/products/clay-mask.jpg',
                brand: 'Innisfree',
                rating: 4.6
              }
            ].map((product, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative aspect-square overflow-hidden mb-3 sm:mb-4 bg-white">
                  <Image 
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {/* Quick view button */}
                  <button className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-white text-black px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm uppercase tracking-wider opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    Quick View
                  </button>
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">{product.brand}</span>
                <h4 className="text-xs sm:text-sm font-medium mb-1 transition-colors duration-300 group-hover:text-gray-700">
                  {product.name}
                </h4>
                <div className="flex items-center justify-between">
                  <p className="text-xs sm:text-sm text-gray-900">${product.price}</p>
                  <span className="text-xs text-gray-500">★ {product.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}