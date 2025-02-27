// src/components/checkout/ConfirmationStep.tsx
'use client';

import { useCart } from '@/contexts/CartContext';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function ConfirmationStep() {
  const { state, clearCart } = useCart();
  const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

  // Clear cart when component mounts
  React.useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 text-center">
      <div className="flex justify-center mb-4">
        <CheckCircle className="w-16 h-16 text-green-500" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Order Confirmed!
      </h2>

      <p className="text-gray-600 mb-6">
        Thank you for your order. Your order number is #{orderNumber}
      </p>

      <div className="border-t border-b border-gray-200 py-4 my-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Order Total:</span>
          <span className="font-semibold">${state.totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping Method:</span>
          <span>Standard Shipping</span>
        </div>
      </div>

      <div className="mb-6 text-left">
        <h3 className="font-semibold mb-2">What happens next?</h3>
        <ul className="space-y-2 text-gray-600">
          <li>1. You will receive an order confirmation email</li>
          <li>2. We will process your order within 24 hours</li>
          <li>3. You will receive shipping updates via email</li>
        </ul>
      </div>

      <div className="space-y-4">
        <Link
          href="/account/orders"
          className="block w-full bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          View Order Status
        </Link>
        <Link
          href="/"
          className="block w-full bg-white text-black px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}