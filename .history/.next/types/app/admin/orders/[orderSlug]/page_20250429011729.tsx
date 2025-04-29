// src/app/admin/orders/[orderSlug]/page.tsx
// Note the filename change reflects the folder rename

import React, { Suspense } from 'react';
// Import the Client Component loader
import OrderDetailLoader from './OrderDetailLoader';
import type { Metadata } from 'next';

// Define the expected structure of the params prop with the new name
interface OrderParams {
  orderSlug: string; // Renamed from orderId
}

// Define the props for the page component
interface OrderDetailPageProps {
  params: OrderParams;
  searchParams?: { [key: string]: string | string[] | undefined };
}

// generateStaticParams (optional) - update param name if used
export async function generateStaticParams() {
   // If you fetch params, make sure the returned object uses orderSlug
   // Example: return orders.map((order) => ({ orderSlug: order.id }));
  return [];
}

// generateMetadata (optional) - update param name
export async function generateMetadata({ params }: { params: OrderParams }): Promise<Metadata> {
  const orderSlug = params.orderSlug; // Renamed from orderId
  return {
    title: `Admin - Order ${orderSlug}`, // Update title if desired
  };
}

// Define the page component as async, using the standard props interface
export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  // Destructure the renamed parameter
  const { orderSlug } = params;

  return (
    <Suspense fallback={<div className="p-6 text-center">Loading page...</div>}>
      {/* Pass the renamed parameter to the OrderDetailLoader */}
      <OrderDetailLoader orderId={orderSlug} />
    </Suspense>
  );
}
