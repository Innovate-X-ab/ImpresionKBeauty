// src/app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import ProductForm from '@/components/admin/ProductForm';
import ProductList from '@/components/admin/ProductList';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      const data = await response.json();
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium">Add New Product</h2>
          <ProductForm onSuccess={fetchProducts} />
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium mb-4">Product List</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ProductList products={products} onUpdate={fetchProducts} />
          )}
        </div>
      </div>
    </div>
  );
}