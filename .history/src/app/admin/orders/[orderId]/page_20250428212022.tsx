// src/app/admin/orders/[orderId]/page.tsx
import React, { Suspense } from 'react';
// Import the Client Component loader we created
import OrderDetailLoader from './OrderDetailLoader';

// Define the expected structure of the params prop for this dynamic route
interface OrderDetailPageProps {
  params: {
    orderId: string;
  };
  // You can also include searchParams if needed:
  // searchParams: { [key: string]: string | string[] | undefined };
}

// This function is optional but helps Next.js know possible paths at build time.
// Returning an empty array means all paths are dynamically rendered on demand.
export async function generateStaticParams() {
  // Return empty array for fully dynamic rendering
  return [];
}

// Define the page component as async (standard for Server Components)
export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  // Destructure orderId directly from params
  const { orderId } = params;

  return (
    // Suspense can wrap the loader for a page-level fallback
    <Suspense fallback={<div className="p-6 text-center">Loading page...</div>}>
      {/* Render the OrderDetailLoader Client Component, passing the orderId */}
      <OrderDetailLoader orderId={orderId} />
    </Suspense>
  );
}