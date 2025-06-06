'use client';

import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import { useAuth } from '@/contexts/AuthContext';
import AdminProductControls from '@/components/admin/AdminProductControls';
import { Plus } from 'lucide-react';
import Link from 'next/link';

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

interface CollectionPageClientProps {
  slug: string;
}

export default function CollectionPageClient({ slug }: CollectionPageClientProps) {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  const displayName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        console.log('Client Debug - Fetching products for:', slug);
        const response = await fetch(`/api/collections/${slug}`);
        
        const data = await response.json();
        console.log('Client Debug - Received data:', data);

        // Check if we received an error response
        if (!response.ok) {
          throw new Error(data.error || `HTTP error! status: ${response.status}`);
        }

        // Ensure data is an array
        if (!Array.isArray(data)) {
          console.log('Client Debug - Invalid data format:', data);
          setProducts([]);
          setBrands([]);
          return;
        }

        // Type guard to ensure each item has required properties
        const validProducts = data.filter((item): item is Product => {
          return (
            item &&
            typeof item === 'object' &&
            'id' in item &&
            'name' in item &&
            'brand' in item &&
            'price' in item &&
            'images' in item
          );
        });

        console.log('Client Debug - Valid products:', validProducts.length);
        setProducts(validProducts);
        
        const uniqueBrands = Array.from(
          new Set(validProducts.map(p => p.brand))
        ).filter(Boolean);
        
        setBrands(uniqueBrands);

      } catch (error) {
        console.error('Client Debug - Error:', error);
        setProducts([]);
        setBrands([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    setDeletingProductId(productId);
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete product');
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