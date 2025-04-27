'use client';

import { useWishlist } from '@/contexts/WishlistContext';
import ProductGrid from '@/components/products/ProductGrid';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types/products';
import { Decimal } from '@prisma/client/runtime/library';

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  const formattedWishlist: Product[] = wishlist.map(item => {
    // Handle images parsing
    let parsedImages = item.images;
    try {
      if (typeof item.images === 'string') {
        const parsed = JSON.parse(item.images);
        parsedImages = Array.isArray(parsed) ? parsed[0] : item.images;
      }
    } catch (e) {
      console.error('Error parsing images:', e);
      parsedImages = typeof item.images === 'string' ? item.images : '';
    }

    // Format price
    const formattedPrice = typeof item.price === 'object' && 'toNumber' in item.price 
      ? item.price.toNumber() 
      : Number(item.price);

    return {
      ...item,
      price: formattedPrice,
      images: parsedImages,
      brand: item.brand || '',
      category: item.category || '',
      isVegan: Boolean(item.isVegan),
      isCrueltyFree: Boolean(item.isCrueltyFree)
    };
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          href="/"
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">My Wishlist</h1>

        {formattedWishlist.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Your wishlist is empty</p>
            <Link 
              href="/"
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