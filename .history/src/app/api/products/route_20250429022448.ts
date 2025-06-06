// app/api/admin/products/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import { prisma } from '@/lib/prisma';
import { ProductType } from '@prisma/client';

// Helper to map category to product type
function getCategoryProductType(category: string): ProductType {
  const categoryMap: Record<string, ProductType> = {
    'cleanser': ProductType.CLEANSER,
    'toner': ProductType.TONER,
    'serum': ProductType.SERUM,
    'moisturizer': ProductType.MOISTURIZER,
    'mask': ProductType.MASK,
    'sunscreen': ProductType.SUNSCREEN,
    // Add fallbacks for other categories
  };
  
  // Default to the first available type if category doesn't match
  return categoryMap[category.toLowerCase()] || ProductType.SERUM;
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Log the first product's reviews for debugging
    if (products.length > 0) {
      console.log('First product reviews:', products[0].reviews);
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
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

    // Set a default category if not provided
    const category = json.category || 'serum';
    
    // Determine product type based on category
    // If type is explicitly provided, use it, otherwise derive from category
    const productType = json.type 
      ? json.type 
      : getCategoryProductType(category);

    // Create product
    const product = await prisma.product.create({
      data: {
        name: json.name,
        brand: json.brand,
        description: json.description,
        price: json.price,
        images: JSON.stringify(json.images || ['/api/placeholder/300/300']),
        category: category,
        type: productType, // Add the required type field
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