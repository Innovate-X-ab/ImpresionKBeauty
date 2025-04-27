// lib/services/uploadService.ts

/**
 * Service for handling file uploads via the API route, which now uses Vercel Blob.
 * @param file - The file to upload
 * @param mediaType - The type of media being uploaded ('image' or 'video')
 * @returns Promise with the Vercel Blob URL path to the uploaded file
 */
export async function uploadMedia(file: File, mediaType: 'image' | 'video'): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('mediaType', mediaType);

  try {
    // Call the API route that handles the Vercel Blob upload
    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Upload Error Response:', errorData); // Log error details
      throw new Error(errorData.error || 'Failed to upload file via API');
    }

    const data = await response.json();

    // Ensure the response contains the URL from Vercel Blob
    if (!data.url || !data.success) {
      console.error('API Upload Success Response Missing URL:', data);
      throw new Error('API did not return a valid upload URL.');
    }

    console.log('Upload successful, Vercel Blob URL:', data.url);
    return data.url; // Returns the Vercel Blob URL

  } catch (error) {
    console.error('Upload service error:', error);
    // Re-throw the error so the calling component can handle it
    throw error instanceof Error ? error : new Error('An unknown upload error occurred');
  }
}

// Keep the original method for backward compatibility if needed,
// ensuring it specifies 'image' media type.
export async function uploadFile(file: File): Promise<string> {
return uploadMedia(file, 'image');
}