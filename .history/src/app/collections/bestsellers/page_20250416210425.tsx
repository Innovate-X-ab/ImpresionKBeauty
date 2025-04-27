//app/collections/bestsellers/page.tsx
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
  isBestSeller: boolean;
}

export default function Bestsellers() {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/collections/bestsellers');
        if (!response.ok) {
          throw new Error('Failed to fetch bestsellers');
        }
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setProducts(data);
          setBrands(Array.from(new Set(data.map((product: Product) => product.brand))));
          setCategories(Array.from(new Set(data.map((product: Product) => product.category))));
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.error('Error fetching bestsellers:', error);
        setError(error instanceof Error ? error.message : 'Failed to load bestsellers');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

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