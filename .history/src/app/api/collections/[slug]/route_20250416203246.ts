// app/api/collections/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const VALID_CATEGORIES = [
  'cleanser',
  'toner',
  'serum',
  'moisturizer',
  'mask',
  'sunscreen'
];

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    console.log('Debugging - Original slug:', slug);

    // Normalize the slug (remove -s, convert to singular, lowercase)
    const normalizedSlug = slug.toLowerCase()
      .replace(/-/g, '')
      .replace(/s$/, '');
    
    console.log('Debugging - Normalized slug:', normalizedSlug);

    // Check if it's a valid category
    const matchedCategory = VALID_CATEGORIES.find(cat => 
      cat === normalizedSlug || 
      cat.replace(/s$/, '') === normalizedSlug
    );

    console.log('Debugging - Matched category:', matchedCategory);

    if (!matchedCategory) {
      console.log('Invalid category:', slug);
      return NextResponse.json([]);
    }

    // Find products with the matched category
    const products = await prisma.product.findMany({
      where: {
        category: {
          contains: matchedCategory,
          equals: matchedCategory,
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`Found ${products.length} products for category:`, matchedCategory);
    return NextResponse.json(products);

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}