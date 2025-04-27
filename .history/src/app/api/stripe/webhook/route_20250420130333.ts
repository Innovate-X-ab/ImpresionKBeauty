// app/api/stripe/webhook/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.text();
    const sig = req.headers.get('stripe-signature') as string;

    if (!sig) {
      console.error('Missing stripe-signature header');
      return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('Missing Stripe webhook secret in environment variables');
      return NextResponse.json({ error: 'Missing Stripe webhook secret' }, { status: 500 });
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
    } catch (err) {
      console.error(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log(`Processing completed checkout session ${session.id}`);

      // Validate session metadata
      if (!session.metadata?.userId) {
        console.error('Missing userId in session metadata', session.id);
        return NextResponse.json({ error: 'Invalid session metadata' }, { status: 400 });
      }

      try {
        // Parse items from metadata
        let items: CartItem[] = [];
        try {
          items = JSON.parse(session.metadata.items || '[]');
        } catch (parseError) {
          console.error('Error parsing items from metadata:', parseError, session.metadata.items);
          items = [];
        }

        if (!items.length) {
          console.error('No items found in session metadata', session.id);
          return NextResponse.json({ error: 'No items in order' }, { status: 400 });
        }

        // Check if order already exists
        const existingOrder = await prisma.order.findFirst({
          where: {
            stripeSessionId: session.id
          }
        });

        if (existingOrder) {
          console.log(`Order already exists for session ${session.id}`);
          return NextResponse.json({ message: 'Order already processed' });
        }

        // Create order
        const order = await prisma.order.create({
          data: {
            userId: session.metadata.userId,
            stripeSessionId: session.id,
            status: 'PROCESSING',
            totalAmount: session.amount_total ? session.amount_total / 100 : 0,
            shippingAddress: session.metadata.shippingAddress || '',
            orderItems: {
              create: items.map((item: CartItem) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
              }))
            }
          }
        });

        console.log(`Created order ${order.id} for session ${session.id}`);
        
        // Update product stock
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

        return NextResponse.json({ orderId: order.id });
      } catch (error) {
        console.error('Error creating order from webhook:', error);
        return NextResponse.json(
          { error: 'Error processing order' }, 
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Need to disable body parser since we need the raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};