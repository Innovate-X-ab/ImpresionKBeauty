//app/api/admin/orders/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { Prisma, Decimal } from '@prisma/client';

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

export interface Order {
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

// Helper function to deeply serialize all Decimal values
const serializeData = (data: any): any => {
  if (data instanceof Decimal) {
    return Number(data);
  }
  
  if (Array.isArray(data)) {
    return data.map(item => serializeData(item));
  }
  
  if (data && typeof data === 'object') {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, serializeData(value)])
    );
  }
  
  return data;
};

export async function GET() {
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

    // Serialize all data, including nested Decimal values
    const serializedOrders = serializeData(orders);

    return NextResponse.json(serializedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}