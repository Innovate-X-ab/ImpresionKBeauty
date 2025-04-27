// app/api/collections/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ProductType } from '@prisma/client';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    console.log('API Debug - Received slug:', slug);

    // Create a mapping for URL slugs to ProductType enum values
    const typeMapping: Record<string, ProductType> = {
      'cleansers': ProductType.CLEANSER,
      'toners': ProductType.TONER,
      'serums': ProductType.SERUM,
      'moisturizers': ProductType.MOISTURIZER,
      'masks': ProductType.MASK,
      'sunscreens': ProductType.SUNSCREEN
    };

    // Get the correct enum value for the slug
    const productType = typeMapping[slug.toLowerCase()];
    
    if (!productType) {
      console.log('API Debug - Invalid product type for slug:', slug);
      return NextResponse.json([], { status: 200 }); // Return empty array for invalid types
    }

    console.log('API Debug - Searching for type:', productType);

    const products = await prisma.product.findMany({
      where: {
        category: 'skincare',
        type: productType
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