// src/app/admin/orders/[orderId]/page.tsx
import React from 'react';
// Removed Suspense and OrderDetailLoader imports for simplification

// Define the expected structure of the params prop
interface OrderParams {
  orderId: string;
}

// Removed generateStaticParams and generateMetadata for simplification

// Define the page component without async, explicitly typing the 'params'
export default function OrderDetailPage({ params }: { params: OrderParams }) {
  const { orderId } = params;

  // Render only the orderId to check if the basic page structure builds
  return (
    <div>
      <h1>Admin Order Detail Page</h1>
      <p>Order ID: {orderId}</p>
      {/* <Suspense fallback={<div>Loading page...</div>}>
        <OrderDetailLoader orderId={orderId} />
      </Suspense> */}
    </div>
  );
}
