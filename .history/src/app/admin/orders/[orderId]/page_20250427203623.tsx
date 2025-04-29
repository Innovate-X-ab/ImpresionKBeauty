// src/app/admin/orders/[orderId]/page.tsx
import React, { Suspense } from 'react';
import OrderDetailClient from './OrderDetail'; // Ensure this path is correct

// Remove explicit props type definition - let Next.js infer
// type OrderDetailPageProps = {
//   params: {
//     orderId: string;
//   };
// };

// Define the component without explicit prop types
// Next.js should correctly infer `params` as { orderId: string }
export default function OrderDetailPage({ params }: { params: { orderId: string } }) {
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