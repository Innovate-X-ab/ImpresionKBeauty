//components/layout/CollectionLayout.tsx

'use client';

import React from 'react';
import PageLayout from './PageLayout';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import { ArrowRight } from 'lucide-react';

interface CollectionLayoutProps {
  title: string;
  description: string;
  products: any[];
  brands: string[];
  categories: string[];
  banner?: {
    image: string;
    title: string;
    description: string;
  };
}

export default function CollectionLayout({
  title,
  description,
  products,
  brands,
  categories,
  banner
}: CollectionLayoutProps) {
  return (
    <PageLayout>
      {/* Banner Section (if provided) */}
      {banner && (
        <div className="relative h-[400px] mb-12">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${banner.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            <div className="relative h-full flex items-center justify-center text-center text-white px-4">
              <div>
                <h1 className="text-4xl font-light mb-4">{banner.title}</h1>
                <p className="max-w-2xl mx-auto text-lg">{banner.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          {/* Collection Header */}
          {!banner && (
            <div className="text-center mb-12">
              <h1 className="text-4xl font-light text-black mb-4">{title}</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
            </div>
          )}

          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-8">
            <a href="/" className="hover:text-black">Home</a>
            <ArrowRight className="w-4 h-4 mx-2" />
            <span className="text-black">{title}</span>
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