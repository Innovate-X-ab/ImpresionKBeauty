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
    
    if (!session?.user) {
      console.log('No authenticated user found');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log(`Session user ID: ${session.user.id || 'undefined'}`);
    console.log(`Session user email: ${session.user.email || 'undefined'}`);

    // First approach: Try to find a user with the email from the session
    let userId = session.user.id;
    
    if (session.user.email) {
      const dbUser = await prisma.user.findUnique({
        where: { 
          email: session.user.email 
        },
        select: {
          id: true
        }
      });
      
      if (dbUser) {
        console.log(`Found user in database with email ${session.user.email}, ID: ${dbUser.id}`);
        userId = dbUser.id;
      }
    }

    console.log(`Using userId for order query: ${userId}`);

    // DEBUG: Find all orders to check if they exist at all
    const allOrders = await prisma.order.findMany({
      take: 5, // Just get a few to check
      select: {
        id: true,
        userId: true,
        status: true
      }
    });
    
    console.log(`DEBUG: Total orders in database: ${allOrders.length}`);
    if (allOrders.length > 0) {
      console.log('Sample order user IDs:', allOrders.map(o => o.userId).join(', '));
    }

    // Fetch orders for this user
    const orders = await prisma.order.findMany({
      where: {
        userId: userId
      },
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

    console.log(`Found ${orders.length} orders for user ${userId}`);

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

    // If we still don't have orders, try an alternative approach
    if (orders.length === 0) {
      console.log('No orders found with primary approach, trying alternative lookup');
      
      // If we have at least one order in the system, try to find ones that might belong to this user
      // This is a fallback for debugging - not ideal for production
      if (allOrders.length > 0 && session.user.email) {
        console.log('Attempting to find orders by email via orderItems.userId lookup');
        
        // This section would require adding a more complex query based on your data model
        // For example, if orders are linked to an email field:
        /*
        const alternativeOrders = await prisma.order.findMany({
          where: {
            // Some alternative query condition like:
            userEmail: session.user.email
            // Or perhaps another identifying field
          },
          include: {
            orderItems: {
              include: {
                product: true
              }
            }
          }
        });
        
        if (alternativeOrders.length > 0) {
          console.log(`Found ${alternativeOrders.length} orders through alternative lookup`);
          // Format and return these instead
        }
        */
      }
    }

    return NextResponse.json(formattedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Error fetching orders' },
      { status: 500 }
    );
  }
}