// src/app/api/admin/products/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
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
    const json = await request.json();
    const product = await prisma.product.create({
      data: {
        name: json.name,
        brand: json.brand,
        description: json.description,
        price: json.price,
        images: JSON.stringify(json.images),
        category: json.category,
        isVegan: json.isVegan,
        isCrueltyFree: json.isCrueltyFree,
        stock: json.stock
      }
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
  }
}