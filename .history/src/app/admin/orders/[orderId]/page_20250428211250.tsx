// src/app/admin/orders/[orderId]/page.tsx
import React, { Suspense } from 'react';
import OrderDetailClient from './OrderDetail';

// generateStaticParams remains the same
export async function generateStaticParams() {
  // Return empty array for fully dynamic rendering
  return [];
}

// Define the page component as async and type the props inline
export default async function OrderDetailPage({
  params,
}: {
  params: { orderId: string };
  // You could also add searchParams here if needed:
  // searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Destructure orderId directly from params
  const { orderId } = params;

  return (
    <Suspense fallback={<div className="p-6 text-center">Loading order details...</div>}>
      {/* Pass the orderId to the client component */}
      <OrderDetailClient orderId={orderId} />
    </Suspense>
  );
}
