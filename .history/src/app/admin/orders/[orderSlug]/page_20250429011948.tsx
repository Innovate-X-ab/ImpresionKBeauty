// src/app/admin/orders/[orderSlug]/page.tsx
import React, { Suspense } from 'react';
// Ensure this import path is correct relative to this file
import OrderDetailLoader from './OrderDetailLoader';
// No Metadata or generateStaticParams needed for this approach

// This page component no longer needs props.
// It renders the loader which gets the ID via useParams.
export default function OrderDetailPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading page...</div>}>
      {/* Render OrderDetailLoader WITHOUT passing any props */}
      <OrderDetailLoader />
    </Suspense>
  );
}