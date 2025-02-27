// app/api/collections/new/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch new arrivals (products from the last 30 days)
    const products = await prisma.product.findMany({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching new arrivals:', error);
    return NextResponse.json(
      { error: 'Error fetching new arrivals' },
      { status: 500 }
    );
  }
}