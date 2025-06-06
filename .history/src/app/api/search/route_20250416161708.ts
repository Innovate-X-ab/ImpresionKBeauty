//app/api/search/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json([]);
    }

    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive'  // Fixed: removed nested object
            }
          },
          {
            brand: {
              contains: query,
              mode: 'insensitive'  // Fixed: removed nested object
            }
          },
          {
            category: {
              contains: query,      // Changed: from search to contains
              mode: 'insensitive'  // Added: case insensitive search
            }
          }
        ]
      },
      select: {
        id: true,
        name: true,
        brand: true,
        price: true,
        category: true,
        images: true,
        isVegan: true,
        isCrueltyFree: true
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}