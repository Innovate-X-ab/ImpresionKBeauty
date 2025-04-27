// components/admin/AddProductButton.tsx
'use client';

import { useRef, useState } from 'react';
import { Plus, X, Save, Upload, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { uploadFile } from '@/lib/services/uploadService';
import Image from 'next/image';


interface AddProductButtonProps {
  showOnList?: boolean; // Optional prop to display as an inline button in a list
}

export default function AddProductButton({ showOnList = false }: AddProductButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    brand: '',
    category: 'skincare',  // Main category
    type: 'cleanser',      // Add this new field
    isVegan: false,
    isCrueltyFree: false,
    isBestSeller: false,
    stock: '0',
    images: ['/api/placeholder/300/300']
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>(['/api/placeholder/300/300']);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
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
        images: [...prev.images.filter(url => !url.includes('placeholder')), ...uploadedImageUrls]
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
      images: prev.images.filter((_, i) => i !== index)
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


  const handleSave = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          category: 'skincare',  // Always set main category as skincare
          type: formData.type,    // Include the type field
          isBestSeller: formData.isBestSeller // Add this line
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create product');
      }

      const result = await response.json();
      setIsAdding(false);
      router.refresh(); // Refresh the page to show new product
      router.push(`/products/${result.id}`); // Navigate to the new product
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAdding) {
    // Render different button styles based on showOnList prop
    return (
      <button 
        onClick={() => setIsAdding(true)}
        className={`flex items-center ${
          showOnList 
            ? "bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800" 
            : "fixed bottom-8 right-8 p-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 z-50"
        }`}
      >
        <Plus className={`${showOnList ? "w-4 h-4 mr-2" : "w-6 h-6"}`} />
        {showOnList && "Add Product"}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium text-black">Add New Product</h3>
          <button 
            onClick={() => setIsAdding(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand*
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price* (£)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                required
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category*
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
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
                Product Type*
              </label>
              <select
                name="type"          // Changed from category to type
                value={formData.type}  // Changed from category to type
                onChange={handleChange}
                required
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
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
                Stock*
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"/>
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
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isBestSeller"
                  checked={formData.isBestSeller}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Best Seller</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description*
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"/>
          </div>

           {/* Image Upload Section */}
           <div className="mt-4">
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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-3">
              {previewImages.map((img, index) => (
                <div key={index} className="relative aspect-square">
                  <Image 
                    src={img} 
                    alt={`Product preview ${index + 1}`}
                    fill
                    className="object-cover rounded-lg text-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-white text-red-500 rounded-full p-1 shadow-md hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Upload button */}
            <button
              type="button"
              onClick={triggerFileInput}
              disabled={uploadingImage}
              className="border border-dashed border-gray-300 rounded-md p-4 text-center w-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {uploadingImage ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Uploading...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-6 h-6 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Click to upload product images</span>
                  <span className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP up to 5MB</span>
                </div>
              )}
            </button>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              disabled={isLoading || !formData.name || !formData.price || !formData.description}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}