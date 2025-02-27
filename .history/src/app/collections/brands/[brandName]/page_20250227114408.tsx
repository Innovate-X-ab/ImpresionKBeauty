//app/collections/brands/[brandName]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import PageLayout from '@/components/layout/PageLayout';
import ProductGrid from '@/components/products/ProductGrid';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// This is temporary mock data - replace with real brand information from your database
const brandInfo = {
  'cosrx': {
    name: 'COSRX',
    description: 'COSRX focuses on creating minimal, effective skincare solutions using scientific formulations.',
    image: '/api/placeholder/1920/400',
    logo: '/api/placeholder/200/200',
    story: 'Founded in 2014, COSRX has become a global leader in Korean skincare, known for their innovative formulations that focus on singular, effective ingredients.',
    values: [
      'Scientific Approach',
      'Minimal Ingredients',
      'Sensitive Skin Safe',
      'Dermatologist Tested'
    ]
  },
  'beauty-of-joseon': {
    name: 'Beauty of Joseon',
    description: 'Beauty of Joseon combines traditional Korean herbal ingredients with modern skincare technology.',
    image: '/api/placeholder/1920/400',
    logo: '/api/placeholder/200/200',
    story: 'Beauty of Joseon draws inspiration from historical Korean beauty secrets, specifically from the Joseon Dynasty era.',
    values: [
      'Traditional Ingredients',
      'Modern Technology',
      'Clean Beauty',
      'Sustainable Practices'
    ]
  }
  // Add more brands as needed
};

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

interface BrandPageProps {
  params: {
    brandName: string;
  };
}

export default function BrandPage({ params }: BrandPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const brandSlug = params.brandName.toLowerCase();
  const brand = brandInfo[brandSlug as keyof typeof brandInfo];

  if (!brand) {
    notFound();
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/collections/brands/${brandSlug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch brand products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching brand products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [brandSlug]);

  return (
    <PageLayout>
      {/* Brand Hero */}
      <div className="relative h-[400px] bg-cover bg-center" style={{ backgroundImage: `url(${brand.image})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-light text-white mb-4">{brand.name}</h1>
            <p className="text-xl text-white/90">{brand.description}</p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
            <Link href="/collections/brands" className="text-gray-500 hover:text-gray-700">Brands</Link>
            <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-gray-900">{brand.name}</span>
          </div>
        </div>
      </div>

      {/* Brand Story */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
          <div className="w-32 h-32 mx-auto mb-8 relative">
            <Image
              src={brand.logo}
              alt={`${brand.name} logo`}
              fill
              sizes="128px"
              className="object-contain"
            />
          </div>
            <h2 className="text-3xl font-light mb-6">Our Story</h2>
            <p className="text-gray-600 mb-8">{brand.story}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {brand.values.map((value, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-12">{brand.name} Products</h2>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading products...</p>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </PageLayout>
  );
}