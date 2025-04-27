// app/api/admin/upload/route.ts
import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request: Request) {
  try {
    // Check if the user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const mediaType = formData.get('mediaType') as string || 'image'; 
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type based on media type
    if (mediaType === 'image') {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { error: 'File type not allowed. Please upload JPG, PNG or WEBP images.' }, 
          { status: 400 }
        );
      }
      
      // Validate image size (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        return NextResponse.json(
          { error: 'File too large. Maximum size is 5MB.' }, 
          { status: 400 }
        );
      }
    } else if (mediaType === 'video') {
      const allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { error: 'File type not allowed. Please upload MP4, MOV or AVI videos.' }, 
          { status: 400 }
        );
      }
      
      // Validate video size (50MB max)
      const maxSize = 50 * 1024 * 1024; // 50MB in bytes
      if (file.size > maxSize) {
        return NextResponse.json(
          { error: 'File too large. Maximum size is 50MB.' }, 
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Invalid media type. Must be "image" or "video".' }, 
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename
    const fileExtension = file.name.split('.').pop() || '';
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;

        // Determine folder based on media type
        const folderName = mediaType === 'image' ? 'images' : 'videos';
        const subfolder = 'social'; // Put all social media files in one subfolder
        
        const filename = `${mediaType}-${uniqueSuffix}.${fileExtension}`;
    
    
    // Define the directory path
    const dirPath = join(process.cwd(), 'public', 'uploads', folderName, subfolder);
    const filePath = join(dirPath, filename);
    
    // Create the directory if it doesn't exist
    try {
      await mkdir(dirPath, { recursive: true });
    } catch (err) {
      console.error('Error creating directory:', err);
    }
    
    // Write the file to the server
    await writeFile(filePath, buffer);
    
    // Return the relative URL for the client to use
    return NextResponse.json({ 
      url: `/uploads/${folderName}/${subfolder}/${filename}`,
      success: true
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Error uploading file' }, 
      { status: 500 }
    );
  }
}