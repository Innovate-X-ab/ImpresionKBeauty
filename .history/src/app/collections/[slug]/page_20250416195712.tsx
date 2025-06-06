//app/collections/[slug]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import { useAuth } from '@/contexts/AuthContext';
import AdminProductControls from '@/components/admin/AdminProductControls';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface CollectionPageProps {
  params: {
    slug: string;
  };
}

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  images: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
  stock: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  // Convert slug to display name
  const displayName = params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/collections/${params.slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        
        // Extract unique brands
        const uniqueBrands = Array.from(new Set(data.map((p: Product) => p.brand))) as string[];
        setBrands(uniqueBrands);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchProducts();
    }
  }, [params.slug]);

  // Add admin handler for deleting products
  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    setDeletingProductId(productId);
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete product');
      
      // Remove product from state
      setProducts(products.filter(p => p.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    } finally {
      setDeletingProductId(null);
    }
  };

  return (
    <PageLayout>
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          {/* Collection Header with Admin Controls */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-4xl font-light text-black">{displayName}</h1>
              {isAdmin && (
                <div className="flex items-center gap-4">
                  <Link
                    href="/admin/products/new"
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Product
                  </Link>
                </div>
              )}
            </div>
            <p className="text-gray-600 max-w-2xl">
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
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                </div>
              ) : (
                <>
                  {isAdmin && (
                    <AdminProductControls 
                      title={`${displayName} Products`}
                    />
                  )}
                  <ProductGrid 
                    products={products}
                    isAdmin={isAdmin}
                    onDeleteProduct={handleDeleteProduct}
                    deletingProductId={deletingProductId}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}