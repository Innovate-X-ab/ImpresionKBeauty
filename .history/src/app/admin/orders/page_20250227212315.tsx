//app/admin/orders/page.tsx

import { Suspense } from 'react';
import OrdersClient from './OrdersList';

export default function OrdersPage() {
  return (
    <Suspense fallback={<div>Loading orders...</div>}>
      <OrdersClient />
    </Suspense>
  );
}