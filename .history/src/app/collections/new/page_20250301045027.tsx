//app/collections/new/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import CollectionLayout from '@/components/layout/CollectionLayout';

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
  createdAt: string;
  updatedAt: string;
  description: string;
}

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/collections/new');
        if (!response.ok) {
          throw new Error('Failed to fetch new arrivals');
        }
        const data = await response.json();
        setProducts(data);
        
        // Extract unique brands and categories
        setBrands(Array.from(new Set(data.map((product: Product) => product.brand))));
        setCategories(Array.from(new Set(data.map((product: Product) => product.category))));
      } catch (error) {
        console.error('Error fetching new arrivals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <CollectionLayout
      title="New Arrivals"
      description="Discover our latest K-beauty products, featuring innovative formulations and trending ingredients."
      products={products}
      brands={brands}
      categories={categories}
      loading={loading}
      banner={{
        image: "/images/new/new-arrivals.jpeg",
        title: "New Arrivals",
        description: "Be the first to try our latest Korean beauty innovations"
      }}
    />
  );
}