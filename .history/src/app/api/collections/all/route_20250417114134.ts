import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('API Debug - Fetching all products');

    const products = await prisma.product.findMany({
      where: {
        category: 'skincare'
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`API Debug - Found ${products.length} total products`);
    return NextResponse.json(products);

  } catch (error) {
    console.error('API Debug - Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}