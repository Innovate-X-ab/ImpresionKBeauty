//app/collections/brands/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface BrandCount {
  brand: string;
  _count: {
    id: number;
  };
}

interface Brand {
  name: string;
  description: string;
  image: string;
  featured: boolean;
  productCount: number;
}

export default function Brands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('/api/collections/brands');
        if (!response.ok) {
          throw new Error('Failed to fetch brands');
        }
        const brandData = await response.json() as BrandCount[];
        
        // Use the brand data to create our brand list
        const brandsWithCount = [
          {
            name: 'COSRX',
            description: 'Simple, effective skincare solutions focusing on natural ingredients.',
            image: '/api/placeholder/400/300',
            featured: true
          },
          {
            name: 'Beauty of Joseon',
            description: 'Traditional Korean ingredients meet modern formulations.',
            image: '/api/placeholder/400/300',
            featured: true
          },
          {
            name: 'Some By Mi',
            description: 'Innovative skincare powered by scientific research.',
            image: '/api/placeholder/400/300',
            featured: true
          },
          {
            name: 'Medicube',
            description: 'Clinical-grade skincare for various skin concerns.',
            image: '/api/placeholder/400/300',
            featured: false
          }
          // Add more brands here
        ].map(brand => ({
          ...brand,
          productCount: brandData.find(b => b.brand === brand.name)?._count.id || 0
        }));
        
        setBrands(brandsWithCount);
      } catch (error) {
        console.error('Error fetching brands:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) {
    return (
      <PageLayout>
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center h-64">
              <p>Loading brands...</p>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-black">Home</Link>
            <ArrowRight className="w-4 h-4 mx-2" />
            <span className="text-black">Brands</span>
          </div>

          <div className="text-center mb-16">
            <h1 className="text-4xl font-light text-black mb-4">Our Brands</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our curated selection of premium Korean beauty brands, 
              each chosen for their innovation and commitment to quality.
            </p>
          </div>

          {/* Featured Brands */}
          <div className="mb-16">
            <h2 className="text-2xl font-light mb-8">Featured Brands</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {brands.filter(brand => brand.featured).map((brand, index) => (
                <Link 
                  key={index}
                  href={`/collections/brands/${brand.name.toLowerCase()}`}
                  className="group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
                    <img 
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">{brand.name}</h3>
                  <p className="text-gray-600 mb-2">{brand.description}</p>
                  <span className="text-sm text-gray-500">{brand.productCount} Products</span>
                </Link>
              ))}
            </div>
          </div>

          {/* All Brands */}
          <div>
            <h2 className="text-2xl font-light mb-8">All Brands</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {brands.map((brand, index) => (
                <Link 
                  key={index}
                  href={`/collections/brands/${brand.name.toLowerCase()}`}
                  className="group p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h3 className="text-lg font-medium mb-2">{brand.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{brand.description}</p>
                  <span className="text-sm text-gray-500">{brand.productCount} Products</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}