// src/components/products/ProductFilters.tsx


'use client';

import { useState } from 'react';

// Define the filters type to avoid using 'any'
export interface FilterState {
  brands: string[];
  categories: string[];
  isVegan: boolean;
  isCrueltyFree: boolean;
  priceRange: [number, number];
}

export interface ProductFiltersProps {
  brands: string[];
  categories: string[];
  activeFilters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
}

export default function ProductFilters({ 
  brands, 
  categories, 
  activeFilters,
  onFilterChange
}: ProductFiltersProps) {
  // Default values when activeFilters is not provided
  const defaultFilters: FilterState = {
    brands: [],
    categories: [],
    isVegan: false,
    isCrueltyFree: false,
    priceRange: [0, 100]
  };

  // Use provided activeFilters or default values
  const filters = activeFilters || defaultFilters;

  // Internal state for when no external state is provided
  const [internalFilters, setInternalFilters] = useState<FilterState>(defaultFilters);

  // Use either the provided onChange handler or update internal state
  const handleFilterChange = (newFilters: FilterState) => {
    if (onFilterChange) {
      onFilterChange(newFilters);
    } else {
      setInternalFilters(newFilters);
    }
  };

  // Use either provided filters or internal state
  const currentFilters = onFilterChange ? filters : internalFilters;

  const toggleBrand = (brand: string) => {
    const newBrands = currentFilters.brands.includes(brand)
      ? currentFilters.brands.filter(b => b !== brand)
      : [...currentFilters.brands, brand];
    
    handleFilterChange({
      ...currentFilters,
      brands: newBrands
    });
  };

  const toggleCategory = (category: string) => {
    const newCategories = currentFilters.categories.includes(category)
      ? currentFilters.categories.filter(c => c !== category)
      : [...currentFilters.categories, category];
    
    handleFilterChange({
      ...currentFilters,
      categories: newCategories
    });
  };

  const toggleVegan = () => {
    handleFilterChange({
      ...currentFilters,
      isVegan: !currentFilters.isVegan
    });
  };

  const toggleCrueltyFree = () => {
    handleFilterChange({
      ...currentFilters,
      isCrueltyFree: !currentFilters.isCrueltyFree
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Brands</h3>
        <div className="mt-2 space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center">
              <input
                type="checkbox"
                checked={currentFilters.brands.includes(brand)}
                onChange={() => toggleBrand(brand)}
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
                checked={currentFilters.categories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-600">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Preferences</h3>
        <div className="mt-2 space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={currentFilters.isVegan}
              onChange={toggleVegan}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-600">Vegan</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={currentFilters.isCrueltyFree}
              onChange={toggleCrueltyFree}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-600">Cruelty Free</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Price Range</h3>
        <div className="mt-2 space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="number"
              value={currentFilters.priceRange[0]}
              onChange={(e) => handleFilterChange({
                ...currentFilters,
                priceRange: [Number(e.target.value), currentFilters.priceRange[1]]
              })}
              className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
            />
            <span className="text-gray-900">to</span>
            <input
              type="number"
              value={currentFilters.priceRange[1]}
              onChange={(e) => handleFilterChange({
                ...currentFilters,
                priceRange: [currentFilters.priceRange[0], Number(e.target.value)]
              })}
              className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
}