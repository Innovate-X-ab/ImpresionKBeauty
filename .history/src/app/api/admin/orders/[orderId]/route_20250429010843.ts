// src/app/api/admin/orders/[orderId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import { Prisma } from '@prisma/client'; // Import Prisma namespace if needed for Decimal

// Helper function to convert Decimal values to numbers recursively
// (You might want to move this to a shared utility file)
type DecimalLike = { toNumber: () => number; };
function isDecimalLike(obj: unknown): obj is DecimalLike {
  return obj !== null && typeof obj === 'object' && 'toNumber' in obj && typeof (obj as DecimalLike).toNumber === 'function';
}
function serializeDecimalFields<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;
  if (isDecimalLike(obj)) return obj.toNumber() as unknown as T;
  if (Array.isArray(obj)) return obj.map(item => serializeDecimalFields(item)) as unknown as T;
  if (typeof obj === 'object' && obj !== null && !(obj instanceof Date)) { // Avoid processing Date objects
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


export async function GET(
  request: NextRequest,
  context: { params: { orderId: string } } // Context type remains the same
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Correctly access params directly from context - REMOVED await
    const { orderId } = context.params;

    if (!orderId) {
        return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: {
          include: {
            product: true, // Include full product details
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

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Ensure the user requesting the order is the owner or an admin
    if (order.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Log the raw dates for debugging
    console.log('API GET Order dates from database:');
    console.log('- createdAt:', order.createdAt);
    console.log('- updatedAt:', order.updatedAt);

    // Serialize Decimal fields before constructing the final response
    const serializedOrderBase = serializeDecimalFields(order);

    // Construct the final serialized object, ensuring dates are ISO strings
    const serializedOrder = {
        ...serializedOrderBase,
        // Explicitly convert dates to ISO strings for consistent transfer
        createdAt: order.createdAt instanceof Date ? order.createdAt.toISOString() : String(order.createdAt),
        updatedAt: order.updatedAt instanceof Date ? order.updatedAt.toISOString() : String(order.updatedAt),
        // Ensure orderItems prices are numbers (handled by serializeDecimalFields)
    };

    // Construct paymentInfo using the original Date object before serialization
    const paymentInfo = {
      paymentId: order.stripeSessionId || 'N/A', // Use stripeSessionId from original order
      paymentMethod: 'Credit Card', // Assuming Stripe card payment
      paymentStatus: 'Paid', // Assuming payment is complete
      paymentDate: order.createdAt instanceof Date ? order.createdAt.toISOString() : String(order.createdAt), // Ensure this is also an ISO string
    };

    // Log the response for debugging
    console.log('API GET response createdAt:', serializedOrder.createdAt);
    console.log('API GET response paymentInfo.paymentDate:', paymentInfo.paymentDate);

    // Return the fully serialized order with paymentInfo
    return NextResponse.json({ ...serializedOrder, paymentInfo });

  } catch (error) {
    console.error('API GET Error fetching order:', error);
    // Provide a more specific error message if possible
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: `An error occurred while fetching the order: ${message}` },
      { status: 500 }
    );
  }
}
