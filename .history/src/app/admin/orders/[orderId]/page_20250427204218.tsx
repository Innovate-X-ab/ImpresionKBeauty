// src/app/admin/orders/[orderId]/page.tsx
import React, { Suspense } from 'react';
import type { NextPage } from 'next'; // Import the NextPage type
import OrderDetailClient from './OrderDetail'; // Ensure this path is correct

// Define the props type for the page component
interface OrderDetailPageProps {
  params: {
    orderId: string; // Params are resolved *before* being passed
  };
  // searchParams?: { [key: string]: string | string[] | undefined };
}

// Explicitly type the component using NextPage
const OrderDetailPage: NextPage<OrderDetailPageProps> = ({ params }) => {
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
};

export default OrderDetailPage;