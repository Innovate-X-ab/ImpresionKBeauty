//app/api/admin/orders/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

// Define interfaces for the return types
interface OrderUser {
  id: string;
  name: string | null;
  email: string;
}

// Update interfaces if needed
interface OrderProduct {
  id: string;
  name: string;
  price: number; // Now always a number, not Decimal
  images: string;
}

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number; // Now always a number, not Decimal
  product: OrderProduct | null;
}

interface Order {
  id: string;
  userId: string;
  status: string;
  totalAmount: number;
  shippingAddress: string;
  paymentId: string;
  createdAt: Date;
  updatedAt: Date;
  user: OrderUser;
  orderItems: OrderItem[];
}

// Helper function to serialize Decimal values
const serializeDecimal = (value: any): number => {
  return value instanceof Decimal ? Number(value) : value;
};

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
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
    });

    // Serialize the orders, converting all Decimal values to numbers
    const serializedOrders = orders.map(order => ({
      ...order,
      totalAmount: serializeDecimal(order.totalAmount),
      orderItems: order.orderItems.map(item => ({
        ...item,
        price: serializeDecimal(item.price),
        product: item.product ? {
          ...item.product,
          price: serializeDecimal(item.product.price)
        } : null
      }))
    }));

    return NextResponse.json(
      JSON.parse(JSON.stringify(serializedOrders)),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}