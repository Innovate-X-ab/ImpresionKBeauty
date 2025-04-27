// app/api/orders/by-session/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      console.log('No authenticated user found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    console.log('Debug info:', {
      sessionId,
      userId: session.user.id,
      userEmail: session.user.email
    });

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // First, log all orders regardless of user to debug
    const allOrders = await prisma.order.findMany({
      where: {
        stripeSessionId: sessionId
      }
    });
    
    console.log('All orders with this session ID:', allOrders);

    // If there are no orders at all with this session ID, we should check if the webhook has been processed
    if (allOrders.length === 0) {
      // Check Stripe session directly (optional - would require additional code)
      console.log('No orders found with session ID. Webhook may not have processed yet.');
      
      // Create an emergency fallback order if needed
      // This is optional and should be removed in production after fixing the webhook
      // It's just here as a demonstration of a possible fallback solution
      
      /* 
      // EMERGENCY FALLBACK - REMOVE AFTER WEBHOOK IS FIXED
      if (sessionId.startsWith('cs_')) {
        console.log('Creating emergency fallback order for session:', sessionId);
        const fallbackOrder = await prisma.order.create({
          data: {
            userId: session.user.id,
            stripeSessionId: sessionId,
            status: 'PROCESSING',
            totalAmount: 0, // You wouldn't know the real amount
            shippingAddress: '{"address":"Emergency Fallback Order"}',
            orderItems: [] // No items can be added without knowledge of what was purchased
          }
        });
        
        // Return the fallback order (this is just for testing)
        return NextResponse.json(fallbackOrder);
      }
      */
    }

    // Try to find an order associated with both the session ID and the current user
    const order = await prisma.order.findFirst({
      where: {
        stripeSessionId: sessionId,
        userId: session.user.id
      },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                name: true,
                price: true,
                images: true
              }
            }
          }
        }
      }
    });

    console.log('Found order details:', {
      found: !!order,
      orderId: order?.id,
      orderUserId: order?.userId,
      itemsCount: order?.orderItems?.length
    });

    // If no order is found for this user, but there are orders with this session ID
    // This could indicate a user mismatch - maybe the order was created with a different user ID
    if (!order && allOrders.length > 0) {
      console.log('Found orders for this session but not for this user. Possible user mismatch.');
      
      // In a real app, you might want to verify if this user should have access to these orders
      // For example, if they're the same email address but different user IDs
      
      // Just for debugging, log the first found order's user ID
      console.log('First order userId:', allOrders[0].userId);
      console.log('Current session userId:', session.user.id);
    }

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}