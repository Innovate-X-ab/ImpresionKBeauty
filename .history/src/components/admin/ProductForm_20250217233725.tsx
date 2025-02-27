// src/components/admin/ProductForm.tsx
'use client';

import { useState } from 'react';

export default function ProductForm({ onSuccess, initialData = null }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    brand: initialData?.brand || '',
    description: initialData?.description || '',
    price: initialData?.price || '',
    category: initialData?.category || '',
    isVegan: initialData?.isVegan || false,
    isCrueltyFree: initialData?.isCrueltyFree || false,
    stock: initialData?.stock || '',
    images: initialData?.images ? JSON.parse(initialData.images) : []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          name: '',
          brand: '',
          description: '',
          price: '',
          category: '',
          isVegan: false,
          isCrueltyFree: false,
          stock: '',
          images: []
        });
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Brand
        </label>
        <input
          type="text"
          value={formData.brand}
          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={4}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex space-x-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.isVegan}
            onChange={(e) => setFormData({ ...formData, isVegan: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label className="ml-2 text-sm text-gray-700">Vegan</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.isCrueltyFree}
            onChange={(e) => setFormData({ ...formData, isCrueltyFree: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label className="ml-2 text-sm text-gray-700">Cruelty Free</label>
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        {initialData ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
}