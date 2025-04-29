// app/api/orders/create-from-session/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import { stripe } from '@/lib/stripe';

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export async function POST(req: NextRequest) {
  try {
    // Ensure user is authenticated
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      console.log('No authenticated user found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get session ID from request body
    const { sessionId } = await req.json();
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    console.log(`Processing order creation for session ${sessionId} and user ${session.user.id}`);

    // Check if an order already exists for this session
    const existingOrder = await prisma.order.findFirst({
      where: {
        stripeSessionId: sessionId
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    if (existingOrder) {
      console.log(`Order already exists for session ${sessionId}:`, existingOrder.id);
      return NextResponse.json(existingOrder);
    }

    // Retrieve session details from Stripe
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);
    
    // Verify the session is paid
    if (stripeSession.payment_status !== 'paid') {
      console.log(`Session ${sessionId} is not paid:`, stripeSession.payment_status);
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      );
    }

    // Get order details from session metadata
    const metadata = stripeSession.metadata || {};
    let items: CartItem[] = [];
    try {
      items = metadata.items ? JSON.parse(metadata.items) : [];
    } catch (parseError) {
      console.error('Error parsing items from metadata:', parseError);
      return NextResponse.json(
        { error: 'Invalid order items data' },
        { status: 400 }
      );
    }

    if (!items.length) {
      console.error('No items found in session metadata');
      return NextResponse.json(
        { error: 'No items in order' },
        { status: 400 }
      );
    }

    // Get shipping address from metadata or use empty object
    const shippingAddress = metadata.shippingAddress || '{}';

    // First, ensure the user exists in our database
    let dbUser = await prisma.user.findUnique({
      where: { id: session.user.id }
    });
    
    if (!dbUser) {
      // Look up by email instead, since user might exist with different ID
      dbUser = await prisma.user.findUnique({
        where: { email: session.user.email || '' }
      });
      
      if (dbUser) {
        // User exists with a different ID (probably created by credentials)
        console.log(`Found user by email ${session.user.email}, updating session user ID`);
        // We'll use this existing user ID for the order
        session.user.id = dbUser.id;
      } else {
        // If user doesn't exist at all in our database,
        // we need to create the user first
        try {
          dbUser = await prisma.user.create({
            data: {
              id: session.user.id,
              email: session.user.email || '',
              name: session.user.name || '',
              password: '', // Empty password for OAuth users
              role: 'USER',
            }
          });
          
          console.log(`Created user ${session.user.id} in database`);
        } catch (userCreateError) {
          console.error('Error creating user:', userCreateError);
          
          // If we get a unique constraint error, the user might exist
          // Try to fetch the user one more time by email
          if (userCreateError && typeof userCreateError === 'object' && 'code' in userCreateError && userCreateError.code === 'P2002') {
            dbUser = await prisma.user.findUnique({
              where: { email: session.user.email || '' }
            });
            
            if (dbUser) {
              console.log(`Found user by email after create error, using ID: ${dbUser.id}`);
              session.user.id = dbUser.id;
            } else {
              return NextResponse.json(
                { error: 'Failed to create or find user record' },
                { status: 500 }
              );
            }
          } else {
            return NextResponse.json(
              { error: 'Failed to create user record' },
              { status: 500 }
            );
          }
        }
      }
    }

    // Create order in database
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        stripeSessionId: sessionId,
        status: 'PROCESSING',
        totalAmount: (stripeSession.amount_total || 0) / 100, // Convert cents to dollars/pounds
        shippingAddress,
        orderItems: {
          create: items.map((item: CartItem) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    console.log(`Created order ${order.id} for session ${sessionId}`);
    
    // Update product stock for each item
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating order from session:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}