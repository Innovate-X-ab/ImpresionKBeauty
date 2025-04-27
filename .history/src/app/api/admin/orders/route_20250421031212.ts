//app/api/admin/orders/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma, Decimal } from '@/lib/prisma';

// Define interfaces for the return types
interface OrderUser {
  id: string;
  name: string | null;
  email: string;
}

interface OrderProduct {
  id: string;
  name: string;
}

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: Decimal;
  product: OrderProduct;
}

interface Order {
  id: string;
  userId: string;
  status: string;
  totalAmount: Decimal;
  shippingAddress: string;
  paymentId: string;
  createdAt: Date;
  updatedAt: Date;
  user: OrderUser;
  orderItems: OrderItem[];
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.role === 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Convert Decimal values to numbers
    const serializedOrders = orders.map(order => ({
      ...order,
      totalAmount: Number(order.totalAmount),
      orderItems: order.orderItems.map(item => ({
        ...item,
        price: Number(item.price),
        product: {
          ...item.product,
          price: Number(item.product.price)
        }
      }))
    }));

    return NextResponse.json(serializedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}