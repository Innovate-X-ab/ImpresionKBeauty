// src/components/products/AddToCartButton.tsx
'use client';

import { useState } from 'react';
import { Product } from '@prisma/client';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
        addItem(product, quantity);
      
      // Show success message
      alert('Added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            type="button"
            className="px-3 py-2 text-gray-600 hover:text-gray-700 disabled:opacity-50"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="px-4 py-2 text-gray-900">{quantity}</span>
          <button
            type="button"
            className="px-3 py-2 text-gray-600 hover:text-gray-700 disabled:opacity-50"
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            disabled={quantity >= product.stock}
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