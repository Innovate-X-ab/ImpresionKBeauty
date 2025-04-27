'use client';

import { useWishlist } from '@/contexts/WishlistContext';
import ProductGrid from '@/components/products/ProductGrid';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types/products';
import { Decimal } from '@prisma/client/runtime/library';
import { useEffect, useState } from 'react';

export type Product = {
  images: string | string[];
};

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const [formattedWishlist, setFormattedWishlist] = useState<Product[]>([]);

  useEffect(() => {
    const formatWishlistItems = () => {
      return wishlist.map((item) => {
        // Handle images - simplified approach
        const formattedImages = Array.isArray(item.images) 
          ? item.images[0] 
          : item.images || '/api/placeholder/300/300';

        // Handle price
        let formattedPrice: number;
        try {
          formattedPrice = typeof item.price === 'object' && 'toNumber' in item.price 
            ? (item.price as Decimal).toNumber()
            : Number(item.price);
        } catch (e) {
          formattedPrice = 0;
          console.error('Error formatting price:', e);
        }

        return {
          ...item,
          images: formattedImages, // Use the simplified image handling
          price: formattedPrice,
          brand: item.brand || '',
          category: item.category || '',
          isVegan: Boolean(item.isVegan),
          isCrueltyFree: Boolean(item.isCrueltyFree)
        } as Product;
      });
    };

    setFormattedWishlist(formatWishlistItems());
  }, [wishlist]);

  if (!wishlist) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          href="/collections/all"
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Products
        </Link>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
          <span className="text-sm text-gray-500">
            {formattedWishlist.length} {formattedWishlist.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {formattedWishlist.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-4">Your wishlist is empty</p>
            <Link 
              href="/collections/all"
              className="inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <ProductGrid products={formattedWishlist} />
        )}
      </div>
    </div>
  );
}