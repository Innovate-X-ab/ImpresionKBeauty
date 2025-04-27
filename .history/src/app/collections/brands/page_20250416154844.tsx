'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import AdminProductControls from '@/components/admin/AdminProductControls';
import { useAuth } from '@/contexts/AuthContext';
import ProductGrid from '@/components/products/ProductGrid';
import { Product } from '@/types/products';

export default function Brands() {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setIsLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [uniqueBrands, setUniqueBrands] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
        
        // Extract unique brands
        const brands = Array.from(new Set<string>(data.map((product: Product) => product.brand)));
        setUniqueBrands(brands);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = selectedBrand === 'all' 
    ? products 
    : products.filter(product => product.brand === selectedBrand);

  if (loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center h-64 bg-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Remove bg-white from this div and adjust max width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-black">Home</Link>
          <ArrowRight className="w-4 h-4 mx-2" />
          <span className="text-black">Brands</span>
        </div>

        {/* Admin Controls */}
        {isAdmin && <AdminProductControls title="Products by Brand" />}

        {/* Brand Filter */}
        <div className="mb-8">
          <h1 className="text-3xl font-light mb-6 text-gray-900">Our Brands Collection</h1>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedBrand('all')}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selectedBrand === 'all'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              All Brands
            </button>
            {uniqueBrands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedBrand === brand
                    ? 'bg-black text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Products Display */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium text-gray-900">
              {selectedBrand === 'all' ? 'All Products' : `${selectedBrand} Products`}
            </h2>
            <span className="text-sm text-gray-500">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </span>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No products found for this brand.</p>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
    </PageLayout>
  );
}