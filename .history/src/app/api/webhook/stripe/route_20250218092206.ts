// src/app/api/webhook/stripe/route.ts
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('Stripe-Signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const error = err as Error;
    console.error('Webhook signature verification failed:', error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        const userId = paymentIntent.metadata.userId;

        // Create order in database
        await prisma.order.create({
          data: {
            userId,
            totalAmount: paymentIntent.amount / 100, // Convert from cents
            status: 'PROCESSING',
            shippingAddress: paymentIntent.shipping?.address?.line1 || '',
            paymentId: paymentIntent.id,
          },
        });

        // TODO: Send order confirmation email
        // TODO: Update inventory
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        // Handle failed payment
        console.log('Payment failed:', failedPayment.id);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler failed:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}