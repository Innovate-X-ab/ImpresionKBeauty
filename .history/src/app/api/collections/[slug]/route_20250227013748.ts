// app/api/collections/[slug]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: params.slug
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching collection products:', error);
    return NextResponse.json(
      { error: 'Error fetching products' },
      { status: 500 }
    );
  }
}