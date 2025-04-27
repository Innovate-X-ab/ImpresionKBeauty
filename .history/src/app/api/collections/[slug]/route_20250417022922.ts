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

    // First, let's see all products and their types
    const allProducts = await prisma.product.findMany({
      select: {
        name: true,
        type: true
      }
    });
    console.log('API Debug - All products in database:', allProducts);

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
    console.log('API Debug - Mapped type:', productType);
    
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

    console.log('API Debug - Found products:', products.map(p => ({
      name: p.name,
      type: p.type
    })));

    return NextResponse.json(products);

  } catch (error) {
    console.error('API Debug - Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}