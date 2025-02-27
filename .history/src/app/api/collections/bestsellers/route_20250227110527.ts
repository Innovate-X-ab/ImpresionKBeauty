// app/api/collections/bestsellers/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // In a real application, we would determine bestsellers based on order history
    // For now, we'll simulate bestsellers with a random selection of products
    const products = await prisma.product.findMany({
      take: 12,
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching bestsellers:', error);
    return NextResponse.json(
      { error: 'Error fetching bestsellers' },
      { status: 500 }
    );
  }
}