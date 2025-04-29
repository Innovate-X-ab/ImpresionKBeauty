// src/app/admin/orders/[orderId]/page.tsx
import React, { Suspense } from 'react';
import OrderDetailClient from './OrderDetail'; // Ensure this path is correct

// Define the props type directly for the component
type OrderDetailPageProps = {
  params: {
    orderId: string; // Params are resolved *before* being passed to the component
  };
  // searchParams?: { [key: string]: string | string[] | undefined };
};

// Make the component synchronous (not async)
export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  // Destructure orderId directly from params
  const { orderId } = params;

  // Add a check for orderId
  if (!orderId) {
    return <div>Error: Order ID is missing.</div>;
  }

  return (
    // Use Suspense for potential async operations within OrderDetailClient
    <Suspense fallback={<div>Loading order details...</div>}>
      {/* Pass the orderId string to the client component */}
      <OrderDetailClient orderId={orderId} />
    </Suspense>
  );
}