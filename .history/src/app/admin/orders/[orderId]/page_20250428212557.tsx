// src/app/admin/orders/[orderId]/page.tsx
import React, { Suspense } from 'react';
import OrderDetailLoader from './OrderDetailLoader';
import type { Metadata } from 'next'; // Import Metadata type

// Props definition
interface OrderDetailPageProps {
  params: { orderId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// generateStaticParams (optional, but kept for structure)
export async function generateStaticParams() {
  return [];
}

// Add generateMetadata function
// Even a basic implementation can sometimes help with type inference during build
export async function generateMetadata({ params }: OrderDetailPageProps): Promise<Metadata> {
  const orderId = params.orderId;
  // You could potentially fetch minimal order data here if needed for the title
  return {
    title: `Admin - Order ${orderId}`, // Example title
    // Add other metadata fields if desired
  };
}

// Define the page component (can be async or not, let's try without async first)
export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { orderId } = params;

  return (
    <Suspense fallback={<div className="p-6 text-center">Loading page...</div>}>
      {/* Render the OrderDetailLoader Client Component */}
      <OrderDetailLoader orderId={orderId} />
    </Suspense>
  );
}
