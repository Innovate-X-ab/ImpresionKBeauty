import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

// Define interfaces for the return types
interface OrderUser {
  id: string;
  name: string | null;
  email: string;
}

interface OrderProduct {
  id: string;
  name: string;
  price: number; // Now always a number, not Decimal
  images: string;
}

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number; // Now always a number, not Decimal
  product: OrderProduct | null;
}

export interface Order {
  id: string;
  userId: string;
  status: string;
  totalAmount: number;
  shippingAddress: string;
  paymentId: string;
  createdAt: Date;
  updatedAt: Date;
  user: OrderUser;
  orderItems: OrderItem[];
}

// Define a type for objects with potential toNumber method (like Decimal)
type DecimalLike = {
  toNumber: () => number;
};

// Helper function to check if an object is DecimalLike
function isDecimalLike(obj: unknown): obj is DecimalLike {
  return obj !== null && 
         typeof obj === 'object' && 
         'toNumber' in obj && 
         typeof (obj as DecimalLike).toNumber === 'function';
}

// Helper function to recursively convert Decimal objects to Numbers
function convertDecimalsToNumbers<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'object') {
    // Check if the object has a toNumber method (like Prisma's Decimal)
    if (isDecimalLike(obj)) {
      return obj.toNumber() as unknown as T;
    }

    // If it's a Date object, return as is
    if (obj instanceof Date) {
      return obj;
    }

    // Handle arrays
    if (Array.isArray(obj)) {
      return obj.map(item => convertDecimalsToNumbers(item)) as unknown as T;
    }

    // Handle regular objects
    const result = {} as Record<string, unknown>;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = convertDecimalsToNumbers((obj as Record<string, unknown>)[key]);
      }
    }
    return result as unknown as T;
  }

  return obj;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
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
                name: true,
                price: true,
                images: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Convert all Decimal values to Numbers throughout the entire object structure
    const serializedOrders = convertDecimalsToNumbers(orders);

    // Ensure all data is serializable with JSON.stringify/parse
    return NextResponse.json(serializedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}