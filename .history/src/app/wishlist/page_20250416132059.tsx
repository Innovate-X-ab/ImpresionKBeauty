'use client';

import { useWishlist } from '@/contexts/WishlistContext';
import ProductGrid from '@/components/products/ProductGrid';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          href="/"
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Products
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">My Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Your wishlist is empty</p>
            <Link 
              href="/"
              className="inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <ProductGrid products={wishlist} />
        )}
      </div>
    </div>
  );
}