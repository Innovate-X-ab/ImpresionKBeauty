// src/components/products/ProductGrid.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Decimal } from '@prisma/client/runtime/library';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProductQuickEdit from '@/components/admin/ProductQuickEdit';
import StarRating from '../ui/StarRating';

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
  reviews?: {  // Make reviews optional
    rating: number;
  }[];
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

const ProductGrid = ({ products }: ProductGridProps) => {
  const { addItem } = useCart();
  const { isAdmin } = useAuth();
  const [addingProductId, setAddingProductId] = useState<string | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  const handleAddToCart = async (product: BaseProduct, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setAddingProductId(product.id);
    try {
      // Convert the product with Decimal price to a product with numeric price
      const cartProduct = {
        ...product,
        price: Number(product.price),
        // For BaseProduct that might not have these fields, provide defaults
        stock: 'stock' in product ? (product as FullProduct).stock : 10,
        description: 'description' in product ? (product as FullProduct).description : "No description available",
        createdAt: 'createdAt' in product ? (product as FullProduct).createdAt : new Date(),
        updatedAt: 'updatedAt' in product ? (product as FullProduct).updatedAt : new Date()
      };
      
      addItem(cartProduct, 1);
      
      // Show success visual feedback
      setTimeout(() => {
        setAddingProductId(null);
      }, 1000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setAddingProductId(null);
    }
  };

  const handleDeleteProduct = async (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm('Are you sure you want to delete this product?')) return;
    
    setDeletingProductId(productId);
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      
      // Refresh the page to update the product list
      window.location.reload();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    } finally {
      setDeletingProductId(null);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {products.map((product) => {
        console.log('Product reviews:', product.reviews); // Debug log

        // Handle both string JSON and parsed images
        let imageUrl;
        try {
          const images = typeof product.images === 'string' 
            ? JSON.parse(product.images) 
            : product.images;
          
          imageUrl = Array.isArray(images) && images.length > 0 
            ? images[0] 
            : '/api/placeholder/300/400';
        } catch {
          // Fallback if parsing fails
          imageUrl = '/api/placeholder/300/400';
        }

        // Format price (handling both number and Decimal)
        const price = typeof product.price === 'object' && 'toFixed' in product.price
          ? Number(product.price).toFixed(2)
          : Number(product.price).toFixed(2);

        const isAddingToCart = addingProductId === product.id;
        const isDeleting = deletingProductId === product.id;

        // Update the rating calculation to be more precise
        const reviews = product.reviews || [];
        const averageRating = reviews.length > 0
          ? Math.round(
              reviews.reduce((acc, review) => acc + review.rating, 0) / 
              reviews.length
            )
          : 0;

        console.log('Average rating:', averageRating); // Debug log
        console.log('Reviews length:', reviews.length); // Debug log

        return (
          <div key={product.id} className="group">
            <Link href={`/products/${product.id}`}>
              {/* Reduce aspect ratio and adjust image container */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Adjust wishlist button size */}
                <button 
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-md hover:bg-gray-100"
                  onClick={(e) => {
                    e.preventDefault();
                    // Add to wishlist functionality
                  }}
                >
                  <Heart className="w-4 h-4" />
                </button>
                
                {/* Adjust admin controls size and positioning */}
                {isAdmin && (
                  <div className="absolute bottom-2 right-2 flex space-x-1.5">
                    <div onClick={(e) => e.preventDefault()}>
                      <ProductQuickEdit 
                        product={{
                          ...product,
                          price: typeof product.price === 'object' ? Number(product.price) : product.price
                        }} 
                      />
                    </div>
                    
                    <button 
                      className="p-1.5 rounded-full bg-white shadow-md hover:bg-red-50 text-gray-500 hover:text-red-500"
                      onClick={(e) => handleDeleteProduct(product.id, e)}
                      disabled={isDeleting}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              {/* Adjust product info text sizes */}
              <div className="mt-2 space-y-0.5">
                <p className="text-xs text-gray-500">{product.brand}</p>
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{product.name}</h3>
                <p className="text-sm font-semibold text-gray-900">
                  £{price}
                </p>
                <div className="flex items-center min-h-[20px]"> {/* Add min-height to prevent layout shift */}
                  <StarRating 
                    rating={averageRating}
                    showCount={true}
                    count={reviews.length}
                    size="sm"
                  />
                </div>
                {/* Adjust badges size */}
                <div className="flex flex-wrap gap-1 mt-1">
                  {product.isVegan && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-800">
                      Vegan
                    </span>
                  )}
                  {product.isCrueltyFree && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-purple-100 text-purple-800">
                      Cruelty Free
                    </span>
                  )}
                </div>
              </div>
            </Link>
            
            {/* Adjust add to cart button size */}
            <button
              onClick={(e) => handleAddToCart(product, e)}
              className="mt-2 w-full bg-black text-white py-1.5 rounded-md hover:bg-gray-800 flex items-center justify-center transition-colors text-sm"
              disabled={isAddingToCart}
            >
              {isAddingToCart ? (
                "Adding..."
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;