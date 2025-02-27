//app/collections/skincare/page.tsx

import React from 'react';
import { prisma } from '@/lib/prisma';
import CollectionLayout from '@/components/layout/CollectionLayout';

export default async function Skincare() {
  const products = await prisma.product.findMany({
    where: {
      category: 'skincare'
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const brands = Array.from(new Set(products.map(product => product.brand)));
  const categories = Array.from(new Set(products.map(product => product.category)));

  return (
    <CollectionLayout
      title="Skincare"
      description="Discover our curated collection of Korean skincare products for every skin type and concern."
      products={products}
      brands={brands}
      categories={categories}
      banner={{
        image: "/api/placeholder/1920/400",
        title: "K-Beauty Skincare",
        description: "Advanced formulations for your best skin ever"
      }}
    />
  );
}