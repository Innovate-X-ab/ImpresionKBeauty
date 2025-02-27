// app/products/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import AddProductButton from '@/components/admin/AddProductButton';

export default function ProductsPage() {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const brands = Array.from(new Set(products.map((product: any) => product.brand)));
  const categories = Array.from(new Set(products.map((product: any) => product.category)));

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Products</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64">
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

      {/* Add Product Button - Only shown to admin users */}
      {isAdmin && <AddProductButton />}
    </div>
  );
}