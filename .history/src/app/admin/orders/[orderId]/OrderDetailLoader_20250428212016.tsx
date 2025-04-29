// src/app/admin/orders/[orderId]/OrderDetailLoader.tsx
'use client'; // Mark this as a Client Component

import React from 'react';
import dynamic from 'next/dynamic';

// Define props for the loader component
interface OrderDetailLoaderProps {
  orderId: string;
}

// Dynamically import the OrderDetailClient component within this Client Component
const OrderDetailClient = dynamic(() => import('./OrderDetail'), {
  ssr: false, // This is allowed in a Client Component
  loading: () => <div className="p-6 text-center">Loading order details...</div>,
});

// This Client Component renders the dynamically loaded OrderDetailClient
export default function OrderDetailLoader({ orderId }: OrderDetailLoaderProps) {
  return <OrderDetailClient orderId={orderId} />;
}
