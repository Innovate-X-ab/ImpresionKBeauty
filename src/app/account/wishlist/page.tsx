//app/account/wishlist/page.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';

// Mock data - replace with actual API call
const wishlistItems = [
  {
    id: '1',
    name: 'COSRX Advanced Snail Mucin Power Essence',
    brand: 'COSRX',
    price: 21.99,
    image: '/api/placeholder/200/200',
    inStock: true
  },
  {
    id: '2',
    name: 'Beauty of Joseon Glow Serum',
    brand: 'Beauty of Joseon',
    price: 19.99,
    image: '/api/placeholder/200/200',
    inStock: false
  }
];

export default function WishlistPage() {
  const handleRemoveFromWishlist = (id: string) => {
    // TODO: Implement remove from wishlist functionality
    console.log('Remove from wishlist:', id);
  };

  const handleAddToCart = (id: string) => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', id);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium">My Wishlist</h2>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-4">Save items you love for later.</p>
          <Link
            href="/products"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800"
          >
            Explore Products
          </Link>
        </div>
      ) : (
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {wishlistItems.map((item) => (
    <div 
      key={item.id} 
      className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="aspect-square relative">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-center object-cover"
        />
        {!item.inStock && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
            <p className="text-gray-900 font-medium">Out of Stock</p>
          </div>
        )}
      </div>

              <div className="p-4">
                <h3 className="text-sm text-gray-700 font-medium">{item.brand}</h3>
                <p className="mt-1 text-sm text-gray-900">{item.name}</p>
                <p className="mt-1 text-sm font-medium text-gray-900">£{item.price.toFixed(2)}</p>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleAddToCart(item.id)}
                    disabled={!item.inStock}
                    className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="p-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}