// src/app/admin/orders/[orderSlug]/OrderDetailLoader.tsx
'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

// Dynamically import the OrderDetailClient component
const OrderDetailClient = dynamic(() => import('./OrderDetail'), {
  ssr: false,
  loading: () => <div className="p-6 text-center">Loading order details...</div>,
});

// This component no longer needs props, it reads from useParams
export default function OrderDetailLoader() {
  const params = useParams();

  // Extract the parameter using the new name 'orderSlug'
  // Ensure it's treated as a string
  const orderId = typeof params?.orderSlug === 'string' ? params.orderSlug : null;

  if (!orderId) {
    return <div className="p-6 text-center">Loading order ID...</div>;
  }

  // Pass the retrieved ID (still named orderId internally if desired)
  // to the actual detail component
  return <OrderDetailClient orderId={orderId} />;
}
