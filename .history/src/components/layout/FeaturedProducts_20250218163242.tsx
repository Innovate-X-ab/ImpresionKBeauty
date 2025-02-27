// src/components/layout/FeaturedProducts.tsx
'use client';

import Link from "next/link";

export default function FeaturedProducts() {
  return (
    <>
      {/* Featured Collections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-12">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Skincare', image: '/api/placeholder/600/800' },
              { title: 'Makeup', image: '/api/placeholder/600/800' },
              { title: 'New Arrivals', image: '/api/placeholder/600/800' }
            ].map((collection, index) => (
              <Link href={`/collections/${collection.title.toLowerCase()}`} key={index} className="group">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={collection.image} 
                    alt={collection.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-light tracking-wider">{collection.title}</h3>
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
          <h2 className="text-3xl font-light text-center mb-12">Bestsellers</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="group">
                <div className="relative aspect-square overflow-hidden mb-4">
                  <img 
                    src={`/api/placeholder/400/400`}
                    alt="Product"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h4 className="text-sm font-medium mb-1">Product Name</h4>
                <p className="text-sm text-gray-500">$29.99</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}