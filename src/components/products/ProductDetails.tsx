//src/components/products/ProductDetails.tsx

'use client';

import { useState } from 'react';
import Image from 'next/image';
import AddToCartButton from '@/components/products/AddToCartButton';
import ProductEditControls from '@/components/admin/ProductEditControls';
import { useAuth } from '@/contexts/AuthContext';

// Interface for reviews
interface Review {
  id: string;
  rating: number;
  comment: string;
  user: {
    id: string;
    name: string;
  };
}

// Serialized product data from server
interface SerializedProduct {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  category: string;
  images: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
  stock: number;
  createdAt: string;
  updatedAt: string;
  reviews?: Review[];
}

interface ProductDetailsProps {
  product: SerializedProduct;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { isAdmin } = useAuth();
  const [activeImage, setActiveImage] = useState(0);
  
  const images = JSON.parse(product.images as string);

  // Prepare objects for different components with their expected types
  const addToCartProduct = {
    id: product.id,
    name: product.name,
    brand: product.brand,
    description: product.description,
    price: product.price,
    images: product.images,
    category: product.category,
    isVegan: product.isVegan,
    isCrueltyFree: product.isCrueltyFree,
    stock: product.stock,
    createdAt: new Date(product.createdAt),
    updatedAt: new Date(product.updatedAt)
  };

  const editControlsProduct = {
    id: product.id,
    name: product.name,
    brand: product.brand,
    description: product.description,
    price: product.price,
    category: product.category,
    isVegan: product.isVegan,
    isCrueltyFree: product.isCrueltyFree,
    stock: product.stock
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={images[activeImage]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover object-center"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image: string, index: number) => (
                  <div 
                    key={index} 
                    className={`aspect-square relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer ${
                      index === activeImage ? 'ring-2 ring-black' : ''
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 25vw, 12vw"
                      className="object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-lg text-gray-500">{product.brand}</p>
            </div>

            <p className="text-2xl font-semibold text-gray-900">
              ${product.price.toFixed(2)}
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
              <AddToCartButton product={addToCartProduct} />
            </div>

            {/* Admin Controls - Only shown to admin users */}
            {isAdmin && <ProductEditControls product={editControlsProduct} />}

            {/* Reviews Section */}
            <div className="mt-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
              {product.reviews && product.reviews.length > 0 ? (
                <div className="space-y-4">
                  {product.reviews.map((review: Review) => (
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