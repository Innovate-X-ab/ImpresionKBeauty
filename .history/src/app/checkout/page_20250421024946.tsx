// app/checkout/page.tsx
'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { getStripe } from '@/lib/stripe';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, CreditCard, XCircle } from 'lucide-react';

export default function CheckoutPage() {
  const { state: cartState } = useCart();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1); // 1 = Shipping, 2 = Review & Pay
  
  // Shipping form state
  const [shippingForm, setShippingForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    country: 'United Kingdom',
    phone: '',
    email: currentUser?.email || ''
  });
  
  const handleShippingFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const validateShippingForm = () => {
    const requiredFields = ['firstName', 'lastName', 'address', 'city', 'postalCode', 'country', 'email'];
    for (const field of requiredFields) {
      if (!shippingForm[field as keyof typeof shippingForm]) {
        setError(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        return false;
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shippingForm.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    // Validate postal code format (basic)
    const ukPostcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
    if (!ukPostcodeRegex.test(shippingForm.postalCode)) {
      setError('Please enter a valid UK postal code');
      return false;
    }
    
    // Add phone validation
    if (!shippingForm.phone || shippingForm.phone.trim() === '') {
      setError('Phone number is required');
      return false;
    }

    // Phone number format validation (optional but recommended)
    const phoneRegex = /^[\d\+\-\(\) ]{10,}$/; // Accepts digits, +, -, (, ), and spaces, minimum 10 chars
    if (!phoneRegex.test(shippingForm.phone)) {
      setError('Please enter a valid phone number');
      return false;
    }

    return true;
  };
  
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (validateShippingForm()) {
      setStep(2);
    }
  };
  
  const handleBackToShipping = () => {
    setStep(1);
  };
  
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
      const items = cartState.items.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        images: item.product.images,
        price: Number(item.product.price),
        quantity: item.quantity,
      }));

      // Format shipping address for the API
      const shippingAddress = JSON.stringify({
        firstName: shippingForm.firstName,
        lastName: shippingForm.lastName,
        address: shippingForm.address,
        apartment: shippingForm.apartment,
        city: shippingForm.city,
        postalCode: shippingForm.postalCode,
        country: shippingForm.country,
        phone: shippingForm.phone
      });

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          email: shippingForm.email,
          shippingAddress
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      
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
  
  // If not logged in, show sign-in prompt
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
            Please sign in to checkout
          </h2>
          <Link
            href="/auth/login?redirect=/checkout"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }
  
  // If cart is empty, show empty cart message
  if (cartState.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 ">
            Your cart is empty
          </h2>
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        {/* Checkout Steps */}
        <div className="mb-8">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-black text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-black' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-black text-white' : 'bg-gray-200'}`}>
              2
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm font-medium text-gray-600">Shipping</span>
            <span className="text-sm font-medium text-gray-600">Review & Pay</span>
          </div>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <XCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Shipping Information</h2>
                
                <form onSubmit={handleProceedToPayment} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={shippingForm.firstName}
                        onChange={handleShippingFormChange}
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black text-gray-600"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={shippingForm.lastName}
                        onChange={handleShippingFormChange}
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black text-gray-600"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={shippingForm.email}
                      onChange={handleShippingFormChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black text-gray-600"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={shippingForm.phone}
                      onChange={handleShippingFormChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black text-gray-600"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={shippingForm.address}
                      onChange={handleShippingFormChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black text-gray-600"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-1">
                      Apartment, suite, etc. (optional)
                    </label>
                    <input
                      type="text"
                      id="apartment"
                      name="apartment"
                      value={shippingForm.apartment}
                      onChange={handleShippingFormChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black text-gray-600"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={shippingForm.city}
                        onChange={handleShippingFormChange}
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black text-gray-600"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={shippingForm.postalCode}
                        onChange={handleShippingFormChange}
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black text-gray-600"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country *
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={shippingForm.country}
                        onChange={handleShippingFormChange}
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black text-gray-600"
                        required
                      >
                        <option value="United Kingdom">United Kingdom</option>
                        {/* <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="France">France</option>
                        <option value="Germany">Germany</option>
                        <option value="Italy">Italy</option>
                        <option value="Spain">Spain</option>
                        <option value="Japan">Japan</option>
                        <option value="South Korea">South Korea</option> */}
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-6">
                    <button
                      type="submit"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Continue to Payment
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {step === 2 && (
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">Review Order</h2>
                    <button
                      onClick={handleBackToShipping}
                      className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Back to Shipping
                    </button>
                  </div>
                </div>
                
                {/* Shipping information summary */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Shipping Address</h3>
                      <p className="text-sm text-gray-600">{shippingForm.firstName} {shippingForm.lastName}</p>
                      <p className="text-sm text-gray-600">{shippingForm.address}</p>
                      {shippingForm.apartment && <p className="text-sm text-gray-600">{shippingForm.apartment}</p>}
                      <p className="text-sm text-gray-600">{shippingForm.city}, {shippingForm.postalCode}</p>
                      <p className="text-sm text-gray-600">{shippingForm.country}</p>
                      {shippingForm.phone && <p className="text-sm text-gray-600">{shippingForm.phone}</p>}
                      <p className="text-sm text-gray-600">{shippingForm.email}</p>
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="text-sm text-gray-600 hover:text-gray-900 underline"
                    >
                      Edit
                    </button>
                  </div>
                </div>
                
                {/* Payment notice */}
                <div className="p-6">
                  <div className="flex items-start">
                    <CreditCard className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      After clicking &quot;Place Order,&quot; you will be redirected to Stripe to complete your purchase securely.
                    </p>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      onClick={handleCheckout}
                      disabled={loading}
                      className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Processing...' : 'Place Order'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm rounded-lg p-6 sticky top-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              
              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
                  {cartState.items.map((item) => {
                    const images = typeof item.product.images === 'string' 
                      ? JSON.parse(item.product.images) 
                      : item.product.images;
                    
                    const imageUrl = Array.isArray(images) && images.length > 0 
                      ? images[0] 
                      : '/api/placeholder/80/80';
                      
                    return (
                      <li key={item.product.id} className="py-6 flex">
                        <div className="relative flex-shrink-0 w-20 h-20 rounded border border-gray-200 overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt={item.product.name}
                            fill
                            sizes="80px"
                            className="object-cover object-center"
                          />
                        </div>
                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-sm font-medium text-gray-900">
                              <h3>{item.product.name}</h3>
                              <p className="ml-4">£{(Number(item.product.price) * item.quantity).toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                          </div>
                          <div className="flex-1 flex items-end justify-between text-sm">
                            <p className="text-gray-500">Qty {item.quantity}</p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              
              <div className="border-t border-gray-200 pt-6 mt-6">
                <div className="flex justify-between text-sm mb-2 text-gray-600">
                  <p>Subtotal</p>
                  <p className="font-medium">£{cartState.totalAmount.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm mb-2 text-gray-600">
                  <p>Shipping</p>
                  <p className="font-medium">Free</p>
                </div>
                {/* <div className="flex justify-between text-sm mb-2 text-gray-600">
                  <p>Taxes</p>
                  <p className="font-medium">Calculated at checkout</p>
                </div> */}
                <div className="flex justify-between text-base font-medium mt-6 pt-6 border-t border-gray-200 text-gray-600">
                  <p>Total</p>
                  <p>£{cartState.totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}