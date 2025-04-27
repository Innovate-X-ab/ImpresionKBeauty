//src/app/api/stripe/webhook/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { Readable } from 'stream';

// Helper function to read the request body as a stream
async function buffer(readable: Readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.text();
    const sig = req.headers.get('stripe-signature') as string;

    if (!sig) {
      return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
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
      
      // Extract customer details from the session
      const customerEmail = session.customer_email;
      const orderId = session.metadata?.orderId;
      const userId = session.metadata?.userId;
      
      if (!userId) {
        return NextResponse.json({ error: 'User not found' }, { status: 400 });
      }

      // Retrieve the temporary cart from your database or session storage
      // This is simplified - you would need to have stored the cart items somewhere
      // For now, we'll assume it's in the metadata
      const items = JSON.parse(session.metadata?.items || '[]');
      const totalAmount = session.amount_total / 100; // Convert from cents to dollars/pounds
      const shippingAddress = session.metadata?.shippingAddress || '{}';

      // Create the order in your database
      const order = await prisma.order.create({
        data: {
          userId,
          totalAmount,
          shippingAddress,
          paymentId: session.payment_intent,
          status: 'PROCESSING',
          orderItems: {
            create: items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price
            }))
          }
        },
        include: {
          orderItems: true
        }
      });

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

      return NextResponse.json({ success: true, order });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Need to disable body parser since we need the raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};