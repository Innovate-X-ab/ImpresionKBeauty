// src/app/admin/orders/[orderId]/page.tsx
import React, { Suspense } from 'react';
import OrderDetailLoader from './OrderDetailLoader'; // Keep using the loader
import type { Metadata } from 'next';

// Define the expected structure of the params prop
interface OrderParams {
  orderId: string;
}

// Define the props for the page component
interface OrderDetailPageProps {
  params: OrderParams;
  searchParams?: { [key: string]: string | string[] | undefined };
}

// generateStaticParams (optional)
export async function generateStaticParams() {
  return [];
}

// generateMetadata (optional)
export async function generateMetadata({ params }: { params: OrderParams }): Promise<Metadata> {
  const orderId = params.orderId;
  return {
    title: `Admin - Order ${orderId}`,
  };
}

// Define the page component as async, using the standard props interface
export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { orderId } = params;

  return (
    <Suspense fallback={<div className="p-6 text-center">Loading page...</div>}>
      {/* Render the OrderDetailLoader Client Component */}
      <OrderDetailLoader orderId={orderId} />
    </Suspense>
  );
}
