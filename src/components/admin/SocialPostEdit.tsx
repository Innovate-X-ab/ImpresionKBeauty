// components/admin/SocialPostEdit.tsx
'use client';

import { useState, useRef } from 'react';
import { Edit, X, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { uploadMedia } from '@/lib/services/uploadService';

interface SocialPost {
  id: string;
  platform: string; // 'instagram' or 'tiktok'
  mediaUrl: string;
  thumbnailUrl?: string;
  mediaType: string; // 'image' or 'video'
  caption: string;
  likes: number;
  externalUrl?: string;
}

interface SocialPostEditProps {
  post: SocialPost;
  displayMode?: 'icon' | 'button';
  onUpdate?: () => void; // Callback to refresh posts after update
}

export default function SocialPostEdit({ 
  post, 
  displayMode = 'icon', 
  onUpdate 
}: SocialPostEditProps) {
  const { isAdmin } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    platform: post.platform,
    mediaUrl: post.mediaUrl,
    thumbnailUrl: post.thumbnailUrl || post.mediaUrl, // Use media URL as fallback
    mediaType: post.mediaType,
    caption: post.caption,
    likes: post.likes,
    externalUrl: post.externalUrl || '',
  });
  
  const [previewUrl, setPreviewUrl] = useState<string>(
    post.mediaType === 'image' ? post.mediaUrl : (post.thumbnailUrl || post.mediaUrl)
  );
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  if (!isAdmin) return null;

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
      
      // Create a preview URL for the file
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/social/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update post');
      }

      setIsEditing(false);
      if (onUpdate) onUpdate();
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
            <h3 className="text-lg font-medium">Edit Social Media Post</h3>
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
                  ) : (
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