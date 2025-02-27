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
    const statusParam = searchParams.get('status');
    const search = searchParams.get('search');

    // Build the where clause with proper types
    const where: Prisma.OrderWhereInput = {};
    
    // Only add status filter if it's a valid OrderStatus
    if (statusParam && Object.values(OrderStatus).includes(statusParam as OrderStatus)) {
      where.status = statusParam as OrderStatus;
    }
    
    if (search) {
      // For basic filtering, we can use the standard Prisma approach
      where.OR = [
        { id: { contains: search } },
        { user: { name: { contains: search } } },
        { user: { email: { contains: search } } }
      ];
      
      // If we need case-insensitive search and standard filters don't work,
      // we can use Prisma's raw query functionality instead:
      
      /* Example of case-insensitive search using raw SQL:
      
      // For MySQL/PostgreSQL
      const orders = await prisma.$queryRaw`
        SELECT o.*, u.name as userName, u.email as userEmail
        FROM "Order" o
        JOIN "User" u ON o.userId = u.id
        WHERE 
          o.id ILIKE ${`%${search}%`} OR
          u.name ILIKE ${`%${search}%`} OR 
          u.email ILIKE ${`%${search}%`}
        ORDER BY o.createdAt DESC
        LIMIT ${limit} OFFSET ${(page - 1) * limit}
      `;
      
      // Remember that when using raw queries, you'll need to manually handle pagination
      // and include related data like orderItems
      */
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