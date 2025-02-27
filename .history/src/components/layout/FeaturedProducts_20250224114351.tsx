'use client';

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Heart, Search, Star } from 'lucide-react';

export default function FeaturedProducts() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  
  const products = [
    {
      name: 'Advanced Snail Mucin',
      price: 29.99,
      image: '/api/placeholder/300/400',
      brand: 'COSRX',
      rating: 4.8,
      salesCount: 1234,
      isNew: true
    },
    {
      name: 'Hydrating Toner',
      price: 24.99,
      image: '/api/placeholder/300/400',
      brand: 'Klairs',
      rating: 4.7,
      salesCount: 856,
      isPopular: true
    },
    {
      name: 'Vitamin C Serum',
      price: 34.99,
      image: '/api/placeholder/300/400',
      brand: 'Some By Mi',
      rating: 4.9,
      salesCount: 2341,
      isNew: true
    },
    {
      name: 'Clay Mask',
      price: 19.99,
      image: '/api/placeholder/300/400',
      brand: 'Innisfree',
      rating: 4.6,
      salesCount: 567,
      isPopular: true
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="relative flex flex-col items-center mb-16">
          <span className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4 
            animate-fade-in-up">Shop Now</span>
          <h2 className="text-3xl text-black font-light mb-4 relative 
            animate-fade-in-up animation-delay-150">
            Bestsellers
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-black
              origin-left animate-scale-x"></span>
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div 
              key={index} 
              className="group relative cursor-pointer"
              onMouseEnter={() => setHoveredProduct(index)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image Container */}
              <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-lg">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 
                    group-hover:scale-110"
                />
                
                {/* Product Status Badge */}
                {(product.isNew || product.isPopular) && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black text-white text-xs 
                    rounded-full transform -translate-y-2 opacity-0 transition-all duration-300 
                    group-hover:translate-y-0 group-hover:opacity-100">
                    {product.isNew ? 'New Arrival' : 'Popular'}
                  </div>
                )}

                {/* Quick Action Buttons */}
                <div className={`absolute inset-0 bg-black bg-opacity-20 flex items-center 
                  justify-center gap-4 transition-opacity duration-300 
                  ${hoveredProduct === index ? 'opacity-100' : 'opacity-0'}`}>
                  <button className="p-3 bg-white rounded-full transform -translate-y-4 
                    hover:bg-gray-100 transition-all duration-300 hover:scale-110
                    group-hover:translate-y-0">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-white rounded-full transform translate-y-4 
                    hover:bg-gray-100 transition-all duration-300 hover:scale-110
                    group-hover:translate-y-0">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-white rounded-full transform -translate-y-4 
                    hover:bg-gray-100 transition-all duration-300 hover:scale-110
                    group-hover:translate-y-0">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 uppercase tracking-wider
                    transform transition-transform group-hover:translate-x-2">
                    {product.brand}
                  </span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                
                <h4 className="text-sm font-medium transition-colors duration-300 
                  group-hover:text-gray-600">
                  {product.name}
                </h4>
                
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">${product.price}</p>
                  <span className="text-xs text-gray-500">{product.salesCount} sold</span>
                </div>

                {/* Progress Bar (simulating stock level) */}
                <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="absolute left-0 top-0 h-full bg-black transform origin-left
                      transition-transform duration-500 group-hover:scale-x-75"
                    style={{ width: '100%' }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            href="/products" 
            className="inline-block border border-black text-black px-8 py-3 
              text-sm uppercase tracking-wider hover:bg-black hover:text-white 
              transition-colors relative overflow-hidden group"
          >
            <span className="relative z-10">View All Products</span>
            <div className="absolute inset-0 bg-black transform -translate-x-full 
              transition-transform duration-300 group-hover:translate-x-0"></div>
          </Link>
        </div>
      </div>

      {/* Add these styles to your global.css */}
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-x {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-scale-x {
          animation: scale-x 0.6s ease-out forwards;
        }

        .animation-delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </section>
  );
}