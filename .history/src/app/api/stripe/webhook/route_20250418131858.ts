//src/app/api/stripe/webhook/route.ts

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
      console.log('Webhook session:', session); // Debug log
      
      // Create order
      const order = await prisma.order.create({
        data: {
          userId: session.metadata?.userId ?? '',
          paymentId: session.id, // This should match the session_id from success page
          status: 'PROCESSING',
          totalAmount: session.amount_total ? session.amount_total / 100 : 0,
          shippingAddress: session.shipping_details?.address?.line1 || '',
          orderItems: {
            create: JSON.parse(session.metadata?.items || '[]').map((item: CartItem) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price
            }))
          }
        }
      });

      console.log('Created order:', order); // Debug log
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