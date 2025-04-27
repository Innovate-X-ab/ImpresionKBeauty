//app/collections/brands/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import PageLayout from '@/components/layout/PageLayout';
import AdminProductControls from '@/components/admin/AdminProductControls';
// import ProductQuickEdit from '@/components/admin/ProductQuickEdit';
import { useAuth } from '@/contexts/AuthContext';

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
  slug: string;
}

export default function Brands() {
  const { isAdmin } = useAuth();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setIsLoading] = useState(true);
  const [featuredBrand, setFeaturedBrand] = useState<Brand | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('/api/collections/brands');
        if (!response.ok) {
          throw new Error('Failed to fetch brands');
        }
        const brandData = await response.json() as BrandCount[];
        
        // Enhanced brand data with more details and images
        const brandsWithDetails: Brand[] = [
          {
            name: 'COSRX',
            description: 'Simple, effective skincare solutions focusing on natural ingredients and scientific research for all skin types.',
            image: '/api/placeholder/800/500',
            featured: true,
            slug: 'cosrx',
            productCount: brandData.find(b => b.brand === 'COSRX')?._count.id || 0
          },
          {
            name: 'Beauty of Joseon',
            description: 'Traditional Korean herbal ingredients meet modern skincare technology for a harmonious blend of past and present.',
            image: '/api/placeholder/800/500',
            featured: true,
            slug: 'beauty-of-joseon',
            productCount: brandData.find(b => b.brand === 'Beauty of Joseon')?._count.id || 0
          },
          {
            name: 'Some By Mi',
            description: 'Innovative skincare powered by scientific research and natural ingredients to address various skin concerns.',
            image: '/api/placeholder/800/500',
            featured: true,
            slug: 'some-by-mi',
            productCount: brandData.find(b => b.brand === 'Some By Mi')?._count.id || 0
          },
          {
            name: 'Medicube',
            description: 'Clinical-grade skincare solutions developed with dermatologists for treating various skin concerns.',
            image: '/api/placeholder/800/500',
            featured: false,
            slug: 'medicube',
            productCount: brandData.find(b => b.brand === 'Medicube')?._count.id || 0
          },
          {
            name: 'TirTir',
            description: 'Premium Korean skincare that combines innovative technology with high-quality ingredients.',
            image: '/api/placeholder/800/500',
            featured: false,
            slug: 'tirtir',
            productCount: brandData.find(b => b.brand === 'TirTir')?._count.id || 0
          },
          {
            name: 'Abib',
            description: 'Minimalist skincare focusing on pure, effective ingredients with elegant formulations.',
            image: '/api/placeholder/800/500',
            featured: false,
            slug: 'abib',
            productCount: brandData.find(b => b.brand === 'Abib')?._count.id || 0
          }
        ];
        
        setBrands(brandsWithDetails);
        
        // Set a random featured brand from those marked as featured
        const featuredBrands = brandsWithDetails.filter(brand => brand.featured);
        if (featuredBrands.length > 0) {
          setFeaturedBrand(featuredBrands[Math.floor(Math.random() * featuredBrands.length)]);
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
      } finally {
        setIsLoading(false);
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout className="pt-0 pb-0"> {/* Remove top and bottom padding */}
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-pink-50">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-black">Home</Link>
            <ArrowRight className="w-4 h-4 mx-2" />
            <span className="text-black">Brands</span>
          </div>

          {/* Admin Controls */}
          {isAdmin && <AdminProductControls title="Our Brands" />}

          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-light mb-4 text-black">Discover Our Premium K-Beauty Brands</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We&apos;ve curated the finest selection of Korean beauty brands, each chosen for their 
              innovation, quality ingredients, and commitment to effective skincare solutions.
            </p>
          </div>

          {/* Featured Brand Spotlight */}
          {featuredBrand && (
            <div className="mb-16 bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <Image 
                    src={featuredBrand.image}
                    alt={featuredBrand.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-none flex items-end md:items-center">
                    <div className="p-6 text-white md:hidden">
                      <h2 className="text-2xl font-medium mb-2 text-black">{featuredBrand.name}</h2>
                      <p className="text-white/80 text-sm leading-relaxed">{featuredBrand.description}</p>
                    </div>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="hidden md:block">
                    <h2 className="text-2xl font-medium mb-4 text-black">{featuredBrand.name}</h2>
                    <p className="text-gray-600 mb-6">{featuredBrand.description}</p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm uppercase tracking-wide text-gray-500 font-medium">Why We Love It</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></span>
                        <span className="text-sm text-gray-600">Expertly formulated products for maximum effectiveness</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></span>
                        <span className="text-sm text-gray-600">High-quality, ethically sourced ingredients</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></span>
                        <span className="text-sm text-gray-600">Innovative skincare technology backed by research</span>
                      </li>
                    </ul>
                    <Link 
                      href={`/collections/brands/${featuredBrand.slug}`}
                      className="inline-block mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Explore {featuredBrand.name}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* All Brands Grid */}
          <div>
            <h2 className="text-2xl font-light mb-8 text-center text-black">All Brands</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {brands.map((brand, index) => (
                <Link 
                  key={index}
                  href={`/collections/brands/${brand.slug}`}
                  className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="relative w-16 h-16 mx-auto mb-4 overflow-hidden rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-2xl font-medium text-blue-600">{brand.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-xl font-medium text-center mb-2 text-gray-600 group-hover:text-blue-600 transition-colors">{brand.name}</h3>
                  <p className="text-sm text-gray-600 text-center mb-3 line-clamp-2">{brand.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{brand.productCount} Products</span>
                    <span className="text-xs text-blue-600 flex items-center group-hover:underline">
                      View Collection
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Brand Philosophy Section */}
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-light mb-4 text-black">Our Brand Philosophy</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              At Impression K Beauty, we believe in offering only the most innovative, effective, and 
              ethically produced K-beauty products. Each brand in our collection is carefully selected 
              to ensure they meet our standards for quality, sustainability, and results.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-5 rounded-lg bg-gradient-to-br from-pink-50 to-purple-50">
                <h3 className="text-lg font-medium mb-2">Quality Assurance</h3>
                <p className="text-sm text-gray-600">We test and verify all products to ensure they deliver the results they promise.</p>
              </div>
              <div className="p-5 rounded-lg bg-gradient-to-br from-blue-50 to-teal-50">
                <h3 className="text-lg font-medium mb-2">Ethical Sourcing</h3>
                <p className="text-sm text-gray-600">We prioritize brands that use responsibly sourced ingredients and ethical practices.</p>
              </div>
              <div className="p-5 rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50">
                <h3 className="text-lg font-medium mb-2">Innovation Focus</h3>
                <p className="text-sm text-gray-600">We seek out brands at the forefront of skincare technology and formulation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}