// src/components/checkout/PaymentForm.tsx
'use client';

import { useState } from 'react';
import { CreditCard } from 'lucide-react';

interface PaymentFormProps {
  onComplete: () => void;
  onBack: () => void;
}

type PaymentMethod = 'card' | 'paypal' | 'applepay';

export default function PaymentForm({ onComplete, onBack }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically process the payment
    onComplete();
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        Payment Information
      </h2>

      <div className="mb-6">
        <div className="grid grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => setPaymentMethod('card')}
            className={`px-4 py-3 border rounded-md flex flex-col items-center justify-center gap-2 ${
              paymentMethod === 'card'
                ? 'border-black bg-black text-white'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span>Credit Card</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('paypal')}
            className={`px-4 py-3 border rounded-md flex flex-col items-center justify-center gap-2 ${
              paymentMethod === 'paypal'
                ? 'border-black bg-black text-white'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <img 
              src="/paypal-icon.svg" 
              alt="PayPal" 
              className="w-5 h-5"
            />
            <span>PayPal</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('applepay')}
            className={`px-4 py-3 border rounded-md flex flex-col items-center justify-center gap-2 ${
              paymentMethod === 'applepay'
                ? 'border-black bg-black text-white'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <img 
              src="/apple-pay-icon.svg" 
              alt="Apple Pay" 
              className="w-5 h-5"
            />
            <span>Apple Pay</span>
          </button>
        </div>
      </div>

      {paymentMethod === 'card' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700">
              Card Holder Name
            </label>
            <input
              type="text"
              id="cardHolder"
              placeholder="John Doe"
              value={formData.cardHolder}
              onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                placeholder="123"
                value={formData.cvv}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                required
              />
            </div>
          </div>
        </form>
      )}

      {paymentMethod === 'paypal' && (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            You will be redirected to PayPal to complete your payment.
          </p>
          <button
            onClick={handleSubmit}
            className="w-full bg-[#003087] text-white px-6 py-3 rounded-md hover:bg-[#002C73] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003087]"
          >
            Continue with PayPal
          </button>
        </div>
      )}

      {paymentMethod === 'applepay' && (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Complete your purchase with Apple Pay.
          </p>
          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white px-6 py-3 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            <span className="flex items-center justify-center gap-2">
              Pay with
              <img 
                src="/apple-pay-white.svg" 
                alt="Apple Pay" 
                className="h-6"
              />
            </span>
          </button>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between space-x-4">
        <button
          type="button"
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800"
        >
          Back to Shipping
        </button>
        {paymentMethod === 'card' && (
          <button
            onClick={handleSubmit}
            className="flex-1 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Pay Now
          </button>
        )}
      </div>
    </div>
  );
}