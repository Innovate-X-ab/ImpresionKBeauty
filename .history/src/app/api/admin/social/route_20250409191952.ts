// app/api/admin/social/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

// GET all social media posts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform'); // Filter by platform if needed
    const mediaType = searchParams.get('mediaType'); // Filter by media type if needed
    
    const whereClause: {
      platform?: string;
      mediaType?: string;
    } = {};
    if (platform) whereClause.platform = platform;
    if (mediaType) whereClause.mediaType = mediaType;
    
    const posts = await prisma.socialPost.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Failed to fetch social posts:', error);
    return NextResponse.json({ error: 'Error fetching social posts' }, { status: 500 });
  }
}

// POST to create a new social media post
export async function POST(request: Request) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const json = await request.json();
    
    // Basic validation
    if (!json.mediaUrl || !json.caption || !json.platform || !json.mediaType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Set thumbnail URL (same as media URL for images)
    if (json.mediaType === 'image' && !json.thumbnailUrl) {
      json.thumbnailUrl = json.mediaUrl;
    }

    // Create post
    const post = await prisma.socialPost.create({
      data: {
        platform: json.platform,
        mediaUrl: json.mediaUrl,
        thumbnailUrl: json.thumbnailUrl || json.mediaUrl,
        mediaType: json.mediaType,
        caption: json.caption,
        likes: json.likes || 0,
        externalUrl: json.externalUrl || '',
      }
    });
    
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Failed to create social post:', error);
    return NextResponse.json({ error: 'Error creating social post' }, { status: 500 });
  }
}