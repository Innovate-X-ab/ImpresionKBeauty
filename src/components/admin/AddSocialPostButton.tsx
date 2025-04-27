// components/admin/AddSocialPostButton.tsx
'use client';

import { useRef, useState } from 'react';
import { Plus, X, Save, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { uploadMedia } from '@/lib/services/uploadService';
import Image from 'next/image';

interface AddSocialPostButtonProps {
  showOnList?: boolean; // Optional prop to display as an inline button
  onAdd?: () => void; // Callback to refresh posts after adding
}

export default function AddSocialPostButton({ showOnList = false, onAdd }: AddSocialPostButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    platform: 'instagram',
    mediaType: 'image',
    caption: '',
    likes: '0',
    externalUrl: '',
    mediaUrl: '/api/placeholder/300/300', // Default placeholder
    thumbnailUrl: '/api/placeholder/300/300' // Default placeholder
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('/api/placeholder/300/300');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingMedia(true);
    setError(null);

    try {
      const file = files[0];
      const mediaType = formData.mediaType as 'image' | 'video';
      
      // For images, create a preview URL
      if (mediaType === 'image') {
        const previewUrl = URL.createObjectURL(file);
        setPreviewUrl(previewUrl);
      }
      
      // Upload the file to the server
      const uploadedUrl = await uploadMedia(file, mediaType);
      
      setFormData(prev => ({
        ...prev,
        mediaUrl: uploadedUrl,
        // For images, thumbnailUrl is the same as mediaUrl
        ...(mediaType === 'image' ? { thumbnailUrl: uploadedUrl } : {})
      }));
    } catch (err) {
      setError('Failed to upload media. Please try again.');
      console.error('Media upload error:', err);
    } finally {
      setUploadingMedia(false);
    }
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingMedia(true);
    setError(null);

    try {
      const file = files[0];
      
      // Create a preview URL for the thumbnail
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrl(previewUrl);
      
      // Upload the thumbnail to the server
      const uploadedUrl = await uploadMedia(file, 'image');
      
      setFormData(prev => ({
        ...prev,
        thumbnailUrl: uploadedUrl
      }));
    } catch (err) {
      setError('Failed to upload thumbnail. Please try again.');
      console.error('Thumbnail upload error:', err);
    } finally {
      setUploadingMedia(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerThumbnailInput = () => {
    thumbnailInputRef.current?.click();
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/social', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          likes: parseInt(formData.likes),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create post');
      }

      setIsAdding(false);
      if (onAdd) onAdd();
      router.refresh(); // Refresh the page to show new post
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
        {showOnList && "Add Social Media Post"}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">Add New Social Media Post</h3>
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

          <div className="space-y-4">
            {/* Platform Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Platform
              </label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
              </select>
            </div>
            
            {/* Media Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Media Type
              </label>
              <select
                name="mediaType"
                value={formData.mediaType}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>
            
            {/* Media Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formData.mediaType === 'image' ? 'Image' : 'Video'}
              </label>
              
              {/* Hidden file input */}
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleMediaUpload}
                className="hidden"
                accept={formData.mediaType === 'image' ? "image/*" : "video/*"}
              />
              
              {/* Preview */}
              <div className="relative aspect-square mb-2 border rounded-lg overflow-hidden">
                {formData.mediaType === 'image' ? (
                  <Image 
                    src={previewUrl} 
                    alt="Post preview" 
                    fill
                    className="object-cover"
                  />
                ) : formData.mediaUrl !== '/api/placeholder/300/300' ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <video 
                      src={formData.mediaUrl}
                      poster={previewUrl}
                      controls
                      className="max-h-full max-w-full"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400">No video selected</span>
                  </div>
                )}
              </div>

              {/* Upload button */}
              <button
                type="button"
                onClick={triggerFileInput}
                disabled={uploadingMedia}
                className="w-full border border-dashed border-gray-300 rounded-md p-3 text-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {uploadingMedia ? (
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
                    <span className="text-sm text-gray-500">
                      Upload {formData.mediaType === 'image' ? 'image' : 'video'}
                    </span>
                  </div>
                )}
              </button>
            </div>
            
            {/* Thumbnail Upload Section (for videos only) */}
            {formData.mediaType === 'video' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video Thumbnail
                </label>
                
                {/* Hidden thumbnail input */}
                <input 
                  type="file"
                  ref={thumbnailInputRef}
                  onChange={handleThumbnailUpload}
                  className="hidden"
                  accept="image/*"
                />
                
                <button
                  type="button"
                  onClick={triggerThumbnailInput}
                  disabled={uploadingMedia}
                  className="w-full border border-dashed border-gray-300 rounded-md p-3 text-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {uploadingMedia ? (
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
                      <span className="text-sm text-gray-500">
                        Upload thumbnail image
                      </span>
                    </div>
                  )}
                </button>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Caption
              </label>
              <textarea
                name="caption"
                value={formData.caption}
                onChange={handleChange}
                rows={3}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Likes
              </label>
              <input
                type="number"
                name="likes"
                value={formData.likes}
                onChange={handleChange}
                min="0"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                External URL (optional)
              </label>
              <input
                type="text"
                name="externalUrl"
                value={formData.externalUrl}
                onChange={handleChange}
                placeholder={`https://${formData.platform}.com/p/example`}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              disabled={isLoading || !formData.caption || formData.mediaUrl === '/api/placeholder/300/300'}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}