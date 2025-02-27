// app/admin/products/new/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageLayout from '@/components/layout/PageLayout';
import { ArrowLeft, Save, Loader, Upload, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function NewProductPage() {
  const router = useRouter();
  
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    description: '',
    price: '',
    category: '',
    isVegan: false,
    isCrueltyFree: false,
    stock: ''
  });
  
  // Images state
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (images.length === 0) {
      setError('Please upload at least one product image');
      return;
    }
    
    setIsSaving(true);
    setError(null);
    
    try {
      const newProduct = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        images
      };
      
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create product');
      }
      
      const product = await response.json();
      
      // Navigate to the new product page
      router.push(`/products/${product.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    
    setUploading(true);
    setError(null);
    
    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
          throw new Error('Please upload only image files');
        }
        
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData
        });
        
        if (!response.ok) {
          throw new Error('Failed to upload image');
        }
        
        const data = await response.json();
        setImages(prev => [...prev, data.url]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error uploading images');
    } finally {
      setUploading(false);
    }
  };
  
  const removeImage = (indexToRemove: number) => {
    setImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };
  
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/products" className="mr-4 text-gray-500 hover:text-black">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-medium">Add New Product</h1>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-50 p-4 rounded-md mb-6">
              <p className="text-red-600">{error}</p>
            </div>
          )}
          
          {/* Product Form */}
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price (£)
                </label>
                <input
                  type="number"
                  id="price"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  min="0"
                  step="1"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="cleanser">Cleanser</option>
                  <option value="toner">Toner</option>
                  <option value="serum">Serum</option>
                  <option value="moisturizer">Moisturizer</option>
                  <option value="sunscreen">Sunscreen</option>
                  <option value="mask">Mask</option>
                  <option value="makeup">Makeup</option>
                </select>
              </div>
              
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isVegan}
                    onChange={(e) => setFormData({ ...formData, isVegan: e.target.checked })}
                    className="rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span className="ml-2 text-gray-700">Vegan</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isCrueltyFree}
                    onChange={(e) => setFormData({ ...formData, isCrueltyFree: e.target.checked })}
                    className="rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span className="ml-2 text-gray-700">Cruelty Free</span>
                </label>
              </div>
            </div>
            
            {/* Product Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images
              </label>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                {images.map((url, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square relative rounded-md overflow-hidden">
                      <Image 
                        src={url} 
                        alt={`Product image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                <div className="aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4">
                  <input
                    type="file"
                    id="image-upload"
                    onChange={handleImageUpload}
                    multiple
                    accept="image/*"
                    className="hidden"
                    disabled={uploading}
                  />
                  <label 
                    htmlFor="image-upload"
                    className="cursor-pointer text-center"
                  >
                    {uploading ? (
                      <Loader className="w-8 h-8 mx-auto animate-spin text-gray-500" />
                    ) : (
                      <>
                        <Upload className="w-8 h-8 mx-auto text-gray-400" />
                        <span className="block mt-2 text-sm text-gray-500">Upload Images</span>
                      </>
                    )}
                  </label>
                </div>
              </div>
              <p className="text-sm text-gray-500">Upload at least one image for your product.</p>
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving || uploading}
                className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Create Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}