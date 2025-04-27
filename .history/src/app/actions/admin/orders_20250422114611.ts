//app/actions/admin/orders.ts

'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { OrderStatus, Order, OrderItem, User, Product } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { emailService } from '@/lib/email/service';
import { orderShippedTemplate, orderDeliveredTemplate } from '@/lib/email/templates'; // Corrected import path

// Check if user is admin
async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
  return session;
}

// Type for Decimal-like objects
type DecimalLike = { toNumber: () => number; };
function isDecimalLike(obj: unknown): obj is DecimalLike {
  return obj !== null && typeof obj === 'object' && 'toNumber' in obj && typeof (obj as DecimalLike).toNumber === 'function';
}

// Helper function to convert Decimal values to numbers recursively
function serializeDecimalFields<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;
  if (isDecimalLike(obj)) return obj.toNumber() as unknown as T;
  if (Array.isArray(obj)) return obj.map(item => serializeDecimalFields(item)) as unknown as T;
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

// Define the complete order structure expected by email templates
interface CompleteOrder extends Order {
  user: User | null;
  orderItems: Array<OrderItem & { product: Product; }>;
}

// Get order details
export async function getOrderDetails(orderId: string) {
  try {
    await checkAdmin();
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: { select: { id: true, name: true, email: true } },
        orderItems: { include: { product: true } },
      },
    });
    if (!order) throw new Error('Order not found');

    const serializedOrder = serializeDecimalFields(order);
    const paymentInfo = {
      paymentId: serializedOrder.stripeSessionId || 'N/A',
      paymentMethod: 'Credit Card',
      paymentStatus: 'Paid',
      paymentDate: serializedOrder.createdAt instanceof Date ? serializedOrder.createdAt.toISOString() : serializedOrder.createdAt,
    };
    console.log('Order date from DB:', order.createdAt);
    console.log('Serialized date:', paymentInfo.paymentDate);
    return { ...serializedOrder, paymentInfo };
  } catch (error) {
    console.error('Error fetching order:', error);
    throw new Error(`Failed to fetch order details: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Get all orders
export async function getAllOrders() {
  try {
    await checkAdmin();
    const orders = await prisma.order.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        orderItems: { include: { product: { select: { id: true, name: true, price: true, images: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
    const ordersWithFormattedDates = orders.map(order => ({
      ...order,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString()
    }));
    const serializedOrders = serializeDecimalFields(ordersWithFormattedDates);
    return serializedOrders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error(`Failed to fetch orders: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Update order status (and send standard email)
export async function updateOrderStatus(orderId: string, status: string) {
  try {
    await checkAdmin();
    const validStatuses: OrderStatus[] = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    if (!validStatuses.includes(status as OrderStatus)) throw new Error('Invalid status');

    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
      include: { user: true, orderItems: { include: { product: true } } }
    });
    if (!existingOrder) throw new Error('Order not found');

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: status as OrderStatus },
      include: { user: true, orderItems: { include: { product: true } } },
    });

    // Send standard email notification AFTER successful status update
    await sendOrderStatusEmailInternal(updatedOrder as CompleteOrder);

    const serializedOrder = serializeDecimalFields(updatedOrder);
    revalidatePath(`/admin/orders/${orderId}`);
    revalidatePath('/admin/orders');
    revalidatePath(`/account/orders/${orderId}`);
    revalidatePath('/account/orders');
    return serializedOrder;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw new Error(`Failed to update order status for ${orderId}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Internal function to handle sending STANDARD status emails
async function sendOrderStatusEmailInternal(order: CompleteOrder) {
  if (!order.user?.email) {
    console.warn(`Cannot send status email for order ${order.id}: User email missing.`);
    return;
  }
  const customerEmail = order.user.email;
  const customerName = order.user.name || 'Valued Customer';

  try {
    console.log(`Attempting to send status update email for order ${order.id} to ${customerEmail}, status: ${order.status}`);
    switch (order.status) {
      case OrderStatus.SHIPPED:
        await emailService.sendOrderShipped(customerEmail, {
          orderNumber: order.id,
          trackingNumber: 'N/A', // Replace with actual tracking if available
          trackingUrl: '#',
        });
        console.log(`Shipped email queued for order ${order.id}`);
        break;
      case OrderStatus.DELIVERED:
        await emailService.sendOrderDelivered(customerEmail, {
          orderNumber: order.id,
        });
        console.log(`Delivered email queued for order ${order.id}`);
        break;
      default:
        console.log(`No standard email notification configured for status: ${order.status}`);
        break;
    }
  } catch (error) {
    console.error(`Error sending ${order.status} email for order ${order.id}:`, error);
  }
}

// *** NEW ACTION: Send a custom email ***
export async function sendCustomEmail(orderId: string, subject: string, htmlBody: string) {
  try {
    await checkAdmin(); // Ensure admin privileges

    // Fetch the order to get the user's email
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: { user: { select: { email: true, name: true } } } // Only select necessary fields
    });

    if (!order || !order.user?.email) {
      throw new Error('Order or user email not found');
    }

    const customerEmail = order.user.email;

    // Use the emailService to send the custom email
    await emailService.sendEmail({
      to: customerEmail,
      subject: subject, // Use the provided subject
      html: htmlBody,   // Use the provided HTML body
      from: process.env.SMTP_USER // Ensure 'from' address is set
    });

    console.log(`Custom email sent successfully for order ${orderId} to ${customerEmail}`);
    return {
      success: true,
      message: `Custom email sent successfully to ${customerEmail}`,
    };

  } catch (error) {
    console.error(`Error sending custom email for order ${orderId}:`, error);
    return {
      success: false,
      message: `Failed to send custom email: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

// Kept for potential backward compatibility or specific use cases, but might be redundant now.
export async function sendOrderStatusEmail(orderId: string, emailType: string) {
  // ... (implementation remains the same as previous version, might be less relevant now)
   try {
    await checkAdmin();
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { user: true, orderItems: { include: { product: true } } }
    });
    if (!order || !order.user?.email) throw new Error('Order or user email not found');

    if (emailType.toLowerCase().includes('shipped')) {
       await emailService.sendOrderShipped(order.user.email, { orderNumber: order.id, trackingNumber: 'MANUAL-TRACK-123', trackingUrl: '#' });
       console.log(`Manually triggered Shipped email for order ${order.id}`);
    } else if (emailType.toLowerCase().includes('delivered')) {
       await emailService.sendOrderDelivered(order.user.email, { orderNumber: order.id });
       console.log(`Manually triggered Delivered email for order ${order.id}`);
    } else {
       console.warn(`Unsupported manual email type: ${emailType}`);
       return { success: false, message: `Unsupported email type: ${emailType}` };
    }
    return { success: true, message: `${emailType} email queued successfully for ${order.user.email}` };
  } catch (error) {
    console.error(`Error sending manual email (${emailType}) for order ${orderId}:`, error);
    return { success: false, message: `Failed to send manual email: ${error instanceof Error ? error.message : String(error)}` };
  }
}