// lib/services/uploadService.ts

/**
 * Service for handling file uploads to the server
 * @param file - The file to upload
 * @param mediaType - The type of media being uploaded ('image' or 'video')
 * @returns Promise with the URL path to the uploaded file
 */
export async function uploadMedia(file: File, mediaType: 'image' | 'video'): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('mediaType', mediaType);
  
    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to upload file');
      }
  
      const data = await response.json();
      return data.url; // Returns the path to the uploaded file
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }

  // Keep the original method for backward compatibility
export async function uploadFile(file: File): Promise<string> {
  return uploadMedia(file, 'image');
}