// app/admin/products/edit/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PageLayout from '@/components/layout/PageLayout';
import { ArrowLeft, Save, Loader, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<any>(null);
  
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
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/admin/products/${productId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        
        const data = await response.json();
        setProduct(data);
        
        // Set form data
        setFormData({
          name: data.name,
          brand: data.brand,
          description: data.description,
          price: data.price.toString(),
          category: data.category,
          isVegan: data.isVegan,
          isCrueltyFree: data.isCrueltyFree,
          stock: data.stock.toString()
        });
        
        // Parse images
        setImages(JSON.parse(data.images));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [productId]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    
    try {
      const updatedProduct = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        images
      };
      
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      
      // Navigate back to product page
      router.push(`/products/${productId}`);
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
  
  if (isLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center min-h-[300px]">
            <Loader className="w-8 h-8 animate-spin text-gray-500" />
          </div>
        </div>
      </PageLayout>
    );
  }
  
  if (error && !product) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-16">
          <div className="bg-red-50 p-4 rounded-md">
            <h2 className="text-red-800 font-medium">Error</h2>
            <p className="text-red-600">{error}</p>
            <Link href="/products" className="mt-4 inline-flex items-center text-black hover:underline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div className="flex items-center">
              <Link href={`/products/${productId}`} className="mr-4 text-gray-500 hover:text-black">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-medium">Edit Product</h1>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-50 p-4 rounded-md mb-6">
              <p className="text-red-600">{error}</p>
            </div>
          )}
          
          {/* Edit Form */}
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
                        <div className="text-gray-500 mb-2">+ Add Image</div>
                        <div className="text-gray-400 text-xs">Click to upload</div>
                      </>
                    )}
                  </label>
                </div>
              </div>
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
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
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