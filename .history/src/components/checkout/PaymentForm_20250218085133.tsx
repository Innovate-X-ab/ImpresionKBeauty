// src/components/checkout/PaymentForm.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreditCard, AlertCircle } from 'lucide-react';
import { creditCardSchema, formatCardNumber, formatExpiryDate } from '@/lib/validations/payment';

interface PaymentFormProps {
  onComplete: () => void;
  onBack: () => void;
}

type PaymentMethod = 'card' | 'paypal' | 'applepay';

interface CreditCardFormData {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export default function PaymentForm({ onComplete, onBack }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreditCardFormData>({
    resolver: yupResolver(creditCardSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: CreditCardFormData) => {
    setIsProcessing(true);
    setError(null);

    try {
      // Here you would integrate with your payment processor
      console.log('Processing payment:', data);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayPalPayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Integrate with PayPal here
      await new Promise(resolve => setTimeout(resolve, 2000));
      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'PayPal payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplePayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Integrate with Apple Pay here
      await new Promise(resolve => setTimeout(resolve, 2000));
      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Apple Pay payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        Payment Information
      </h2>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      <div className="mb-6">
        <div className="grid grid-cols-3 gap-4">
          {/* Payment method buttons */}
          <button
            type="button"
            onClick={() => setPaymentMethod('card')}
            disabled={isProcessing}
            className={`px-4 py-3 border rounded-md flex flex-col items-center justify-center gap-2 ${
              paymentMethod === 'card'
                ? 'border-black bg-black text-white'
                : 'border-gray-300 hover:border-gray-400'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <CreditCard className="w-5 h-5" />
            <span>Credit Card</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('paypal')}
            disabled={isProcessing}
            className={`px-4 py-3 border rounded-md flex flex-col items-center justify-center gap-2 ${
              paymentMethod === 'paypal'
                ? 'border-black bg-black text-white'
                : 'border-gray-300 hover:border-gray-400'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <img 
              src="/icons/paypal-icon.svg" 
              alt="PayPal" 
              className="w-5 h-5"
            />
            <span>PayPal</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('applepay')}
            disabled={isProcessing}
            className={`px-4 py-3 border rounded-md flex flex-col items-center justify-center gap-2 ${
              paymentMethod === 'applepay'
                ? 'border-black bg-black text-white'
                : 'border-gray-300 hover:border-gray-400'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <img 
              src="/icons/apple-pay-icon.svg" 
              alt="Apple Pay" 
              className="w-5 h-5"
            />
            <span>Apple Pay</span>
          </button>
        </div>
      </div>

      {paymentMethod === 'card' && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              maxLength={19}
              placeholder="1234 5678 9012 3456"
              {...register('cardNumber')}
              onChange={(e) => {
                setValue('cardNumber', formatCardNumber(e.target.value));
              }}
              className={`mt-1 block w-full border ${
                errors.cardNumber ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm`}
              disabled={isProcessing}
            />
            {errors.cardNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700">
              Card Holder Name
            </label>
            <input
              type="text"
              id="cardHolder"
              placeholder="John Doe"
              {...register('cardHolder')}
              className={`mt-1 block w-full border ${
                errors.cardHolder ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm`}
              disabled={isProcessing}
            />
            {errors.cardHolder && (
              <p className="mt-1 text-sm text-red-600">{errors.cardHolder.message}</p>
            )}
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
                maxLength={5}
                {...register('expiryDate')}
                onChange={(e) => {
                  setValue('expiryDate', formatExpiryDate(e.target.value));
                }}
                className={`mt-1 block w-full border ${
                  errors.expiryDate ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm`}
                disabled={isProcessing}
              />
              {errors.expiryDate && (
                <p className="mt-1 text-sm text-red-600">{errors.expiryDate.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                placeholder="123"
                maxLength={4}
                {...register('cvv')}
                className={`mt-1 block w-full border ${
                  errors.cvv ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm`}
                disabled={isProcessing}
              />
              {errors.cvv && (
                <p className="mt-1 text-sm text-red-600">{errors.cvv.message}</p>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between space-x-4">
            <button
              type="button"
              onClick={onBack}
              className="text-gray-600 hover:text-gray-800"
              disabled={isProcessing}
            >
              Back to Shipping
            </button>
            <button
              type="submit"
              className="flex-1 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </form>
      )}

      {paymentMethod === 'paypal' && (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            You will be redirected to PayPal to complete your payment.
          </p>
          <button
            onClick={handlePayPalPayment}
            disabled={isProcessing}
            className="w-full bg-[#003087] text-white px-6 py-3 rounded-md hover:bg-[#002C73] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003087] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : 'Continue with PayPal'}
          </button>
        </div>
      )}

      {paymentMethod === 'applepay' && (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Complete your purchase with Apple Pay.
          </p>
          <button
            onClick={handleApplePayment}
            disabled={isProcessing}
            className="w-full bg-black text-white px-6 py-3 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : (
              <span className="flex items-center justify-center gap-2">
                Pay with
                <img 
                  src="/icons/apple-pay-white.svg" 
                  alt="Apple Pay" 
                  className="h-6"
                />
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}