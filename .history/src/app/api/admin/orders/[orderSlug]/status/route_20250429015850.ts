// src/app/api/admin/orders/[orderSlug]/status/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { OrderStatus } from '@prisma/client';

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Extract orderSlug from URL
    const url = request.nextUrl.pathname;
    const segments = url.split('/');
    // Get the orderSlug from the URL (considering the path structure)
    const orderSlug = segments[segments.length - 2]; // Second to last segment
    
    const { status } = await request.json();
    
    // Validate status
    const validStatuses: OrderStatus[] = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    
    if (!validStatuses.includes(status as OrderStatus)) {
      return NextResponse.json(
        { error: 'Invalid order status' }, 
        { status: 400 }
      );
    }
    
    const updatedOrder = await prisma.order.update({
      where: { id: orderSlug },
      data: { status: status as OrderStatus },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    
    // Convert Date objects to ISO strings for serialization
    const serializedOrder = {
      ...updatedOrder,
      createdAt: updatedOrder.createdAt.toISOString(),
      updatedAt: updatedOrder.updatedAt.toISOString(),
      // Convert all Decimal values to numbers
      totalAmount: Number(updatedOrder.totalAmount),
      orderItems: updatedOrder.orderItems.map(item => ({
        ...item,
        price: Number(item.price),
        product: item.product ? {
          ...item.product,
          price: Number(item.product.price)
        } : null
      }))
    };
    
    // Log the dates for debugging
    console.log('Status update API - order date:', serializedOrder.createdAt);
    
    // Add payment info
    const paymentInfo = {
      paymentId: updatedOrder.stripeSessionId || 'Not available',
      paymentMethod: 'Credit Card',
      paymentStatus: 'Paid',
      paymentDate: updatedOrder.createdAt.toISOString(),
    };
    
    return NextResponse.json({
      ...serializedOrder,
      paymentInfo
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json(
      { error: 'Failed to update order status' },
      { status: 500 }
    );
  }
}