'use client';

import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { getStripe } from '@/lib/stripe';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export type AuthContextType = {
  user: {
    email?: string;
  } | null;
};

export default function CheckoutPage() {
  const { state: cartState } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartState.items.map(item => ({
            name: item.product.name,
            images: item.product.images,
            price: Number(item.product.price),
            quantity: item.quantity,
          })),
          email: user?.email,
        }),
      });

      const { sessionId, error } = await response.json();
      
      if (error) throw new Error(error);

      const stripe = await getStripe();
      const result = await stripe?.redirectToCheckout({
        sessionId,
      });

      if (result?.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Please sign in to checkout</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-medium text-gray-900">Order Summary</h2>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Total Items: {cartState.items.length}</p>
                <p className="text-lg font-medium text-gray-900">
                  Total Amount: ${cartState.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading || cartState.items.length === 0}
              className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
            >
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}