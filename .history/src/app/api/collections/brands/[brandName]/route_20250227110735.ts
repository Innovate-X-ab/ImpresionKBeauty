// app/api/collections/brands/[brandName]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { brandName: string } }
) {
  try {
    const brandName = params.brandName;
    
    // Map slug to actual brand name if needed
    const brandNameMap: { [key: string]: string } = {
      'cosrx': 'COSRX',
      'beauty-of-joseon': 'Beauty of Joseon',
      'some-by-mi': 'Some By Mi',
      'medicube': 'Medicube'
      // Add more mappings as needed
    };
    
    const actualBrandName = brandNameMap[brandName] || brandName;
    
    // Fetch products for this brand
    const products = await prisma.product.findMany({
      where: {
        brand: {
          equals: actualBrandName,
          mode: 'insensitive' // Case-insensitive search
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error(`Error fetching products for brand ${params.brandName}:`, error);
    return NextResponse.json(
      { error: 'Error fetching brand products' },
      { status: 500 }
    );
  }
}