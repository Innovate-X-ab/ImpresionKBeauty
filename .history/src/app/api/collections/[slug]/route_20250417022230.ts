// app/api/collections/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    console.log('API Debug - Received slug:', slug);

    // Normalize the type for database query
    const normalizedType = slug.toUpperCase().replace(/-/g, '');
    console.log('API Debug - Normalized type:', normalizedType);

    const products = await prisma.product.findMany({
      where: {
        category: 'skincare',
        type: normalizedType
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`API Debug - Found ${products.length} products`);
    return NextResponse.json(products);

  } catch (error) {
    console.error('API Debug - Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}