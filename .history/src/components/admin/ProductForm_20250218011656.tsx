// src/components/admin/ProductForm.tsx
'use client';

import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';

interface ProductData {
  name: string;
  brand: string;
  description: string;
  price: string;
  category: string;
  isVegan: boolean;
  isCrueltyFree: boolean;
  stock: string;
  images: string[];
}

interface ProductFormProps {
  onSuccess: () => void;
  initialData: ProductData | null;
}

export default function ProductForm({ onSuccess, initialData = null }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductData>({
    name: initialData?.name || '',
    brand: initialData?.brand || '',
    description: initialData?.description || '',
    price: initialData?.price || '',
    category: initialData?.category || '',
    isVegan: initialData?.isVegan || false,
    isCrueltyFree: initialData?.isCrueltyFree || false,
    stock: initialData?.stock || '',
    images: initialData?.images || []
  });

  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    setError(null);
    const uploadedUrls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
          throw new Error('Please upload only image files');
        }

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const data = await response.json();
        uploadedUrls.push(data.url);
      }

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error uploading images');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating product');
      console.error('Error creating product:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

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

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select a category</option>
          <option value="cleanser">Cleanser</option>
          <option value="toner">Toner</option>
          <option value="serum">Serum</option>
          <option value="moisturizer">Moisturizer</option>
          <option value="sunscreen">Sunscreen</option>
          <option value="mask">Mask</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Stock
        </label>
        <input
          type="number"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
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

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Images
        </label>
        <div className="mt-1 flex items-center">
          <input
            type="file"
            onChange={handleImageUpload}
            multiple
            accept="image/*"
            className="hidden"
            id="image-upload"
            disabled={uploading}
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Upload className="w-4 h-4 inline-block mr-1" />
            Upload Images
          </label>
          {uploading && <span className="ml-3">Uploading...</span>}
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {formData.images.map((url, index) => (
            <div key={index} className="relative group">
              <Image
                src={url}
                alt={`Product image ${index + 1}`}
                width={96}
                height={96}
                className="object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
        disabled={uploading}
      >
        {initialData ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
}