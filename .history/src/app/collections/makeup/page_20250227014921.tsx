//app/collections/makeup/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import CollectionLayout from '@/components/layout/CollectionLayout';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number | string;
  category: string;
  images: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
  stock: number;
  createdAt: string;
  updatedAt: string;
  description: string;
}

export default function Makeup() {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/collections/makeup');
        if (!response.ok) {
          throw new Error('Failed to fetch makeup products');
        }
        const data = await response.json();
        setProducts(data);
        
        // Extract unique brands and categories
        setBrands(Array.from(new Set(data.map((product: Product) => product.brand))));
        setCategories(Array.from(new Set(data.map((product: Product) => product.category))));
      } catch (error) {
        console.error('Error fetching makeup products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <CollectionLayout
      title="Makeup"
      description="Explore our range of Korean makeup products for that perfect K-beauty glow."
      products={products}
      brands={brands}
      categories={categories}
      loading={loading}
      banner={{
        image: "/api/placeholder/1920/400",
        title: "K-Beauty Makeup",
        description: "Create flawless looks with innovative Korean makeup"
      }}
    />
  );
}