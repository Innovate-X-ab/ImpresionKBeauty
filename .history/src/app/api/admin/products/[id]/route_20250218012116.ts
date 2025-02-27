// src/app/api/admin/products/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: params.id
      }
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json({ error: 'Error fetching product' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const json = await request.json();
    const product = await prisma.product.update({
      where: {
        id: params.id
      },
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
    console.error('Failed to update product:', error);
    return NextResponse.json({ error: 'Error updating product' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: {
        id: params.id
      }
    });
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Failed to delete product:', error);
    return NextResponse.json({ error: 'Error deleting product' }, { status: 500 });
  }
}