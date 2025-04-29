// src/app/admin/orders/[orderId]/page.tsx
import React, { Suspense } from 'react';
// Import the Client Component loader
import OrderDetailLoader from './OrderDetailLoader';
// No Metadata or generateStaticParams needed for this approach

// This page component no longer needs to accept or process props like params
// It simply acts as the entry point to render the client-side loader
export default function OrderDetailPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading page...</div>}>
      {/* Render the OrderDetailLoader - it will read the ID itself */}
      <OrderDetailLoader />
    </Suspense>
  );
}
