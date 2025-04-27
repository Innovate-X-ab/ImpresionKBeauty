//app/api/admin/orders/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';


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

    // Convert orders to plain objects with serialized Decimal values
    const serializedOrders = orders.map(order => ({
      ...order,
      totalAmount: Number(order.totalAmount),
      orderItems: order.orderItems.map(item => ({
        ...item,
        price: Number(item.price),
        product: item.product ? {
          ...item.product,
          price: Number(item.product.price)
        } : null
      }))
    }));

    // Ensure all data is serializable
    return NextResponse.json(JSON.parse(JSON.stringify(serializedOrders)));
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}