// src/app/checkout/success/page.tsx
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStripe } from '@stripe/react-stripe-js';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function SuccessPage() {
  const stripe = useStripe();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret');

  useEffect(() => {
    if (!stripe || !paymentIntentClientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(paymentIntentClientSecret).then(({ paymentIntent }) => {
      // Handle successful payment
      if (paymentIntent && paymentIntent.status === 'succeeded') {
        clearCart();
      }
    });
  }, [stripe, paymentIntentClientSecret, clearCart]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been processed successfully.
          </p>

          <div className="space-y-4">
            <Link
              href="/account/orders"
              className="block w-full bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800"
            >
              View Order Status
            </Link>
            
            <Link
              href="/"
              className="block w-full bg-white text-black px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-50"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}