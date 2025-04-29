// src/app/admin/orders/[orderId]/page.tsx
import React, { Suspense } from 'react';
import OrderDetailClient from './OrderDetail';
// Removed 'NextPage' import as we'll let types be inferred

// Define the expected structure of the params prop
interface OrderDetailPageProps {
  params: {
    orderId: string;
  };
  // You can also include searchParams if needed:
  // searchParams: { [key: string]: string | string[] | undefined };
}

// This function is optional but helps Next.js know possible paths at build time.
export async function generateStaticParams() {
  // Return empty array for fully dynamic rendering
  return [];
}

// Define the page component. Let TypeScript infer the props type based on usage.
// The props object will automatically contain 'params' and potentially 'searchParams'.
export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  // Destructure orderId directly from params
  const { orderId } = params;

  return (
    // Suspense is good practice for loading Server Components or data fetching
    <Suspense fallback={<div className="p-6 text-center">Loading order details...</div>}>
      {/* Pass the orderId to the client component */}
      <OrderDetailClient orderId={orderId} />
    </Suspense>
  );
}
