// src/components/products/ProductFilters.tsx
'use client';

import { useState } from 'react';

interface ProductFiltersProps {
  brands: string[];
  categories: string[];
}

export default function ProductFilters({ brands, categories }: ProductFiltersProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [showVeganOnly, setShowVeganOnly] = useState(false);
  const [showCrueltyFreeOnly, setShowCrueltyFreeOnly] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Brands</h3>
        <div className="mt-2 space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedBrands([...selectedBrands, brand]);
                  } else {
                    setSelectedBrands(selectedBrands.filter(b => b !== brand));
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-600">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Categories</h3>
        <div className="mt-2 space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCategories([...selectedCategories, category]);
                  } else {
                    setSelectedCategories(selectedCategories.filter(c => c !== category));
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-600">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Price Range</h3>
        <div className="mt-2 space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span>to</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={showVeganOnly}
            onChange={(e) => setShowVeganOnly(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-gray-600">Vegan Only</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={showCrueltyFreeOnly}
            onChange={(e) => setShowCrueltyFreeOnly(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-gray-600">Cruelty Free Only</span>
        </label>
      </div>
    </div>
  );
}