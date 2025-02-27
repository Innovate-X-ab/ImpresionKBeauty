// app/api/collections/skincare/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: 'skincare'
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching skincare products:', error);
    return NextResponse.json(
      { error: 'Error fetching skincare products' },
      { status: 500 }
    );
  }
}