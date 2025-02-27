//app/collections/bestsellers/page.tsx
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

export default function Bestsellers() {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/collections/bestsellers');
        if (!response.ok) {
          throw new Error('Failed to fetch bestsellers');
        }
        const data = await response.json();
        setProducts(data);
        
        // Extract unique brands and categories
        setBrands(Array.from(new Set(data.map((product: Product) => product.brand))));
        setCategories(Array.from(new Set(data.map((product: Product) => product.category))));
      } catch (error) {
        console.error('Error fetching bestsellers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <CollectionLayout
      title="Bestsellers"
      description="Our most-loved Korean beauty products, chosen by our community."
      products={products}
      brands={brands}
      categories={categories}
      loading={loading}
      banner={{
        image: "/api/placeholder/1920/400",
        title: "Bestsellers",
        description: "Discover why these products are loved by thousands"
      }}
    />
  );
}