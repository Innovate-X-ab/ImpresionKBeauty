// app/api/collections/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Add this export to force static generation
export const dynamic = "force-static";

export async function GET(
  request: NextRequest,
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