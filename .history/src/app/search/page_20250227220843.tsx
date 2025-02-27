//app/search/page.tsx

'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PageLayout from '@/components/layout/PageLayout';
import ProductGrid, { BaseProduct } from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import { Search } from 'lucide-react';

// This matches the return type from the search API
interface SearchResult extends BaseProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  images: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
}

// Create a separate component that uses useSearchParams
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState({
    brands: [] as string[],
    categories: [] as string[],
    isVegan: false,
    isCrueltyFree: false,
    priceRange: [0, 1000] as [number, number]
  });

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Failed to fetch results');
        
        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  // Extract unique brands and categories from results
  const brands = Array.from(new Set(results.map(item => item.brand)));
  const categories = Array.from(new Set(results.map(item => item.category)));

  // Filter results based on active filters
  const filteredResults = results.filter(item => {
    if (activeFilters.brands.length && !activeFilters.brands.includes(item.brand)) return false;
    if (activeFilters.categories.length && !activeFilters.categories.includes(item.category)) return false;
    if (activeFilters.isVegan && !item.isVegan) return false;
    if (activeFilters.isCrueltyFree && !item.isCrueltyFree) return false;
    if (item.price < activeFilters.priceRange[0] || item.price > activeFilters.priceRange[1]) return false;
    return true;
  });

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light mb-2">
            {query ? `Search Results for "${query}"` : 'Search Products'}
          </h1>
          <p className="text-gray-600">
            {filteredResults.length} products found
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">Search Error</h2>
            <p className="text-gray-500">{error}</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">No Results Found</h2>
            <p className="text-gray-500">
              We couldn&apos;t find any products matching your search.
              Try checking your spelling or using different keywords.
            </p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters */}
            <div className="w-full md:w-64">
              <ProductFilters
                brands={brands}
                categories={categories}
                activeFilters={activeFilters}
                onFilterChange={setActiveFilters}
              />
            </div>

            {/* Results Grid */}
            <div className="flex-1">
              <ProductGrid products={filteredResults} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Loading fallback component
function SearchLoading() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <PageLayout>
      <Suspense fallback={<SearchLoading />}>
        <SearchContent />
      </Suspense>
    </PageLayout>
  );
}