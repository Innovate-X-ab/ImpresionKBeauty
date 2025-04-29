// src/app/admin/orders/[orderId]/page.tsx
import React, { Suspense } from 'react';
import OrderDetailClient from './OrderDetail';
import type { NextPage } from 'next';

type Props = {
  params: { orderId: string };
};

// Add this function - return an empty array if you don't need static paths
export async function generateStaticParams() {
  // If you *do* fetch possible orderIds at build time, return them here:
  // const orders = await fetchOrders(); // Fetch logic
  // return orders.map((order) => ({ orderId: order.id }));

  // Otherwise, return empty array for dynamic rendering only
  return [];
}

const OrderDetailPage: NextPage<Props> = ({ params }) => {
  const { orderId } = params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderDetailClient orderId={orderId} />
    </Suspense>
  );
};

export default OrderDetailPage;