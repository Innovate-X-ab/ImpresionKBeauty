// app/api/admin/products/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

// Add this export to force static generation
export const dynamic = "force-static";

export async function GET() {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const json = await request.json();
    
    // Basic validation
    if (!json.name || !json.brand || !json.description || typeof json.price !== 'number') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        name: json.name,
        brand: json.brand,
        description: json.description,
        price: json.price,
        images: JSON.stringify(json.images || ['/api/placeholder/300/300']),
        category: json.category || 'skincare',
        isVegan: json.isVegan || false,
        isCrueltyFree: json.isCrueltyFree || false,
        stock: json.stock || 0
      }
    });
    
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
  }
}