//app/api/orders/[orderId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const order = await prisma.order.findUnique({
      where: {
        id: params.orderId,
        userId: session.user.id
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        },
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // TODO: Integrate with actual shipping provider's API
    // This is mock tracking data
    const trackingInfo = {
      number: 'TRK' + order.id,
      carrier: 'Royal Mail',
      status: 'In Transit',
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      events: [
        {
          date: new Date().toISOString(),
          location: 'London Sorting Center',
          status: 'Package in transit'
        },
        {
          date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          location: 'London',
          status: 'Package picked up'
        }
      ]
    };

    return NextResponse.json({
      ...order,
      tracking: trackingInfo
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Error fetching order' },
      { status: 500 }
    );
  }
}

// For updating order status (e.g., cancelling an order)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { status } = await request.json();

    const order = await prisma.order.findUnique({
      where: {
        id: params.orderId,
        userId: session.user.id
      }
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Only allow cancellation if order is still pending
    if (status === 'CANCELLED' && order.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Order cannot be cancelled' },
        { status: 400 }
      );
    }

    const updatedOrder = await prisma.order.update({
      where: {
        id: params.orderId,
        userId: session.user.id
      },
      data: {
        status
      }
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Error updating order' },
      { status: 500 }
    );
  }
}