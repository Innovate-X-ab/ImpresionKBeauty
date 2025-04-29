// src/app/admin/orders/[orderId]/page.tsx
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the client component
const OrderDetailClient = dynamic(() => import('./OrderDetail'), {
  ssr: false, // Disable SSR for this client component if appropriate, or set to true if needed
  loading: () => <div className="p-6 text-center">Loading component...</div>, // Optional loading state
});

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
  // searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // Destructure orderId directly from params
  const { orderId } = params;

  return (
    // Suspense boundary might still be useful depending on ssr setting
    <Suspense fallback={<div className="p-6 text-center">Loading order details...</div>}>
      {/* Render the dynamically imported component */}
      <OrderDetailClient orderId={orderId} />
    </Suspense>
  );
}
