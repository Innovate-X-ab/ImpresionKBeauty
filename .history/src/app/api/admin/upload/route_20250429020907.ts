// app/api/admin/upload/route.ts
import { NextResponse } from 'next/server';
import { put } from '@vercel/blob'; // Import the 'put' function from Vercel Blob SDK
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';

// Define maximum file sizes (adjust as needed)
const MAX_IMAGE_SIZE_MB = 5;
const MAX_VIDEO_SIZE_MB = 50;

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // 1. Authentication Check
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse Form Data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const mediaType = (formData.get('mediaType') as string | null) || 'image'; // Default to image

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // 3. File Validation (Type and Size)
    if (mediaType === 'image') {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { error: `Invalid image type: ${file.type}. Allowed: JPG, PNG, WEBP, GIF.` },
          { status: 400 }
        );
      }
      if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
        return NextResponse.json(
          { error: `Image too large. Maximum size is ${MAX_IMAGE_SIZE_MB}MB.` },
          { status: 400 }
        );
      }
    } else if (mediaType === 'video') {
      const allowedTypes = ['video/mp4', 'video/quicktime', 'video/webm', 'video/x-msvideo']; // Added webm
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { error: `Invalid video type: ${file.type}. Allowed: MP4, MOV, WEBM, AVI.` },
          { status: 400 }
        );
      }
      if (file.size > MAX_VIDEO_SIZE_MB * 1024 * 1024) {
        return NextResponse.json(
          { error: `Video too large. Maximum size is ${MAX_VIDEO_SIZE_MB}MB.` },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Invalid media type specified.' },
        { status: 400 }
      );
    }

    // 4. Generate Filename and Upload to Vercel Blob
    // Use a path structure like 'uploads/images/filename' or 'uploads/videos/filename'
    const fileExtension = file.name.split('.').pop() || '';
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const filename = `${mediaType}-${uniqueSuffix}.${fileExtension}`;
    const blobPath = `uploads/${mediaType}s/${filename}`; // e.g., uploads/images/image-123.jpg

    console.log(`Uploading ${mediaType} to Vercel Blob at path: ${blobPath}`);

    const blob = await put(blobPath, file, {
      access: 'public', // Make the file publicly accessible
      // Add cache control headers if needed, e.g.:
      // cacheControlMaxAge: 31536000, // Cache for 1 year
    });

    console.log('Vercel Blob upload successful:', blob.url);

    // 5. Return the Public URL from Vercel Blob
    // The 'blob.url' is the permanent, publicly accessible URL
    return NextResponse.json({
      url: blob.url, // Use the URL returned by Vercel Blob
      success: true
    });

  } catch (error: unknown) {
    console.error('Error uploading file to Vercel Blob:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error during upload.';
    // Check for specific Vercel Blob errors if necessary
    // if (error.code === 'SOME_VERCEL_BLOB_ERROR_CODE') { ... }
    return NextResponse.json(
      { error: `Error uploading file: ${errorMessage}` },
      { status: 500 }
    );
  }
}