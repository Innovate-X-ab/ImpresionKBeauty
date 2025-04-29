// src/app/admin/orders/[orderId]/page.tsx
import React, { Suspense } from 'react';
// Import the Client Component loader
import OrderDetailLoader from './OrderDetailLoader';

// Minimal props definition
interface OrderDetailPageProps {
  params: { orderId: string };
}

// Removed generateStaticParams for simplification

// Define the page component *without* async
export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { orderId } = params;

  return (
    // Suspense can still wrap the loader
    <Suspense fallback={<div className="p-6 text-center">Loading page...</div>}>
      {/* Render the OrderDetailLoader Client Component */}
      <OrderDetailLoader orderId={orderId} />
    </Suspense>
  );
}
