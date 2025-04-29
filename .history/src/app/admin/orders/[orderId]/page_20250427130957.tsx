// src/app/admin/orders/[orderId]/page.tsx
import React, { Suspense } from 'react';
import OrderDetailClient from './OrderDetail'; // Ensure this path is correct

// Define the props for the page component
interface OrderDetailPageProps {
  params: {
    orderId: string; // Params are resolved *before* being passed to the component
  };
  // searchParams?: { [key: string]: string | string[] | undefined };
}

// Make the component explicitly async
export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  // Destructure orderId directly from params
  const { orderId } = params;

  // Add a check for orderId (though unlikely to be missing with file routing)
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