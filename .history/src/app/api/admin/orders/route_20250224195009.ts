//app/api/admin/orders/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { OrderStatus, Prisma } from '@prisma/client';

// Define the included types for the order response
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
  price: Prisma.Decimal;
  product: OrderProduct;
}

interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  totalAmount: Prisma.Decimal;
  shippingAddress: string;
  paymentId: string;
  createdAt: Date;
  updatedAt: Date;
  user: OrderUser;
  orderItems: OrderItem[];
}

// Define the response structure
interface OrdersResponse {
  orders: Order[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const status = searchParams.get('status') as OrderStatus | null;
    const search = searchParams.get('search');

    // Build the where clause with proper types
    const where: Prisma.OrderWhereInput = {};
    
    if (status && status !== 'all') {
      where.status = status;
    }
    
    if (search) {
      where.OR = [
        { id: { contains: search } },
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { user: { email: { contains: search, mode: 'insensitive' } } }
      ];
    }

    // Fetch orders with pagination
    const orders = await prisma.order.findMany({
      where,
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
                name: true
              }
            }
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Get total count for pagination
    const totalCount = await prisma.order.count({ where });

    const response: OrdersResponse = {
      orders,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit)
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Error fetching orders' },
      { status: 500 }
    );
  }
}