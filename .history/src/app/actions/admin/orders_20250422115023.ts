//app/actions/admin/orders.ts

'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { OrderStatus, Order, OrderItem, User, Product } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { emailService } from '@/lib/email/service';
// Ensure templates are correctly imported (assuming they exist in lib/email/templates)
// import { orderShippedTemplate, orderDeliveredTemplate } from '@/lib/email/templates';

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
      paymentMethod: 'Credit Card', // Assuming Stripe card payment
      paymentStatus: 'Paid', // Assuming payment is complete
      // Ensure createdAt is handled correctly (it should be a Date object from Prisma)
      paymentDate: order.createdAt instanceof Date ? order.createdAt.toISOString() : new Date(order.createdAt).toISOString(),
    };
    console.log('Order date from DB:', order.createdAt);
    console.log('Serialized date:', paymentInfo.paymentDate);
    // Return the serialized order along with the constructed paymentInfo
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
    // Format dates and serialize decimals before returning
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
      include: { user: true, orderItems: { include: { product: true } } } // Include necessary relations
    });
    if (!existingOrder) throw new Error('Order not found');

    // Update the order status in the database
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: status as OrderStatus },
      include: { user: true, orderItems: { include: { product: true } } }, // Include relations again for the updated object
    });

    // Send standard email notification AFTER successful status update
    await sendOrderStatusEmailInternal(updatedOrder as CompleteOrder); // Pass the fully loaded updated order

    // Serialize Decimal fields BEFORE constructing paymentInfo
    const serializedUpdatedOrder = serializeDecimalFields(updatedOrder);

    // **FIX:** Construct paymentInfo using the updated and serialized order data
    const paymentInfo = {
        paymentId: serializedUpdatedOrder.stripeSessionId || 'N/A',
        paymentMethod: 'Credit Card',
        paymentStatus: 'Paid',
        paymentDate: updatedOrder.createdAt instanceof Date ? updatedOrder.createdAt.toISOString() : new Date(updatedOrder.createdAt).toISOString(), // Use original creation date
    };


    // Revalidate paths
    revalidatePath(`/admin/orders/${orderId}`);
    revalidatePath('/admin/orders');
    revalidatePath(`/account/orders/${orderId}`);
    revalidatePath('/account/orders');

    // **FIX:** Return the serialized order *with* the constructed paymentInfo
    return { ...serializedUpdatedOrder, paymentInfo };

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
  // **FIX:** Use customerName variable
  const customerName = order.user.name || 'Valued Customer';

  // Prepare base data for templates, including customerName
  const baseEmailData = {
      orderNumber: order.id,
      customerName: customerName, // Pass customerName here
      // Add other common fields if needed by templates
  };

  try {
    console.log(`Attempting to send status update email for order ${order.id} to ${customerEmail}, status: ${order.status}`);
    switch (order.status) {
      case OrderStatus.SHIPPED:
        // Pass necessary data to the template function
        await emailService.sendOrderShipped(customerEmail, {
          ...baseEmailData, // Include base data
          trackingNumber: 'N/A', // Replace with actual tracking if available
          trackingUrl: '#',
          // Add estimatedDelivery if the template requires it
          // estimatedDelivery: '3-5 business days',
        });
        console.log(`Shipped email queued for order ${order.id}`);
        break;
      case OrderStatus.DELIVERED:
         // Pass necessary data to the template function
        await emailService.sendOrderDelivered(customerEmail, {
          ...baseEmailData, // Include base data
        });
        console.log(`Delivered email queued for order ${order.id}`);
        break;
      default:
        console.log(`No standard email notification configured for status: ${order.status}`);
        break;
    }
  } catch (error) {
    console.error(`Error sending ${order.status} email for order ${order.id}:`, error);
    // Log error but don't block the main flow
  }
}

// Send a custom email
export async function sendCustomEmail(orderId: string, subject: string, htmlBody: string) {
  try {
    await checkAdmin();
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: { user: { select: { email: true, name: true } } }
    });
    if (!order || !order.user?.email) throw new Error('Order or user email not found');

    const customerEmail = order.user.email;
    await emailService.sendEmail({
      to: customerEmail,
      subject: subject,
      html: htmlBody,
      from: process.env.SMTP_USER // Ensure 'from' address is set
    });
    console.log(`Custom email sent successfully for order ${orderId} to ${customerEmail}`);
    return { success: true, message: `Custom email sent successfully to ${customerEmail}` };
  } catch (error) {
    console.error(`Error sending custom email for order ${orderId}:`, error);
    return { success: false, message: `Failed to send custom email: ${error instanceof Error ? error.message : String(error)}` };
  }
}

// Kept for potential backward compatibility or specific use cases.
export async function sendOrderStatusEmail(orderId: string, emailType: string) {
   try {
    await checkAdmin();
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { user: true, orderItems: { include: { product: true } } }
    });
    if (!order || !order.user?.email) throw new Error('Order or user email not found');

    // **FIX:** Include customerName when calling templates if needed
    const customerName = order.user.name || 'Valued Customer';
    const baseEmailData = { orderNumber: order.id, customerName: customerName };


    if (emailType.toLowerCase().includes('shipped')) {
       await emailService.sendOrderShipped(order.user.email, {
           ...baseEmailData,
           trackingNumber: 'MANUAL-TRACK-123',
           trackingUrl: '#'
        });
       console.log(`Manually triggered Shipped email for order ${order.id}`);
    } else if (emailType.toLowerCase().includes('delivered')) {
       await emailService.sendOrderDelivered(order.user.email, baseEmailData);
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