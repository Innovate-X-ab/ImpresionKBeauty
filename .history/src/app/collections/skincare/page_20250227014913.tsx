//app/collections/skincare/page.tsx
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

export default function Skincare() {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/collections/skincare');
        if (!response.ok) {
          throw new Error('Failed to fetch skincare products');
        }
        const data = await response.json();
        setProducts(data);
        
        // Extract unique brands and categories
        setBrands(Array.from(new Set(data.map((product: Product) => product.brand))));
        setCategories(Array.from(new Set(data.map((product: Product) => product.category))));
      } catch (error) {
        console.error('Error fetching skincare products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <CollectionLayout
      title="Skincare"
      description="Discover our curated collection of Korean skincare products for every skin type and concern."
      products={products}
      brands={brands}
      categories={categories}
      loading={loading}
      banner={{
        image: "/api/placeholder/1920/400",
        title: "K-Beauty Skincare",
        description: "Advanced formulations for your best skin ever"
      }}
    />
  );
}