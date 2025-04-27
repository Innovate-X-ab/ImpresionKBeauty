// components/admin/ProductQuickEdit.tsx
'use client';

import { useState, useRef } from 'react';
import { Edit, X, Upload, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { uploadFile } from '@/lib/services/uploadService';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number | string;
  category?: string;
  stock?: number;
  isVegan?: boolean;
  isCrueltyFree?: boolean;
  images?: string;
}

interface ProductQuickEditProps {
  product: Product;
  displayMode?: 'icon' | 'button';
}

export default function ProductQuickEdit({ product, displayMode = 'icon' }: ProductQuickEditProps) {
  const { isAdmin } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: product.name,
    price: typeof product.price === 'number' ? product.price.toString() : product.price,
    stock: product.stock?.toString() || '0',
    images: product.images ? JSON.parse(product.images as string) : ['/api/placeholder/300/300'],
  });
  
  const [previewImages, setPreviewImages] = useState<string[]>(
    formData.images.length > 0 ? formData.images : ['/api/placeholder/300/300']
  );
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  if (!isAdmin) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    setError(null);

    try {
      const uploadedImageUrls: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Create a preview URL for the image
        const previewUrl = URL.createObjectURL(file);
        
        // Add to preview images immediately for visual feedback
        setPreviewImages(prev => [...prev.filter(url => !url.includes('placeholder')), previewUrl]);
        
        // Upload the file to the server
        const uploadedUrl = await uploadFile(file);
        uploadedImageUrls.push(uploadedUrl);
      }
      
      // Update form data with the new image URLs
      setFormData(prev => ({
        ...prev,
        images: [...prev.images.filter((url: string) => !url.includes('placeholder')), ...uploadedImageUrls]
      }));
      
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      console.error('Image upload error:', err);
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = (index: number) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_: string, i: number) => i !== index)
    }));
    
    // If all images are removed, reset to placeholder
    if (previewImages.length <= 1) {
      setPreviewImages(['/api/placeholder/300/300']);
      setFormData(prev => ({
        ...prev,
        images: ['/api/placeholder/300/300']
      }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...product,
          name: formData.name,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          images: JSON.stringify(formData.images)
        }),
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

  // Quick edit popup
  if (isEditing) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Quick Edit Product</h3>
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
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
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
                  required
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
                  required
                />
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
                  required
                />
              </div>
              
              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Images
                </label>
                
                {/* Hidden file input */}
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                  multiple
                />
                
                {/* Preview images */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {previewImages.map((img, index) => (
                    <div key={index} className="relative">
                      <Image 
                        src={img} 
                        alt={`Product preview ${index + 1}`} 
                        className="w-full h-full object-cover"
                        width={80}
                        height={80}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-white text-red-500 rounded-full p-1 shadow-md hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Upload button */}
                <button
                  type="button"
                  onClick={triggerFileInput}
                  disabled={uploadingImage}
                  className="border border-dashed border-gray-300 rounded-md p-3 text-center w-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {uploadingImage ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin h-4 w-4 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Uploading...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Upload className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500">Upload images</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Trigger button/icon
  if (displayMode === 'button') {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Edit className="h-4 w-4 mr-2" />
        Edit
      </button>
    );
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <Edit className="h-5 w-5" />
    </button>
  );
}