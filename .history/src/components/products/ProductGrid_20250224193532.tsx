// src/components/products/ProductGrid.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Decimal } from '@prisma/client/runtime/library';

// Define a base product interface that includes common properties
export interface BaseProduct {
  id: string;
  name: string;
  brand: string;
  price: number | Decimal;
  images: string;
  category: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
}

// Full product may include additional fields
export interface FullProduct extends BaseProduct {
  description: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

// Accept either type of product
export interface ProductGridProps {
  products: BaseProduct[] | FullProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        // Handle both string JSON and parsed images
        let imageUrl;
        try {
          const images = typeof product.images === 'string' 
            ? JSON.parse(product.images) 
            : product.images;
          
          imageUrl = Array.isArray(images) && images.length > 0 
            ? images[0] 
            : '/api/placeholder/300/400';
        } catch (e) {
          // Fallback if parsing fails
          imageUrl = '/api/placeholder/300/400';
        }

        // Format price (handling both number and Decimal)
        const price = typeof product.price === 'object' && 'toFixed' in product.price
          ? Number(product.price).toFixed(2)
          : Number(product.price).toFixed(2);

        return (
          <div key={product.id} className="group">
            <Link href={`/products/${product.id}`}>
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <button 
                  className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
                  onClick={(e) => {
                    e.preventDefault();
                    // Add to wishlist functionality
                  }}
                >
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-4 space-y-1">
                <p className="text-sm text-gray-500">{product.brand}</p>
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <p className="text-lg font-semibold text-gray-900">
                  ${price}
                </p>
                {/* Display product badges (vegan, cruelty-free) */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.isVegan && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Vegan
                    </span>
                  )}
                  {product.isCrueltyFree && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Cruelty Free
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}