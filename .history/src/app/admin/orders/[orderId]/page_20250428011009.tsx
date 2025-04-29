// src/app/admin/orders/[orderId]/page.tsx
import React, { Suspense } from 'react';
import OrderDetailClient from './OrderDetail';

// Define props directly in the function signature
export default function OrderDetailPage({
  params,
}: {
  params: { orderId: string }; // Explicitly type the 'params' prop here
}) {
  const { orderId } = params; // Destructure directly

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderDetailClient orderId={orderId} />
    </Suspense>
  );
}