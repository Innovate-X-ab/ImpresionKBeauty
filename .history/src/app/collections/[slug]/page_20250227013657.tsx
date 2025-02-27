//app/collections/[slug]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';

interface CollectionPageProps {
  params: {
    slug: string;
  };
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = params;
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Convert slug to display name
  const displayName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  useEffect(() => {
    // Fetch products for this collection
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/collections/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        
        // Extract unique brands and categories
        setBrands(Array.from(new Set(data.map((product: any) => product.brand))));
        setCategories(Array.from(new Set(data.map((product: any) => product.category))));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

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
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <p>Loading products...</p>
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