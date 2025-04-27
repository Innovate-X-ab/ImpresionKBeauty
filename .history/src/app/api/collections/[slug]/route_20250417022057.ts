// app/api/collections/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type ProductType = [
  'CLEANSER',
  'TONER',
  'SERUM',
  'MOISTURIZER',
  'MASK',
  'SUNSCREEN'
][number];

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
              equals: slug.toUpperCase() as ProductType
            }
          },
          {
            type: {
              equals: slug.replace(/-/g, '').toUpperCase() as ProductType
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