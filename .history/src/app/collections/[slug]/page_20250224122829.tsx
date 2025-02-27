//app/collections/[slug]/page.tsx

import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import { prisma } from '@/lib/prisma';

interface CollectionPageProps {
  params: {
    slug: string;
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = params;

  // Convert slug to display name
  const displayName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Fetch products for this collection
  const products = await prisma.product.findMany({
    where: {
      category: slug
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const brands = Array.from(new Set(products.map(product => product.brand)));
  const categories = Array.from(new Set(products.map(product => product.category)));

  return (
    <PageLayout>
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          {/* Collection Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-black mb-4">{displayName}</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our curated collection of {displayName.toLowerCase()} products, 
              featuring the best of K-beauty.
            </p>
          </div>

          {/* Products Section */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-64 lg:w-72">
              <ProductFilters 
                brands={brands}
                categories={categories}
              />
            </div>
            
            <div className="flex-1">
              <ProductGrid products={products} />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}