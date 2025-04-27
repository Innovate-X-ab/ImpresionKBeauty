// app/api/collections/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    console.log('Debugging - Original slug:', slug);

    // Get all products first to check categories
    const allProducts = await prisma.product.findMany();
    console.log('Debugging - All categories:', Array.from(new Set(allProducts.map(p => p.category))));

    // Prepare search terms
    const searchTerms = [
      slug,                     // original: 'cleansers'
      slug.toLowerCase(),       // lowercase: 'cleansers'
      slug.toUpperCase(),       // uppercase: 'CLEANSERS'
      slug.replace(/-/g, ' '),  // replace hyphens: 'cleansers'
      slug.slice(0, -1),       // singular: 'cleanser'
    ];

    console.log('Debugging - Search terms:', searchTerms);

    const products = await prisma.product.findMany({
      where: {
        OR: [
          ...searchTerms.map(term => ({
            category: {
              contains: term,
            }
          })),
          ...searchTerms.map(term => ({
            category: {
              equals: term,
            }
          }))
        ]
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log('Debugging - Found products:', products.length);
    if (products.length === 0) {
      // Get a sample of actual categories for debugging
      const sampleProducts = await prisma.product.findMany({
        select: {
          category: true
        },
        take: 5
      });
      console.log('Debugging - Sample categories in DB:', sampleProducts.map(p => p.category));
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}