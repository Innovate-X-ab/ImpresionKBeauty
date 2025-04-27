'use client';

import { useWishlist } from '@/contexts/WishlistContext';
import ProductGrid from '@/components/products/ProductGrid';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types/products';
import { Decimal } from '@prisma/client/runtime/library';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number | Decimal;
  images: string | string[];
  category: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
}

// Define interface for wishlist item if not already defined in types/products
interface WishlistProduct extends Product {
  id: string;
  name: string;
  brand: string;
  price: number | Decimal;
  images: string;
  category: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
}

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  // Ensure wishlist items match the expected Product type
  const formattedWishlist: WishlistProduct[] = wishlist.map(item => ({
    ...item,
    price: typeof item.price === 'number' ? item.price : Number(item.price),
    images: typeof item.images === 'string' ? item.images : JSON.stringify(item.images)
  }));

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

        <h1 className="text-2xl font-bold text-gray-900 mb-8">My Wishlist</h1>

        {formattedWishlist.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Your wishlist is empty</p>
            <Link 
              href="/collections/all"
              className="inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
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