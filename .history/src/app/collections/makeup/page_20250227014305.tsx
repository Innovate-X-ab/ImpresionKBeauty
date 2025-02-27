//app/collections/makeup/page.tsx
'use client';
import React from 'react';
import { prisma } from '@/lib/prisma';
import CollectionLayout from '@/components/layout/CollectionLayout';

export default async function Makeup() {
  const products = await prisma.product.findMany({
    where: {
      category: 'makeup'
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const brands = Array.from(new Set(products.map(product => product.brand)));
  const categories = Array.from(new Set(products.map(product => product.category)));

  return (
    <CollectionLayout
      title="Makeup"
      description="Explore our range of Korean makeup products for that perfect K-beauty glow."
      products={products}
      brands={brands}
      categories={categories}
      banner={{
        image: "/api/placeholder/1920/400",
        title: "K-Beauty Makeup",
        description: "Create flawless looks with innovative Korean makeup"
      }}
    />
  );
}