// src/app/admin/orders/[orderId]/page.tsx
import React, { Suspense } from 'react';
import OrderDetailLoader from './OrderDetailLoader';
import type { Metadata } from 'next';

// Define the expected structure of the params prop for this dynamic route
interface OrderParams {
  orderId: string;
}

// generateStaticParams remains the same
export async function generateStaticParams() {
  return [];
}

// generateMetadata remains the same
export async function generateMetadata({ params }: { params: OrderParams }): Promise<Metadata> {
  const orderId = params.orderId;
  return {
    title: `Admin - Order ${orderId}`,
  };
}

// Define the page component as async, explicitly typing the 'params' destructured property
export default async function OrderDetailPage({ params }: { params: OrderParams }) {
  // params is now explicitly typed as OrderParams
  const { orderId } = params;

  return (
    <Suspense fallback={<div className="p-6 text-center">Loading page...</div>}>
      {/* Render the OrderDetailLoader Client Component */}
      <OrderDetailLoader orderId={orderId} />
    </Suspense>
  );
}
