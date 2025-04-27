//app/actions/admin/orders.ts

'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { OrderStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

// Check if user is admin
async function checkAdmin() {
  const session = await getServerSession(authOptions);
  
  if (session?.user?.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
  
  return session;
}

// Get order details
export async function getOrderDetails(orderId: string) {
  try {
    await checkAdmin();

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
      throw new Error('Order not found');
    }

    // Mock tracking info - in a real app, you'd get this from a shipping provider
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

    return {
      ...order,
      tracking: trackingInfo
    };
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
}

// Get all orders
export async function getAllOrders() {
  try {
    await checkAdmin();

    const orders = await prisma.order.findMany({
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
            product: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

// Update order status
export async function updateOrderStatus(orderId: string, status: string) {
  try {
    await checkAdmin();

    // Validate status
    const validStatuses: OrderStatus[] = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    
    if (!validStatuses.includes(status as OrderStatus)) {
      throw new Error('Invalid status');
    }

    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!existingOrder) {
      throw new Error('Order not found');
    }

    // Update order status
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: status as OrderStatus },
      include: {
        user: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    // Optional: Send email notification
    // await sendOrderStatusEmail(updatedOrder);

    // Revalidate relevant paths to update UI
    revalidatePath(`/admin/orders/${orderId}`);
    revalidatePath('/admin/orders');

    return updatedOrder;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}

// Send order status email
export async function sendOrderStatusEmail(orderId: string, emailType: string) {
  try {
    await checkAdmin();

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        user: true,
      },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    // Logic to send email would go here
    // For now, we'll just return a success message

    return {
      success: true,
      message: `${emailType} email would be sent to ${order.user.email}`,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}