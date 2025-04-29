// app/api/admin/social/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

// GET a specific social post
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.socialPost.findUnique({
      where: {
        id: params.id
      }
    });
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Failed to fetch social post:', error);
    return NextResponse.json({ error: 'Error fetching social post' }, { status: 500 });
  }
}

// PUT to update a social post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Update post
    const post = await prisma.socialPost.update({
      where: {
        id: params.id
      },
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
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Failed to update social post:', error);
    return NextResponse.json({ error: 'Error updating social post' }, { status: 500 });
  }
}

// DELETE a social post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if post exists
    const post = await prisma.socialPost.findUnique({
      where: {
        id: params.id
      }
    });
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Delete post
    await prisma.socialPost.delete({
      where: {
        id: params.id
      }
    });
    
    return NextResponse.json({ message: 'Social post deleted successfully' });
  } catch (error) {
    console.error('Failed to delete social post:', error);
    return NextResponse.json({ error: 'Error deleting social post' }, { status: 500 });
  }
}