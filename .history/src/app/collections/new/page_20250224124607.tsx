//app/collections/new/page.tsx

import React from 'react';
import { prisma } from '@/lib/prisma';
import CollectionLayout from '@/components/layout/CollectionLayout';

export default async function NewArrivals() {
  // Fetch new arrivals (products from the last 30 days)
  const products = await prisma.product.findMany({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const brands = Array.from(new Set(products.map(product => product.brand)));
  const categories = Array.from(new Set(products.map(product => product.category)));

  return (
    <CollectionLayout
      title="New Arrivals"
      description="Discover our latest K-beauty products, featuring innovative formulations and trending ingredients."
      products={products}
      brands={brands}
      categories={categories}
      banner={{
        image: "/api/placeholder/1920/400",
        title: "New Arrivals",
        description: "Be the first to try our latest Korean beauty innovations"
      }}
    />
  );
}