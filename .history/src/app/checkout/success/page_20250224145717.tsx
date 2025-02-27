// src/app/checkout/success/page.tsx
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStripe } from '@stripe/react-stripe-js';
import Link from 'next/link';
import { CheckCircle, Truck, Mail, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function OrderConfirmationPage() {
  const stripe = useStripe();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret');
  const orderId = searchParams.get('order_id');

  useEffect(() => {
    if (!stripe || !paymentIntentClientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(paymentIntentClientSecret).then(({ paymentIntent }) => {
      if (paymentIntent && paymentIntent.status === 'succeeded') {
        clearCart();
      }
    });
  }, [stripe, paymentIntentClientSecret, clearCart]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow p-8">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-3">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>

          {/* Confirmation Message */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You for Your Order!
            </h1>
            <p className="text-gray-600">
              Order #{orderId}
            </p>
          </div>

          {/* Order Status */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <Mail className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Confirmation email sent
                </p>
              </div>
              <div className="text-center">
                <Truck className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Estimated delivery: 2-4 business days
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900">What's Next?</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white">
                    1
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-gray-900 font-medium">Order Confirmation Email</p>
                  <p className="text-gray-600">
                    You will receive an email confirmation with your order details.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white">
                    2
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-gray-900 font-medium">Order Processing</p>
                  <p className="text-gray-600">
                    We'll start processing your order and notify you when it ships.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white">
                    3
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-gray-900 font-medium">Shipping Updates</p>
                  <p className="text-gray-600">
                    You'll receive tracking information once your order ships.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Link
              href={`/account/orders/${orderId}`}
              className="flex items-center justify-center w-full bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              View Order Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center w-full bg-white text-black px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Customer Support */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Need help? <Link href="/contact" className="text-black hover:underline">Contact our support team</Link>
          </p>
        </div>
      </div>
    </div>
  );
}