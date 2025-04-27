// src/lib/stripe.ts
import Stripe from 'stripe';
import { loadStripe, Stripe as StripeClient } from '@stripe/stripe-js';

const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    console.error(`Missing environment variable: ${key}`);
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

// Server-side Stripe instance
export const stripe = new Stripe(getEnvVar('STRIPE_SECRET_KEY'), {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
});

// Client-side Stripe promise
let stripePromise: Promise<StripeClient | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const key = getEnvVar('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};