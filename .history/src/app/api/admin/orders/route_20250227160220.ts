//app/api/admin/orders/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const statusParam = searchParams.get('status');
    const search = searchParams.get('search');

    // Define a simpler where object without complex nesting
    const whereConditions: Record<string, unknown> = {};
    
    if (statusParam) {
      whereConditions.status = statusParam;
    }
    
    // Direct filter approach instead of complex OR conditions
    // This simplifies the type requirements
    const orders = await prisma.order.findMany({
      where: whereConditions,
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

    // Basic search filter in JavaScript after fetching
    let filteredOrders = orders;
    if (search) {
      const searchLower = search.toLowerCase();
      filteredOrders = orders.filter(order => 
        order.id.toLowerCase().includes(searchLower) ||
        (order.user.name && order.user.name.toLowerCase().includes(searchLower)) ||
        order.user.email.toLowerCase().includes(searchLower)
      );
    }

    // Get total count
    const totalCount = await prisma.order.count({ where: whereConditions });

    const response = {
      orders: filteredOrders,
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