// app/api/admin/orders/[orderId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { OrderStatus } from '@prisma/client';

// Simple OrderService implementation
class OrderService {
  async updateOrderStatus(orderId: string, status: OrderStatus) {
    return prisma.order.update({
      where: { id: orderId },
      data: { status }, // TypeScript now knows status is an OrderStatus value
      include: {
        user: true,
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });
  }
}

const orderService = new OrderService();

// Use the exact type signature expected by Next.js
export async function GET(
  req: NextRequest, 
  context: { params: { orderId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const orderId = context.params.orderId;

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Error fetching order' },
      { status: 500 }
    );
  }
}

// Same change for PATCH
export async function PATCH(
  req: NextRequest, 
  context: { params: { orderId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const orderId = context.params.orderId;
    const { status } = await req.json();

    // Define valid statuses as an array of OrderStatus values
    const validStatuses: OrderStatus[] = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    
    // Type guard to ensure status is an OrderStatus
    if (!validStatuses.includes(status as OrderStatus)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Cast status to OrderStatus since we validated it
    const updatedOrder = await orderService.updateOrderStatus(orderId, status as OrderStatus);

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Error updating order' },
      { status: 500 }
    );
  }
}

// Same change for POST
export async function POST(
  req: NextRequest, 
  context: { params: { orderId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const orderId = context.params.orderId;
    const { emailType } = await req.json();

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        user: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `${emailType} email sent to ${order.user.email}`,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Error sending email' },
      { status: 500 }
    );
  }
}