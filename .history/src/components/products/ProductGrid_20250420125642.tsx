// src/components/products/ProductGrid.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Trash2, Minus, Plus } from 'lucide-react';
import { Decimal } from '@prisma/client/runtime/library';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProductQuickEdit from '@/components/admin/ProductQuickEdit';
import { useWishlist } from '@/contexts/WishlistContext';

// Define a base product interface that includes common properties
interface FullProduct extends Product {
  stock: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number | Decimal;
  images: string;
  category: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
}

interface ProductGridProps {
  products: Product[] | null;  // Update to allow null
  isAdmin?: boolean;
  onDeleteProduct?: (productId: string) => Promise<void>;
  deletingProductId?: string | null;
}

interface CartQuantity {
  [key: string]: number;
}

const ProductGrid = ({ products = [] }: ProductGridProps) => {  // Add default empty array
  const { addItem } = useCart();
  const { isAdmin } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [addingProductId, setAddingProductId] = useState<string | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [cartQuantities, setCartQuantities] = useState<CartQuantity>({});

  // Add null check before rendering
  if (!products || !Array.isArray(products)) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products available</p>
      </div>
    );
  }

  const updateCartQuantity = async (product: Product, increment: boolean, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  
    const currentQty = cartQuantities[product.id] || 1;
    const newQty = increment ? currentQty + 1 : Math.max(1, currentQty - 1);
    
    setCartQuantities(prev => ({
      ...prev,
      [product.id]: newQty
    }));
  
    const cartProduct = {
      ...product,
      price: Number(product.price),
      stock: 'stock' in product ? (product as FullProduct).stock : 10,
      description: 'description' in product ? (product as FullProduct).description : "No description available",
      createdAt: 'createdAt' in product ? (product as FullProduct).createdAt : new Date(),
      updatedAt: 'updatedAt' in product ? (product as FullProduct).updatedAt : new Date()
    };
  
    // Update cart quantity directly
    addItem(cartProduct, newQty);
  };

  const handleAddToCart = async (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setAddingProductId(product.id);
    try {
      const cartProduct = {
        ...product,
        price: Number(product.price),
        stock: 'stock' in product ? (product as FullProduct).stock : 10,
        description: 'description' in product ? (product as FullProduct).description : "No description available",
        createdAt: 'createdAt' in product ? (product as FullProduct).createdAt : new Date(),
        updatedAt: 'updatedAt' in product ? (product as FullProduct).updatedAt : new Date()
      };
      
      setCartQuantities(prev => ({
        ...prev,
        [product.id]: 1
      }));
      
      addItem(cartProduct, 1);
      
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

  const handleWishlistToggle = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      const wishlistProduct = {
        ...product,
        price: Number(product.price)
      };
      addToWishlist(wishlistProduct);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {products.map((product) => {
        // console.log('Product reviews:', product.reviews); // Debug log

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
                  onClick={(e) => handleWishlistToggle(product, e)}
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'
                    }`} 
                  />
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
            
            {/* Replace the existing Add to Cart section */}
            <div className="mt-2">
              {cartQuantities[product.id] ? (
                <div className="flex items-center bg-black text-white rounded-md">
                  <button
                    onClick={(e) => updateCartQuantity(product, false, e)}
                    className="px-3 py-2 hover:bg-gray-800 rounded-l-md transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="flex-1 text-center py-2 font-medium">
                    {cartQuantities[product.id]}
                  </span>
                  <button
                    onClick={(e) => updateCartQuantity(product, true, e)}
                    className="px-3 py-2 hover:bg-gray-800 rounded-r-md transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 flex items-center justify-center transition-colors"
                  disabled={isAddingToCart}
                >
                  {isAddingToCart ? (
                    "Adding..."
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;