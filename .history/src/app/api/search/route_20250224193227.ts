//app/api/search/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    // Use raw SQL query to ensure case-insensitivity
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