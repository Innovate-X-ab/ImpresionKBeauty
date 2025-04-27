// app/api/orders/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const json = await request.json();
    const { items, shippingAddress, totalAmount, paymentId } = json;

    // Validate input
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Items are required and must be an array' },
        { status: 400 }
      );
    }

    if (!shippingAddress) {
      return NextResponse.json(
        { error: 'Shipping address is required' },
        { status: 400 }
      );
    }

    if (!totalAmount || isNaN(Number(totalAmount))) {
      return NextResponse.json(
        { error: 'Valid total amount is required' },
        { status: 400 }
      );
    }

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    // Check if order already exists with this paymentId/session ID
    const existingOrder = await prisma.order.findFirst({
      where: {
        stripeSessionId: paymentId
      }
    });

    if (existingOrder) {
      console.log(`Order already exists for session ${paymentId}, returning existing order`);
      return NextResponse.json(existingOrder);
    }

    // Create order with order items
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        totalAmount,
        shippingAddress: typeof shippingAddress === 'string' 
          ? shippingAddress 
          : JSON.stringify(shippingAddress),
        stripeSessionId: paymentId, // Store as stripeSessionId
        status: 'PROCESSING', // Set initial status to PROCESSING
        orderItems: {
          create: items.map((item: OrderItem) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    console.log(`Created order ${order.id} for session ${paymentId}`);

    // Update product stock
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Error creating order' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log(`Attempting to fetch orders for user ${session.user.id} with email ${session.user.email}`);

        // Find the user by email as a fallback
        let userQuery = {};
        if (session.user.id) {
          userQuery = { userId: session.user.id };
        } else if (session.user.email) {
          // Look up the user first to get their ID
          const user = await prisma.user.findUnique({
            where: { email: session.user.email }
          });
          if (user) {
            userQuery = { userId: user.id };
          }
        }


    // Fetch orders with the user query
    const orders = await prisma.order.findMany({
      where: userQuery,
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`Found ${orders.length} orders for user query:`, userQuery);

    // Transform the orders to match the expected format in the frontend
    const formattedOrders = orders.map(order => {
      return {
        id: order.id,
        createdAt: order.createdAt,
        status: order.status,
        total: parseFloat(order.totalAmount.toString()),
        orderItems: order.orderItems.map(item => ({
          id: item.id,
          name: item.product.name,
          quantity: item.quantity,
          price: parseFloat(item.price.toString()),
          images: item.product.images
        }))
      };
    });

    return NextResponse.json(formattedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Error fetching orders' },
      { status: 500 }
    );
  }
}