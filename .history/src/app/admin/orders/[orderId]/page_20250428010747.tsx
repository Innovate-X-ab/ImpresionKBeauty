// src/app/admin/orders/[orderId]/page.tsx
import React, { Suspense } from 'react';
import OrderDetailClient from './OrderDetail';

interface OrderPageProps {
  params: {
    orderId: string;
  };
}

// Remove 'async' from the function definition
export default function OrderDetailPage({ params }: OrderPageProps) {
  const { orderId } = params; // Destructure directly

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderDetailClient orderId={orderId} />
    </Suspense>
  );
}