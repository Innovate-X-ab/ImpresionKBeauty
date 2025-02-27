// app/api/collections/makeup/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: 'makeup'
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching makeup products:', error);
    return NextResponse.json(
      { error: 'Error fetching makeup products' },
      { status: 500 }
    );
  }
}