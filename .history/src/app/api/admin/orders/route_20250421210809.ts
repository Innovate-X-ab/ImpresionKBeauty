// src/app/api/admin/orders/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

// Define interfaces for the return types
interface OrderUser {
  id: string;
  name: string | null;
  email: string;
}

interface OrderProduct {
  id: string;
  name: string;
  price: number; // As a number, not Decimal
  images: string;
}

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number; // As a number, not Decimal
  product: OrderProduct | null;
}

export interface Order {
  id: string;
  userId: string;
  status: string;
  totalAmount: number; // As a number, not Decimal
  shippingAddress: string;
  stripeSessionId: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  user: OrderUser;
  orderItems: OrderItem[];
}

// Type for database orders with Decimal fields
type DbOrder = {
  id: string;
  userId: string;
  status: string;
  totalAmount: Prisma.Decimal;
  shippingAddress: string;
  stripeSessionId: string;
  createdAt: Date;
  updatedAt: Date;
  user: OrderUser;
  orderItems: Array<{
    id: string;
    productId: string;
    quantity: number;
    price: Prisma.Decimal;
    product: {
      id: string;
      name: string;
      price: Prisma.Decimal;
      images: string;
    } | null;
  }>;
};

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dbOrders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                images: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    }) as unknown as DbOrder[];

        // Add some debugging to check the date values
        if (dbOrders.length > 0) {
          console.log('First order date from DB:', dbOrders[0].createdAt);
        }

  // Convert Decimal fields to numbers and Date to ISO strings explicitly
  const serializedOrders: Order[] = dbOrders.map(order => {
    // Log each order's date for debugging
    console.log(`Order ${order.id} createdAt:`, order.createdAt);
    
    return {
      ...order,
      totalAmount: Number(order.totalAmount),
      createdAt: order.createdAt.toISOString(), // Convert Date to ISO string
      updatedAt: order.updatedAt.toISOString(), // Convert Date to ISO string
      orderItems: order.orderItems.map(item => ({
        ...item,
        price: Number(item.price),
        product: item.product ? {
          ...item.product,
          price: Number(item.product.price)
        } : null
      }))
    };
  });

  // Check the serialized dates
  if (serializedOrders.length > 0) {
    console.log('First order serialized date:', serializedOrders[0].createdAt);
  }

  return NextResponse.json(serializedOrders);
} catch (error) {
  console.error('Error fetching orders:', error);
  return NextResponse.json(
    { error: 'Failed to fetch orders' },
    { status: 500 }
  );
}
}