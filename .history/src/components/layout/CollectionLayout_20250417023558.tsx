'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PageLayout from './PageLayout';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import { ArrowRight, X, Filter } from 'lucide-react';
import AdminProductControls from '@/components/admin/AdminProductControls';

// Define a product interface
interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  images: string;
  category: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
  stock: number;
  description: string;
}

interface CollectionLayoutProps {
  title: string;
  description: string;
  products: Product[];
  brands: string[];
  categories: string[];
  loading?: boolean;
  banner?: {
    image: string;
    title: string;
    description: string;
  };
}

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function CollectionLayout({
  title,
  description,
  products,
  brands,
  categories,
  loading,
  banner
}: CollectionLayoutProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <PageLayout className="bg-white">
      {/* Text Header Section - Smaller Size */}
      {banner && (
        <div className="w-full bg-gray-50 py-1 -mt-8">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl font-light mb-1 text-black">{banner.title}</h1>
              <p className="text-xs sm:text-sm text-gray-600">{banner.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Admin Controls */}
          <AdminProductControls title={!banner ? title : undefined} />

          {/* Collection Header - Only show if no banner */}
          {!banner && (
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-black mb-2 sm:mb-4">{title}</h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">{description}</p>
            </div>
          )}

          {/* Breadcrumb */}
          <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">
            <Link href="/" className="hover:text-black">Home</Link>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 mx-2" />
            <span className="text-black">{title}</span>
          </div>

          {/* Mobile Filter Button */}
          <button
            className="md:hidden w-full mb-4 px-4 py-2 bg-gray-100 text-gray-800 rounded-md flex items-center justify-between"
            onClick={() => setShowMobileFilters(true)}
          >
            <span className="text-sm">Filters</span>
            <Filter className="w-4 h-4" />
          </button>

          {/* Products Section */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Mobile Filter Overlay */}
            {showMobileFilters && (
              <div className="fixed inset-0 z-50 bg-white md:hidden">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="font-medium">Filters</h2>
                  <button 
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">
                  <ProductFilters 
                    brands={brands}
                    categories={categories}
                  />
                </div>
              </div>
            )}

            {/* Desktop Filters */}
            <div className="hidden md:block w-64 lg:w-72">
              <ProductFilters 
                brands={brands}
                categories={categories}
              />
            </div>
            
            {/* Product Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <p className="text-gray-500">Loading products...</p>
                </div>
              ) : (
                <ProductGrid products={products} />
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}