// src/app/checkout/page.tsx
'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { Package, CreditCard, Check } from 'lucide-react';
import Image from 'next/image';
import ShippingForm from '@/components/checkout/ShippingForm';
import PaymentForm from '@/components/checkout/PaymentForm';
import ConfirmationStep from '@/components/checkout/ConfirmationStep';

type CheckoutStep = 'shipping' | 'payment' | 'confirmation';

export default function CheckoutPage() {
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const { state } = useCart();

  const steps = [
    { id: 'shipping', name: 'Shipping', icon: Package },
    { id: 'payment', name: 'Payment', icon: CreditCard },
    { id: 'confirmation', name: 'Confirmation', icon: Check },
  ];

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Your cart is empty
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Add some products to your cart before checking out.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <nav aria-label="Progress" className="mb-12">
          <ol className="flex items-center justify-center">
            {steps.map((stepItem, stepIdx) => (
              <li
                key={stepItem.name}
                className={`${
                  stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''
                } relative`}
              >
                <div className="flex items-center">
                  <div
                    className={`${
                      step === stepItem.id
                        ? 'border-black bg-black'
                        : step === 'payment' && stepItem.id === 'shipping'
                        ? 'border-black bg-black'
                        : step === 'confirmation' && (stepItem.id === 'shipping' || stepItem.id === 'payment')
                        ? 'border-black bg-black'
                        : 'border-gray-300 bg-white'
                    } relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors`}
                  >
                    <stepItem.icon
                      className={`h-6 w-6 ${
                        step === stepItem.id ||
                        (step === 'payment' && stepItem.id === 'shipping') ||
                        (step === 'confirmation' && (stepItem.id === 'shipping' || stepItem.id === 'payment'))
                          ? 'text-white'
                          : 'text-gray-500'
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                  {stepIdx !== steps.length - 1 && (
                    <div
                      className={`hidden sm:block absolute top-6 left-12 h-0.5 w-32 ${
                        step === 'payment' && stepItem.id === 'shipping'
                          ? 'bg-black'
                          : step === 'confirmation' && (stepItem.id === 'shipping' || stepItem.id === 'payment')
                          ? 'bg-black'
                          : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  {stepItem.name}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        {/* Checkout Form */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Order Summary
              </h2>
              <ul className="divide-y divide-gray-200">
                {state.items.map((item) => {
                  const images = JSON.parse(item.product.images as string);
                  return (
                    <li key={item.product.id} className="py-4 flex">
                      <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                        <Image
                          src={images[0]}
                          alt={item.product.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          {item.product.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          ${(Number(item.product.price) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-900">Subtotal</p>
                  <p className="text-sm font-medium text-gray-900">
                    ${state.totalAmount.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-sm font-medium text-gray-900">Shipping</p>
                  <p className="text-sm font-medium text-gray-900">Calculated at next step</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Steps */}
          <div className="mt-10 lg:mt-0 lg:col-span-1">
            {step === 'shipping' && (
              <ShippingForm onComplete={() => setStep('payment')} />
            )}
            {step === 'payment' && (
              <PaymentForm 
                onComplete={() => setStep('confirmation')}
                onBack={() => setStep('shipping')}
              />
            )}
            {step === 'confirmation' && (
              <ConfirmationStep />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}