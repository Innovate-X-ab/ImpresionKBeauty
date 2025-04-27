'use client';

import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { getStripe } from '@/lib/stripe';
import { useState } from 'react';
import Link from 'next/link';

interface CheckoutItem {
  name: string;
  images: string;
  price: number;
  quantity: number;
}

export default function CheckoutPage() {
  const { state: cartState } = useCart();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleCheckout = async () => {
    if (!currentUser?.email) {
      setError('Please sign in to checkout');
      return;
    }

    if (cartState.items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const items: CheckoutItem[] = cartState.items.map(item => ({
        name: item.product.name,
        images: item.product.images,
        price: Number(item.product.price),
        quantity: item.quantity,
      }));

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          email: currentUser.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId, error: checkoutError } = await response.json();
      
      if (checkoutError) {
        throw new Error(checkoutError);
      }

      const stripe = await getStripe();
      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
            Please sign in to checkout
          </h2>
          <Link
            href="/auth/signin"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800"
          >
            Sign In
          </Link>
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
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div>
              <h2 className="text-xl font-medium text-gray-900">Order Summary</h2>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-500">
                  Total Items: {cartState.items.length}
                </p>
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