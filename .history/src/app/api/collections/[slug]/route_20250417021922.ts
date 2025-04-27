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
    console.log('API Debug - Received slug:', slug);

    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            type: {
              equals: slug.toUpperCase(),
              mode: 'insensitive'
            }
          },
          {
            type: {
              equals: slug.replace(/-/g, '').toUpperCase(),
              mode: 'insensitive'
            }
          }
        ]
      }
    });

    console.log('API Debug - Found products:', products.length);
    return NextResponse.json(products);

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}