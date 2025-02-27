//components/ui/SearchBar.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Search, X } from 'lucide-react';
import Link from 'next/link';

interface SearchResult {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
}

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (query) {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
          const data = await response.json();
          setResults(data);
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  return (
    <div ref={searchRef} className="relative">
      {/* Search Icon Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <Search className="w-5 h-5" />
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4">
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                  autoFocus
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </form>

            {/* Search Results */}
            {query && (
              <div className="mt-4">
                {isLoading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
                  </div>
                ) : results.length > 0 ? (
                  <div className="space-y-2">
                    {results.map((result) => (
                      <Link
                        key={result.id}
                        href={`/products/${result.id}`}
                        className="flex items-center p-2 hover:bg-gray-50 rounded-md"
                        onClick={() => setIsOpen(false)}
                      >
                        <img
                          src={result.image}
                          alt={result.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{result.name}</p>
                          <p className="text-sm text-gray-500">{result.brand}</p>
                        </div>
                        <p className="ml-auto text-sm font-medium text-gray-900">
                          £{result.price.toFixed(2)}
                        </p>
                      </Link>
                    ))}
                    <div className="pt-2 border-t">
                      <button
                        onClick={() => {
                          router.push(`/search?q=${encodeURIComponent(query)}`);
                          setIsOpen(false);
                        }}
                        className="text-sm text-black hover:text-gray-600 flex items-center justify-center w-full"
                      >
                        View all results
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-4">No results found</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}