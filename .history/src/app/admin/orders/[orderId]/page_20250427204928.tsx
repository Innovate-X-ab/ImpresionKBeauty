// src/app/admin/orders/[orderId]/page.tsx
import React, { Suspense } from 'react';
import OrderDetailClient from './OrderDetail'; // Ensure this path is correct

// Define the component and type params inline
export default function OrderDetailPage({
  params,
}: {
  params: { orderId: string }; // Define the expected type for params here
  // searchParams?: { [key: string]: string | string[] | undefined }; // Optional searchParams
}) {
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