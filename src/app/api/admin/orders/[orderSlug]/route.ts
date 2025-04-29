// src/app/api/admin/orders/[orderSlug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';

// --- serializeDecimalFields helper function (keep as is) ---
type DecimalLike = { toNumber: () => number; };
function isDecimalLike(obj: unknown): obj is DecimalLike {
  return obj !== null && typeof obj === 'object' && 'toNumber' in obj && typeof (obj as DecimalLike).toNumber === 'function';
}
function serializeDecimalFields<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;
  if (isDecimalLike(obj)) return obj.toNumber() as unknown as T;
  if (Array.isArray(obj)) return obj.map(item => serializeDecimalFields(item)) as unknown as T;
  if (typeof obj === 'object' && obj !== null && !(obj instanceof Date)) {
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
// --- End of helper function ---

// Using a simple approach that completely bypasses the type issue
export async function GET(request: NextRequest) {
  try {
    // Extract orderSlug from URL
    const url = request.nextUrl.pathname;
    const orderSlug = url.split('/').pop() || '';
    
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!orderSlug) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderSlug,
      },
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

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (order.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // --- Serialization and Response ---
    const serializedOrderBase = serializeDecimalFields(order);
    const serializedOrder = {
        ...serializedOrderBase,
        createdAt: order.createdAt instanceof Date ? order.createdAt.toISOString() : String(order.createdAt),
        updatedAt: order.updatedAt instanceof Date ? order.updatedAt.toISOString() : String(order.updatedAt),
    };
    
    const paymentInfo = {
      paymentId: order.stripeSessionId || 'N/A',
      paymentMethod: 'Credit Card',
      paymentStatus: 'Paid',
      paymentDate: order.createdAt instanceof Date ? order.createdAt.toISOString() : String(order.createdAt),
    };
    
    return NextResponse.json({ ...serializedOrder, paymentInfo });
  } catch (error) {
    console.error('API GET Error fetching order:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: `An error occurred while fetching the order: ${message}` },
      { status: 500 }
    );
  }
}