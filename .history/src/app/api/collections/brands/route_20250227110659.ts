// app/api/collections/brands/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get unique brands and their product counts
    const brandData = await prisma.product.groupBy({
      by: ['brand'],
      _count: {
        id: true
      }
    });
    
    return NextResponse.json(brandData);
  } catch (error) {
    console.error('Error fetching brands:', error);
    return NextResponse.json(
      { error: 'Error fetching brands' },
      { status: 500 }
    );
  }
}
