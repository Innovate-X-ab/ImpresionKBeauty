// src/components/products/ProductGrid.tsx
'use client';

import { Product } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="group">
          <Link href={`/products/${product.id}`}>
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={JSON.parse(product.images as string)[0]}
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
                ${Number(product.price).toFixed(2)}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}