// src/app/admin/orders/[orderId]/page.tsx
import React, { Suspense } from 'react';
import OrderDetailClient from './OrderDetail';

// Explicitly define the props structure for a dynamic route page
// This mirrors the structure Next.js provides to page components
interface OrderDetailPageProps {
  params: { orderId: string };
  searchParams?: { [key: string]: string | string[] | undefined }; // Optional searchParams
}

// generateStaticParams remains the same
export async function generateStaticParams() {
  return [];
}

// Define the page component as async, explicitly using the defined props interface
export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  // Destructure orderId directly from params
  const { orderId } = params;

  return (
    <Suspense fallback={<div className="p-6 text-center">Loading order details...</div>}>
      {/* Pass the orderId to the client component */}
      <OrderDetailClient orderId={orderId} />
    </Suspense>
  );
}
