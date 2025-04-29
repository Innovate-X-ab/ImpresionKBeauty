// src/app/admin/orders/[orderId]/page.tsx
import React, { Suspense } from 'react';
import OrderDetailLoader from './OrderDetailLoader';
// Keep Metadata import if you plan to add generateMetadata back later
import type { Metadata } from 'next';

// Define the expected structure of the params prop
interface OrderParams {
  orderId: string;
}

// generateStaticParams can be added back if needed
/*
export async function generateStaticParams() {
  return [];
}
*/

// generateMetadata can be added back if needed
/*
export async function generateMetadata({ params }: { params: OrderParams }): Promise<Metadata> {
  const orderId = params.orderId;
  return {
    title: `Admin - Order ${orderId}`,
  };
}
*/

// Define the page component without async for now.
// Use 'any' for the props initially, then cast params inside.
// Or, use the `as unknown as { params: OrderParams }` assertion.
export default function OrderDetailPage(props: any) {
  // Use a type assertion to get the params object
  const { params } = props as { params: OrderParams };
  const { orderId } = params;

  // Alternative assertion (if the above causes issues):
  // const params = (props as any).params as OrderParams;
  // const orderId = params.orderId;


  return (
    // Suspense can still wrap the loader
    <Suspense fallback={<div className="p-6 text-center">Loading page...</div>}>
      {/* Render the OrderDetailLoader Client Component */}
      <OrderDetailLoader orderId={orderId} />
    </Suspense>
  );
}

// --- Alternative using unknown ---
/*
export default function OrderDetailPage(props: unknown) {
  // Cast to unknown first, then to the expected shape
  const { params } = props as { params: OrderParams };
  const { orderId } = params;

  return (
    <Suspense fallback={<div className="p-6 text-center">Loading page...</div>}>
      <OrderDetailLoader orderId={orderId} />
    </Suspense>
  );
}
*/
