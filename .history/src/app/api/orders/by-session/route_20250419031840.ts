// app/api/orders/by-session/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { stripe } from '@/lib/stripe';

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

    // If there are no orders at all with this session ID, 
    // implement fallback order creation since webhook might not have fired
    if (allOrders.length === 0 && sessionId.startsWith('cs_')) {
      console.log('No orders found with session ID. Creating fallback order.');
      
      // First, verify that this is a valid and successful checkout session from Stripe
      try {
        const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);
        
        if (stripeSession.payment_status === 'paid') {
          console.log('Stripe session verified as paid. Creating fallback order.');
          
          // Extract metadata from the Stripe session
          const metadata = stripeSession.metadata || {};
          const items = metadata.items ? JSON.parse(metadata.items) : [];
          const shippingAddress = metadata.shippingAddress || '{}';
          
          // First, ensure the user exists in our database
          const dbUser = await prisma.user.findUnique({
            where: { id: session.user.id }
          });
          
          if (!dbUser) {
            // If user doesn't exist in our database (common with OAuth users),
            // we need to create the user first
            try {
              await prisma.user.create({
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
              return NextResponse.json(
                { error: 'Failed to create user record' },
                { status: 500 }
              );
            }
          }

          interface CartItem {
            productId: string;
            quantity: number;
            price: number;
          }

          // Create the order in the database
          const fallbackOrder = await prisma.order.create({
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
          
          console.log('Created fallback order:', fallbackOrder.id);
          
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
          
          return NextResponse.json(fallbackOrder);
        } else {
          console.log('Stripe session not paid:', stripeSession.payment_status);
        }
      } catch (stripeError) {
        console.error('Error retrieving Stripe session:', stripeError);
      }
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

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found. Please check your orders page in a few minutes, or contact support if the issue persists.' },
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