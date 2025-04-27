// app/api/collections/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const VALID_CATEGORIES = [
  'CLEANSER',
  'TONER',
  'SERUM',
  'MOISTURIZER',
  'MASK',
  'SUNSCREEN'
] as const;

type ProductType = typeof VALID_CATEGORIES[number];

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    console.log('Debugging - Original slug:', slug);

    // Normalize the slug
    const normalizedSlug = slug.toLowerCase()
      .replace(/-/g, '')
      .replace(/s$/, '');
    
    console.log('Debugging - Normalized slug:', normalizedSlug);

    if (!VALID_CATEGORIES.includes(normalizedSlug as ProductType)) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    // Find products with matching type
    const products = await prisma.product.findMany({
      where: {
        type: normalizedSlug as ProductType,
        category: 'skincare'
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`Found ${products.length} products for type:`, normalizedSlug);
    return NextResponse.json(products);

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}