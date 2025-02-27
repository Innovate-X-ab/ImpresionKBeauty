//app/collections/bestsellers/page.tsx
'use client';

import React from 'react';
import { prisma } from '@/lib/prisma';
import CollectionLayout from '@/components/layout/CollectionLayout';

export default async function Bestsellers() {
  // TODO: In a real application, we would determine bestsellers based on order history
  // For now, we'll simulate bestsellers with a random selection of products
  const products = await prisma.product.findMany({
    take: 12,
    orderBy: {
      createdAt: 'desc'
    }
  });

  const brands = Array.from(new Set(products.map(product => product.brand)));
  const categories = Array.from(new Set(products.map(product => product.category)));

  return (
    <CollectionLayout
      title="Bestsellers"
      description="Our most-loved Korean beauty products, chosen by our community."
      products={products}
      brands={brands}
      categories={categories}
      banner={{
        image: "/api/placeholder/1920/400",
        title: "Bestsellers",
        description: "Discover why these products are loved by thousands"
      }}
    />
  );
}