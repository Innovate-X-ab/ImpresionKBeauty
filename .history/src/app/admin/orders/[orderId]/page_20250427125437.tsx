// src/app/admin/orders/[orderId]/page.tsx
import React, { Suspense } from 'react';
import OrderDetailClient from './OrderDetail'; // Ensure this path is correct

// Define the props for the page component
interface OrderDetailPageProps {
  params: {
    orderId: string; // The 'params' object itself is not a Promise here
  };
  // You can also include searchParams if needed:
  // searchParams?: { [key: string]: string | string[] | undefined };
}

// The page component itself can be async if needed for data fetching,
// but the props type doesn't include Promise for params.
export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  // Destructure orderId directly from params
  const { orderId } = params;

  // Add a check for orderId
  if (!orderId) {
    // Handle the case where orderId might be missing, though unlikely with file-based routing
    return <div>Error: Order ID is missing.</div>;
  }

  return (
    // Use Suspense for potential async operations within OrderDetailClient
    <Suspense fallback={<div>Loading order details...</div>}>
      <OrderDetailClient orderId={orderId} />
    </Suspense>
  );
}