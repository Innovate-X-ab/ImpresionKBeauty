// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Build filter conditions
    const filterConditions: any = {};
    
    // Handle category filter
    const category = searchParams.get('category');
    if (category) {
      filterConditions.category = category;
    }
    
    // Handle brand filter
    const brand = searchParams.get('brand');
    if (brand) {
      filterConditions.brand = brand;
    }
    
    // Handle vegan and cruelty-free filters
    const isVegan = searchParams.get('vegan');
    if (isVegan === 'true') {
      filterConditions.isVegan = true;
    }
    
    const isCrueltyFree = searchParams.get('crueltyFree');
    if (isCrueltyFree === 'true') {
      filterConditions.isCrueltyFree = true;
    }
    
    // Fetch products with filters
    const products = await prisma.product.findMany({
      where: filterConditions,
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}