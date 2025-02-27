//app/api/search/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get('q');

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    // For PostgreSQL or databases supporting ILIKE
    const searchPattern = `%${query}%`;
    
    const products = await prisma.$queryRaw`
      SELECT id, name, brand, price, category, images, "isVegan", "isCrueltyFree"
      FROM "Product"
      WHERE 
        LOWER(name) LIKE LOWER(${searchPattern}) OR
        LOWER(brand) LIKE LOWER(${searchPattern}) OR
        LOWER(description) LIKE LOWER(${searchPattern}) OR
        LOWER(category) LIKE LOWER(${searchPattern})
      LIMIT 20
    `;

    return NextResponse.json(products);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}