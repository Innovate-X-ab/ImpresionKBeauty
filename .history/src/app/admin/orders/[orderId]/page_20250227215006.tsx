//src/app/admin/orders/[orderId]/page.tsx

import { Suspense } from 'react';
import OrderDetailClient from './OrderDetail';

export default function OrderDetailPage({
  params,
}: {
  params: { orderId: string };
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderDetailClient orderId={params.orderId} />
    </Suspense>
  );
}