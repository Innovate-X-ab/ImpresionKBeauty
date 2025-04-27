// app/checkout/success/page.tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStripe } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';

interface Order {
  id: string;
  // Add other order properties as needed
  status?: string;
  customerEmail?: string;
  items?: Array<{ id: string; quantity: number }>;
}
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';
import { CheckCircle, Truck, Mail, ArrowRight, Package } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

// Load Stripe outside of component render to avoid recreating Stripe object
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

// Loading component for Suspense
function OrderConfirmationLoading() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-lg shadow p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order confirmation...</p>
        </div>
      </div>
    </div>
  );
}

// Component that uses the Stripe hook and useSearchParams
function OrderConfirmationContent() {
  const stripe = useStripe();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  
  const sessionId = searchParams.get('session_id');
  
  // Generate a random order number if one isn't available
  const orderNumber = order?.id || `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

  useEffect(() => {
    if (!stripe || !sessionId) {
      return;
    }

    // Clear the cart once we're on the success page
    clearCart();
    
    const fetchCheckoutSession = async () => {
      try {
        setLoading(true);
        
        // Verify the payment was successful with Stripe
        const { paymentIntent } = await stripe.retrievePaymentIntent(sessionId);
        
        if (paymentIntent?.status !== 'succeeded') {
          throw new Error('Payment was not successful');
        }
        
        // Fetch the order details from your API based on the session ID
        // This would typically be an API route that queries your database for the order that matches this session
        // For now, we'll just set a placeholder order
        
        // Attempt to fetch order details if you implement this endpoint
        try {
          const response = await fetch(`/api/orders/by-session?session_id=${sessionId}`);
          if (response.ok) {
            const orderData = await response.json();
            setOrder(orderData);
          }
        } catch (orderError) {
          console.error('Error fetching order details:', orderError);
          // Don't set an error here - it's okay if we can't fetch order details yet
          // The webhook might still be processing the order creation
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error verifying payment:', error);
        setError('There was a problem confirming your payment. Please contact customer support.');
        setLoading(false);
      }
    };

    fetchCheckoutSession();
  }, [stripe, sessionId, clearCart]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-red-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Verification Failed</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex flex-col space-y-4">
              <Link href="/account/orders" className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800">
                View Your Orders
              </Link>
              <Link href="/contact" className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow p-8">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-3">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
          </div>

          {/* Confirmation Message */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You for Your Order!
            </h1>
            <p className="text-gray-600 text-lg mb-2">
              Order #{orderNumber}
            </p>
            <p className="text-gray-500">
              A confirmation email has been sent to your email address.
            </p>
          </div>

          {/* Order Status */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-2 mx-auto mb-2">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600">
                  Confirmation email sent
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-2 mx-auto mb-2">
                  <Package className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-sm text-gray-600">
                  Order processing has begun
                </p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 rounded-full p-2 mx-auto mb-2">
                  <Truck className="h-6 w-6 text-orange-600" />
                </div>
                <p className="text-sm text-gray-600">
                  Estimated delivery: 2-4 business days
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900">What&apos;s Next?</h2>
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
                    We&apos;ll start processing your order and notify you when it ships.
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
                    You&apos;ll receive tracking information once your order ships.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Link
              href={`/account/orders`}
              className="flex items-center justify-center w-full bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              View Your Orders
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

// The actual page component
function OrderConfirmationWithElements() {
  return (
    <Elements stripe={stripePromise}>
      <OrderConfirmationContent />
    </Elements>
  );
}

// Main export component with Suspense for useSearchParams
export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<OrderConfirmationLoading />}>
      <OrderConfirmationWithElements />
    </Suspense>
  );
}