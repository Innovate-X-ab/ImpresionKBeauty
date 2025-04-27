// src/components/products/AddToCartButton.tsx
'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Decimal } from '@prisma/client/runtime/library';

// This interface matches the structure from Prisma but converts Decimal to number for the cart
interface ProductProps {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: Decimal | number;
  images: string;
  category: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

interface AddToCartButtonProps {
  product: ProductProps;
  showQuantity?: boolean; // Optional prop to show/hide quantity controls
}

export default function AddToCartButton({ product, showQuantity = true }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      // Convert the product with Decimal price to a product with numeric price
      const cartProduct = {
        ...product,
        price: Number(product.price)  // Convert Decimal to Number for the cart
      };
      
      addItem(cartProduct, quantity);
      
      // Use a more subtle success notification - replace alert
      // Show temporary success state for 1.5 seconds
      setTimeout(() => {
        setIsAdding(false);
      }, 1500);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAdding(false);
      alert('Failed to add to cart. Please try again.');
    }
  };

  // Simple button version (no quantity controls)
  if (!showQuantity) {
    return (
      <button
        type="button"
        className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        onClick={handleAddToCart}
        disabled={isAdding || product.stock === 0}
      >
        {isAdding ? (
          'Adding...'
        ) : product.stock === 0 ? (
          'Out of Stock'
        ) : (
          <>
            <ShoppingCart className="w-4 h-4 mr-2" />
            <span>Add to Cart</span>
          </>
        )}
      </button>
    );
  }

  // Full version with quantity controls
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            type="button"
            className="px-3 py-2 text-gray-600 hover:text-gray-700 disabled:opacity-50"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1 || isAdding}
          >
            -
          </button>
          <span className="px-4 py-2 text-gray-900">{quantity}</span>
          <button
            type="button"
            className="px-3 py-2 text-gray-600 hover:text-gray-700 disabled:opacity-50"
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            disabled={quantity >= product.stock || isAdding}
          >
            +
          </button>
        </div>
        
        <button
          type="button"
          className="flex-1 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          onClick={handleAddToCart}
          disabled={isAdding || product.stock === 0}
        >
          <ShoppingCart className="w-5 h-5" />
          <span>
            {isAdding ? 'Adding...' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </span>
        </button>
      </div>
      
      {product.stock < 10 && product.stock > 0 && (
        <p className="text-sm text-red-600">
          Only {product.stock} left in stock - order soon
        </p>
      )}
    </div>
  );
}