// src/app/admin/orders/[orderId]/page.tsx
import React, { Suspense } from 'react';
import OrderDetailClient from './OrderDetail';

interface OrderPageProps {
  params: {
    orderId: string;
  };
}

// Remove 'async' and 'await' as they are not needed here for params
export default function OrderDetailPage({ params }: OrderPageProps) {
  // Correct: Destructure directly without awaiting
  const { orderId } = params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderDetailClient orderId={orderId} />
    </Suspense>
  );
}