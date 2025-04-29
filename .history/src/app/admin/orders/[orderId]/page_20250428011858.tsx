// src/app/admin/orders/[orderId]/page.tsx
import React, { Suspense } from 'react';
import OrderDetailClient from './OrderDetail';
import type { NextPage } from 'next'; // Import NextPage type

// Define the shape of the params
type Props = {
  params: { orderId: string };
  // searchParams?: { [key: string]: string | string[] | undefined }; // Optional: Include searchParams if needed
};

// Use the NextPage generic type
const OrderDetailPage: NextPage<Props> = ({ params }) => {
  const { orderId } = params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderDetailClient orderId={orderId} />
    </Suspense>
  );
};

export default OrderDetailPage;

// Optional: If you have generateMetadata or other route segment config, keep them
// export async function generateMetadata(
//   { params }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const orderId = params.orderId;
//   // Fetch metadata based on orderId if needed
//   return {
//     title: `Admin Order ${orderId}`,
//   };
// }