// app/products/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/products/AddToCartButton';
import ProductEditControls from '@/components/admin/ProductEditControls';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { isAdmin } = useAuth();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${params.id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;
  }

  if (!product) {
    notFound();
  }

  const images = JSON.parse(product.images as string);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={images[0]}
                alt={product.name}
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {images.slice(1).map((image: string, index: number) => (
                <div key={index} className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 2}`}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-lg text-gray-500">{product.brand}</p>
            </div>

            <p className="text-2xl font-semibold text-gray-900">
              ${Number(product.price).toFixed(2)}
            </p>

            <div className="prose prose-sm text-gray-600">
              <p>{product.description}</p>
            </div>

            <div className="flex items-center space-x-4">
              {product.isVegan && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Vegan
                </span>
              )}
              {product.isCrueltyFree && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  Cruelty Free
                </span>
              )}
            </div>

            <div className="space-y-4">
              <AddToCartButton product={product} />
            </div>

            {/* Admin Controls - Only shown to admin users */}
            {isAdmin && <ProductEditControls product={product} />}

            {/* Reviews Section */}
            <div className="mt-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
              {product.reviews && product.reviews.length > 0 ? (
                <div className="space-y-4">
                  {product.reviews.map((review: any) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900">{review.user.name}</p>
                        <div className="flex items-center">
                          {/* Add star rating component here */}
                          <span className="text-gray-600 ml-2">{review.rating}/5</span>
                        </div>
                      </div>
                      <p className="mt-2 text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}