// app/api/collections/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    
    console.log('Fetching products for category:', slug);

    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            category: {
              contains: slug.toLowerCase()
            }
          },
          {
            category: {
              contains: slug.replace(/-/g, ' ').toLowerCase()
            }
          }
        ]
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`Found ${products.length} products`);
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching collection products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}