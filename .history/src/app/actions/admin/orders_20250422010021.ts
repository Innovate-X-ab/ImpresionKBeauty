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

// Define a type for objects with a toNumber method (like Prisma's Decimal)
type DecimalLike = {
  toNumber: () => number;
};

// Type guard to check if an object is DecimalLike
function isDecimalLike(obj: unknown): obj is DecimalLike {
  return obj !== null && 
         typeof obj === 'object' && 
         'toNumber' in obj && 
         typeof (obj as DecimalLike).toNumber === 'function';
}

// Helper function to convert Decimal values to numbers
function serializeDecimalFields<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  // Check if it's a Decimal object
  if (isDecimalLike(obj)) {
    return obj.toNumber() as unknown as T;
  }

  // If it's an array, process each item
  if (Array.isArray(obj)) {
    return obj.map(item => serializeDecimalFields(item)) as unknown as T;
  }

  // If it's an object, process each property
  if (typeof obj === 'object' && obj !== null) {
    const result = {} as Record<string, unknown>;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = serializeDecimalFields((obj as Record<string, unknown>)[key]);
      }
    }
    return result as unknown as T;
  }

  return obj;
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

    // Serialize any Decimal fields in the order
    const serializedOrder = serializeDecimalFields(order);

        // Add payment info based on the order data
        const paymentInfo = {
          paymentId: order.stripeSessionId || 'Not available',
          paymentMethod: 'Credit Card',
          paymentStatus: 'Paid',
          paymentDate: order.createdAt.toISOString(),
        };
    
        // Log date for debugging
        console.log('Order date from DB:', order.createdAt);
        console.log('Serialized date:', order.createdAt.toISOString());

    return {
      ...serializedOrder,
      tracking: trackingInfo,
      paymentInfo
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
                price: true,
                images: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // First create ISO strings from the dates
    const ordersWithFormattedDates = orders.map(order => ({
      ...order,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString()
    }));

    // Then serialize decimal fields
    const serializedOrders = serializeDecimalFields(ordersWithFormattedDates);

    return serializedOrders;
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

    // Serialize any Decimal fields in the updated order
    const serializedOrder = serializeDecimalFields(updatedOrder);

    // Optional: Send email notification
    // await sendOrderStatusEmail(updatedOrder);

    // Revalidate relevant paths to update UI
    revalidatePath(`/admin/orders/${orderId}`);
    revalidatePath('/admin/orders');

    return serializedOrder;
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