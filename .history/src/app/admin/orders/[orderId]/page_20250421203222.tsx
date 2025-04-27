// src/app/admin/orders/[orderId]/page.tsx
import React, { Suspense } from 'react';
import OrderDetailClient from './OrderDetail';

interface OrderPageProps {
  params: {
    orderId: string;
  };
}

export default async function OrderDetailPage({ params }: OrderPageProps) {
  // Await the params before using them
  const { orderId } = await params;
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderDetailClient orderId={orderId} />
    </Suspense>
  );
}