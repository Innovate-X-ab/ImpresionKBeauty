//src/app/admin/orders/[orderId]/page.tsx

import { Suspense } from 'react';
import OrderDetailClient from './OrderDetail';

interface OrderDetailPageProps {
  params: {
    orderId: string;
  };
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderDetailClient orderId={params.orderId} />
    </Suspense>
  );
}