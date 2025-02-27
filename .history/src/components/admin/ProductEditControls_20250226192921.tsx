// components/admin/ProductEditControls.tsx
'use client';

import { useState } from 'react';
import { Edit, Trash2, Save, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProductEditControlsProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    brand: string;
    category: string;
    isVegan: boolean;
    isCrueltyFree: boolean;
    stock: number;
  };
}

export default function ProductEditControls({ product }: ProductEditControlsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...product });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Handle checkboxes
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update product');
      }

      setIsEditing(false);
      router.refresh(); // Refresh the page to show updated data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete product');
      }

      router.push('/products'); // Redirect to products list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
    }
  };

  if (!isEditing) {
    return (
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-700 uppercase mb-4">Admin Controls</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Product
          </button>
          <button 
            onClick={handleDelete}
            className="flex items-center px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Product
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-gray-700 uppercase">Edit Product</h3>
        <button 
          onClick={() => setIsEditing(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brand
          </label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="cleanser">Cleanser</option>
            <option value="toner">Toner</option>
            <option value="serum">Serum</option>
            <option value="moisturizer">Moisturizer</option>
            <option value="mask">Mask</option>
            <option value="sunscreen">Sunscreen</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isVegan"
              checked={formData.isVegan}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Vegan</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isCrueltyFree"
              checked={formData.isCrueltyFree}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Cruelty Free</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}