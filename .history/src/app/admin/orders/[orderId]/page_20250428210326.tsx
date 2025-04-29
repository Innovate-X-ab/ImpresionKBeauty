// src/app/admin/orders/[orderId]/page.tsx
import React, { Suspense } from 'react';
import OrderDetailClient from './OrderDetail';
import type { NextPage } from 'next';

// Correctly type the props for a dynamic route page in App Router
// 'params' is an object containing the route parameters
type Props = {
  params: { orderId: string };
  // searchParams might also be available if needed:
  // searchParams: { [key: string]: string | string[] | undefined };
};

// This function is optional but helps Next.js know possible paths at build time.
// Returning an empty array means all paths are dynamically rendered on demand.
export async function generateStaticParams() {
  // Example: Fetch order IDs if you want to pre-render some pages
  // const orders = await prisma.order.findMany({ select: { id: true }, take: 10 });
  // return orders.map((order) => ({ orderId: order.id }));

  // Return empty array for fully dynamic rendering
  return [];
}

// The Page component receives props matching the 'Props' type
const OrderDetailPage: NextPage<Props> = ({ params }) => {
  // Destructure orderId directly from params
  const { orderId } = params;

  // No need for use(params) here

  return (
    // Suspense is good practice for loading Server Components or data fetching
    <Suspense fallback={<div className="p-6 text-center">Loading order details...</div>}>
      <OrderDetailClient orderId={orderId} />
    </Suspense>
  );
};

export default OrderDetailPage;
